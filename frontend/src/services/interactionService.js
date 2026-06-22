import axios from "axios";

const API_URL = "http://localhost:5000/api/interactions";

// ----- DOUBTS (Q&A) -----

const submitDoubts = async (doubts) => {
  const response = await axios.post(
    `${API_URL}/doubts/bulk`,
    { doubts },
    { withCredentials: true }
  );
  return response.data;
};

const getStudentDoubts = async () => {
  const response = await axios.get(`${API_URL}/doubts/student`, {
    withCredentials: true,
  });
  return response.data;
};

const getInstructorDoubts = async () => {
  const response = await axios.get(`${API_URL}/doubts/instructor`, {
    withCredentials: true,
  });
  return response.data;
};

const answerDoubt = async (doubtId, answer) => {
  const response = await axios.put(
    `${API_URL}/doubts/${doubtId}/answer`,
    { answer },
    { withCredentials: true }
  );
  return response.data;
};

// ----- REVIEWS -----

const submitReview = async (courseId, rating, comment) => {
  const response = await axios.post(
    `${API_URL}/reviews`,
    { courseId, rating, comment },
    { withCredentials: true }
  );
  return response.data;
};

const getCourseReviews = async (courseId) => {
  const response = await axios.get(`${API_URL}/reviews/course/${courseId}`);
  return response.data;
};

const getInstructorReviews = async () => {
  const response = await axios.get(`${API_URL}/reviews/instructor`, {
    withCredentials: true,
  });
  return response.data;
};

export const interactionService = {
  submitDoubts,
  getStudentDoubts,
  getInstructorDoubts,
  answerDoubt,
  submitReview,
  getCourseReviews,
  getInstructorReviews,
};
