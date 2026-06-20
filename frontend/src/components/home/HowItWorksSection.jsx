import React from 'react';

const HowItWorksSection = () => {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        
        <h2 className="text-center text-3xl md:text-4xl font-bold text-slate-900 mb-20 tracking-tight">
          Start your journey today
        </h2>
        
        <div className="grid md:grid-cols-3 gap-12 relative">
          
          {/* Connector Line (Hidden on mobile) */}
          <div className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-0.5 bg-outline-variant/30 z-0"></div>

          {/* Step 1 */}
          <div className="text-center space-y-6 relative z-10">
            <div className="w-16 h-16 bg-primary text-white font-bold text-xl rounded-full flex items-center justify-center mx-auto shadow-[0_12px_24px_rgba(7,92,232,0.3)]">
              01
            </div>
            <h4 className="text-xl font-bold text-slate-900">Browse Courses</h4>
            <p className="text-base text-slate-600 leading-relaxed px-4">
              Choose from thousands of high-quality courses across hundreds of categories.
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="text-center space-y-6 relative z-10">
            <div className="w-16 h-16 bg-primary text-white font-bold text-xl rounded-full flex items-center justify-center mx-auto shadow-[0_12px_24px_rgba(7,92,232,0.3)]">
              02
            </div>
            <h4 className="text-xl font-bold text-slate-900">Learn Anywhere</h4>
            <p className="text-base text-slate-600 leading-relaxed px-4">
              Engage with video lessons, practical assignments, and interactive community forums.
            </p>
          </div>
          
          {/* Step 3 */}
          <div className="text-center space-y-6 relative z-10">
            <div className="w-16 h-16 bg-primary text-white font-bold text-xl rounded-full flex items-center justify-center mx-auto shadow-[0_12px_24px_rgba(7,92,232,0.3)]">
              03
            </div>
            <h4 className="text-xl font-bold text-slate-900">Earn Certificate</h4>
            <p className="text-base text-slate-600 leading-relaxed px-4">
              Complete your course and receive a shareable certificate to showcase your expertise.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
