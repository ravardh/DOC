import express from 'express';
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  addCoreTeamMember,
  getCoreTeamMembers,
  updateCoreTeamMember,
  deleteCoreTeamMember,
  addGalleryPicture,
  getGalleryPicture,
  deleteGalleryPicture,
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// User management routes
router.post('/users', protect, admin, createUser);
router.get('/users', protect, admin, getUsers);
router.put('/users/:id', protect, admin, updateUser);
router.delete('/users/:id', protect, admin, deleteUser);

// Core team routes
router.post('/core-team', protect, admin, upload.single('profilePhoto'), addCoreTeamMember);
router.get('/core-team', getCoreTeamMembers);
router.put('/core-team/:id', protect, admin, upload.single('profilePhoto'), updateCoreTeamMember);
router.delete('/core-team/:id', protect, admin, deleteCoreTeamMember);

// Gallery Routes
router.post('/addImage', protect, admin, upload.single('photo'), addGalleryPicture);
router.get('/gallery', protect, admin, getGalleryPicture);
router.delete('/images/:id', protect, admin, deleteGalleryPicture);

export default router; 