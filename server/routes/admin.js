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
  createPublication,
  getPublications,
  deletePublication
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
router.post('/coreteam', protect, admin, upload.single('profilePhoto'), addCoreTeamMember);
router.get('/coreteam', getCoreTeamMembers);
router.put('/coreteam/:id', protect, admin, upload.single('profilePhoto'), updateCoreTeamMember);
router.delete('/coreteam/:id', protect, admin, deleteCoreTeamMember);

// Gallery Routes
router.post('/addImage', protect, admin, upload.single('photo'), addGalleryPicture);
router.get('/gallery', getGalleryPicture);
router.delete('/images/:id', protect, admin, deleteGalleryPicture);

// Publication Routes
router.post("/publications", protect, admin, upload.single('coverImage'), createPublication);

router.get("/publications", protect, admin, getPublications);

router.delete("/publications/:id", protect, admin, deletePublication);

export default router; 