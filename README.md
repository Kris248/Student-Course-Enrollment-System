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
<img width="1303" height="769" alt="image" src="https://github.com/user-attachments/assets/d28b754f-5600-4414-aafc-6d5e5553d4af" />
<img width="1700" height="1234" alt="image" src="https://github.com/user-attachments/assets/4d6a1fa7-b84c-43e9-a0f7-10318a43f50b" />
<img width="1700" height="897" alt="image" src="https://github.com/user-attachments/assets/b936859e-e2ef-4d45-914c-bd3529b70b4e" />
<img width="1700" height="897" alt="image" src="https://github.com/user-attachments/assets/42849a65-c1f5-4b93-b572-4f12d0001183" />
<img width="1700" height="897" alt="image" src="https://github.com/user-attachments/assets/1a60941e-a8ec-4a02-bb91-7d1c873dde45" />
<img width="1700" height="897" alt="image" src="https://github.com/user-attachments/assets/968fd3a1-ec87-4ec1-92c9-2df63562bffa" />
<img width="1700" height="897" alt="image" src="https://github.com/user-attachments/assets/449e0f8e-2abb-4d0d-bd48-cf4d779c8872" />


