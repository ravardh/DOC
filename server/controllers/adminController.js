import User from '../models/User.js';
import CoreTeam from '../models/CoreTeam.js';
import cloudinary from '../config/cloudinary.js';

// User Management
export const createUser = async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create(req.body);
    res.status(201).json({
      _id: user._id,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Core Team Management
export const addCoreTeamMember = async (req, res) => {
  try {
    let profilePhotoPath = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      profilePhotoPath = result.secure_url;
    }

    const coreTeam = await CoreTeam.create({
      ...req.body,
      profilePhotoPath,
    });
    res.status(201).json(coreTeam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCoreTeamMembers = async (req, res) => {
  try {
    const coreTeam = await CoreTeam.find({ active: true }).sort('order');
    res.json(coreTeam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCoreTeamMember = async (req, res) => {
  try {
    let updateData = { ...req.body };
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updateData.profilePhotoPath = result.secure_url;
    }

    const coreTeam = await CoreTeam.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );
    res.json(coreTeam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCoreTeamMember = async (req, res) => {
  try {
    await CoreTeam.findByIdAndUpdate(req.params.id, { active: false });
    res.json({ message: 'Core team member deactivated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 