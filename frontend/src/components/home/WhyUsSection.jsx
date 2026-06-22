import React from 'react';
import { Award, Clock, Users } from 'lucide-react';

const WhyUsSection = () => {
  return (
    <section className="py-24 bg-white" id="why-us">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            Why choose Skillwell?
          </h2>
          <p className="text-lg text-slate-600">
            We prioritize your learning experience with tailored content and expert support.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          
          {/* Feature 1 */}
          <div className="space-y-6">
            <div className="w-20 h-20 bg-[#6cf8bb]/20 rounded-3xl flex items-center justify-center text-[#006c49]">
              <Users className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">Expert Instruction</h4>
            <p className="text-base text-slate-600 leading-relaxed">
              Learn from professionals with years of real-world experience in their respective fields.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="space-y-6">
            <div className="w-20 h-20 bg-[#d8e2ff]/40 rounded-3xl flex items-center justify-center text-primary">
              <Clock className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">Lifetime Access</h4>
            <p className="text-base text-slate-600 leading-relaxed">
              Purchase once and access your course materials anytime, anywhere, on any device.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="space-y-6">
            <div className="w-20 h-20 bg-[#ffddb8]/40 rounded-3xl flex items-center justify-center text-[#825100]">
              <Award className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">Verified Certificates</h4>
            <p className="text-base text-slate-600 leading-relaxed">
              Boost your resume with industry-recognized certificates upon course completion.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
