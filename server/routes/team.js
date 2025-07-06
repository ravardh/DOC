import express from 'express';
import {
  getStudents,
  addStudent,
  updateStudent,
} from '../controllers/hrController.js';
import { protect, team } from '../middleware/auth.js';

const router = express.Router();

// Student routes for team members
router.get('/students', protect, team, getStudents);
router.post('/students', protect, team, addStudent);
router.put('/students/:id', protect, team, updateStudent);

export default router;
