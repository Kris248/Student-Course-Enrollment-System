import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner, Tabs, Tab, Alert, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';
import { getCourses, addCourse, updateCourse, deleteCourse } from '../services/courses';
import { getAllEnrollments } from '../services/enrollments';
import CourseCard from './CourseCard';

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [activeTab, setActiveTab] = useState('courses');
  const [courseForm, setCourseForm] = useState({
    id: '',
    title: '',
    description: '',
    image: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    
    const fetchData = async () => {
      try {
        setLoading(true);
        const [coursesData, enrollmentsData] = await Promise.all([
          getCourses(),
          getAllEnrollments()
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

  const handleInputChange = (e) => {
    setCourseForm({ ...courseForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (courseForm.id) {
        // Update existing course
        await updateCourse(courseForm.id, courseForm);
        Swal.fire('Success', 'Course updated successfully!', 'success');
      } else {
        // Add new course
        await addCourse(courseForm);
        Swal.fire('Success', 'Course added successfully!', 'success');
      }
      
      // Refresh courses
      const updatedCourses = await getCourses();
      setCourses(updatedCourses);
      
      // Reset form
      setCourseForm({ id: '', title: '', description: '', image: '' });
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Operation failed', 'error');
    }
  };

  const handleEdit = (course) => {
    setCourseForm(course);
  };

  const handleDelete = async (courseId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      });
      
      if (result.isConfirmed) {
        await deleteCourse(courseId);
        // Refresh courses
        const updatedCourses = await getCourses();
        setCourses(updatedCourses);
        Swal.fire('Deleted!', 'Course has been deleted.', 'success');
      }
    } catch (err) {
      Swal.fire('Error', 'Deletion failed', 'error');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    Swal.fire('Logged Out', 'You have been logged out', 'info');
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
        <h2>Admin Dashboard</h2>
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
        <Tab eventKey="courses" title="Courses Management">
          <div className="mt-4">
            <h4>{courseForm.id ? 'Edit Course' : 'Add New Course'}</h4>
            <Form onSubmit={handleSubmit} className="mb-5">
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Course Title</Form.Label>
                    <Form.Control 
                      type="text"
                      name="title"
                      value={courseForm.title}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter course title"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control 
                      type="text"
                      name="image"
                      value={courseForm.image}
                      onChange={handleInputChange}
                      placeholder="Enter image URL"
                    />
                  </Form.Group>
                </Col>
              </Row>
              
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                  as="textarea"
                  name="description"
                  value={courseForm.description}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter course description"
                  rows={4}
                />
              </Form.Group>
              
              <div className="d-flex justify-content-end">
                <Button 
                  variant={courseForm.id ? "success" : "primary"} 
                  type="submit"
                  className="me-2"
                >
                  {courseForm.id ? 'Update Course' : 'Add Course'}
                </Button>
                
                {courseForm.id && (
                  <Button 
                    variant="secondary" 
                    onClick={() => setCourseForm({ id: '', title: '', description: '', image: '' })}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </Form>
            
            <h4>Course List</h4>
            {courses.length === 0 ? (
              <Alert variant="info">No courses available</Alert>
            ) : (
              <Row>
                {courses.map(course => (
                  <Col key={course.id} md={4} className="mb-4">
                    <CourseCard 
                      course={course}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      isAdmin={true}
                    />
                  </Col>
                ))}
              </Row>
            )}
          </div>
        </Tab>
        
        <Tab eventKey="enrollments" title="Enrollments">
          <div className="mt-4">
            <h4>All Enrollments</h4>
            {enrollments.length === 0 ? (
              <Alert variant="info">No enrollments yet</Alert>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Student Email</th>
                      <th>Course Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrollments.map((enrollment, index) => (
                      <tr key={enrollment.id}>
                        <td>{index + 1}</td>
                        <td>{enrollment.email}</td>
                        <td>{enrollment.course_name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default AdminDashboard;