const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { verifyToken, isAdmin } = require('../middlewares/auth');
const { check } = require('express-validator');

// Public routes
router.get('/', courseController.getAllCourses);

// Admin-protected routes
router.post('/', [
  verifyToken,
  isAdmin,
  check('title', 'Title is required').notEmpty(),
  check('description', 'Description is required').notEmpty()
], courseController.addCourse);

router.put('/:id', [
  verifyToken,
  isAdmin,
  check('title', 'Title is required').notEmpty(),
  check('description', 'Description is required').notEmpty()
], courseController.updateCourse);

router.delete('/:id', [verifyToken, isAdmin], courseController.deleteCourse);

module.exports = router;