import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import LoginPage from '../pages/auth/LoginPage.jsx';
import SignupPage from '../pages/auth/SignupPage.jsx';
import ProtectedRoute from '../components/auth/ProtectedRoute.jsx';
import BrowseCourses from '../pages/courses/BrowseCourses.jsx';
import CourseDetails from '../pages/courses/CourseDetails.jsx';
import InstructorDashboard from '../pages/instructor/InstructorDashboard.jsx';
import CreateCourseWizard from '../pages/instructor/CreateCourseWizard.jsx';
import InstructorCourses from '../pages/instructor/InstructorCourses.jsx';
import InstructorDoubts from '../pages/instructor/InstructorDoubts.jsx';
import CourseReviewFeedback from '../pages/instructor/CourseReviewFeedback.jsx';
import StudentDashboard from '../pages/student/StudentDashboard.jsx';
import StudentCourses from '../pages/student/StudentCourses.jsx';
import CoursePlayer from '../pages/student/CoursePlayer.jsx';
import StudentDoubts from '../pages/student/StudentDoubts.jsx';
import CheckoutSuccess from '../pages/courses/CheckoutSuccess.jsx';
import CheckoutCancel from '../pages/courses/CheckoutCancel.jsx';
import NotFoundPage from '../pages/public/NotFoundPage.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/courses" element={<BrowseCourses />} />
      <Route path="/courses/:id" element={<CourseDetails />} />

      {/* Instructor Routes */}
      <Route element={<ProtectedRoute allowedRoles={['INSTRUCTOR']} />}>
        <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
        <Route path="/instructor/courses" element={<InstructorCourses />} />
        <Route path="/instructor/course/create" element={<CreateCourseWizard />} />
        <Route path="/instructor/course/edit/:id" element={<CreateCourseWizard />} />
        <Route path="/instructor/doubts" element={<InstructorDoubts />} />
        <Route path="/instructor/reviews" element={<CourseReviewFeedback />} />
      </Route>

      {/* Student Routes */}
      <Route element={<ProtectedRoute allowedRoles={['STUDENT']} />}>
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/courses" element={<StudentCourses />} />
        <Route path="/student/doubts" element={<StudentDoubts />} />
        <Route path="/student/course/:courseId/learn" element={<CoursePlayer />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="/checkout/cancel" element={<CheckoutCancel />} />
      </Route>

      {/* 404 Catch-all */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;