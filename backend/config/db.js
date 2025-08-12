// config/db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

class Database {
  constructor() {
    this.pool = null;
  }

  async initialize() {
    // First create database if not exists
    const initPool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      multipleStatements: true,
    });

    await initPool.query(`
      CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;
      USE \`${process.env.DB_NAME}\`;
    `);

    // Create tables
    await initPool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('student', 'admin') DEFAULT 'student'
      );
      
      CREATE TABLE IF NOT EXISTS courses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        description TEXT,
        image VARCHAR(255)
      );
      
      CREATE TABLE IF NOT EXISTS enrollments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        course_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
      );
    `);

    // Close initial connection pool
    await initPool.end();

    // Create main connection pool for the application
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    // Insert initial data
    await this.seedDatabase();
    return this.pool;
  }

  async seedDatabase() {
    // Insert admin user
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    await this.pool.query(`
      INSERT IGNORE INTO users (name, email, password, role)
      VALUES ('Admin', 'admin@example.com', ?, 'admin')
    `, [hashedPassword]);

    // Insert sample courses
    await this.pool.query(`
      INSERT IGNORE INTO courses (title, description, image)
      VALUES 
        ('Web Development Fundamentals', 'Learn HTML, CSS and JavaScript basics', 'web-dev.jpg'),
        ('Database Management', 'Introduction to SQL and database design', 'database.jpg'),
        ('React for Beginners', 'Build modern web applications with React', 'react.jpg');
    `);
  }

  query(sql, params) {
    return this.pool.query(sql, params);
  }
}

module.exports = new Database();