import Applicant from "../models/Applicant.js";
import Contact from "../models/Contact.js";
import Student from "../models/Student.js";
import { sendNotificationEmail } from "../utils/emailService.js";
import Certificate from "../models/Certificate.js";
import ExitRequest from "../models/ExitRequest.js";
import User from "../models/User.js";

// Applicant Controllers
export const submitVolunteerApplication = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      gender,
      dob,
      interests,
      availability,
      reference,
      experience,
    } = req.body;

    // **Basic Validations**
    if (
      !name ||
      !email ||
      !phone ||
      !gender ||
      !dob ||
      !availability ||
      !experience
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled." });
    }

    // Check for duplicate email or phone
    const existingApplicant = await Applicant.findOne({
      $or: [{ email }, { phone }],
    });
    if (existingApplicant) {
      return res
        .status(400)
        .json({
          message: "Applicant with this email or phone already exists.",
        });
    }

    // **Create Applicant in DB**
    const applicant = await Applicant.create({
      type: "volunteer",
      name,
      email,
      phone,
      gender,
      dob,
      interests,
      availability,
      reference,
      experience,
    });

    // Send email notification
    await sendNotificationEmail('volunteer', {
      name,
      email,
      phone,
      gender,
      dob,
      interests,
      availability,
      reference,
      experience,
    });

    return res
      .status(201)
      .json({ message: "Application submitted successfully!", applicant });
  } catch (error) {
    console.error("Error in submitVolunteerApplication:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const submitInternApplication = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      gender,
      dob,
      interests,
      availability,
      reference,
      course,
      college,
      duration,
    } = req.body;

    // Validate required fields for intern type
    if (
      !name ||
      !email ||
      !phone ||
      !gender ||
      !dob ||
      !interests ||
      !availability ||
      !course ||
      !college ||
      !duration
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided." });
    }

    // Ensure gender is valid
    const validGenders = ["male", "female", "other"];
    if (!validGenders.includes(gender.toLowerCase())) {
      return res.status(400).json({ message: "Invalid gender value." });
    }

    // Check if applicant with the same email or phone already exists
    const existingApplicant = await Applicant.findOne({
      $or: [{ email }, { phone }],
    });
    if (existingApplicant) {
      return res
        .status(409)
        .json({
          message: "Applicant with this email or phone already exists.",
        });
    }

    // Create intern application
    const applicant = await Applicant.create({
      type: "intern",
      name,
      email: email.toLowerCase(),
      phone,
      gender,
      dob,
      interests,
      availability,
      reference,
      course,
      college,
      duration,
    });

    // Send email notification
    await sendNotificationEmail('intern', {
      name,
      email,
      phone,
      gender,
      dob,
      interests,
      availability,
      reference,
      course,
      college,
      duration,
    });

    return res.status(201).json({
      message: "Intern application submitted successfully.",
      applicant,
    });
  } catch (error) {
    console.error("Error submitting intern application:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error. Please try again later." });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const applicants = await Applicant.find().sort({ createdAt: -1 });
    res.json(applicants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateApplicant = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    console.log("Updating applicant...", updateData);
    const updatedApplicant = await Applicant.findByIdAndUpdate(id, updateData, {
      new: true,
    });
      console.log("Update Done");
    if (!updatedApplicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    res.json(updatedApplicant);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating applicant", error: error.message });
  }
};

// Contact Controllers
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Student Controllers
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ admissionDate: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Birthday Wish Controller
export const sendBirthdayWish = async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email || !name) {
      return res.status(400).json({ message: "Email and name are required" });
    }

    // Send birthday wish email
    await sendNotificationEmail('birthday-wish', { name, email });

    return res.status(200).json({ message: "Birthday wish sent successfully" });
  } catch (error) {
    console.error("Error in sendBirthdayWish:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Exit Request Controllers


export const submitExitRequest = async (req, res) => {
  try {
    const { reason, lastWorkingDay, comments, volunteer } = req.body;

    if (!reason || !lastWorkingDay) {
      return res.status(400).json({ message: "Reason and Last Working Day are required." });
    }

    const volunteerId = req.user?._id || volunteer;

    if (!volunteerId) {
      return res.status(400).json({ message: "Volunteer ID is required." });
    }

    const exitRequest = await ExitRequest.create({
      volunteer: volunteerId,
      reason,
      lastWorkingDay,
      comments,
    });

    return res.status(201).json({ message: "Exit request submitted successfully!", exitRequest });
  } catch (error) {
    console.error("Error in submitExitRequest:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const getExitRequests = async (req, res) => {
  try {
    const exitRequests = await ExitRequest.find()
      .populate("volunteer", "name email")
      .populate("reviewedBy", "name email")
      .sort({ createdAt: -1 });

    res.json(exitRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateExitRequest = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status." });
    }

    const exitRequest = await ExitRequest.findByIdAndUpdate(
      req.params.id,
      {
        status,
        reviewedBy: req.user._id,
        reviewedAt: new Date(),
      },
      { new: true }
    );

    if (!exitRequest) {
      return res.status(404).json({ message: "Exit request not found." });
    }

    if (status === "approved") {
      await User.findByIdAndUpdate(exitRequest.volunteer, { status: "inactive" });
    }

    return res.json({ message: `Exit request ${status} successfully!`, exitRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Certificate Controllers

export const addCertificate = async (req, res) => {
  try {
    const { volunteer, certificateName, issuedBy, issueDate, expiryDate, documentUrl, description } = req.body;

    if (!volunteer || !certificateName || !issuedBy || !issueDate) {
      return res.status(400).json({ message: "Volunteer, Certificate Name, Issued By and Issue Date are required." });
    }

    const certificate = await Certificate.create({
      volunteer,
      certificateName,
      issuedBy,
      issueDate,
      expiryDate,
      documentUrl,
      description,
    });

    return res.status(201).json({ message: "Certificate added successfully!", certificate });
  } catch (error) {
    console.error("Error in addCertificate:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find()
      .populate("volunteer", "name email")
      .sort({ createdAt: -1 });

    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found." });
    }

    return res.json({ message: "Certificate updated successfully!", certificate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);

    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found." });
    }

    return res.json({ message: "Certificate deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
