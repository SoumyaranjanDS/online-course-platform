import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { courseService } from '../../services/courseService';
import InstructorSidebar from '../../components/layout/InstructorSidebar';

export default function InstructorDashboard() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.getInstructorCourses();
        setCourses(data.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const totalStudents = courses.reduce((sum, course) => sum + (course.totalEnrollments || 0), 0);
  const totalRevenue = courses.reduce((sum, course) => sum + ((course.totalEnrollments || 0) * (course.price || 0)), 0);

  return (
    <div className="flex h-screen overflow-hidden bg-surface text-on-surface w-full">
      <InstructorSidebar />

      {/* Main Content Canvas */}
      <main className="flex-1 overflow-y-auto w-full bg-surface">
        <div className="p-gutter md:p-lg max-w-container-max mx-auto space-y-8 pt-20 md:pt-8">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">Overview</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2">Welcome back, {user?.name}. Here's what's happening today.</p>
            </div>
            <Link to="/instructor/course/create" className="bg-primary text-on-primary px-6 py-3 rounded-xl font-label-md text-label-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined">add</span>
              Create New Course
            </Link>
          </div>

          {/* Stats Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-surface-container-lowest border border-outline-variant/30 p-6 rounded-2xl hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-primary-container/20 text-primary-container rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined">group</span>
                </div>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-1">Total Students</p>
              <h3 className="font-headline-md text-headline-md text-on-surface">{totalStudents}</h3>
            </div>
            
            <div className="bg-surface-container-lowest border border-outline-variant/30 p-6 rounded-2xl hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-tertiary-container/20 text-tertiary rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined">library_books</span>
                </div>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-1">Published Courses</p>
              <h3 className="font-headline-md text-headline-md text-on-surface">
                {courses.filter(c => c.status === 'PUBLISHED').length}
              </h3>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/30 p-6 rounded-2xl hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-secondary-container/20 text-secondary rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined">payments</span>
                </div>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-1">Total Revenue</p>
              <h3 className="font-headline-md text-headline-md text-on-surface">${totalRevenue.toFixed(2)}</h3>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/30 p-6 rounded-2xl hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-error-container/20 text-error rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined">draft</span>
                </div>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-1">Draft Courses</p>
              <h3 className="font-headline-md text-headline-md text-on-surface">
                {courses.filter(c => c.status === 'DRAFT').length}
              </h3>
            </div>
          </div>

          {/* Courses List */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] transition-shadow flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Your Courses</h3>
            </div>
            
            {loading ? (
              <p>Loading courses...</p>
            ) : courses.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-on-surface-variant mb-4">You haven't created any courses yet.</p>
                <Link to="/instructor/course/create" className="text-primary hover:underline">
                  Create your first course
                </Link>
              </div>
            ) : (
              <div className="space-y-4 flex-1">
                {courses.map(course => (
                  <div key={course._id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-container-low transition-colors border border-outline-variant/20">
                    <div className="w-16 h-16 rounded-lg bg-surface-container-high overflow-hidden shrink-0">
                      {course.thumbnailUrl ? (
                        <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-on-surface-variant">
                          <span className="material-symbols-outlined text-[24px]">image</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-label-md text-label-md font-bold text-on-surface truncate">{course.title}</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant truncate capitalize">{course.status}</p>
                    </div>
                    <Link to={`/instructor/course/edit/${course._id}`} className="px-4 py-2 bg-primary-container/20 text-primary-container hover:bg-primary-container/30 rounded-lg font-label-md text-sm transition-colors">
                      Edit
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}