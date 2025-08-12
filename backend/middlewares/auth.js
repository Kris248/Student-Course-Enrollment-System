const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// middlewares/auth.js
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') { // Changed from req.user.role
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

exports.isStudent = (req, res, next) => {
  if (req.user.role !== 'student') { // Changed from req.user.role
    return res.status(403).json({ message: 'Student access required' });
  }
  next();
};