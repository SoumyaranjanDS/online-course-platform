import React from 'react';

const TrustAndStatsSection = () => {
  const trustedTeams = [
    { name: "Google", color: "text-blue-500" },
    { name: "Microsoft", color: "text-blue-600" },
    { name: "Amazon", color: "text-amber-500" },
    { name: "Netflix", color: "text-red-600" },
    { name: "Meta", color: "text-blue-500" },
    { name: "Apple", color: "text-slate-800" },
    { name: "Spotify", color: "text-green-500" },
    { name: "Stripe", color: "text-indigo-500" },
    { name: "Airbnb", color: "text-rose-500" },
    { name: "Uber", color: "text-slate-900" },
  ];

  const marqueeItems = [...trustedTeams, ...trustedTeams];

  return (
    <>
      <style>
        {`
          @keyframes marquee-scroll {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .custom-animate-marquee {
            animation: marquee-scroll 40s linear infinite;
          }
        `}
      </style>
      {/* Trust Bar */}
      <section className="py-12 bg-white border-y border-outline-variant/20 overflow-hidden">
        <p className="text-center text-sm font-bold text-outline uppercase tracking-widest mb-8">
          Trusted by teams at
        </p>

        <div className="relative flex overflow-hidden group w-full">
          {/* Left/Right fading gradients for smooth scrolling effect */}
          <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          {/* The infinite scrolling container */}
          <div className="flex whitespace-nowrap custom-animate-marquee group-hover:[animation-play-state:paused] min-w-max">
            {marqueeItems.map((team, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 mx-8 md:mx-12 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default"
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center font-bold text-xl shadow-sm border border-slate-100 ${team.color}`}
                >
                  {team.name.charAt(0)}
                </div>
                <span className="text-2xl font-bold text-slate-800 tracking-tight">
                  {team.name}
                </span>
              </div>
            ))}
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
