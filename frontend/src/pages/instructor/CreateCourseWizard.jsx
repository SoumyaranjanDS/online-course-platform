import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { courseService } from '../../services/courseService';
import toast from 'react-hot-toast';

import Step1BasicInfo from '../../components/course-wizard/Step1BasicInfo';
import Step2Media from '../../components/course-wizard/Step2Media';
import Step3Learning from '../../components/course-wizard/Step3Learning';
import Step4Pricing from '../../components/course-wizard/Step4Pricing';
import Step5Curriculum from '../../components/course-wizard/Step5Curriculum';
import Step6Review from '../../components/course-wizard/Step6Review';

const STEPS = [
  { id: 1, label: 'Basic Info' },
  { id: 2, label: 'Media' },
  { id: 3, label: 'Learning' },
  { id: 4, label: 'Pricing' },
  { id: 5, label: 'Curriculum' },
  { id: 6, label: 'Review' },
];

export default function CreateCourseWizard() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    category: '',
    level: '',
    language: 'english',
    price: 0,
    whatYouWillLearn: [],
    requirements: [],
    modules: [],
    thumbnailUrl: ''
  });

  useEffect(() => {
    if (id) {
      // Edit mode: fetch existing course
      const fetchCourse = async () => {
        try {
          setLoading(true);
          const response = await courseService.getCourseById(id);
          setFormData(response.data);
        } catch (err) {
          toast.error(err.message || 'Failed to fetch course details');
        } finally {
          setLoading(false);
        }
      };
      fetchCourse();
    }
  }, [id]);

  const handleNextStep = async () => {
    // If Step 1, we either create a new draft or update existing
    if (currentStep === 1) {
      try {
        setLoading(true);
        if (id) {
          // Update
          await courseService.updateCourse(id, {
            title: formData.title,
            subtitle: formData.subtitle,
            description: formData.description,
            category: formData.category,
            level: formData.level,
            language: formData.language,
          });
          setCurrentStep(2);
        } else {
          // Create Draft
          const response = await courseService.createCourse({
            title: formData.title,
            subtitle: formData.subtitle,
            description: formData.description,
            category: formData.category,
            level: formData.level,
            language: formData.language,
          });
          // Redirect to edit mode on step 2
          navigate(`/instructor/course/edit/${response.data._id}`);
          setCurrentStep(2);
        }
      } catch (err) {
        toast.error(err.message || 'Failed to save basic info');
      } finally {
        setLoading(false);
      }
    } else {
      // Just move to next step
      setCurrentStep(prev => Math.min(prev + 1, 6));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return <Step1BasicInfo formData={formData} setFormData={setFormData} onNext={handleNextStep} loading={loading} />;
      case 2:
        return <Step2Media courseId={id} formData={formData} setFormData={setFormData} onNext={handleNextStep} onPrev={handlePrevStep} />;
      case 3:
        return <Step3Learning courseId={id} formData={formData} setFormData={setFormData} onNext={handleNextStep} onPrev={handlePrevStep} />;
      case 4:
        return <Step4Pricing courseId={id} formData={formData} setFormData={setFormData} onNext={handleNextStep} onPrev={handlePrevStep} />;
      case 5:
        return <Step5Curriculum courseId={id} formData={formData} setFormData={setFormData} onNext={handleNextStep} onPrev={handlePrevStep} />;
      case 6:
        return <Step6Review courseId={id} formData={formData} onPrev={handlePrevStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col">
      {/* TopNavBar Simplified */}
      <header className="bg-surface dark:bg-surface-container shadow-sm h-20 w-full flex items-center px-gutter">
        <Link to="/instructor/dashboard" className="text-primary font-bold flex items-center gap-2 text-headline-sm">
          <img src="/logo.png" alt="Skillwell" className="h-10 w-auto object-contain" />
          Skillwell
        </Link>
      </header>

      <main className="flex-grow flex flex-col items-center py-lg px-gutter max-w-container-max mx-auto w-full">
        {/* Header & Stepper */}
        <div className="w-full max-w-4xl mb-12">
          <h1 className="text-display-lg-mobile md:text-display-lg font-bold text-on-background mb-4">
            {id ? 'Edit Course' : 'Create New Course'}
          </h1>
          <p className="text-body-lg text-on-surface-variant mb-8">
            Complete the steps below to build your course and publish it to students.
          </p>

          {/* Stepper */}
          <div className="relative w-full">
            <div className="absolute top-1/2 left-0 w-full h-2 bg-surface-container-highest rounded-full -translate-y-1/2 z-0 hidden sm:block"></div>
            
            <div 
              className="absolute top-1/2 left-0 h-2 bg-secondary rounded-full -translate-y-1/2 z-0 hidden sm:block transition-all duration-500"
              style={{ width: `${((currentStep - 1) / 5) * 100}%` }}
            ></div>

            <div className="flex justify-between relative z-10 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 gap-4 sm:gap-0">
              {STEPS.map((step, idx) => {
                const isActive = step.id === currentStep;
                const isCompleted = step.id < currentStep;

                return (
                  <div key={step.id} className={`flex flex-col items-center min-w-[80px] ${!isActive && !isCompleted ? 'opacity-50' : ''}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ring-4 ring-background transition-colors
                      ${isActive ? 'bg-secondary text-on-secondary' : 
                        isCompleted ? 'bg-secondary text-on-secondary' : 
                        'bg-surface-container-highest text-on-surface-variant'}`}
                    >
                      {isCompleted ? <span className="material-symbols-outlined text-[20px]">check</span> : step.id}
                    </div>
                    <span className={`text-label-caps font-label-caps whitespace-nowrap ${isActive || isCompleted ? 'text-secondary' : 'text-on-surface-variant'}`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="w-full max-w-4xl bg-surface-container-lowest rounded-[24px] border border-outline-variant/30 shadow-sm p-6 md:p-10 relative overflow-hidden">
          {/* Decorative gradient orb */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

          {renderStepContent()}

        </div>
      </main>
    </div>
  );
}