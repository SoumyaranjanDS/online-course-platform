import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-24 px-6 md:px-8 bg-surface">
      <div className="max-w-[1280px] mx-auto bg-primary rounded-[2.5rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-primary/20">
        
        <div className="absolute inset-0 bg-gradient-to-br from-[#0058be] via-[#0058be] to-[#006c49] opacity-90"></div>
        
        <div className="relative z-10 space-y-8 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.1]">
            Ready to start learning?
          </h2>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium">
            Join over 50,000 learners today and take the first step towards mastering your new skill.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link 
              to="/signup" 
              className="px-10 py-4 bg-white text-primary font-bold rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all text-[17px]"
            >
              Join Now for Free
            </Link>
            <Link 
              to="/contact" 
              className="px-10 py-4 border-[2.5px] border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 hover:border-white/50 active:scale-95 transition-all text-[17px]"
            >
              View Enterprise
            </Link>
          </div>
        </div>
        
        {/* Decorative blobs */}
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-white/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -right-12 w-96 h-96 bg-[#6ffbbe]/20 rounded-full blur-3xl pointer-events-none"></div>
      </div>
    </section>
  );
};

export default CTASection;
