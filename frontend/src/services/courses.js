import api from './api';

export const getCourses = async () => {
  const response = await api.get('/courses');
  
  // Remove duplicates by id
  const uniqueCourses = response.data.filter((course, index, self) => 
    index === self.findIndex(c => c.id === course.id)
  );
  
  return uniqueCourses;
};

export const addCourse = async (courseData) => {
  const response = await api.post('/courses', courseData);
  return response.data;
};

export const updateCourse = async (id, courseData) => {
  const response = await api.put(`/courses/${id}`, courseData);
  return response.data;
};

export const deleteCourse = async (id) => {
  const response = await api.delete(`/courses/${id}`);
  return response.data;
};