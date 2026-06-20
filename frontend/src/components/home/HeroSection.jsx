import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden bg-surface">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <div className="space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-fixed text-on-primary-fixed-variant rounded-full text-sm font-semibold shadow-sm border border-primary/10">
            <span>🎓</span> Trusted by 50,000+ learners
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-[48px] font-bold text-on-surface leading-[1.15] tracking-tight">
            Learn skills that <span className="text-primary">move you forward</span>
          </h1>
          
          <p className="text-lg text-on-surface-variant leading-relaxed">
            Unlock your potential with professional-grade courses designed by industry experts. Flexible learning that fits your lifestyle.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-2">
            <Link 
              to="/signup" 
              className="px-8 py-4 bg-primary text-white font-semibold rounded-2xl shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Start Learning
            </Link>
            <Link 
              to="/courses" 
              className="px-8 py-4 border-2 border-outline-variant text-on-surface font-semibold rounded-2xl hover:bg-surface-container transition-colors active:scale-[0.98]"
            >
              Browse Courses
            </Link>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="relative z-10 lg:pl-10">
          {/* Floating Mockup Decoration */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#6cf8bb]/40 rounded-full blur-3xl -z-10"></div>
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#ffddb8]/40 rounded-full blur-3xl -z-10"></div>
          
          <div className="relative bg-white p-6 rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] border border-outline-variant/30 hover-float">
            
            <div 
              className="aspect-video w-full rounded-[1.25rem] bg-cover bg-center mb-6 overflow-hidden relative" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB7OgqWyhjOaOiGVoDkwuBZSUWueMVq2oZdBbgJN9Qqw3aCr7cA2w_WEonBuW3qZyyimrgR8j8ShdSyLydz7yIZQJZ2kHI3ME1yLJR4cAoGkrBmMXLin-9rfGfzdmWnlVh1REZSVydc2P1UkZEBHUJK09jyeiqTL0idzXSLhqcp1KNj-tQAVhcQtWEQ0SS7uH1PZHZnCLPjZ92QsQU9FnU5Fe503B2i8YsC7Hp5qa-ftWDWsCkxjggdjDVHJVjmzpH9rVV1cdnnTaU')" }}
            >
              <div className="absolute inset-0 bg-black/10 flex items-center justify-center group cursor-pointer hover:bg-black/20 transition-colors">
                <PlayCircle className="text-white w-16 h-16 opacity-90 group-hover:scale-110 transition-transform drop-shadow-md" />
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-bold text-on-surface text-lg">UI/UX Masterclass</h4>
                <p className="text-sm text-on-surface-variant font-medium">Module 4: Advanced Prototyping</p>
              </div>
              <div className="w-12 h-12 rounded-full border-[3px] border-[#006c49]/20 flex items-center justify-center relative">
                <svg className="absolute w-12 h-12 -rotate-90">
                  <circle className="text-[#006c49]" cx="24" cy="24" fill="none" r="20" stroke="currentColor" strokeDasharray="125" strokeDashoffset="31" strokeWidth="4"></circle>
                </svg>
                <span className="text-[10px] font-bold text-slate-800">75%</span>
              </div>
            </div>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#6cf8bb]/30 text-[#005236] rounded-lg text-[13px] font-bold border border-[#6cf8bb]/50">
              <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span> 
              Completed
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
