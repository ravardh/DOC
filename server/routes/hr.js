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
  addCertificate,
  getCertificates,
  updateCertificate,
  deleteCertificate,
  addLeave,
  getLeaves,
  updateLeave,
} from '../controllers/hrController.js';
import { protect, hr } from '../middleware/auth.js';

const router = express.Router();

router.post('/applicants/volunteer', submitVolunteerApplication);
router.post('/applicants/intern', submitInternApplication);
router.get('/applicants', protect, hr, getApplicants);
router.put('/applicants/:id', protect, hr, updateApplicant);

router.get('/contact', protect, hr, getContacts);

router.get('/students', protect, hr, getStudents);
router.post('/students', protect, hr, addStudent);
router.put('/students/:id', protect, hr, updateStudent);

router.post('/send-birthday-wish', protect, hr, sendBirthdayWish);

router.post('/exit-requests', protect, submitExitRequest);
router.get('/exit-requests', protect, hr, getExitRequests);
router.put('/exit-requests/:id', protect, hr, updateExitRequest);

router.post('/certificates', protect, hr, addCertificate);
router.get('/certificates', protect, hr, getCertificates);
router.put('/certificates/:id', protect, hr, updateCertificate);
router.delete('/certificates/:id', protect, hr, deleteCertificate);

router.post('/leaves', protect, addLeave);
router.get('/leaves', protect, hr, getLeaves);
router.put('/leaves/:id', protect, hr, updateLeave);

export default router;