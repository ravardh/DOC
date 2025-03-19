import Contact from '../models/Contact.js';
import Donation from '../models/Donation.js';
import cloudinary from '../config/cloudinary.js';
import AnnouncementModel from '../models/announcement.js';
import mongoose from 'mongoose';

// Contact Form
export const submitContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Contact Form
export const getContact = async (req, res) => {
  try {
    const donations = await Contact.find().sort({ date: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Donations
export const submitDonation = async (req, res) => {
  try {
    let screenshotPath = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      screenshotPath = result.secure_url;
    }

    const donation = await Donation.create({
      ...req.body,
      screenshotPath,
      date: new Date(),
    });
    res.status(201).json(donation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ date: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 


export const updateDonationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { receiptGenerated } = req.body;

    const donation = await Donation.findByIdAndUpdate(
      id,
      { receiptGenerated },
      { new: true }
    );

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    res.json(donation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Create a new announcement
export const newAnnouncement = async (req, res) => {
  try {
    const { Title, Announcement, order } = req.body;
    
    // Validate and prepare data
    const announcementData = {
      Title: Title?.trim(),
      Announcement: Announcement?.trim(),
      order: parseInt(order) || 1
    };

    // Basic validation
    if (!announcementData.Title) {
      return res.status(400).json({ message: "Title is required." });
    }
    if (!announcementData.Announcement) {
      return res.status(400).json({ message: "Announcement content is required." });
    }

    // Create new announcement
    const newAnnouncement = new AnnouncementModel(announcementData);
    const savedAnnouncement = await newAnnouncement.save();
    
    res.status(201).json(savedAnnouncement);
  } catch (error) {
    console.error('Create announcement error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: "Validation error", 
        errors: Object.values(error.errors).map(err => err.message) 
      });
    }
    res.status(500).json({ 
      message: "Failed to create announcement", 
      error: error.message 
    });
  }
};

// Get all announcements
export const allAnnouncement = async (req, res) => {
  try {
    const announcements = await AnnouncementModel.find().sort({ order: 1 });
    res.status(200).json(announcements);
  } catch (error) {
    console.error('Get announcements error:', error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update an announcement by ID
export const updateAnnouncement = async (req, res) => {
  try {
   
    const { id } = req.params;
    let { Title, Announcement, order } = req.body;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid announcement ID." });
    }

    // Find the announcement first to confirm it exists
    const existingAnnouncement = await AnnouncementModel.findById(id);
    if (!existingAnnouncement) {
      return res.status(404).json({ message: "Announcement not found." });
    }

    // Validate and prepare update data
    const updateData = {
      Title: Title?.trim(),
      Announcement: Announcement?.trim(),
      order: parseInt(order) || existingAnnouncement.order
    };

    // Basic validation
    if (!updateData.Title) {
      return res.status(400).json({ message: "Title is required." });
    }
    if (!updateData.Announcement) {
      return res.status(400).json({ message: "Announcement content is required." });
    }
    if (updateData.order < 1) {
      updateData.order = 1;
    }

    // Update the announcement
    const updatedAnnouncement = await AnnouncementModel.findByIdAndUpdate(
      id,
      updateData,
      { 
        new: true, 
        runValidators: true
      }
    );

    if (!updatedAnnouncement) {
      
      return res.status(500).json({ message: "Failed to update announcement." });
    }

    console.log('Successfully updated announcement:', updatedAnnouncement);
    res.status(200).json(updatedAnnouncement);
  } catch (error) {
    console.error('Update announcement error:', {
      error: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    });
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: "Validation error", 
        errors: Object.values(error.errors).map(err => err.message) 
      });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid announcement ID format." });
    }
    res.status(500).json({ 
      message: "Failed to update announcement", 
      error: error.message
    });
  }
};

// Delete an announcement by ID
export const removeAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAnnouncement = await AnnouncementModel.findByIdAndDelete(id);

    if (!deletedAnnouncement) {
      return res.status(404).json({ message: "Announcement not found." });
    }

    res.status(200).json({ message: "Announcement deleted successfully." });
  } catch (error) {
    console.error('Delete announcement error:', error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
