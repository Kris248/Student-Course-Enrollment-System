const db = require('../config/db');

class Course {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM courses');
    return rows;
  }

  static async create(title, description, image) {
    const [result] = await db.query(
      'INSERT INTO courses (title, description, image) VALUES (?, ?, ?)',
      [title, description, image]
    );
    return result.insertId;
  }

  static async update(id, title, description, image) {
    await db.query(
      'UPDATE courses SET title = ?, description = ?, image = ? WHERE id = ?',
      [title, description, image, id]
    );
  }

  static async delete(id) {
    await db.query('DELETE FROM courses WHERE id = ?', [id]);
  }
}

module.exports = Course;