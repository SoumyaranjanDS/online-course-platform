import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { interactionService } from "../../services/interactionService";
import { MessageCircleQuestion, Clock, CheckCircle2, ChevronRight, XCircle } from "lucide-react";
import StudentSidebar from "../../components/layout/StudentSidebar";

export default function StudentDoubts() {
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoubts();
  }, []);

  const fetchDoubts = async () => {
    try {
      const res = await interactionService.getStudentDoubts();
      setDoubts(res.doubts || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-background font-body-md text-body-md flex min-h-screen">
      <StudentSidebar />

      <main className="flex-1 md:ml-72 pt-16 md:pt-0 transition-all duration-300 min-w-0">
        <div className="p-4 md:p-8 max-w-[1280px] mx-auto w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">My Doubts & Q&A</h1>
            <p className="text-slate-600 mt-2">Track the questions you've asked across your courses.</p>
          </div>

          {doubts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
              <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageCircleQuestion className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">No doubts asked yet!</h2>
              <p className="text-slate-500 mx-auto mb-6">
                While watching a course lesson, you can use the Q&A tab to ask questions at specific timestamps.
              </p>
              <Link
                to="/student/dashboard"
                className="inline-block bg-primary text-on-primary px-6 py-2.5 rounded-lg font-bold shadow-md hover:shadow-lg transition-all"
              >
                Go to Courses
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {doubts.map((doubt) => (
                <div key={doubt._id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    
                    {/* Course Info */}
                    <div className="w-full lg:w-64 shrink-0">
                      <div className="flex items-center gap-3 mb-3">
                        {doubt.course?.thumbnailUrl ? (
                          <img 
                            src={doubt.course.thumbnailUrl} 
                            alt="Course" 
                            className="w-12 h-12 rounded-lg object-cover bg-slate-100" 
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                            <MessageCircleQuestion className="w-5 h-5" />
                          </div>
                        )}
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm line-clamp-2">
                            {doubt.course?.title || "Unknown Course"}
                          </h4>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md w-fit">
                          <ChevronRight className="w-3.5 h-3.5" />
                          {doubt.lesson?.title || "Unknown Lesson"}
                        </span>
                        <span className="text-xs font-mono font-bold text-blue-600 flex items-center gap-1.5 bg-blue-50 px-2 py-1 rounded-md w-fit">
                          <Clock className="w-3.5 h-3.5" />
                          Timestamp: {formatTime(doubt.timestamp)}
                        </span>
                      </div>
                    </div>

                    {/* Q&A Content */}
                    <div className="flex-1 min-w-0">
                      {/* Question */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-slate-800 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                            Question
                          </span>
                          <span className="text-xs text-slate-400 font-medium">
                            {new Date(doubt.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-slate-800 font-medium leading-relaxed">
                          {doubt.question}
                        </p>
                      </div>

                      {/* Answer */}
                      <div className={`p-4 rounded-xl border ${doubt.isAnswered ? "bg-emerald-50 border-emerald-100" : "bg-slate-50 border-slate-200"}`}>
                        <div className="flex items-center gap-2 mb-2">
                          {doubt.isAnswered ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider">
                                Answered by Instructor
                              </span>
                            </>
                          ) : (
                            <>
                              <Clock className="w-4 h-4 text-slate-400" />
                              <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                                Pending Answer
                              </span>
                            </>
                          )}
                        </div>
                        {doubt.isAnswered ? (
                          <p className="text-slate-700 leading-relaxed text-sm">
                            {doubt.answer}
                          </p>
                        ) : (
                          <p className="text-slate-400 text-sm italic">
                            The instructor hasn't responded to this doubt yet.
                          </p>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
