import express from 'express';
import {
  uploadGalleryImage,
  getGalleryImages,
  updateGalleryImage,
  deleteGalleryImage,
  submitVolunteerApplication,
  submitInternApplication,
  getApplicants,
  scheduleInterview,
  onboardApplicant,
  getContacts,
  getTeamMembers,
  updateTeamMember,
  getStudents,
  addStudent,
  updateStudent,
} from '../controllers/hrController.js';
import { protect, hr } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Gallery routes
router.post('/gallery', protect, hr, upload.single('image'), uploadGalleryImage);
router.get('/gallery', protect, hr, getGalleryImages);
router.put('/gallery/:id', protect, hr, updateGalleryImage);
router.delete('/gallery/:id', protect, hr, deleteGalleryImage);

// Applicant routes
router.post('/applicants/volunteer', submitVolunteerApplication);
router.post('/applicants/intern', submitInternApplication);
router.get('/applicants', protect, hr, getApplicants);
router.put('/applicants/:id/interview', protect, hr, scheduleInterview);
router.put('/applicants/:id/onboard', protect, hr, onboardApplicant);

// Contact routes
router.get('/contact', protect, hr, getContacts);

// Team routes
router.get('/team', protect, hr, getTeamMembers);
router.put('/team/:id', protect, hr, updateTeamMember);

// Student routes
router.get('/students', protect, hr, getStudents);
router.post('/students', protect, hr, addStudent);
router.put('/students/:id', protect, hr, updateStudent);

export default router; 