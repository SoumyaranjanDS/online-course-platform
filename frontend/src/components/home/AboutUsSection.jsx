import React from 'react';
import { Users, Globe2 } from 'lucide-react';

const AboutUsSection = () => {
  return (
    <section className="py-24 bg-surface" id="about">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 grid lg:grid-cols-2 gap-16 md:gap-20 items-center">
        
        <div className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Our Mission: Democratizing Expert Knowledge
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Skillwell Learning started with a simple belief: that high-quality education should be accessible to everyone, regardless of their location or background. We partner with top-tier professionals to bring you practical skills that actually matter in today's workforce.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-6 pt-4">
            
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h6 className="font-bold text-slate-900 mb-1">Community First</h6>
                <p className="text-sm text-slate-600 font-medium">Over 1,000 active student hubs worldwide.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#006c49]/10 flex items-center justify-center text-[#006c49] shrink-0">
                <Globe2 className="w-6 h-6" />
              </div>
              <div>
                <h6 className="font-bold text-slate-900 mb-1">Global Access</h6>
                <p className="text-sm text-slate-600 font-medium">Learn in over 15 languages across 190 countries.</p>
              </div>
            </div>
            
          </div>
        </div>
        
        <div className="relative">
          <div 
            className="aspect-video w-full rounded-[2rem] bg-cover bg-center shadow-2xl relative z-10 border border-outline-variant/20" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBBWOSIxgnFRMdNyEOC8NAjEoQC2DUjpzHMfR7jqTWQYaqbOG9mj8cglV5eI45694liuvJ-JSIQ4LeeSz4bsBAux3pBt-aSsCQlakOmg9bsoUmrizL_fGUwUJ5wlM7Z38h9eFVFNIdL8Dy92EzkQPA5IY1Xod9Hl83LFApc0dVbTOxuhlvrNLR7YBRMgx9LWIwtW_NPdx1BaMFJi145JqQF8guLNq0QvkI1hMYqS62tY8O14JmkeoKzSBefgvpB82rMduRxzDZK8Is')" }}
          ></div>
          <div className="absolute -bottom-6 -right-6 px-6 py-4 bg-[#ffddb8] text-[#2a1700] rounded-2xl shadow-xl z-20 animate-bounce-slow border border-white/40">
            <p className="font-bold text-sm tracking-tight">Top 10 Learning Platforms 2024</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUsSection;
