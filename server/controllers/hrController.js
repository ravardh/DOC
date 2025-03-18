import Applicant from "../models/Applicant.js";
import Contact from "../models/Contact.js";
import Student from "../models/Student.js";

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

    const updatedApplicant = await Applicant.findByIdAndUpdate(id, updateData, {
      new: true,
    });

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
