import React, { useState } from 'react';
import { courseService } from '../../services/courseService';

export default function Step3Learning({ courseId, formData, setFormData, onNext, onPrev }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [learningItem, setLearningItem] = useState('');
  const [requirementItem, setRequirementItem] = useState('');

  const handleAddItem = (field, value, setValue) => {
    if (!value.trim()) return;
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), value.trim()]
    }));
    setValue('');
  };

  const handleRemoveItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError('');
      await courseService.updateCourse(courseId, {
        whatYouWillLearn: formData.whatYouWillLearn,
        requirements: formData.requirements
      });
      onNext();
    } catch (err) {
      setError(err.message || 'Failed to save learning objectives');
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

      {/* What You Will Learn */}
      <div className="flex flex-col gap-6 border-b border-outline-variant/20 pb-8">
        <div>
          <h2 className="text-headline-sm font-headline-sm text-on-surface mb-2">What will students learn?</h2>
          <p className="text-body-sm font-body-sm text-on-surface-variant">List the key outcomes and skills students will gain from this course.</p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={learningItem}
              onChange={(e) => setLearningItem(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem('whatYouWillLearn', learningItem, setLearningItem))}
              className="flex-grow bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 text-body-md focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="e.g. Master advanced UI/UX principles"
            />
            <button 
              type="button"
              onClick={() => handleAddItem('whatYouWillLearn', learningItem, setLearningItem)}
              className="bg-primary-container text-on-primary-container px-6 rounded-xl font-bold hover:bg-primary hover:text-on-primary transition-colors"
            >
              Add
            </button>
          </div>

          <ul className="flex flex-col gap-2">
            {(formData.whatYouWillLearn || []).map((item, index) => (
              <li key={index} className="flex justify-between items-center bg-surface-container-low px-4 py-3 rounded-lg border border-outline-variant/50">
                <span className="text-body-md text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                  {item}
                </span>
                <button 
                  type="button" 
                  onClick={() => handleRemoveItem('whatYouWillLearn', index)}
                  className="text-on-surface-variant hover:text-error transition-colors p-1"
                >
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </li>
            ))}
            {(!formData.whatYouWillLearn || formData.whatYouWillLearn.length === 0) && (
              <li className="text-body-sm text-on-surface-variant italic text-center py-4 border border-dashed border-outline-variant rounded-lg">
                No learning objectives added yet.
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Requirements */}
      <div className="flex flex-col gap-6 border-b border-outline-variant/20 pb-8">
        <div>
          <h2 className="text-headline-sm font-headline-sm text-on-surface mb-2">Requirements</h2>
          <p className="text-body-sm font-body-sm text-on-surface-variant">List any prerequisite knowledge or tools needed to take this course.</p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={requirementItem}
              onChange={(e) => setRequirementItem(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem('requirements', requirementItem, setRequirementItem))}
              className="flex-grow bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 text-body-md focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="e.g. Basic understanding of HTML/CSS"
            />
            <button 
              type="button"
              onClick={() => handleAddItem('requirements', requirementItem, setRequirementItem)}
              className="bg-primary-container text-on-primary-container px-6 rounded-xl font-bold hover:bg-primary hover:text-on-primary transition-colors"
            >
              Add
            </button>
          </div>

          <ul className="flex flex-col gap-2">
            {(formData.requirements || []).map((item, index) => (
              <li key={index} className="flex justify-between items-center bg-surface-container-low px-4 py-3 rounded-lg border border-outline-variant/50">
                <span className="text-body-md text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-outline text-[20px]">info</span>
                  {item}
                </span>
                <button 
                  type="button" 
                  onClick={() => handleRemoveItem('requirements', index)}
                  className="text-on-surface-variant hover:text-error transition-colors p-1"
                >
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </li>
            ))}
          </ul>
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
          onClick={handleSave}
          disabled={loading}
          className="px-8 py-3 rounded-[16px] bg-primary text-on-primary font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Save & Next'}
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
