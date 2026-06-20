import api from "../lib/axios";

export const studentService = {
  getDashboard: async () => {
    try {
      const response = await api.get("/student/dashboard");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getEnrolledCourses: async () => {
    try {
      const response = await api.get("/student/courses");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getCoursePlayer: async (courseId) => {
    try {
      const response = await api.get(`/student/courses/${courseId}/player`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  markLessonCompleted: async (courseId, lessonId) => {
    try {
      const response = await api.post(`/student/courses/${courseId}/lessons/${lessonId}/complete`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  syncLessonProgress: async (courseId, lessonId, data) => {
    try {
      // data: { watchedSeconds, totalSeconds }
      const response = await api.put(`/student/courses/${courseId}/lessons/${lessonId}/progress`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};