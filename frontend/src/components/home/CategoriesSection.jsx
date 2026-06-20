import React from 'react';
import { ArrowRight, Palette, Code2, TrendingUp, Camera, Music, Globe, Brain, Shield } from 'lucide-react';

const CategoriesSection = () => {
  const categories = [
    { icon: <Palette className="w-10 h-10 mb-4 mx-auto" />, name: 'Design', count: '120+ Courses', colorClass: 'text-[#006c49] bg-[#6cf8bb]/20' },
    { icon: <Code2 className="w-10 h-10 mb-4 mx-auto" />, name: 'Development', count: '340+ Courses', colorClass: 'text-[#0058be] bg-[#d8e2ff]/40' },
    { icon: <TrendingUp className="w-10 h-10 mb-4 mx-auto" />, name: 'Business', count: '210+ Courses', colorClass: 'text-[#825100] bg-[#ffddb8]/40' },
    { icon: <Camera className="w-10 h-10 mb-4 mx-auto" />, name: 'Photography', count: '85+ Courses', colorClass: 'text-[#ba1a1a] bg-[#ffdad6]/40' },
    { icon: <Music className="w-10 h-10 mb-4 mx-auto" />, name: 'Music', count: '150+ Courses', colorClass: 'text-slate-600 bg-slate-100' },
    { icon: <Globe className="w-10 h-10 mb-4 mx-auto" />, name: 'Marketing', count: '92+ Courses', colorClass: 'text-[#006c49] bg-[#6cf8bb]/20' },
    { icon: <Brain className="w-10 h-10 mb-4 mx-auto" />, name: 'Lifestyle', count: '115+ Courses', colorClass: 'text-[#0058be] bg-[#d8e2ff]/40' },
    { icon: <Shield className="w-10 h-10 mb-4 mx-auto" />, name: 'Health', count: '64+ Courses', colorClass: 'text-[#825100] bg-[#ffddb8]/40' },
  ];

  return (
    <section className="py-24 bg-white" id="courses">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight">Explore Categories</h2>
            <p className="text-lg text-slate-600">Find the right path for your career goals.</p>
          </div>
          <button className="text-primary font-bold flex items-center gap-2 hover:underline group">
            View All <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className={`p-8 rounded-[2rem] text-center hover-float cursor-pointer border border-transparent hover:border-black/5 transition-all ${category.colorClass}`}
            >
              {category.icon}
              <h5 className="text-xl font-bold text-slate-900 mb-1">{category.name}</h5>
              <p className="text-sm text-slate-600 font-medium">{category.count}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CategoriesSection;
