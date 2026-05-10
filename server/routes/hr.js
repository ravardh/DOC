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
  sendBirthdayWish,

  submitExitRequest,    
  getExitRequests,      
  updateExitRequest,    

  // Certificate controllers

  addCertificate,       
  getCertificates,      
  updateCertificate,    
  deleteCertificate,
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

// Birthday wish route
router.post('/send-birthday-wish', protect, hr, sendBirthdayWish);

// Exit request routes
router.post('/exit-requests', protect, submitExitRequest);
router.get('/exit-requests', protect, hr, getExitRequests);
router.put('/exit-requests/:id', protect, hr, updateExitRequest);

// Certificate routes
router.post('/certificates', protect, hr, addCertificate);
router.get('/certificates', protect, hr, getCertificates);
router.put('/certificates/:id', protect, hr, updateCertificate);
router.delete('/certificates/:id', protect, hr, deleteCertificate);

export default router;