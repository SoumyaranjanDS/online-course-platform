import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/home/HeroSection';
import TrustAndStatsSection from '../components/home/TrustAndStatsSection';
import WhyUsSection from '../components/home/WhyUsSection';
import FeaturesSection from '../components/home/FeaturesSection';
import CategoriesSection from '../components/home/CategoriesSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import AboutUsSection from '../components/home/AboutUsSection';
import PricingAndFAQSection from '../components/home/PricingAndFAQSection';
import CTASection from '../components/home/CTASection';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function Home() {
  useDocumentTitle('Home');
  return (
    <div className="bg-surface text-on-surface font-body-md antialiased min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container">
      <Navbar />

      <main className="flex-grow">
        <HeroSection />
        <TrustAndStatsSection />
        <WhyUsSection />
        <FeaturesSection />
        <CategoriesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <AboutUsSection />
        <PricingAndFAQSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
