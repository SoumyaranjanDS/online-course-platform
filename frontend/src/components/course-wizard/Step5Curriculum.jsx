import React, { useState } from 'react';
import { courseService } from '../../services/courseService';

export default function Step5Curriculum({ courseId, formData, setFormData, onNext, onPrev }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [modules, setModules] = useState(formData.modules || []);
  const [uploadingLessonIdx, setUploadingLessonIdx] = useState(null);

  const handleAddModule = () => {
    setModules([
      ...modules, 
      { title: '', order: modules.length + 1, lessons: [] }
    ]);
  };

  const handleUpdateModule = (mIdx, field, value) => {
    const updated = [...modules];
    updated[mIdx][field] = value;
    setModules(updated);
  };

  const handleRemoveModule = (mIdx) => {
    const updated = modules.filter((_, idx) => idx !== mIdx);
    setModules(updated);
  };

  const handleAddLesson = (mIdx) => {
    const updated = [...modules];
    updated[mIdx].lessons.push({
      title: '',
      description: '',
      videoUrl: '',
      order: updated[mIdx].lessons.length + 1,
      isFreePreview: false
    });
    setModules(updated);
  };

  const handleUpdateLesson = (mIdx, lIdx, field, value) => {
    const updated = [...modules];
    updated[mIdx].lessons[lIdx][field] = value;
    setModules(updated);
  };

  const handleRemoveLesson = (mIdx, lIdx) => {
    const updated = [...modules];
    updated[mIdx].lessons = updated[mIdx].lessons.filter((_, idx) => idx !== lIdx);
    setModules(updated);
  };

  const handleVideoUpload = async (e, mIdx, lIdx) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingLessonIdx(`${mIdx}-${lIdx}`);
      setError('');
      
      const response = await courseService.uploadVideo(file);
      
      const updated = [...modules];
      updated[mIdx].lessons[lIdx].videoUrl = response.data.videoUrl;
      updated[mIdx].lessons[lIdx].videoPublicId = response.data.videoPublicId;
      setModules(updated);
    } catch (err) {
      setError(err.message || 'Failed to upload video');
    } finally {
      setUploadingLessonIdx(null);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Clean up empty modules/lessons before saving
      const cleanedModules = modules.map(m => ({
        ...m,
        lessons: m.lessons.filter(l => l.title.trim() !== '')
      })).filter(m => m.title.trim() !== '');

      const response = await courseService.updateCourse(courseId, { modules: cleanedModules });
      setFormData(prev => ({ ...prev, modules: response.data.modules }));
      onNext();
    } catch (err) {
      setError(err.message || 'Failed to save curriculum');
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

      <div className="flex flex-col gap-6 border-b border-outline-variant/20 pb-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-headline-sm font-headline-sm text-on-surface mb-2">Curriculum</h2>
            <p className="text-body-sm font-body-sm text-on-surface-variant">Structure your course into modules and add lessons.</p>
          </div>
          <button 
            type="button"
            onClick={handleAddModule}
            className="flex items-center gap-2 px-4 py-2 bg-secondary-container text-on-secondary-container rounded-lg font-bold hover:bg-[#5ce8ab] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            Add Module
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {modules.map((module, mIdx) => (
            <div key={mIdx} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm">
              {/* Module Header */}
              <div className="flex items-center gap-4 mb-4">
                <span className="font-bold text-on-surface-variant">Module {mIdx + 1}:</span>
                <input 
                  type="text" 
                  value={module.title}
                  onChange={(e) => handleUpdateModule(mIdx, 'title', e.target.value)}
                  placeholder="e.g. Introduction"
                  className="flex-grow bg-surface border-b-2 border-outline-variant px-2 py-1 focus:border-primary focus:outline-none transition-colors"
                />
                <button 
                  type="button" 
                  onClick={() => handleRemoveModule(mIdx)}
                  className="p-2 text-on-surface-variant hover:text-error transition-colors"
                  title="Remove Module"
                >
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </div>

              {/* Lessons List */}
              <div className="pl-8 flex flex-col gap-4">
                {module.lessons.map((lesson, lIdx) => (
                  <div key={lIdx} className="bg-surface-container-low border border-outline-variant/50 rounded-lg p-4 relative group">
                    <button 
                      type="button" 
                      onClick={() => handleRemoveLesson(mIdx, lIdx)}
                      className="absolute top-2 right-2 p-1 text-on-surface-variant opacity-0 group-hover:opacity-100 hover:text-error transition-all"
                    >
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>

                    <div className="flex flex-col gap-3">
                      <input 
                        type="text" 
                        value={lesson.title}
                        onChange={(e) => handleUpdateLesson(mIdx, lIdx, 'title', e.target.value)}
                        placeholder="Lesson Title"
                        className="font-bold bg-transparent border-b border-outline-variant/50 px-1 py-1 focus:border-primary focus:outline-none w-[90%]"
                      />
                      
                      <div className="flex items-center gap-4 mt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="checkbox"
                            checked={lesson.isFreePreview}
                            onChange={(e) => handleUpdateLesson(mIdx, lIdx, 'isFreePreview', e.target.checked)}
                            className="rounded text-primary focus:ring-primary border-outline-variant"
                          />
                          <span className="text-body-sm text-on-surface-variant">Free Preview</span>
                        </label>
                      </div>

                      {/* Video Upload Area */}
                      <div className="mt-2">
                        {lesson.videoUrl ? (
                          <div className="flex items-center gap-2 bg-secondary-container/20 text-secondary border border-secondary-container px-3 py-2 rounded-lg">
                            <span className="material-symbols-outlined">play_circle</span>
                            <span className="text-body-sm font-bold flex-grow truncate">Video Uploaded</span>
                            <label className="cursor-pointer text-body-sm underline hover:text-primary transition-colors">
                              Change
                              <input 
                                type="file" 
                                accept="video/*" 
                                className="hidden" 
                                onChange={(e) => handleVideoUpload(e, mIdx, lIdx)}
                              />
                            </label>
                          </div>
                        ) : (
                          <div className="relative">
                            {uploadingLessonIdx === `${mIdx}-${lIdx}` ? (
                              <div className="flex items-center justify-center gap-2 bg-surface-container border border-outline-variant border-dashed px-3 py-4 rounded-lg text-primary">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                                <span className="text-body-sm font-bold">Uploading...</span>
                              </div>
                            ) : (
                              <label className="flex items-center justify-center gap-2 bg-surface border border-outline-variant border-dashed px-3 py-4 rounded-lg cursor-pointer hover:bg-surface-container-low transition-colors text-on-surface-variant group-hover:border-primary/50">
                                <span className="material-symbols-outlined">upload_file</span>
                                <span className="text-body-sm font-bold">Upload Video</span>
                                <input 
                                  type="file" 
                                  accept="video/*" 
                                  className="hidden" 
                                  onChange={(e) => handleVideoUpload(e, mIdx, lIdx)}
                                />
                              </label>
                            )}
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                ))}

                <button 
                  type="button"
                  onClick={() => handleAddLesson(mIdx)}
                  className="flex items-center gap-2 self-start px-3 py-1.5 text-primary text-label-md font-bold hover:bg-primary/10 rounded-lg transition-colors mt-2"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  Add Lesson
                </button>
              </div>
            </div>
          ))}

          {modules.length === 0 && (
            <div className="text-center py-12 bg-surface-container-lowest rounded-xl border border-dashed border-outline-variant">
              <span className="material-symbols-outlined text-[48px] text-outline mb-4">view_list</span>
              <h3 className="font-bold text-on-surface">No modules yet</h3>
              <p className="text-on-surface-variant text-body-sm">Click 'Add Module' to start building your curriculum.</p>
            </div>
          )}
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
          disabled={loading || uploadingLessonIdx !== null}
          className="px-8 py-3 rounded-[16px] bg-primary text-on-primary font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Save & Next'}
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
