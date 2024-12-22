"use client"

import HeaderNew from "./components/header";
import FooterNew from "./components/footer";
import HeroSection from "./components/hero-section";
import FeaturesSection from "./components/features-section";
import HowItWorksSection from "./components/how-it-works-section";
import TestimonialsSection from "./components/testimonials-section";
import CTASection from "./components/cta-section";

export default function Home() {


  return (

    <div className="min-h-screen bg-gray-50">
      <HeaderNew />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <FooterNew />
    </div>
  );
}
