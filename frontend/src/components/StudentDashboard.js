import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner, Tabs, Tab, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';
import { getCourses } from '../services/courses';
import { enrollCourse, getUserEnrollments, cancelEnrollment } from '../services/enrollments';
import CourseCard from './CourseCard';

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [activeTab, setActiveTab] = useState('courses');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/student/login');
      return;
    }
    
    const fetchData = async () => {
      try {
        setLoading(true);
        const [coursesData, enrollmentsData] = await Promise.all([
          getCourses(),
          getUserEnrollments()
        ]);
        setCourses(coursesData);
        setEnrollments(enrollmentsData);
      } catch (err) {
        setError('Failed to load data');
        Swal.fire('Error', 'Failed to load data', 'error');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user, navigate]);

  const handleEnroll = async (courseId) => {
    try {
      await enrollCourse(courseId);
      // Update enrollments
      const updatedEnrollments = await getUserEnrollments();
      setEnrollments(updatedEnrollments);
      Swal.fire('Success', 'Enrolled successfully!', 'success');
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Enrollment failed', 'error');
    }
  };

  const handleCancel = async (enrollmentId) => {
    try {
      await cancelEnrollment(enrollmentId);
      // Update enrollments
      const updatedEnrollments = await getUserEnrollments();
      setEnrollments(updatedEnrollments);
      Swal.fire('Success', 'Enrollment canceled!', 'success');
    } catch (err) {
      Swal.fire('Error', 'Cancellation failed', 'error');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    Swal.fire('Logged Out', 'You have been logged out', 'info');
  };

  const isEnrolled = (courseId) => {
    return enrollments.some(e => e.course_id === courseId);
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-height-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Student Dashboard</h2>
        <div>
          <Button variant="outline-primary" className="me-2" onClick={() => navigate('/')}>
            Home
          </Button>
          <Button variant="danger" onClick={handleLogout}>Logout</Button>
        </div>
      </div>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4"
      >
        <Tab eventKey="courses" title="Available Courses">
          <h4 className="mt-4 mb-4">Available Courses</h4>
          {courses.length === 0 ? (
            <Alert variant="info">No courses available</Alert>
          ) : (
            <Row>
              {courses.map(course => (
                <Col key={course.id} md={4} className="mb-4">
                  <CourseCard 
                    course={course}
                    onEnroll={handleEnroll}
                    isEnrolled={isEnrolled(course.id)}
                  />
                </Col>
              ))}
            </Row>
          )}
        </Tab>
        
        <Tab eventKey="enrollments" title="My Enrollments">
          <h4 className="mt-4 mb-4">My Enrollments</h4>
          {enrollments.length === 0 ? (
            <Alert variant="info">You haven't enrolled in any courses yet</Alert>
          ) : (
            <Row>
              {enrollments.map(enrollment => (
                <Col key={enrollment.id} md={4} className="mb-4">
                  <div className="card h-100">
                    {enrollment.image ? (
                      <img 
                        src={enrollment.image} 
                        className="card-img-top" 
                        alt={enrollment.title}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                    ) : (
                      <div className="bg-secondary" style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span className="text-white">No Image</span>
                      </div>
                    )}
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{enrollment.title}</h5>
                      <p className="card-text flex-grow-1">
                        {enrollment.description?.substring(0, 100)}{enrollment.description?.length > 100 ? '...' : ''}
                      </p>
                      <Button 
                        variant="danger" 
                        onClick={() => handleCancel(enrollment.id)}
                        className="mt-auto"
                      >
                        Cancel Enrollment
                      </Button>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </Tab>
      </Tabs>
    </Container>
  );
};

export default StudentDashboard;