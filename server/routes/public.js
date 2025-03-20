import express from "express";
import {
  submitContact,
  submitDonation,
  getDonations,
  getContact,
  updateDonationStatus,
  removeAnnouncement,
  allAnnouncement,
  newAnnouncement,
  updateAnnouncement
} from "../controllers/publicController.js";
import upload from "../middleware/upload.js";
import { getGalleryPicture } from '../controllers/adminController.js';

const router = express.Router();

// Contact routes
router.post("/contact", submitContact);
router.get("/contact", getContact);

// Donation routes
router.post("/donations", upload.single("screenshot"), submitDonation);
router.get("/donations", getDonations);
router.put('/donations/:id/status', updateDonationStatus);

//Breaking News
router.post("/Announcement" , newAnnouncement);
router.get("/Announcement" , allAnnouncement);
router.delete("/Announcement/:id" , removeAnnouncement);
router.put("/Announcement/:id" , updateAnnouncement)

// Gallery Routes
router.get('/gallery', getGalleryPicture);

export default router;
