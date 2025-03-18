import express from 'express';
import {
  submitVolunteerApplication,
  submitInternApplication,
  getApplicants,
  updateApplicant,
  getContacts,
  getStudents,
  addStudent,
  updateStudent,
} from '../controllers/hrController.js';
import { protect, hr } from '../middleware/auth.js';

const router = express.Router();

// Applicant routes
router.post('/applicants/volunteer', submitVolunteerApplication);
router.post('/applicants/intern', submitInternApplication);
router.get('/applicants', protect, hr, getApplicants);
router.put('/applicants/:id', protect, hr, updateApplicant);

// Contact routes
router.get('/contact', protect, hr, getContacts);

// Student routes
router.get('/students', protect, hr, getStudents);
router.post('/students', protect, hr, addStudent);
router.put('/students/:id', protect, hr, updateStudent);

export default router; 