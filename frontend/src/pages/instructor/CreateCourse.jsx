import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { courseService } from '../../services/courseService';

export default function CreateCourse() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    category: '',
    level: '',
    language: 'english',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await courseService.createCourse(formData);
      // Navigate to the newly created course edit page or back to dashboard
      navigate('/instructor/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to create course draft');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col">
      {/* TopNavBar Simplified */}
      <header className="bg-surface dark:bg-surface-container shadow-sm h-20 w-full flex items-center px-gutter">
        <Link to="/instructor/dashboard" className="text-primary font-bold flex items-center gap-2">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
          LearnHub
        </Link>
      </header>

      <main className="flex-grow flex flex-col items-center py-lg px-gutter max-w-container-max mx-auto w-full">
        {/* Header */}
        <div className="w-full max-w-4xl mb-12">
          <h1 className="text-display-lg-mobile md:text-display-lg font-bold text-on-background mb-4">Create New Course</h1>
          <p className="text-body-lg text-on-surface-variant mb-8">Start by defining the core identity of your course. This information helps students find and understand your offering.</p>
        </div>

        {/* Form Card */}
        <div className="w-full max-w-4xl bg-surface-container-lowest rounded-[24px] border border-outline-variant/30 shadow-sm p-6 md:p-10 relative overflow-hidden">
          {error && (
            <div className="mb-6 p-4 bg-error-container text-on-error-container rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-8 relative z-10">
            {/* Section 1: Title & Subtitle */}
            <div className="flex flex-col gap-6 border-b border-outline-variant/20 pb-8">
              <div>
                <h2 className="text-headline-sm font-bold text-on-surface mb-2">Core Identity</h2>
                <p className="text-body-sm text-on-surface-variant">Provide a compelling title and subtitle to attract students.</p>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-label-md font-bold text-on-surface" htmlFor="title">Course Title *</label>
                <input 
                  type="text" 
                  id="title" 
                  name="title" 
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface-container-lowest border-2 border-outline-variant rounded-xl px-4 py-3 text-body-md focus:border-primary focus:ring-0 transition-all shadow-sm" 
                  placeholder="e.g., Advanced UI/UX Design Masterclass" 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-label-md font-bold text-on-surface" htmlFor="subtitle">Course Subtitle</label>
                <input 
                  type="text" 
                  id="subtitle" 
                  name="subtitle" 
                  value={formData.subtitle}
                  onChange={handleChange}
                  className="w-full bg-surface-container-lowest border-2 border-outline-variant rounded-xl px-4 py-3 text-body-md focus:border-primary focus:ring-0 transition-all shadow-sm" 
                  placeholder="A brief summary of what students will achieve" 
                />
              </div>
            </div>

            {/* Section 2: Description */}
            <div className="flex flex-col gap-6 border-b border-outline-variant/20 pb-8">
              <div>
                <h2 className="text-headline-sm font-bold text-on-surface mb-2">Detailed Description</h2>
                <p className="text-body-sm text-on-surface-variant">Explain what your course covers and who it's for.</p>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-label-md font-bold text-on-surface" htmlFor="description">Course Description *</label>
                <textarea 
                  id="description" 
                  name="description" 
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full border-2 border-outline-variant rounded-xl px-4 py-3 text-body-md focus:border-primary focus:ring-0 resize-y min-h-[150px] bg-surface-container-lowest" 
                  placeholder="Start typing your description here..."
                ></textarea>
              </div>
            </div>

            {/* Section 3: Taxonomy */}
            <div className="flex flex-col gap-6 border-b border-outline-variant/20 pb-8">
              <div>
                <h2 className="text-headline-sm font-bold text-on-surface mb-2">Categorization</h2>
                <p className="text-body-sm text-on-surface-variant">Help students filter and find your course in the directory.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Category */}
                <div className="flex flex-col gap-2">
                  <label className="text-label-md font-bold text-on-surface" htmlFor="category">Category *</label>
                  <select 
                    id="category" 
                    name="category" 
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full bg-surface-container-lowest border-2 border-outline-variant rounded-xl px-4 py-3 text-body-md focus:border-primary transition-all shadow-sm"
                  >
                    <option value="" disabled>Select category</option>
                    <option value="design">Design</option>
                    <option value="development">Development</option>
                    <option value="business">Business</option>
                    <option value="marketing">Marketing</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Level */}
                <div className="flex flex-col gap-2">
                  <label className="text-label-md font-bold text-on-surface" htmlFor="level">Level *</label>
                  <select 
                    id="level" 
                    name="level" 
                    value={formData.level}
                    onChange={handleChange}
                    required
                    className="w-full bg-surface-container-lowest border-2 border-outline-variant rounded-xl px-4 py-3 text-body-md focus:border-primary transition-all shadow-sm"
                  >
                    <option value="" disabled>Select level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="all">All Levels</option>
                  </select>
                </div>

                {/* Language */}
                <div className="flex flex-col gap-2">
                  <label className="text-label-md font-bold text-on-surface" htmlFor="language">Language *</label>
                  <select 
                    id="language" 
                    name="language" 
                    value={formData.language}
                    onChange={handleChange}
                    required
                    className="w-full bg-surface-container-lowest border-2 border-outline-variant rounded-xl px-4 py-3 text-body-md focus:border-primary transition-all shadow-sm"
                  >
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 mt-4 pt-4">
              <Link to="/instructor/dashboard" className="px-6 py-3 rounded-full text-primary bg-surface-container hover:bg-surface-container-high font-bold transition-colors">
                Cancel
              </Link>
              <button 
                type="submit" 
                disabled={loading}
                className="px-8 py-3 rounded-[16px] bg-primary text-on-primary font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create Course Draft'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
