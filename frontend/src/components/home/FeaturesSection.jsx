import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 space-y-32">
        
        {/* Row 1 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative">
            <div className="bg-primary/5 absolute inset-0 rounded-[2rem] -rotate-3 scale-105 -z-10"></div>
            <div 
              className="aspect-square rounded-[2rem] bg-cover bg-center shadow-xl border border-outline-variant/30" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDak1hv93MoVCY8ldycoWXMcEIJFH1ClWORgeR0onlnV1ugIc7fyxdhVApHh-nsoqn7p9Jy9TXQcruOfGcywLfJSiCg3ah5852wIGGaR3MzFCZfpU1D9D6jdCwmvd_pLsr2oQTcJdl1ymqurt8k77-wAiEfBjg_5Zt62AFNDt2pzAl9b2T8h682r2vm6YWzMOkzFkNo_bG7oBc-tCg9oxaVoo3C9VFIBsyk0Bf5L5rfZKnQUMqfuRD57zD0J5_lUDz2jq9GPQ6FnCM')" }}
            ></div>
          </div>
          <div className="order-1 md:order-2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Personalized Dashboard</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Track your progress, manage assignments, and stay organized with our intuitive student portal. Everything you need is just a click away.
            </p>
            <ul className="space-y-4 pt-2">
              <li className="flex items-center gap-3 text-base font-medium text-slate-800">
                <CheckCircle2 className="w-6 h-6 text-[#006c49]" /> Detailed progress metrics
              </li>
              <li className="flex items-center gap-3 text-base font-medium text-slate-800">
                <CheckCircle2 className="w-6 h-6 text-[#006c49]" /> Recommended reading lists
              </li>
              <li className="flex items-center gap-3 text-base font-medium text-slate-800">
                <CheckCircle2 className="w-6 h-6 text-[#006c49]" /> One-click course resuming
              </li>
            </ul>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Interactive Quizzes</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Reinforce your knowledge with real-time feedback. Our dynamic quizzes adapt to your learning pace to ensure mastery of every topic.
            </p>
            <ul className="space-y-4 pt-2">
              <li className="flex items-center gap-3 text-base font-medium text-slate-800">
                <CheckCircle2 className="w-6 h-6 text-[#006c49]" /> Instant performance analysis
              </li>
              <li className="flex items-center gap-3 text-base font-medium text-slate-800">
                <CheckCircle2 className="w-6 h-6 text-[#006c49]" /> Peer comparisons
              </li>
              <li className="flex items-center gap-3 text-base font-medium text-slate-800">
                <CheckCircle2 className="w-6 h-6 text-[#006c49]" /> Gamified reward points
              </li>
            </ul>
          </div>
          <div className="relative">
            <div className="bg-[#006c49]/5 absolute inset-0 rounded-[2rem] rotate-3 scale-105 -z-10"></div>
            <div 
              className="aspect-square rounded-[2rem] bg-cover bg-center shadow-xl border border-outline-variant/30" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAeNIKt4rN5_As8qLREE1PStZnKdHfJD5YTle-xgh-mn74d3XFRI1Dlr3DgT_2Yu_yDlke-SWiAPI3hl4TBdZQ2OExn8FAfCac2ULz4xg4z2wBieWRgs1e9ZmgVZ15dLqmCXDte9l7N3PIGC9tLBiCahkZvlmqsjOxCAvkAsmCQfCNjlzeI-ZmPoSoFH-SiYNxS27Pc9pCcaVrKu1qBjkmSvnOLtNqS578Wd7RGuti8HyeLdDP_GIW1Ibc65vP-H74rUK3wSQzHrEc')" }}
            ></div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default FeaturesSection;
