import React from 'react';
import { Star } from 'lucide-react';

const TestimonialCard = ({ quote, name, role, img }) => (
  <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-outline-variant/20 hover-float flex flex-col h-full">
    <div className="flex gap-1 text-yellow-400 mb-6">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className="w-5 h-5 fill-current" />
      ))}
    </div>
    <p className="text-base text-slate-700 mb-8 italic flex-grow">"{quote}"</p>
    <div className="flex items-center gap-4 mt-auto">
      <div 
        className="w-12 h-12 rounded-full bg-cover bg-center ring-2 ring-primary/10" 
        style={{ backgroundImage: `url('${img}')` }}
      ></div>
      <div>
        <h6 className="font-bold text-slate-900 text-sm">{name}</h6>
        <p className="text-xs text-slate-500 font-medium">{role}</p>
      </div>
    </div>
  </div>
);

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "The courses are exceptionally well-structured. I went from knowing zero coding to landing a junior dev role in 6 months.",
      name: "Sarah Jenkins",
      role: "Web Developer",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDiVUCKl99keqjOgEIYF4aZRfIfdd2fSdlmwQs_vI4wu13g2OjQYD8g2fUO8SC2EkMtd64-M4A5ZsXOn7IZm4cso8NZcjzADQ7kS_sIXq1GkYKMcOmtJNBK_LY9n9efgSxFfX3oQcnGwy0dsKpVkJO6r6Gx_NtDyUGgjZglJLZUO2IayJ8VIQK-7vwXUgc8EjxRnu1GM59P_txeWFWRvGoiZ5rEc6mB1pn6jH_V73vXeBuVKcljdeArjkZBFKTCdMLuPzEV9ly_5o"
    },
    {
      quote: "The flexibility of Skillwell is unmatched. I can study late at night or during my commute without any friction.",
      name: "David Chen",
      role: "Marketing Manager",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4W2G8SeHJZhZtA_9GRSMWTz-m9nxKfVlU9lRE0OU7mK1mI9G17FqKLWzrQ_GnTC2UiJQ1r-SsGXRgEr2DtaeEIo1_k-BdlGiT5Tvl_iOeZ8t88jVxzZ8fp9Tdd4xztfb65MLvLVQbO-WDJhNlkXz584_I6flxnYZgdxrHvCIsB_IGBoPGGXPzwAYLQuSs_S-rmox9tj-sEMoDg9-xkjA5istZBeRzndcCMVgsBlEdy8U9wMvp9vw_k40VdF3DX4MSM7Xeb7FaCqI"
    },
    {
      quote: "Mentorship support was the game changer for me. Having real people answer my questions made complex topics easy.",
      name: "Marco Rossi",
      role: "Data Analyst",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXm99s1HcSvSp9Dl_9XZZnPdjR39VNa2R61z3dJbFpucFBohjssfxHT5mIxXmN_qREu81Xduu1vjQp_PsRlmZ4y5CCFf0oBx_-CAbwqEkf0BBOBUQ_HBjY2irNLln4FgIItdXmJneFxIYscKtEgGO-88R39hZMIOwfuozJsUbq_RrlmOWZpunEvTAadihpnlhNywM45beb1R5xIQXAI3wK_R1uDSrLwAExT7-O6YYAg2WhRjUtPlhR38a--cmNJOsTjELO9q-7Xz4"
    }
  ];

  return (
    <section className="py-24 bg-[#eff4ff]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        
        <h2 className="text-center text-3xl md:text-4xl font-bold text-slate-900 mb-16 tracking-tight">
          What our students say
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
