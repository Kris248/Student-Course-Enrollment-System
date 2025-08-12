const db = require('../config/db');

class Enrollment {
  static async getByUserAndCourse(userId, courseId) {
    const [rows] = await db.query(
      'SELECT * FROM enrollments WHERE user_id = ? AND course_id = ?',
      [userId, courseId]
    );
    return rows[0];
  }

  static async create(userId, courseId) {
    const [result] = await db.query(
      'INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)',
      [userId, courseId]
    );
    return result.insertId;
  }

  static async getByUserId(userId) {
    const [rows] = await db.query(`
      SELECT e.id, c.title, c.description, c.image 
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      WHERE e.user_id = ?
    `, [userId]);
    return rows;
  }

  static async deleteById(id, userId) {
    await db.query(
      'DELETE FROM enrollments WHERE id = ? AND user_id = ?',
      [id, userId]
    );
  }

  static async getAll() {
    const [rows] = await db.query(`
      SELECT u.email, c.title AS course_name
      FROM enrollments e
      JOIN users u ON e.user_id = u.id
      JOIN courses c ON e.course_id = c.id
    `);
    return rows;
  }
}

module.exports = Enrollment;