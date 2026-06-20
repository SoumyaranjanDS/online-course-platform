import express from 'express';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';
import {
  createCourse,
  getInstructorCourses,
  getCourseById,
  updateCourse,
  uploadCourseThumbnail,
  uploadCourseVideo,
  deleteCourse,
} from '../controllers/course.controller.js';

const router = express.Router();

// All routes here are protected and require INSTRUCTOR role
router.use(protect);
router.use(authorize('INSTRUCTOR'));

// Course CRUD
router.route('/')
  .post(createCourse);

router.route('/instructor')
  .get(getInstructorCourses);

router.post('/upload-video', upload.single('video'), uploadCourseVideo);

router.route('/:id')
  .get(getCourseById)
  .put(updateCourse)
  .delete(deleteCourse);

router.route('/:id/thumbnail')
  .post(upload.single('thumbnail'), uploadCourseThumbnail);

export default router;