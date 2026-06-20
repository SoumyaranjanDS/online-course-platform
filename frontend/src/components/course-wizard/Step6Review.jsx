import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { courseService } from '../../services/courseService';

export default function Step6Review({ courseId, formData, onPrev }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePublish = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Update status to PUBLISHED
      await courseService.updateCourse(courseId, { status: 'PUBLISHED' });
      
      // Navigate to dashboard
      navigate('/instructor/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to publish course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 relative z-10">
      {error && (
        <div className="p-4 bg-error-container text-on-error-container rounded-lg">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-6 border-b border-outline-variant/20 pb-8 text-center">
        <span className="material-symbols-outlined text-[64px] text-primary mb-4">task_alt</span>
        <h2 className="text-display-lg-mobile font-bold text-on-surface mb-2">You're almost there!</h2>
        <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Review your course details one last time. Once you publish, students will be able to enroll and start learning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
          <h3 className="font-bold text-on-surface mb-4 border-b border-outline-variant/50 pb-2">Course Summary</h3>
          <ul className="flex flex-col gap-3">
            <li className="flex justify-between">
              <span className="text-on-surface-variant text-body-sm">Title:</span>
              <span className="font-bold text-on-surface text-body-sm truncate max-w-[200px]" title={formData.title}>{formData.title}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-on-surface-variant text-body-sm">Category:</span>
              <span className="font-bold text-on-surface text-body-sm capitalize">{formData.category}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-on-surface-variant text-body-sm">Price:</span>
              <span className="font-bold text-on-surface text-body-sm">₹{Number(formData.price || 0).toFixed(2)}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-on-surface-variant text-body-sm">Modules:</span>
              <span className="font-bold text-on-surface text-body-sm">{formData.modules?.length || 0}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-on-surface-variant text-body-sm">Media:</span>
              <span className="font-bold text-on-surface text-body-sm">{formData.thumbnailUrl ? 'Uploaded' : 'Missing'}</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-primary-container/10 border border-primary/20 rounded-xl p-6 flex flex-col justify-center items-center text-center">
          <span className="material-symbols-outlined text-primary mb-2">campaign</span>
          <h3 className="font-bold text-on-surface mb-2">Ready to launch?</h3>
          <p className="text-body-sm text-on-surface-variant">Publishing will make this course live in the public directory immediately.</p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 pt-4 border-t border-outline-variant/20">
        <button 
          type="button" 
          onClick={onPrev}
          className="px-6 py-3 rounded-full text-on-surface-variant hover:bg-surface-container-low font-bold transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Back
        </button>
        <button 
          type="button" 
          onClick={handlePublish}
          disabled={loading || !formData.title || !formData.thumbnailUrl}
          className="px-8 py-3 rounded-[16px] bg-secondary text-on-secondary font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? 'Publishing...' : 'Publish Course'}
          <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
        </button>
      </div>
    </div>
  );
}
