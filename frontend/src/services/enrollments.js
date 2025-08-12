import api from './api';

export const enrollCourse = async (courseId) => {
  const response = await api.post('/enrollments', { courseId });
  return response.data;
};

export const getUserEnrollments = async () => {
  const response = await api.get('/enrollments/user');
  return response.data;
};

export const cancelEnrollment = async (id) => {
  const response = await api.delete(`/enrollments/${id}`);
  return response.data;
};

export const getAllEnrollments = async () => {
  const response = await api.get('/enrollments/all');
  return response.data;
};