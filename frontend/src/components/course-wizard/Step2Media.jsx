import React, { useState } from 'react';
import { courseService } from '../../services/courseService';

export default function Step2Media({ courseId, formData, setFormData, onNext, onPrev }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(formData.thumbnailUrl || '');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      setError('');
      
      // Update preview immediately
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      // Upload to server
      const form = new FormData();
      form.append('thumbnail', file);
      const response = await courseService.uploadCourseThumbnail(courseId, form);
      setFormData(prev => ({ ...prev, thumbnailUrl: response.data.thumbnailUrl }));
      
    } catch (err) {
      setError(err.message || 'Failed to upload thumbnail');
      setPreview(formData.thumbnailUrl || ''); // Revert on failure
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 relative z-10">
      <div className="flex flex-col gap-6 border-b border-outline-variant/20 pb-8">
        <div>
          <h2 className="text-headline-sm font-headline-sm text-on-surface mb-2">Course Media</h2>
          <p className="text-body-sm font-body-sm text-on-surface-variant">Upload an engaging thumbnail to represent your course.</p>
        </div>

        {error && (
          <div className="p-4 bg-error-container text-on-error-container rounded-lg">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <label className="text-label-md font-label-md text-on-surface">Course Thumbnail</label>
          
          <div className="border-2 border-dashed border-outline-variant rounded-xl p-8 flex flex-col items-center justify-center bg-surface-container-lowest text-center relative overflow-hidden group min-h-[300px]">
            {preview ? (
              <>
                <img src={preview} alt="Course Thumbnail Preview" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-inverse-surface/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-surface text-on-surface px-4 py-2 rounded-full font-label-md pointer-events-none">
                    {loading ? 'Uploading...' : 'Change Image'}
                  </span>
                </div>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[48px] text-primary mb-4" style={{fontVariationSettings: "'FILL' 1"}}>image</span>
                <h3 className="text-body-lg font-bold text-on-surface mb-2">Upload a thumbnail</h3>
                <p className="text-body-sm text-on-surface-variant mb-6">High resolution images work best. Max 5MB.</p>
                <span className="bg-primary text-on-primary px-6 py-2 rounded-full font-label-md shadow-sm pointer-events-none">
                  {loading ? 'Uploading...' : 'Select File'}
                </span>
              </>
            )}
            
            <input 
              type="file" 
              accept="image/*"
              onChange={handleFileChange}
              disabled={loading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 pt-4">
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
          onClick={onNext}
          disabled={loading || !formData.thumbnailUrl}
          className="px-8 py-3 rounded-[16px] bg-primary text-on-primary font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          Save & Next
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
