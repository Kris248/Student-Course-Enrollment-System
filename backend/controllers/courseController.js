const db = require('../config/db');

exports.getAllCourses = async (req, res) => {
  try {
    const [courses] = await db.query('SELECT DISTINCT * FROM courses');
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add new course (Admin only)
exports.addCourse = async (req, res) => {
  const { title, description, image } = req.body;

  try {
    await db.query(
      'INSERT INTO courses (title, description, image) VALUES (?, ?, ?)',
      [title, description, image]
    );
    
    res.status(201).json({ message: 'Course added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update course (Admin only)
exports.updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, description, image } = req.body;

  try {
    await db.query(
      'UPDATE courses SET title = ?, description = ?, image = ? WHERE id = ?',
      [title, description, image, id]
    );
    
    res.json({ message: 'Course updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete course (Admin only)
exports.deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM courses WHERE id = ?', [id]);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};