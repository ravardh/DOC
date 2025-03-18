import express from "express";
import {
  submitContact,
  submitDonation,
  getDonations,
  getContact,
  updateDonationStatus
} from "../controllers/publicController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Contact routes
router.post("/contact", submitContact);
router.get("/contact", getContact);

// Donation routes
router.post("/donations", upload.single("screenshot"), submitDonation);
router.get("/donations", getDonations);
router.put('/donations/:id/status', updateDonationStatus);


export default router;
