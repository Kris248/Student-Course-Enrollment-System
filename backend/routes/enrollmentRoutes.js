const express = require('express');
const router = express.Router();
const { check } = require('express-validator'); // Add this import
const enrollmentController = require('../controllers/enrollmentController');
const { verifyToken, isStudent, isAdmin } = require('../middlewares/auth');

// Student-protected routes
router.post('/', [
  verifyToken,
  isStudent,
  check('courseId', 'Course ID is required').notEmpty().isInt()
], enrollmentController.enrollCourse);

router.get('/user', [verifyToken, isStudent], enrollmentController.getUserEnrollments);

router.delete('/:id', [verifyToken, isStudent], enrollmentController.cancelEnrollment);

// Admin-protected route
router.get('/all', [verifyToken, isAdmin], enrollmentController.getAllEnrollments);

module.exports = router;