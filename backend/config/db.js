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
        ('Web Development Fundamentals', 'Learn HTML, CSS and JavaScript basics', 'https://scandiweb.com/blog/wp-content/uploads/2024/02/blog-visuals-12.png'),


        ('Database Management', 'Introduction to SQL and database design', 'https://media.licdn.com/dms/image/v2/D4D12AQFJ0hM7XMGuJw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1701889494022?e=2147483647&v=beta&t=65OV3EjQm2hnegI2E4RdO2y86MQFUpdAIQYP2JdeIeI'),


        ('React for Beginners', 'Build modern web applications with React', 'https://kinsta.com/wp-content/uploads/2023/04/react-must-be-in-scope-when-using-jsx.jpg');
    `);
  }

  query(sql, params) {
    return this.pool.query(sql, params);
  }
}

module.exports = new Database();