import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
  return (
    <div className="welcome-page">
      <div className="hero-section">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h1 className="hero-title">Student Course Enrollment</h1>
              <p className="hero-subtitle">
                Discover, enroll, and track courses with our simple platform
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="portal-section">
        <Row className="justify-content-center">
          <Col md={5} className="mb-4">
            <Card className="student-card text-center">
              <div className="card-icon">
                <div className="icon-circle student-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4 20v-6a8 8 0 1116 0v6h1v2H3v-2h1zm2 0h12v-6a6 6 0 10-12 0v6zm5-18h2v3h-2V2zm8.778 2.808l1.414 1.414-2.12 2.121-1.415-1.414 2.121-2.121zM2.808 6.222l1.414-1.414 2.121 2.12L4.93 8.344 2.808 6.222zM7 14a5 5 0 015-5v2a3 3 0 00-3 3H7z"/>
                  </svg>
                </div>
              </div>
              <Card.Body>
                <Card.Title className="card-title">Student Portal</Card.Title>
                <Card.Text className="card-text">
                  Browse courses, enroll in programs, and track your learning progress
                </Card.Text>
                <Link to="/student/login" className="btn btn-student">
                  Login / Signup
                </Link>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={5}>
            <Card className="admin-card text-center">
              <div className="card-icon">
                <div className="icon-circle admin-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 15a3 3 0 100-6 3 3 0 000 6zm-1-9a1 1 0 112 0v1h-2V6zm9 11v-1a5 5 0 00-5-5H9a5 5 0 00-5 5v1h2v-1a3 3 0 013-3h6a3 3 0 013 3v1h2zm-7-7a5 5 0 10-10 0 5 5 0 0010 0z"/>
                  </svg>
                </div>
              </div>
              <Card.Body>
                <Card.Title className="card-title">Admin Portal</Card.Title>
                <Card.Text className="card-text">
                  Manage courses, view enrollments, and oversee the learning platform
                </Card.Text>
                <Link to="/admin/login" className="btn btn-admin">
                  Admin Login
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <footer className="footer">
        <Container>
          <p className="text-center">© {new Date().getFullYear()} Student Enrollment System</p>
        </Container>
      </footer>
    </div>
  );
};

export default Welcome;