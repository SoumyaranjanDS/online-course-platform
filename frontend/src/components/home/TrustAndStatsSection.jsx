import React from 'react';

const TrustAndStatsSection = () => {
  return (
    <>
      {/* Trust Bar */}
      <section className="py-12 bg-white border-y border-outline-variant/20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8">
          <p className="text-center text-sm font-bold text-outline uppercase tracking-widest mb-8">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="font-bold text-2xl tracking-tighter text-slate-800">TECHGLOW</span>
            <span className="font-bold text-2xl tracking-tighter text-slate-800">VORTEX</span>
            <span className="font-bold text-2xl tracking-tighter text-slate-800">SPHERE.IO</span>
            <span className="font-bold text-2xl tracking-tighter text-slate-800">LUMINA</span>
            <span className="font-bold text-2xl tracking-tighter text-slate-800">NEXUS</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-surface">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          
          <div className="bg-[#d8e2ff]/40 p-8 rounded-[2rem] text-center hover-float border border-white/60">
            <h3 className="text-4xl md:text-5xl font-bold text-primary mb-3">12k+</h3>
            <p className="text-base text-on-surface-variant font-medium">Online Courses</p>
          </div>
          
          <div className="bg-[#6cf8bb]/20 p-8 rounded-[2rem] text-center hover-float border border-white/60">
            <h3 className="text-4xl md:text-5xl font-bold text-[#006c49] mb-3">50k+</h3>
            <p className="text-base text-on-surface-variant font-medium">Active Students</p>
          </div>
          
          <div className="bg-[#ffddb8]/30 p-8 rounded-[2rem] text-center hover-float border border-white/60">
            <h3 className="text-4xl md:text-5xl font-bold text-[#825100] mb-3">4.9/5</h3>
            <p className="text-base text-on-surface-variant font-medium">Student Rating</p>
          </div>
          
          <div className="bg-white p-8 rounded-[2rem] text-center hover-float border border-outline-variant/30 shadow-sm">
            <h3 className="text-4xl md:text-5xl font-bold text-on-surface mb-3">200+</h3>
            <p className="text-base text-on-surface-variant font-medium">Expert Mentors</p>
          </div>

        </div>
      </section>
    </>
  );
};

export default TrustAndStatsSection;
