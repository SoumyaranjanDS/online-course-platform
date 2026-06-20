import React from 'react';

export default function Step1BasicInfo({ formData, setFormData, onNext, loading }) {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 relative z-10">
      {/* Section 1: Title & Subtitle */}
      <div className="flex flex-col gap-6 border-b border-outline-variant/20 pb-8">
        <div>
          <h2 className="text-headline-sm font-headline-sm text-on-surface mb-2">Core Identity</h2>
          <p className="text-body-sm font-body-sm text-on-surface-variant">Provide a compelling title and subtitle to attract students.</p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-label-md font-label-md text-on-surface" htmlFor="title">Course Title *</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            value={formData.title || ''}
            onChange={handleChange}
            required
            className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 text-body-md font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm" 
            placeholder="e.g., Advanced UI/UX Design Masterclass" 
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-label-md font-label-md text-on-surface" htmlFor="subtitle">Course Subtitle</label>
          <input 
            type="text" 
            id="subtitle" 
            name="subtitle" 
            value={formData.subtitle || ''}
            onChange={handleChange}
            className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 text-body-md font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm" 
            placeholder="A brief summary of what students will achieve" 
          />
        </div>
      </div>

      {/* Section 2: Description */}
      <div className="flex flex-col gap-6 border-b border-outline-variant/20 pb-8">
        <div>
          <h2 className="text-headline-sm font-headline-sm text-on-surface mb-2">Detailed Description</h2>
          <p className="text-body-sm font-body-sm text-on-surface-variant">Explain what your course covers and who it's for.</p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-label-md font-label-md text-on-surface" htmlFor="description">Course Description *</label>
          <textarea 
            id="description" 
            name="description" 
            value={formData.description || ''}
            onChange={handleChange}
            required
            rows="5"
            className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 text-body-md font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary resize-y min-h-[150px]" 
            placeholder="Start typing your description here..."
          ></textarea>
        </div>
      </div>

      {/* Section 3: Taxonomy */}
      <div className="flex flex-col gap-6 border-b border-outline-variant/20 pb-8">
        <div>
          <h2 className="text-headline-sm font-headline-sm text-on-surface mb-2">Categorization</h2>
          <p className="text-body-sm font-body-sm text-on-surface-variant">Help students filter and find your course in the directory.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-label-md font-label-md text-on-surface" htmlFor="category">Category *</label>
            <select 
              id="category" 
              name="category" 
              value={formData.category || ''}
              onChange={handleChange}
              required
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 text-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
            >
              <option value="" disabled>Select category</option>
              <option value="design">Design</option>
              <option value="development">Development</option>
              <option value="business">Business</option>
              <option value="marketing">Marketing</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-label-md font-label-md text-on-surface" htmlFor="level">Level *</label>
            <select 
              id="level" 
              name="level" 
              value={formData.level || ''}
              onChange={handleChange}
              required
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 text-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
            >
              <option value="" disabled>Select level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="all">All Levels</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-label-md font-label-md text-on-surface" htmlFor="language">Language *</label>
            <select 
              id="language" 
              name="language" 
              value={formData.language || 'english'}
              onChange={handleChange}
              required
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 text-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
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
        <button 
          type="submit" 
          disabled={loading}
          className="px-8 py-3 rounded-[16px] bg-primary text-on-primary font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Save & Next'}
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
    </form>
  );
}
