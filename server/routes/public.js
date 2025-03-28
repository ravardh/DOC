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
import Visitor from "../models/Visitor.js";

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

// Get current visitor count
router.get("/visitor-count", async (req, res) => {
  try {
    let visitor = await Visitor.findOne();
    if (!visitor) {
      visitor = await Visitor.create({ count: 0 });
    }
    res.json({ count: visitor.count });
  } catch (error) {
    console.error("Error getting visitor count:", error);
    res.status(500).json({ message: "Error getting visitor count" });
  }
});

// Increment visitor count
router.post("/increment-visitor", async (req, res) => {
  try {
    let visitor = await Visitor.findOne();
    if (!visitor) {
      visitor = await Visitor.create({ count: 0 });
    }
    
    visitor.count += 1;
    visitor.lastUpdated = new Date();
    await visitor.save();
    
    res.json({ count: visitor.count });
  } catch (error) {
    console.error("Error incrementing visitor count:", error);
    res.status(500).json({ message: "Error incrementing visitor count" });
  }
});

export default router;
