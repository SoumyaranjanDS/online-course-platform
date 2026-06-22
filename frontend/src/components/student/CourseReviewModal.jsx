import React, { useState } from "react";
import { Star, X, MessageSquareQuote } from "lucide-react";
import { interactionService } from "../../services/interactionService";
import toast from "react-hot-toast";

export default function CourseReviewModal({ course, onClose, onReviewSubmitted }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!course) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    
    try {
      setSubmitting(true);
      await interactionService.submitReview(course.courseId, rating, comment);
      toast.success("Review submitted successfully! Thank you.");
      if (onReviewSubmitted) onReviewSubmitted();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md">
      <div 
        className="bg-white rounded-[2rem] w-full max-w-l overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-300"
        onClick={e => e.stopPropagation()}
      >
        {/* Decorative Background Blob */}
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-br from-amber-400/20 via-orange-400/10 to-transparent opacity-60 pointer-events-none"></div>

        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 bg-white/50 hover:bg-slate-100 backdrop-blur-md rounded-full transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 sm:p-10 relative">
          
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30 mb-6 text-white rotate-3 hover:rotate-6 transition-transform">
              <MessageSquareQuote className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-3">Rate your experience</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Your feedback for <span className="font-semibold text-slate-800">{course.title}</span> helps instructors improve and other students learn.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Star Rating Section */}
            <div className="flex flex-col items-center gap-4 bg-slate-50/80 p-6 rounded-3xl border border-slate-100">
              <div className="flex items-center gap-2 sm:gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-all focus:outline-none hover:-translate-y-1 active:scale-90"
                  >
                    <Star 
                      className={`w-10 h-10 sm:w-12 sm:h-12 transition-all duration-300 ${
                        star <= (hoverRating || rating) 
                          ? "fill-amber-400 text-amber-400 drop-shadow-[0_2px_8px_rgba(251,191,36,0.5)] scale-110" 
                          : "fill-white text-slate-300 hover:text-slate-400"
                      }`} 
                    />
                  </button>
                ))}
              </div>
              
              {/* Dynamic Text Indicator */}
              <div className="h-6 flex items-center justify-center">
                <span className={`text-sm font-bold tracking-wide uppercase transition-colors duration-300 ${
                  (hoverRating || rating) ? "text-amber-500" : "text-slate-400"
                }`}>
                  {(hoverRating || rating) === 1 && "Poor"}
                  {(hoverRating || rating) === 2 && "Fair"}
                  {(hoverRating || rating) === 3 && "Good"}
                  {(hoverRating || rating) === 4 && "Very Good"}
                  {(hoverRating || rating) === 5 && "Excellent!"}
                  {!(hoverRating || rating) && "Select a rating"}
                </span>
              </div>
            </div>

            {/* Comment Section */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700">
                Detailed Review <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="What did you love about this course? How can the instructor improve?"
                  className="w-full bg-white border border-slate-200 rounded-2xl p-5 text-sm text-slate-700 placeholder-slate-400 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 resize-none h-32 transition-all shadow-sm"
                ></textarea>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-4 px-4 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={rating === 0 || submitting}
                className="flex-1 py-4 px-4 rounded-2xl font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 transition-all shadow-xl shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  "Submit Review"
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
