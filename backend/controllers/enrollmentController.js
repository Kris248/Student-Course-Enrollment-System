const db = require('../config/db');

// Enroll in course
exports.enrollCourse = async (req, res) => {
  const userId = req.user.id;
  const { courseId } = req.body;

  try {
    // Check if already enrolled
    const [existing] = await db.query(
      'SELECT * FROM enrollments WHERE user_id = ? AND course_id = ?',
      [userId, courseId]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    // Create enrollment
    await db.query(
      'INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)',
      [userId, courseId]
    );

    res.status(201).json({ message: 'Enrolled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user enrollments
exports.getUserEnrollments = async (req, res) => {
  const userId = req.user.id;

  try {
    const [enrollments] = await db.query(`
      SELECT e.id, c.title, c.description, c.image 
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      WHERE e.user_id = ?
    `, [userId]);

    res.json(enrollments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Cancel enrollment
exports.cancelEnrollment = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    await db.query(
      'DELETE FROM enrollments WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    
    res.json({ message: 'Enrollment canceled' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all enrollments (Admin)
exports.getAllEnrollments = async (req, res) => {
  try {
    const [enrollments] = await db.query(`
      SELECT u.email, c.title AS course_name
      FROM enrollments e
      JOIN users u ON e.user_id = u.id
      JOIN courses c ON e.course_id = c.id
    `);
    
    res.json(enrollments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};