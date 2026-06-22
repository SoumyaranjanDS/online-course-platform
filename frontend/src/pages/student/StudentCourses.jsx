import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { studentService } from "../../services/studentService";
import StudentSidebar from "../../components/layout/StudentSidebar";
import CertificateModal from "../../components/student/CertificateModal";
import CourseReviewModal from "../../components/student/CourseReviewModal";
import Skeleton from "../../components/ui/Skeleton";
import EmptyState from "../../components/ui/EmptyState";

export default function StudentCourses() {
  const { user, logout } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCertificateCourse, setSelectedCertificateCourse] = useState(null);
  const [selectedReviewCourse, setSelectedReviewCourse] = useState(null);

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (course.category && course.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Use the full enrolled courses endpoint instead of dashboard (which limits to 3)
        const res = await studentService.getEnrolledCourses();
        // Map enrollment data to match the expected shape
        const mapped = (res.data || []).filter(e => e.course).map(e => ({
          _id: e._id,
          courseId: e.course._id,
          title: e.course.title,
          thumbnailUrl: e.course.thumbnailUrl,
          category: e.course.category || '',
          completionPercentage: e.completionPercentage || 0,
          lastAccessed: e.lastAccessed,
          expiresAt: e.expiresAt,
          instructor: e.course.instructor,
        }));
        setCourses(mapped);
      } catch (error) {
        console.error("Error fetching student courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="bg-background text-on-background font-body-md text-body-md flex min-h-screen">
      <StudentSidebar />

      {/* Main Content */}
      <main className="flex-1 md:ml-72 pt-16 md:pt-0 transition-all duration-300 min-w-0">
        <div className="p-4 md:p-8 max-w-[1280px] mx-auto w-full">
        {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col gap-4">
                  <Skeleton className="h-48 w-full rounded-[24px]" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
        ) : (
          <>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                <h1 className="font-display-sm text-display-sm text-on-surface">
                  My Courses
                </h1>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                    <input
                      type="text"
                      placeholder="Search my courses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-full text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    />
                  </div>
                  <Link
                    to="/courses"
                    className="text-primary font-label-md hover:underline whitespace-nowrap hidden sm:block"
                  >
                    Browse more
                  </Link>
                </div>
              </div>

            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <div
                    key={course._id}
                    className="bg-surface-container-lowest border border-outline-variant rounded-[24px] shadow-sm overflow-hidden hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] transition-all duration-300 group flex flex-col"
                  >
                    <div className="h-48 relative">
                      {course.thumbnailUrl ? (
                        <img
                          src={course.thumbnailUrl}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-surface-variant flex items-center justify-center">
                          <span className="material-symbols-outlined text-[48px] text-on-surface-variant">
                            image
                          </span>
                        </div>
                      )}
                      {course.category && (
                        <div className="absolute top-4 left-4 bg-surface-container-lowest/90 backdrop-blur-sm px-3 py-1 rounded-full font-label-caps text-label-caps text-primary shadow-sm uppercase">
                          {course.category}
                        </div>
                      )}
                      {course.expiresAt && new Date(course.expiresAt) < new Date() && (
                        <div className="absolute top-4 right-4 bg-error text-on-error px-3 py-1 rounded-full font-label-caps text-label-caps shadow-sm uppercase">
                          Expired
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4 group-hover:text-primary transition-colors line-clamp-2">
                          {course.title}
                        </h3>
                        <div className="flex justify-between items-end mb-2">
                          <span className="font-label-md text-label-md text-on-surface-variant">
                            Progress
                          </span>
                          <span className="font-label-md text-label-md text-primary font-bold">
                            {course.completionPercentage}%
                          </span>
                        </div>
                        <div className="w-full bg-surface-container-high rounded-full h-2 mb-6">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-500"
                            style={{
                              width: `${course.completionPercentage}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      {course.completionPercentage >= 100 && (
                        <>
                          <button
                            onClick={() => setSelectedCertificateCourse(course)}
                            className="w-full text-center bg-secondary-container text-on-secondary-container font-label-md text-label-md py-3 px-4 rounded-xl hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] transition-all active:scale-95 mb-2 border border-secondary"
                          >
                            View Certificate
                          </button>
                          <button
                            onClick={() => setSelectedReviewCourse(course)}
                            className="w-full text-center bg-white text-slate-700 border border-slate-200 font-label-md text-label-md py-3 px-4 rounded-xl hover:bg-slate-50 transition-all mb-2 shadow-sm"
                          >
                            Leave a Review
                          </button>
                        </>
                      )}

                      {course.expiresAt && new Date(course.expiresAt) < new Date() ? (
                        <button
                          disabled
                          className="w-full text-center bg-surface-variant text-on-surface-variant font-label-md text-label-md py-3 px-4 rounded-xl cursor-not-allowed opacity-70"
                        >
                          Course Expired
                        </button>
                      ) : (
                        <Link
                          to={`/student/course/${course.courseId}/learn`}
                          className="w-full text-center bg-primary text-on-primary font-label-md text-label-md py-3 px-4 rounded-xl hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] transition-all hover:bg-primary/90 active:scale-95"
                        >
                          {course.completionPercentage >= 100 ? "Review Content" : course.completionPercentage === 0 ? "Start Learning" : "Resume Course"}
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-12">
                <EmptyState 
                  icon="school" 
                  title={searchQuery ? "No courses found" : "No courses yet"} 
                  description={searchQuery ? "No courses match your search criteria." : "You haven't enrolled in any courses. Browse our catalog to start your learning journey!"} 
                  actionText={searchQuery ? "Clear Search" : "Explore Catalog"} 
                  actionLink={searchQuery ? null : "/courses"}
                  onClick={searchQuery ? () => setSearchQuery('') : null}
                />
              </div>
            )}
          </>
        )}
        </div>
      </main>

      {/* Certificate Modal */}
      {selectedCertificateCourse && (
        <CertificateModal
          course={selectedCertificateCourse}
          onClose={() => setSelectedCertificateCourse(null)}
        />
      )}

      {/* Review Modal */}
      {selectedReviewCourse && (
        <CourseReviewModal
          course={selectedReviewCourse}
          onClose={() => setSelectedReviewCourse(null)}
        />
      )}
    </div>
  );
}
