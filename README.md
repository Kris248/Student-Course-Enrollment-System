# Student Course Enrollment System
**Made with ❤️ by Krish Gautam**  

A full-stack web application for managing student course enrollments with separate portals for students and administrators. Built with React, Node.js, Express, and MySQL.

## Features

### Student Portal
- ✨ User registration and login
- 📚 Browse available courses
- ✅ Enroll in courses
- 📋 View enrolled courses
- ❌ Cancel enrollments

### Admin Portal
- 🔐 Secure admin login
- ➕ Add new courses
- ✏️ Edit existing courses
- 🗑️ Delete courses
- 👥 View all enrollments
- 📊 See enrollment statistics

## Technology Stack

### Frontend
- **React** - JavaScript library for building user interfaces
- **React Router** - Navigation and routing
- **Bootstrap** - Responsive styling framework
- **Axios** - HTTP client for API requests
- **SweetAlert2** - Beautiful alerts and notifications

### Backend
- **Node.js** - JavaScript runtime environment
- **Express** - Web application framework
- **MySQL** - Relational database management system
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Express Validator** - Input validation

## Installation Guide

### Prerequisites
- Node.js (v14+)
- MySQL Server
- Git

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/krishgautam/student-enrollment-system.git

# Navigate to backend directory
cd student-enrollment-system/backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your database credentials
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=enrollment_system
JWT_SECRET=your_secret_key
PORT=5000

# Start the server
npm start
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Start the development server
npm start
```

## Usage

1. Access the application at `http://localhost:3000`
2. Choose your portal:
   - **Student Portal**: Login or sign up to browse and enroll in courses
   - **Admin Portal**: Login with default credentials (admin@example.com / admin123)
3. After authentication, you'll be redirected to your dashboard

## Project Structure

```
student-enrollment-system/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Business logic
│   ├── middlewares/     # Authentication middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── server.js        # Main server file
│   └── .env             # Environment variables
├── frontend/
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── context/     # Authentication context
│   │   ├── services/    # API services
│   │   ├── App.js       # Main application component
│   │   └── index.js     # Entry point
│   └── package.json     # Frontend dependencies
└── README.md            # Project documentation
```

## Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


<img width="1700" height="897" alt="image" src="https://github.com/user-attachments/assets/ea432374-3198-4cdd-9f28-34d8bae098d6" />


