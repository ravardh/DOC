import Applicant from "../models/Applicant.js";
import User from "../models/User.js";
import ExitRequest from "../models/ExitRequest.js";
import Contact from "../models/Contact.js";
import Student from "../models/Student.js";
import { sendNotificationEmail } from "../utils/emailService.js";
import Leave from "../models/Leave.js";
import Certificate from "../models/Certificate.js";

export const submitVolunteerApplication = async (req, res) => {
  try {
    const { name, email, phone, gender, dob, interests, availability, reference, experience } = req.body;
    if (!name || !email || !phone || !gender || !dob || !availability || !experience) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }
    const existingApplicant = await Applicant.findOne({ $or: [{ email }, { phone }] });
    if (existingApplicant) return res.status(400).json({ message: "Applicant with this email or phone already exists." });
    const applicant = await Applicant.create({ type: "volunteer", name, email, phone, gender, dob, interests, availability, reference, experience });
    await sendNotificationEmail('volunteer', { name, email, phone, gender, dob, interests, availability, reference, experience });
    return res.status(201).json({ message: "Application submitted successfully!", applicant });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const submitInternApplication = async (req, res) => {
  try {
    const { name, email, phone, gender, dob, interests, availability, reference, course, college, duration } = req.body;
    if (!name || !email || !phone || !gender || !dob || !interests || !availability || !course || !college || !duration) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }
    const validGenders = ["male", "female", "other"];
    if (!validGenders.includes(gender.toLowerCase())) return res.status(400).json({ message: "Invalid gender value." });
    const existingApplicant = await Applicant.findOne({ $or: [{ email }, { phone }] });
    if (existingApplicant) return res.status(409).json({ message: "Applicant with this email or phone already exists." });
    const applicant = await Applicant.create({ type: "intern", name, email: email.toLowerCase(), phone, gender, dob, interests, availability, reference, course, college, duration });
    await sendNotificationEmail('intern', { name, email, phone, gender, dob, interests, availability, reference, course, college, duration });
    return res.status(201).json({ message: "Intern application submitted successfully.", applicant });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error. Please try again later." });
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
    const updatedApplicant = await Applicant.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedApplicant) return res.status(404).json({ message: "Applicant not found" });
    res.json(updatedApplicant);
  } catch (error) {
    res.status(500).json({ message: "Error updating applicant", error: error.message });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
    const student = await Student.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendBirthdayWish = async (req, res) => {
  try {
    const { email, name } = req.body;
    if (!email || !name) return res.status(400).json({ message: "Email and name are required" });
    await sendNotificationEmail('birthday-wish', { name, email });
    return res.status(200).json({ message: "Birthday wish sent successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const submitExitRequest = async (req, res) => {
  try {
    const { reason, lastWorkingDay, comments, volunteer } = req.body;
    if (!reason || !lastWorkingDay) return res.status(400).json({ message: "Reason and Last Working Day are required." });
    const volunteerId = req.user?._id || volunteer;
    if (!volunteerId) return res.status(400).json({ message: "Volunteer ID is required." });
    const exitRequest = await ExitRequest.create({ volunteer: volunteerId, reason, lastWorkingDay, comments });
    return res.status(201).json({ message: "Exit request submitted successfully!", exitRequest });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const getExitRequests = async (req, res) => {
  try {
    const exitRequests = await ExitRequest.find().populate("volunteer", "name email").populate("reviewedBy", "name email").sort({ createdAt: -1 });
    res.json(exitRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateExitRequest = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["approved", "rejected"].includes(status)) return res.status(400).json({ message: "Invalid status." });
    const exitRequest = await ExitRequest.findByIdAndUpdate(req.params.id, { status, reviewedBy: req.user._id, reviewedAt: new Date() }, { new: true });
    if (!exitRequest) return res.status(404).json({ message: "Exit request not found." });
    if (status === "approved") await User.findByIdAndUpdate(exitRequest.volunteer, { status: "inactive" });
    return res.json({ message: `Exit request ${status} successfully!`, exitRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addCertificate = async (req, res) => {
  try {
    const { volunteer, certificateName, issuedBy, issueDate, expiryDate, documentUrl, description } = req.body;
    if (!volunteer || !certificateName || !issuedBy || !issueDate) return res.status(400).json({ message: "Required fields missing." });
    const certificate = await Certificate.create({ volunteer, certificateName, issuedBy, issueDate, expiryDate, documentUrl, description });
    return res.status(201).json({ message: "Certificate added successfully!", certificate });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find().populate("volunteer", "name email").sort({ createdAt: -1 });
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!certificate) return res.status(404).json({ message: "Certificate not found." });
    return res.json({ message: "Certificate updated successfully!", certificate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);
    if (!certificate) return res.status(404).json({ message: "Certificate not found." });
    return res.json({ message: "Certificate deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason, volunteer } = req.body;
    if (!leaveType || !startDate || !endDate || !reason) return res.status(400).json({ message: "All required fields must be filled." });
    const start = new Date(startDate);
    const end = new Date(endDate);
    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    const volunteerId = req.user?._id || volunteer;
    const leave = await Leave.create({ volunteer: volunteerId, leaveType, startDate, endDate, totalDays, reason });
    return res.status(201).json({ message: "Leave request submitted successfully!", leave });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate("volunteer", "name email").populate("reviewedBy", "name email").sort({ createdAt: -1 });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateLeave = async (req, res) => {
  try {
    const { status, comments } = req.body;
    if (!["approved", "rejected"].includes(status)) return res.status(400).json({ message: "Invalid status." });
    const leave = await Leave.findByIdAndUpdate(req.params.id, { status, comments, reviewedBy: req.user._id, reviewedAt: new Date() }, { new: true });
    if (!leave) return res.status(404).json({ message: "Leave not found." });
    return res.json({ message: `Leave ${status} successfully!`, leave });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};