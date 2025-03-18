import Contact from '../models/Contact.js';
import Donation from '../models/Donation.js';
import cloudinary from '../config/cloudinary.js';

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