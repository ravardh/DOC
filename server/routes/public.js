import express from 'express';
import {
  submitContact,
  submitDonation,
  getDonations,
} from '../controllers/publicController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Contact routes
router.post('/contact', submitContact);

// Donation routes
router.post('/donations', upload.single('screenshot'), submitDonation);
router.get('/donations', getDonations);

export default router; 