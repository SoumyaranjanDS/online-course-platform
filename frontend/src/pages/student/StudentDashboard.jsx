import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { studentService } from "../../services/studentService";
import StudentSidebar from "../../components/layout/StudentSidebar";
import Skeleton from "../../components/ui/Skeleton";
import EmptyState from "../../components/ui/EmptyState";

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await studentService.getDashboard();
        setDashboardData(res.data);
      } catch (error) {
        console.error("Error fetching student dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div className="bg-background text-on-background font-body-md text-body-md flex min-h-screen">
      <StudentSidebar />

      {/* Main Content */}
      <main className="flex-1 md:ml-72 pt-16 md:pt-0 transition-all duration-300 min-w-0">
        <div className="p-4 md:p-8 max-w-[1280px] mx-auto w-full">
        {loading ? (
          <div className="space-y-8">
            <Skeleton className="h-48 w-full rounded-[24px]" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Skeleton className="h-28 w-full rounded-[24px]" />
              <Skeleton className="h-28 w-full rounded-[24px]" />
              <Skeleton className="h-28 w-full rounded-[24px]" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-40 w-full rounded-[24px]" />
                <Skeleton className="h-40 w-full rounded-[24px]" />
              </div>
              <Skeleton className="h-64 w-full rounded-[24px]" />
            </div>
          </div>
        ) : (
          <>
            {/* Welcome Banner */}
            <section className="mb-12 relative overflow-hidden rounded-[24px] bg-gradient-to-r from-surface-container-highest to-surface-container-low border border-surface-variant p-8 md:p-12 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
              <div className="relative z-10 max-w-2xl">
                <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-4">
                  Welcome back, {user?.name?.split(" ")[0] || "Student"}!
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
                  You're making great progress. Ready to dive back into learning?
                </p>
                <Link
                  to="/courses"
                  className="bg-primary text-on-primary font-label-md text-label-md py-3 px-6 rounded-xl hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] transition-all hover:scale-[1.02] active:scale-95 inline-flex items-center gap-2"
                >
                  Browse Courses <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary-fixed-dim rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
              <div className="absolute right-20 -bottom-20 w-48 h-48 bg-secondary-fixed-dim rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
            </section>

            {/* Summary Stats Bento Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-[24px] shadow-sm hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] transition-shadow duration-300 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary">
                    <span
                      className="material-symbols-outlined text-[28px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      local_library
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-label-md text-label-md text-on-surface-variant mb-1">
                    Enrolled Courses
                  </h3>
                  <p className="font-headline-md text-headline-md text-on-surface">
                    {dashboardData?.stats?.enrolledCourses || 0}
                  </p>
                </div>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-[24px] shadow-sm hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] transition-shadow duration-300 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-[28px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-label-md text-label-md text-on-surface-variant mb-1">
                    Completed
                  </h3>
                  <p className="font-headline-md text-headline-md text-on-surface">
                    {dashboardData?.stats?.completedCourses || 0}
                  </p>
                </div>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-[24px] shadow-sm hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] transition-shadow duration-300 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-[28px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      workspace_premium
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-label-md text-label-md text-on-surface-variant mb-1">
                    Certificates Earned
                  </h3>
                  <p className="font-headline-md text-headline-md text-on-surface">
                    {dashboardData?.stats?.certificatesEarned || 0}
                  </p>
                </div>
              </div>
            </section>

            {/* Main Dashboard Content Grid */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Continue Learning & Recent */}
              <div className="lg:col-span-2 space-y-8">
                {/* Continue Learning */}
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface mb-6">
                    Continue Learning
                  </h2>
                  {dashboardData?.continueLearning?.length > 0 ? (
                    <div className="flex flex-col gap-6">
                      {dashboardData.continueLearning.map((course) => (
                        <div
                          key={course._id}
                          className="bg-surface-container-lowest border border-outline-variant rounded-[24px] shadow-sm overflow-hidden hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] transition-all duration-300 group"
                        >
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-2/5 h-48 md:h-auto relative">
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
                            </div>
                            <div className="p-6 md:p-8 md:w-3/5 flex flex-col justify-between">
                              <div>
                                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                  {course.title}
                                </h3>
                              </div>
                              <div>
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
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
                                    <span className="material-symbols-outlined text-[18px]">
                                      schedule
                                    </span>{" "}
                                    Last accessed{" "}
                                    {new Date(course.lastAccessed).toLocaleDateString()}
                                  </div>
                                  <Link
                                    to={`/student/course/${course.courseId}/learn`}
                                    className="bg-primary text-on-primary font-label-md text-label-md py-2 px-4 rounded-lg hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] transition-all hover:scale-[1.02] active:scale-95"
                                  >
                                    Resume
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-4">
                      <EmptyState 
                        icon="school" 
                        title="No Enrolled Courses" 
                        description="You aren't enrolled in any courses yet. Browse our library and start learning!" 
                        actionText="Browse Courses" 
                        actionLink="/courses" 
                      />
                    </div>
                  )}
                </div>

                {/* Recent Activity */}
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface mb-6">
                    Recent Activity
                  </h2>
                  <div className="bg-surface-container-lowest border border-outline-variant rounded-[24px] shadow-sm p-6">
                    {dashboardData?.recentActivity?.length > 0 ? (
                      <ul className="space-y-6">
                        {dashboardData.recentActivity.map((activity, index) => (
                          <li
                            key={activity._id}
                            className="flex gap-4 items-start relative before:absolute before:left-5 before:top-10 before:bottom-[-24px] before:w-px before:bg-outline-variant last:before:hidden"
                          >
                            <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 z-10">
                              <span className="material-symbols-outlined text-[20px]">
                                {activity.action === "WATCHED_VIDEO"
                                  ? "play_circle"
                                  : activity.action === "COMPLETED_LESSON"
                                  ? "task_alt"
                                  : activity.action === "ENROLLED_COURSE"
                                  ? "school"
                                  : "local_activity"}
                              </span>
                            </div>
                            <div>
                              <p className="font-label-md text-label-md text-on-surface">
                                {activity.details}
                              </p>
                              <p className="font-body-sm text-body-sm text-on-surface-variant">
                                {activity.course?.title} •{" "}
                                {new Date(activity.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-on-surface-variant text-center py-4">
                        No recent activity found.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Recommended */}
              <div className="space-y-8">
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface mb-6">
                    Recommended for You
                  </h2>
                  <div className="flex flex-col gap-6">
                    <div className="bg-surface-container-lowest border border-outline-variant rounded-[16px] shadow-sm overflow-hidden hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] transition-all duration-300 group hover:-translate-y-1">
                      <div className="p-6 text-center">
                        <p className="text-on-surface-variant">
                          Recommendations will appear here as you learn!
                        </p>
                        <Link
                          to="/courses"
                          className="mt-4 inline-block text-primary font-bold hover:underline"
                        >
                          Browse Library
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
        <div className="h-20 md:h-8"></div>
        </div>
      </main>
    </div>
  );
}