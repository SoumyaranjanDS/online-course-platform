import api from "../lib/axios";

export const paymentService = {
  createCheckoutSession: async (courseId) => {
    const response = await api.post("/payments/create-checkout-session", { courseId });
    return response.data;
  },

  verifyCheckoutSession: async (sessionId) => {
    const response = await api.post("/payments/verify-checkout-session", { sessionId });
    return response.data;
  }
};