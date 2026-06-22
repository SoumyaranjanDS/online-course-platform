import React, { useState, useEffect } from "react";
import { interactionService } from "../../services/interactionService";
import InstructorSidebar from "../../components/layout/InstructorSidebar";
import { MessageCircleQuestion, Clock, CheckCircle2, Send, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

export default function InstructorDoubts() {
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState({});
  const [submittingReply, setSubmittingReply] = useState(null);

  useEffect(() => {
    fetchDoubts();
  }, []);

  const fetchDoubts = async () => {
    try {
      const res = await interactionService.getInstructorDoubts();
      setDoubts(res.doubts || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch doubts");
    } finally {
      setLoading(false);
    }
  };

  const handleReplyChange = (id, text) => {
    setReplyText((prev) => ({ ...prev, [id]: text }));
  };

  const submitReply = async (doubtId) => {
    const text = replyText[doubtId];
    if (!text?.trim()) return;

    try {
      setSubmittingReply(doubtId);
      const res = await interactionService.answerDoubt(doubtId, text);
      toast.success("Reply submitted successfully!");
      
      // Update local state to reflect the answer
      setDoubts((prev) => 
        prev.map((d) => (d._id === doubtId ? res.doubt : d))
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit reply");
    } finally {
      setSubmittingReply(null);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-surface text-on-surface w-full">
        <InstructorSidebar />
        <main className="flex-1 flex justify-center items-center md:ml-72 bg-surface min-w-0 pt-16 md:pt-0">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </main>
      </div>
    );
  }

  const pendingDoubts = doubts.filter(d => !d.isAnswered);
  const answeredDoubts = doubts.filter(d => d.isAnswered);

  return (
    <div className="flex min-h-screen bg-surface text-on-surface w-full">
      <InstructorSidebar />

      <main className="flex-1 overflow-y-auto md:ml-72 bg-surface min-w-0 pt-16 md:pt-0">
        <div className="p-4 md:p-8 max-w-[1280px] mx-auto space-y-8 md:pt-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-outline-variant pb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Student Q&A</h1>
              <p className="text-slate-600 mt-2">Answer questions from your students across all courses.</p>
            </div>
            <div className="flex items-center gap-4 text-sm font-semibold">
              <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-xl">
                {pendingDoubts.length} Pending
              </div>
              <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-xl">
                {answeredDoubts.length} Answered
              </div>
            </div>
          </div>

          {doubts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
              <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">You're all caught up!</h2>
              <p className="text-slate-500 mx-auto">
                There are no questions from your students at the moment.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {doubts.map((doubt) => (
                <div key={doubt._id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col lg:flex-row gap-6">
                  
                  {/* Context Column */}
                  <div className="w-full lg:w-64 shrink-0 border-b lg:border-b-0 lg:border-r border-slate-100 pb-4 lg:pb-0 lg:pr-6">
                    <div className="flex items-center gap-3 mb-4">
                      {doubt.student?.avatarUrl ? (
                        <img src={doubt.student.avatarUrl} alt={doubt.student.name} className="w-10 h-10 rounded-full object-cover bg-slate-100" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                          {doubt.student?.name?.charAt(0).toUpperCase() || "S"}
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{doubt.student?.name}</p>
                        <p className="text-xs text-slate-400">{new Date(doubt.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">Course Context</p>
                      <p className="text-sm font-semibold text-slate-600 line-clamp-2">{doubt.course?.title}</p>
                      <div className="flex flex-col gap-1.5 mt-2">
                        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md w-fit">
                          <ChevronRight className="w-3.5 h-3.5" />
                          {doubt.lesson?.title}
                        </span>
                        <span className="text-xs font-mono font-bold text-blue-600 flex items-center gap-1.5 bg-blue-50 px-2 py-1 rounded-md w-fit">
                          <Clock className="w-3.5 h-3.5" />
                          {formatTime(doubt.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Q&A Column */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div className="mb-6">
                      <span className="inline-block bg-slate-800 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mb-2">
                        Student Asks:
                      </span>
                      <p className="text-slate-800 font-medium leading-relaxed text-[15px]">
                        {doubt.question}
                      </p>
                    </div>

                    {doubt.isAnswered ? (
                      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 mt-auto">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider">
                            Your Reply
                          </span>
                        </div>
                        <p className="text-slate-700 leading-relaxed text-sm">
                          {doubt.answer}
                        </p>
                      </div>
                    ) : (
                      <div className="mt-auto">
                        <textarea
                          placeholder="Type your response here to help the student..."
                          value={replyText[doubt._id] || ""}
                          onChange={(e) => handleReplyChange(doubt._id, e.target.value)}
                          className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary resize-none h-24 mb-3"
                        />
                        <div className="flex justify-end">
                          <button
                            onClick={() => submitReply(doubt._id)}
                            disabled={!replyText[doubt._id]?.trim() || submittingReply === doubt._id}
                            className="bg-primary text-on-primary px-6 py-2 rounded-lg font-bold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
                          >
                            {submittingReply === doubt._id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            ) : (
                              <Send className="w-4 h-4" />
                            )}
                            Send Reply
                          </button>
                        </div>
                      </div>
                    )}
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
