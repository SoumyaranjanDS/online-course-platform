import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { publicService } from '../../services/publicService';
import { paymentService } from '../../services/paymentService';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [expandedPhases, setExpandedPhases] = useState({ 0: true });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await publicService.getCourseDetails(id);
        setCourse(data.data);
      } catch (error) {
        console.error('Error fetching course details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const togglePhase = (index) => {
    setExpandedPhases(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleBuy = async () => {
    if (!user) {
      toast.error('Please log in to purchase this course');
      navigate('/login', { state: { from: `/courses/${id}` } });
      return;
    }

    try {
      setIsCheckingOut(true);
      const res = await paymentService.createCheckoutSession(id);
      if (res.success && res.url) {
        window.location.href = res.url; // Redirect to Stripe Checkout
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(error.response?.data?.message || 'Failed to initialize checkout');
      setIsCheckingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center p-8">
          <h2 className="text-display-lg text-on-surface mb-4">Course not found</h2>
          <Link to="/courses" className="text-primary hover:underline">Return to Browse</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow w-full max-w-container-max mx-auto px-gutter py-lg flex flex-col lg:flex-row gap-lg">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col gap-lg">
          {/* Hero Section (Course Info) */}
          <section className="flex flex-col gap-md">
            <div className="flex items-center gap-sm">
              <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-caps text-label-caps">
                {course.category}
              </span>
              <span className="bg-surface-container text-on-surface-variant px-3 py-1 rounded-full font-label-caps text-label-caps">
                {course.level}
              </span>
            </div>
            <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg-mobile md:font-display-lg text-on-surface">
              {course.title}
            </h1>
            <p className="text-body-lg font-body-lg text-on-surface-variant">
              {course.subtitle || course.description}
            </p>
            <div className="flex flex-wrap items-center gap-6 mt-4">
              <div className="flex items-center gap-xs">
                <span className="material-symbols-outlined text-tertiary-fixed-dim" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                <span className="font-label-md text-label-md text-on-surface">{course.averageRating || 'New'}</span>
                <span className="text-body-sm font-body-sm text-on-surface-variant underline cursor-pointer">
                  ({course.ratingCount || 0} reviews)
                </span>
              </div>
              <div className="flex items-center gap-sm">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-sm">
                  {course.instructor?.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-body-sm font-body-sm text-on-surface">
                  Created by <strong className="font-semibold">{course.instructor?.name}</strong>
                </span>
              </div>
              <div className="flex items-center gap-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-sm">update</span>
                <span className="text-body-sm font-body-sm">Last updated {new Date(course.updatedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-sm">language</span>
                <span className="text-body-sm font-body-sm">{course.language || 'English'}</span>
              </div>
            </div>
          </section>

          {/* What you will learn Bento Grid */}
          <section className="bg-surface-container-lowest border border-surface-container-high rounded-xl p-md shadow-sm">
            <h2 className="text-headline-sm font-headline-sm text-on-surface mb-md">Course Overview</h2>
            <div className="text-body-md text-on-surface whitespace-pre-line">
              {course.description}
            </div>
          </section>

          {/* Curriculum Accordion */}
          <section>
            <h2 className="text-headline-sm font-headline-sm text-on-surface mb-md">Course Curriculum</h2>
            {course.modules && course.modules.length > 0 ? (
              <div className="flex flex-col gap-xs">
                {course.modules.map((mod, modIdx) => (
                  <div key={mod._id || modIdx} className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden">
                    <button
                      onClick={() => togglePhase(modIdx)}
                      className="w-full flex justify-between items-center p-sm bg-surface hover:bg-surface-container-low transition-colors text-left"
                    >
                      <div>
                        <span className="font-label-md text-label-md text-on-surface">
                          Section {modIdx + 1}: {mod.title}
                        </span>
                        <p className="text-body-sm font-body-sm text-on-surface-variant mt-1">
                          {mod.lessons?.length || 0} lesson{mod.lessons?.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                      <span className="material-symbols-outlined text-on-surface-variant">
                        {expandedPhases[modIdx] ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                    {expandedPhases[modIdx] && mod.lessons && (
                      <div className="flex flex-col gap-1 p-sm border-t border-outline-variant bg-surface-container-lowest">
                        {mod.lessons.map((lesson, lessonIdx) => (
                          <div key={lesson._id || lessonIdx} className="flex justify-between items-center py-2">
                            <div className="flex items-center gap-sm">
                              <span className="material-symbols-outlined text-primary">
                                {lesson.videoUrl ? 'play_circle' : 'article'}
                              </span>
                              <span className="text-body-sm font-body-sm text-on-surface">
                                {lesson.title}
                              </span>
                            </div>
                            {lesson.duration > 0 && (
                              <span className="text-body-sm font-body-sm text-on-surface-variant">
                                {Math.floor(lesson.duration / 60)}:{String(lesson.duration % 60).padStart(2, '0')}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-on-surface-variant text-body-md">No curriculum content available yet.</p>
            )}
          </section>
        </div>

        {/* Sidebar Sticky Card */}
        <aside className="w-full lg:w-80 flex-shrink-0">
          <div className="sticky top-28 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)]">
            <div className="relative w-full h-48 bg-surface-container-high group cursor-pointer">
              <img 
                src={course.thumbnailUrl || 'https://via.placeholder.com/400x300?text=Course+Thumbnail'} 
                alt={course.title}
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 flex items-center justify-center bg-inverse-surface/30 group-hover:bg-inverse-surface/20 transition-all">
                <div className="w-16 h-16 bg-surface-container-lowest/90 rounded-full flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-primary text-headline-sm" style={{fontVariationSettings: "'FILL' 1"}}>play_arrow</span>
                </div>
              </div>
              <span className="absolute bottom-2 left-2 bg-inverse-surface/80 text-on-secondary px-2 py-1 rounded text-label-caps font-label-caps">Preview</span>
            </div>
            <div className="p-md flex flex-col gap-sm">
              <div className="flex items-end gap-xs">
                <span className="text-headline-md font-headline-md text-on-surface">₹{course.price?.toFixed(2) || '0.00'}</span>
              </div>
              <button 
                onClick={handleBuy}
                disabled={isCheckingOut}
                className="w-full bg-primary text-on-primary font-label-md text-label-md py-3 rounded-[16px] hover:bg-primary-container hover:text-on-primary-container transition-all scale-98 active:scale-95 duration-200 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCheckingOut ? 'Processing...' : 'Buy Now'}
              </button>
              <button 
                onClick={() => toast('Cart functionality coming soon!', { icon: '🛒' })}
                className="w-full bg-surface-container-high text-primary font-label-md text-label-md py-3 rounded-[16px] hover:bg-surface-container-highest transition-all scale-98 active:scale-95 duration-200 border border-outline-variant"
              >
                Add to Cart
              </button>
              <div className="text-body-sm font-body-sm text-on-surface-variant text-center mt-2">
                30-Day Money-Back Guarantee
              </div>
              <hr className="border-outline-variant my-2" />
              <h3 className="font-label-md text-label-md text-on-surface mb-2">This course includes:</h3>
              <ul className="flex flex-col gap-2">
                <li className="flex items-center gap-sm text-body-sm font-body-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm">ondemand_video</span>
                  On-demand video
                </li>
                <li className="flex items-center gap-sm text-body-sm font-body-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm">file_download</span>
                  Downloadable resources
                </li>
                <li className="flex items-center gap-sm text-body-sm font-body-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm">all_inclusive</span>
                  Full lifetime access
                </li>
                <li className="flex items-center gap-sm text-body-sm font-body-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm">devices</span>
                  Access on mobile and TV
                </li>
                <li className="flex items-center gap-sm text-body-sm font-body-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm">workspace_premium</span>
                  Certificate of completion
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  );
}
