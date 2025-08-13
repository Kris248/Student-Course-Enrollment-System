// import api from './api';

// export const studentLogin = async (email, password) => {
//   const response = await api.post('/auth/student-login', { email, password });
//   return response.data;
// };

// export const studentSignup = async (name, email, password) => {
//   const response = await api.post('/auth/student-signup', { name, email, password });
//   return response.data;
// };

// export const adminLogin = async (email, password) => {
//   const response = await api.post('/auth/admin-login', { email, password });
//   return response.data;
// };

import api from './api';

// STUDENT LOGIN
export const studentLogin = async (email, password) => {
  const response = await api.post('/api/student-login', { email, password });
  return response.data;
};

// STUDENT SIGNUP
export const studentSignup = async (name, email, password) => {
  const response = await api.post('/api/student-signup', { name, email, password });
  return response.data;
};

// ADMIN LOGIN
export const adminLogin = async (email, password) => {
  const response = await api.post('/api/admin-login', { email, password });
  return response.data;
};
