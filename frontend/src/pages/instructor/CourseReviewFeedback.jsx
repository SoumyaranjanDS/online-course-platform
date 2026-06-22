import React, { useState, useEffect } from "react";
import { interactionService } from "../../services/interactionService";
import { Star, MessageSquare, BookOpen, Quote } from "lucide-react";

export default function CourseReviewFeedback() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await interactionService.getInstructorReviews();
      setReviews(data.reviews || []);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Course Reviews</h1>
          <p className="text-slate-500 mt-1">See what students are saying about your courses.</p>
        </div>
        
        <div className="flex items-center gap-6 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-200">
          <div className="text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Reviews</p>
            <p className="text-2xl font-extrabold text-slate-800">{reviews.length}</p>
          </div>
          <div className="w-px h-10 bg-slate-200"></div>
          <div className="text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg Rating</p>
            <div className="flex items-center gap-1 justify-center">
              <p className="text-2xl font-extrabold text-amber-500">{getAverageRating()}</p>
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
            </div>
          </div>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center shadow-sm">
          <div className="w-20 h-20 bg-slate-50 text-slate-400 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <MessageSquare className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">No reviews yet</h2>
          <p className="text-slate-500 max-w-sm mx-auto">
            Once students complete your courses and leave feedback, their reviews will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col relative group hover:shadow-md transition-shadow">
              
              <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-100 rotate-180 group-hover:text-amber-50 transition-colors z-0" />
              
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-5">
                  {review.student?.avatarUrl ? (
                    <img src={review.student.avatarUrl} alt={review.student.name} className="w-12 h-12 rounded-full object-cover shadow-sm bg-slate-100" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg shadow-sm">
                      {review.student?.name?.charAt(0).toUpperCase() || "S"}
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-slate-800 leading-tight">{review.student?.name || "Anonymous User"}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-3.5 h-3.5 ${star <= review.rating ? "fill-amber-400 text-amber-400" : "fill-slate-100 text-slate-200"}`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-5 flex-1">
                  <p className="text-slate-600 text-sm leading-relaxed italic line-clamp-4">
                    "{review.comment || "No written feedback provided."}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-auto">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-50 py-2 px-3 rounded-xl w-fit max-w-full">
                    <BookOpen className="w-4 h-4 shrink-0 text-primary" />
                    <span className="truncate">{review.course?.title || "Unknown Course"}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}