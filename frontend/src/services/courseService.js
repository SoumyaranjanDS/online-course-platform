import api from '../lib/axios.js';

const API_URL = '/courses';

export const courseService = {
  // Create a new draft course
  createCourse: async (courseData) => {
    try {
      const response = await api.post(API_URL, courseData);
      return response.data;
    } catch (error) {
      console.error('Error creating course', error.response?.data || error);
      throw error.response?.data || error;
    }
  },

  // Get all courses for logged in instructor
  getInstructorCourses: async () => {
    try {
      const response = await api.get(`${API_URL}/instructor`);
      return response.data;
    } catch (error) {
      console.error('Error fetching instructor courses', error.response?.data || error);
      throw error.response?.data || error;
    }
  },

  // Get a course by ID
  getCourseById: async (id) => {
    try {
      const response = await api.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching course', error.response?.data || error);
      throw error.response?.data || error;
    }
  },

  // Update course details
  updateCourse: async (id, courseData) => {
    try {
      const response = await api.put(`${API_URL}/${id}`, courseData);
      return response.data;
    } catch (error) {
      console.error('Error updating course', error.response?.data || error);
      throw error.response?.data || error;
    }
  },

  // Delete a course
  deleteCourse: async (id) => {
    try {
      const response = await api.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting course', error.response?.data || error);
      throw error.response?.data || error;
    }
  },

  // Upload course thumbnail
  uploadCourseThumbnail: async (id, formData) => {
    try {
      const response = await api.post(`${API_URL}/${id}/thumbnail`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading thumbnail', error.response?.data || error);
      throw error.response?.data || error;
    }
  },

  uploadVideo: async (file) => {
    const formData = new FormData();
    formData.append('video', file);
    const response = await api.post('/courses/upload-video', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};