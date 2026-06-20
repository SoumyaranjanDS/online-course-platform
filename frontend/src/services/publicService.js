import api from '../lib/axios.js';

const API_URL = '/public/courses';

export const publicService = {
  getPublishedCourses: async (params) => {
    try {
      const response = await api.get(API_URL, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching published courses', error.response?.data || error);
      throw error;
    }
  },

  getCourseDetails: async (id) => {
    try {
      const response = await api.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching course details', error.response?.data || error);
      throw error;
    }
  }
};
