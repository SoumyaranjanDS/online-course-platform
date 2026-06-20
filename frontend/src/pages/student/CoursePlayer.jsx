import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { studentService } from "../../services/studentService";
import Navbar from "../../components/layout/Navbar";
import toast from "react-hot-toast";
import { CheckCircle, PlayCircle, Menu, X, ChevronLeft, ChevronRight, Award } from "lucide-react";
import CertificateModal from "../../components/student/CertificateModal";
import ModernVideoPlayer from "../../components/student/ModernVideoPlayer";

export default function CoursePlayer() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showCertificate, setShowCertificate] = useState(false);

  useEffect(() => {
    const fetchPlayerInfo = async () => {
      try {
        const res = await studentService.getCoursePlayer(courseId);
        setCourse(res.data.course);
        setProgress(res.data.progress);

        // Set first uncompleted lesson as active, or just the first lesson
        if (res.data.course.modules && res.data.course.modules.length > 0) {
          let foundLesson = false;
          for (const mod of res.data.course.modules) {
            for (const lesson of mod.lessons) {
              const lp = res.data.progress?.lessonProgress?.find(p => p.lesson === lesson._id);
              if (!lp || !lp.isCompleted) {
                setActiveLesson(lesson);
                foundLesson = true;
                break;
              }
            }
            if (foundLesson) break;
          }
          // If all completed, just show first lesson
          if (!foundLesson) {
            setActiveLesson(res.data.course.modules[0].lessons[0]);
          }
        }
      } catch (error) {
        console.error("Failed to load course player:", error);
        toast.error("Failed to load course content. Are you enrolled?");
        navigate("/student/dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchPlayerInfo();
  }, [courseId, navigate]);

  const handleCompleteLesson = async () => {
    if (!activeLesson) return;
    try {
      const res = await studentService.markLessonCompleted(courseId, activeLesson._id);
      setProgress(res.progress);
      toast.success("Lesson completed!");
      goToNextLesson();
    } catch (error) {
      toast.error("Failed to mark lesson complete");
    }
  };

  const getLessonSequence = () => {
    if (!course?.modules) return [];
    const sequence = [];
    course.modules.forEach(mod => {
      mod.lessons.forEach(lesson => sequence.push(lesson));
    });
    return sequence;
  };

  const sequence = getLessonSequence();
  const currentIndex = sequence.findIndex(l => l._id === activeLesson?._id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < sequence.length - 1;

  const goToNextLesson = () => {
    if (hasNext) {
      setActiveLesson(sequence[currentIndex + 1]);
    }
  };

  const goToPrevLesson = () => {
    if (hasPrev) {
      setActiveLesson(sequence[currentIndex - 1]);
    }
  };

  const isCompleted = (lessonId) => {
    const lp = progress?.lessonProgress?.find(p => p.lesson === lessonId);
    return lp ? lp.isCompleted : false;
  };

  const getLessonProgressData = (lessonId, durationSecs) => {
    const lp = progress?.lessonProgress?.find(p => p.lesson === lessonId);
    
    if (!lp) {
      const totMins = Math.floor(durationSecs / 60);
      return { percent: 0, isCompleted: false, text: `0m / ${totMins}m` };
    }
    if (lp.isCompleted) return { percent: 100, isCompleted: true, text: "Completed" };
    
    const watchedMins = Math.floor((lp.watchedSeconds || 0) / 60);
    const totalMins = Math.floor((lp.totalSeconds || durationSecs || 0) / 60) || 1;
    const percent = Math.min(((lp.watchedSeconds || 0) / (lp.totalSeconds || durationSecs || 1)) * 100, 100);
    
    return {
      percent,
      isCompleted: false,
      text: `${watchedMins}m / ${totalMins}m`
    };
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 text-gray-900 h-screen flex flex-col overflow-hidden font-body-md">
      {/* Mini Header */}
      <header className="h-16 border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 bg-white flex-shrink-0 z-10">
        <div className="flex items-center gap-4 flex-1">
          <Link
            to="/student/dashboard"
            className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-full transition-colors flex items-center"
            title="Back to Dashboard"
          >
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <div className="flex flex-col flex-1 border-l border-gray-200 pl-4 gap-0.5 justify-center">
            <h1 className="text-sm md:text-body-lg font-bold text-gray-900 line-clamp-1">
              {course.title}
            </h1>
            {/* Mobile Progress Bar */}
            <div className="md:hidden flex items-center gap-2">
              <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${progress?.completionPercentage || 0}%` }}
                ></div>
              </div>
              <span className="text-[10px] font-bold text-gray-500">{progress?.completionPercentage || 0}%</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end gap-1">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Course Progress
            </div>
            <div className="flex items-center gap-3">
              <div className="w-32 lg:w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${progress?.completionPercentage || 0}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-700 w-9 text-right">{progress?.completionPercentage || 0}%</span>
            </div>
          </div>
          
          {progress?.completionPercentage >= 100 && (
            <button
              onClick={() => setShowCertificate(true)}
              className="px-4 py-2 bg-emerald-100 text-emerald-700 border border-emerald-200 hover:bg-emerald-200 rounded-xl font-bold flex items-center gap-2 transition-colors animate-in fade-in zoom-in duration-300"
            >
              <Award className="w-5 h-5" />
              <span className="hidden sm:inline">Get Certificate</span>
            </button>
          )}

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors md:hidden"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden relative">
        {/* Left Side: Video Player area */}
        <div 
          className={`flex-1 flex flex-col bg-slate-50 overflow-hidden transition-all duration-300 ${!sidebarOpen ? 'md:pr-0' : ''}`}
        >
          {activeLesson ? (
            <>
              {/* 16:9 Bounded Video Player Container */}
              <div className="w-full bg-black flex-shrink-0 flex items-center justify-center">
                <div className="w-full max-w-[1200px] aspect-video relative shadow-xl">
                  {activeLesson.videoUrl ? (
                    <ModernVideoPlayer 
                      videoUrl={activeLesson.videoUrl} 
                      courseId={courseId} 
                      lessonId={activeLesson._id}
                      lessonDuration={activeLesson.duration}
                      onProgressUpdate={(updatedProgress) => setProgress(updatedProgress)}
                      onLessonComplete={() => {
                        studentService.getCoursePlayer(courseId).then(res => {
                          setProgress(res.data.progress);
                          toast.success("Lesson completed automatically!", {
                            style: { background: '#1e293b', color: '#fff' }
                          });
                        });
                      }}
                    />
                  ) : (
                    <div className="text-gray-500 text-center flex flex-col items-center justify-center h-full">
                      <span className="material-symbols-outlined text-6xl mb-4">
                        ondemand_video
                      </span>
                      <p className="text-lg">Video content not available.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Scrollable Description Area with reduced text size and serif font */}
              <div 
                className="flex-1 overflow-y-auto p-4 md:p-6"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <div className="max-w-[1200px] mx-auto w-full">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 border-b border-gray-200 pb-4">
                    <div>
                      <h2 className="text-xl md:text-2xl font-['Inter'] font-bold text-gray-900 mb-1 leading-tight tracking-tight">
                        {activeLesson.title}
                      </h2>
                      {activeLesson.duration > 0 && (
                        <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                          {Math.ceil(activeLesson.duration / 60)} mins
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={goToPrevLesson}
                        disabled={!hasPrev}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 shadow-sm"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Prev
                      </button>
                      <button
                        onClick={goToNextLesson}
                        disabled={!hasNext}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {activeLesson.description && (
                    <div className="text-sm text-gray-700 font-['Inter'] leading-relaxed whitespace-pre-line max-w-4xl">
                      {activeLesson.description}
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-8">
              <span className="material-symbols-outlined text-6xl mb-4 opacity-50">
                check_box_outline_blank
              </span>
              <h2 className="text-xl font-medium">
                No lessons available
              </h2>
            </div>
          )}
        </div>

        {/* Right Side: Curriculum Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          } md:translate-x-0 fixed md:static right-0 top-0 bottom-0 w-80 lg:w-[380px] bg-white border-l border-gray-200 z-20 transition-transform duration-300 flex flex-col shadow-xl md:shadow-none`}
        >
          <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-lg">
              Course Content
            </h3>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-2 text-gray-500 hover:text-gray-900 rounded-full bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div 
            className="flex-1 overflow-y-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {course?.modules?.map((mod, modIdx) => (
              <div
                key={mod._id}
                className="border-b border-gray-200"
              >
                <div className="p-4 bg-slate-50">
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Section {modIdx + 1}
                  </h4>
                  <p className="font-bold text-gray-900">
                    {mod.title}
                  </p>
                </div>
                <div className="flex flex-col pb-2 bg-white">
                  {mod.lessons?.map((lesson, lessonIdx) => {
                    const active = activeLesson?._id === lesson._id;
                    const progData = getLessonProgressData(lesson._id, lesson.duration);
                    
                    return (
                      <button
                        key={lesson._id}
                        onClick={() => setActiveLesson(lesson)}
                        className={`text-left p-4 flex gap-4 hover:bg-slate-50 transition-colors relative group ${
                          active ? "bg-emerald-50/50" : ""
                        }`}
                      >
                        {active && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 rounded-r-full"></div>
                        )}
                        <div className="mt-0.5 shrink-0">
                          {progData.isCompleted ? (
                            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                              <CheckCircle className="w-4 h-4" />
                            </div>
                          ) : progData.percent > 0 ? (
                            <div className="relative w-6 h-6 flex items-center justify-center">
                              {/* Circular progress outline */}
                              <svg className="w-6 h-6 transform -rotate-90">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" className="text-gray-200" />
                                <circle 
                                  cx="12" cy="12" r="10" 
                                  stroke="currentColor" strokeWidth="2" fill="none" 
                                  strokeDasharray={`${2 * Math.PI * 10}`}
                                  strokeDashoffset={`${2 * Math.PI * 10 * (1 - progData.percent / 100)}`}
                                  className="text-emerald-500 transition-all duration-300" 
                                  strokeLinecap="round"
                                />
                              </svg>
                              {active && <PlayCircle className="absolute w-3 h-3 text-gray-900 ml-0.5" />}
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-400 group-hover:border-gray-400 transition-colors">
                              <PlayCircle className="w-3 h-3 ml-0.5" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm font-medium mb-1 line-clamp-2 leading-tight ${
                              active
                                ? "text-gray-900 font-semibold"
                                : progData.isCompleted ? "text-gray-500" : "text-gray-700"
                            }`}
                          >
                            {lessonIdx + 1}. {lesson.title}
                          </p>
                          <div className="flex items-center gap-3 mt-1.5">
                            <span className="text-xs text-gray-500 font-mono">
                              {progData.text}
                            </span>
                          </div>
                          
                          {/* Linear Progress Bar below the text */}
                          {progData.percent > 0 && !progData.isCompleted && (
                            <div className="w-full h-1 bg-gray-200 rounded-full mt-2 overflow-hidden">
                              <div 
                                className="h-full bg-emerald-500 transition-all duration-300"
                                style={{ width: `${progData.percent}%` }}
                              ></div>
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-10"
          ></div>
        )}
      </main>

      {/* Certificate Modal */}
      {showCertificate && (
        <CertificateModal
          course={course}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </div>
  );
}
