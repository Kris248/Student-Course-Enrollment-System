// import React, { useState } from 'react';
// import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import { useAuth } from '../context/AuthContext';
// import { studentLogin, studentSignup } from '../services/auth';

// const StudentAuth = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: ''
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);
    
//     try {
//       let response;
//       if (isLogin) {
//         response = await studentLogin(formData.email, formData.password);
//       } else {
//         response = await studentSignup(formData.name, formData.email, formData.password);
//       }
      
//       login(response.token);
//       navigate('/student/dashboard');
//       Swal.fire('Success', `Welcome ${isLogin ? 'back' : 'to our platform'}!`, 'success');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Something went wrong');
//       Swal.fire('Error', err.response?.data?.message || 'Authentication failed', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container className="d-flex flex-column min-height-100 justify-content-center py-5">
//       <Row className="justify-content-center">
//         <Col md={6}>
//           <Card className="shadow">
//             <Card.Body>
//               <Card.Title className="text-center mb-4">
//                 {isLogin ? 'Student Login' : 'Student Signup'}
//               </Card.Title>
              
//               {error && <Alert variant="danger">{error}</Alert>}
              
//               <Form onSubmit={handleSubmit}>
//                 {!isLogin && (
//                   <Form.Group className="mb-3">
//                     <Form.Label>Full Name</Form.Label>
//                     <Form.Control 
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                       placeholder="Enter your full name"
//                     />
//                   </Form.Group>
//                 )}
                
//                 <Form.Group className="mb-3">
//                   <Form.Label>Email address</Form.Label>
//                   <Form.Control 
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     placeholder="Enter your email"
//                   />
//                 </Form.Group>
                
//                 <Form.Group className="mb-3">
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control 
//                     type="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                     placeholder="Enter password"
//                   />
//                   {!isLogin && (
//                     <Form.Text className="text-muted">
//                       At least 6 characters
//                     </Form.Text>
//                   )}
//                 </Form.Group>
                
//                 <Button 
//                   variant="primary" 
//                   type="submit" 
//                   className="w-100 mb-3"
//                   disabled={loading}
//                 >
//                   {loading ? 'Processing...' : (isLogin ? 'Login' : 'Signup')}
//                 </Button>
                
//                 <div className="text-center mt-3">
//                   <Button 
//                     variant="link" 
//                     onClick={() => setIsLogin(!isLogin)}
//                     disabled={loading}
//                   >
//                     {isLogin 
//                       ? "Don't have an account? Signup" 
//                       : "Already have an account? Login"}
//                   </Button>
//                 </div>
                
//                 <div className="text-center mt-4">
//                   <Link to="/">
//                     <Button variant="outline-secondary">Back to Home</Button>
//                   </Link>
//                 </div>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default StudentAuth;




import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';
import { studentLogin, studentSignup } from '../services/auth';

const StudentAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (isLogin) {
        // Login flow
        const response = await studentLogin(formData.email, formData.password);
        login(response.token);
        navigate('/student/dashboard');
        Swal.fire('Success', 'Welcome back!', 'success');
      } else {
        // Signup flow
        await studentSignup(formData.name, formData.email, formData.password);
        
        // Show success message and redirect to login
        Swal.fire({
          title: 'Signup Successful!',
          text: 'Your account has been created. Please login to access your courses',
          icon: 'success',
          confirmButtonText: 'Go to Login'
        }).then(() => {
          // Reset form and switch to login tab
          setFormData({ name: '', email: '', password: '' });
          setIsLogin(true);
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      Swal.fire('Error', err.response?.data?.message || 'Authentication failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex flex-column min-height-100 justify-content-center py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title className="text-center mb-4">
                {isLogin ? 'Student Login' : 'Student Signup'}
              </Card.Title>
              
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                {!isLogin && (
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control 
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      disabled={loading}
                    />
                  </Form.Group>
                )}
                
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    disabled={loading}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                    <Form.Control 
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="Enter password"
                      disabled={loading}
                    />
                  {!isLogin && (
                    <Form.Text className="text-muted">
                      At least 6 characters
                    </Form.Text>
                  )}
                </Form.Group>
                
                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 mb-3"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      {isLogin ? 'Logging in...' : 'Creating account...'}
                    </>
                  ) : isLogin ? 'Login' : 'Signup'}
                </Button>
                
                <div className="text-center mt-3">
                  <Button 
                    variant="link" 
                    onClick={() => setIsLogin(!isLogin)}
                    disabled={loading}
                  >
                    {isLogin 
                      ? "Don't have an account? Signup" 
                      : "Already have an account? Login"}
                  </Button>
                </div>
                
                <div className="text-center mt-4">
                  <Link to="/">
                    <Button variant="outline-secondary">Back to Home</Button>
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentAuth;