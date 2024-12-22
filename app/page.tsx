"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "./components/header";
import Footer from "./components/footer";
import HeroSection from "./components/hero-section";
import FeaturesSection from "./components/features-section";
import HowItWorksSection from "./components/how-it-works-section";
import TestimonialsSection from "./components/testimonials-section";
import CTASection from "./components/cta-section";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/auth/login");
  }, [router]);

  return (

    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
