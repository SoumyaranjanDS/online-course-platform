import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { courseService } from '../../services/courseService';
import toast from 'react-hot-toast';
import InstructorSidebar from '../../components/layout/InstructorSidebar';

export default function InstructorCourses() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (course.category && course.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Delete Modal State
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [confirmDeleteChecked, setConfirmDeleteChecked] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const openDeleteModal = (courseId) => {
    setCourseToDelete(courseId);
    setConfirmDeleteChecked(false);
  };

  const closeDeleteModal = () => {
    setCourseToDelete(null);
    setConfirmDeleteChecked(false);
  };

  const handleConfirmDelete = async () => {
    if (!courseToDelete || !confirmDeleteChecked) return;
    
    setIsDeleting(true);
    try {
      await courseService.deleteCourse(courseToDelete);
      setCourses(courses.filter(c => c._id !== courseToDelete));
      closeDeleteModal();
      toast.success('Course deleted successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to delete course');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-surface text-on-surface w-full">
      <InstructorSidebar />

      {/* Main Content Canvas */}
      <main className="flex-1 overflow-y-auto md:ml-72 bg-surface min-w-0 pt-16 md:pt-0">
        <div className="p-gutter md:p-lg max-w-container-max mx-auto space-y-8 md:pt-8">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">My Courses</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2">Manage your published and drafted courses.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 sm:w-64">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
              <Link to="/instructor/course/create" className="bg-primary text-on-primary px-6 py-3 rounded-xl font-label-md text-label-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 whitespace-nowrap">
                <span className="material-symbols-outlined">add</span>
                Create New Course
              </Link>
            </div>
          </div>

          {/* Courses Grid */}
          {loading ? (
            <p>Loading courses...</p>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-16 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl">
              <span className="material-symbols-outlined text-[48px] text-on-surface-variant mb-4">school</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">No courses found</h3>
              <p className="text-on-surface-variant mb-6">You haven't created any courses matching this search yet.</p>
              <Link to="/instructor/course/create" className="bg-primary text-on-primary px-6 py-3 rounded-xl font-label-md inline-block hover:-translate-y-0.5 transition-all">
                Create your first course
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map(course => (
                <div key={course._id} className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl overflow-hidden hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] transition-shadow flex flex-col group">
                  <div className="aspect-video bg-surface-container-high relative overflow-hidden">
                    {course.thumbnailUrl ? (
                      <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-on-surface-variant">
                        <span className="material-symbols-outlined text-[32px]">image</span>
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur px-3 py-1 rounded-lg">
                      <span className="font-label-sm text-xs font-bold capitalize">{course.status}</span>
                    </div>
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-primary-container/20 text-primary-container px-2 py-0.5 rounded text-xs font-bold">{course.category}</span>
                      <span className="bg-tertiary-container/20 text-tertiary px-2 py-0.5 rounded text-xs font-bold">{course.level}</span>
                    </div>
                    
                    <h3 className="font-headline-sm text-lg font-bold text-on-surface mb-2 line-clamp-2">{course.title}</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-4 flex-1">{course.subtitle}</p>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/20">
                      <div className="font-bold text-primary">
                        ₹{course.price.toFixed(2)}
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => openDeleteModal(course._id)}
                          className="px-4 py-2 text-error hover:bg-error/10 rounded-lg font-label-md text-sm transition-colors"
                        >
                          Delete
                        </button>
                        <Link to={`/instructor/course/edit/${course._id}`} className="px-4 py-2 bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80 rounded-lg font-label-md text-sm transition-colors">
                          Edit
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {courseToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-xl max-w-md w-full">
            <h3 className="text-headline-sm font-bold text-on-surface mb-2">Delete Course?</h3>
            <p className="text-on-surface-variant mb-6 text-body-md">
              Are you absolutely sure you want to delete this course? This action cannot be undone.
            </p>
            
            <label className="flex items-start gap-3 mb-6 p-4 bg-error-container/10 border border-error/20 rounded-xl cursor-pointer">
              <input 
                type="checkbox" 
                checked={confirmDeleteChecked}
                onChange={(e) => setConfirmDeleteChecked(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-error text-error focus:ring-error"
              />
              <span className="text-body-sm text-error font-medium">
                I understand that all videos, thumbnails, and course content will be permanently deleted from Cloudinary and the database.
              </span>
            </label>

            <div className="flex justify-end gap-3">
              <button 
                onClick={closeDeleteModal}
                disabled={isDeleting}
                className="px-4 py-2 text-on-surface-variant font-bold rounded-lg hover:bg-surface-container-high transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmDelete}
                disabled={!confirmDeleteChecked || isDeleting}
                className="px-4 py-2 bg-error text-on-error font-bold rounded-lg hover:bg-[#d63838] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-on-error/30 border-t-on-error rounded-full animate-spin"></span>
                    Deleting...
                  </>
                ) : (
                  'Permanently Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}