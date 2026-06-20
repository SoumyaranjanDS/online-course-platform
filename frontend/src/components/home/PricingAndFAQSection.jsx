import React, { useState } from 'react';
import { Check, X, ChevronDown } from 'lucide-react';

const PricingCard = ({ title, price, features, isPopular, buttonText, primaryColor }) => (
  <div className={`p-10 rounded-[2rem] flex flex-col h-full hover-float ${
    isPopular 
      ? 'border-2 border-primary bg-primary/5 scale-105 shadow-[0_20px_40px_-15px_rgba(0,88,190,0.2)] relative z-10' 
      : 'border border-outline-variant/50 bg-white shadow-sm'
  }`}>
    {isPopular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#825100] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-md whitespace-nowrap">
        Most Popular
      </div>
    )}
    
    <h5 className="text-xl font-bold text-slate-900 mb-2">{title}</h5>
    
    <div className="flex items-baseline gap-1 mb-8">
      <span className="text-4xl font-extrabold text-slate-900">${price}</span>
      <span className="text-slate-500 font-medium">/month</span>
    </div>
    
    <ul className="space-y-4 mb-10 flex-grow">
      {features.map((feature, i) => (
        <li key={i} className={`flex items-center gap-3 font-medium ${feature.included ? 'text-slate-800' : 'text-slate-400'}`}>
          {feature.included 
            ? <Check className="w-5 h-5 text-[#006c49]" /> 
            : <X className="w-5 h-5 text-slate-300" />
          }
          {feature.text}
        </li>
      ))}
    </ul>
    
    <button className={`w-full py-4 font-bold rounded-2xl transition-all ${
      isPopular
        ? 'bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary-container hover:text-white'
        : 'border-2 border-primary text-primary hover:bg-primary/5'
    }`}>
      {buttonText}
    </button>
  </div>
);

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white rounded-[1.5rem] shadow-sm border border-outline-variant/20 overflow-hidden transition-all duration-300">
      <button 
        className="w-full flex justify-between items-center p-6 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-[17px] font-bold text-slate-900 pr-8">{question}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div 
        className={`px-6 text-base text-slate-600 transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {answer}
      </div>
    </div>
  );
};

const PricingAndFAQSection = () => {
  const faqs = [
    { q: "Are the courses self-paced?", a: "Yes, all courses on Luminous are 100% self-paced. You can start, pause, and resume your learning at any time that fits your schedule." },
    { q: "Do I receive a certificate?", a: "Every Pro and Enterprise learner receives a digitally verifiable certificate upon successful completion of a course and its final assessment." },
    { q: "Can I get a refund if I'm not satisfied?", a: "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied with the learning experience, just let us know." },
    { q: "Are there group discounts?", a: "Yes, our Enterprise plan is designed for teams. For groups larger than 20, please contact our sales team for custom pricing." },
    { q: "What kind of hardware do I need?", a: "As long as you have a modern web browser and a stable internet connection, you can access Luminous from any desktop, tablet, or smartphone." }
  ];

  return (
    <>
      {/* Pricing */}
      <section className="py-24 bg-white" id="pricing">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Simple, Transparent Pricing</h2>
            <p className="text-lg text-slate-600">Select the plan that fits your learning pace.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-[1000px] mx-auto items-center">
            <PricingCard 
              title="Basic" price="0" buttonText="Get Started"
              features={[
                { text: "5 Free Courses", included: true },
                { text: "Community Forum", included: true },
                { text: "PDF Materials", included: false },
                { text: "Certificates", included: false }
              ]}
            />
            <PricingCard 
              title="Pro" price="29" buttonText="Start Trial" isPopular={true}
              features={[
                { text: "Unlimited Access", included: true },
                { text: "Verified Certificates", included: true },
                { text: "1-on-1 Mentorship", included: true },
                { text: "Offline Access", included: true }
              ]}
            />
            <PricingCard 
              title="Enterprise" price="99" buttonText="Contact Sales"
              features={[
                { text: "For Teams (up to 20)", included: true },
                { text: "Custom Learning Paths", included: true },
                { text: "Admin Dashboard", included: true },
                { text: "Dedicated Support", included: true }
              ]}
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-surface" id="faq">
        <div className="max-w-[800px] mx-auto px-6 md:px-8">
          <h2 className="text-center text-3xl md:text-4xl font-bold text-slate-900 mb-16 tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PricingAndFAQSection;
