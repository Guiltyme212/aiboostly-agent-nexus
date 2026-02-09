import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FeaturedIn from "@/components/FeaturedIn";
import Testimonials from "@/components/Testimonials";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Mission from "@/components/Mission";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    });

    const elements = document.querySelectorAll(".scroll-reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Gradient Blobs - Helium Style Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top Right Blob */}
        <div
          className="gradient-blob"
          style={{ top: '-200px', right: '-200px' }}
        />
        {/* Bottom Left Blob */}
        <div
          className="gradient-blob gradient-blob-accent"
          style={{ bottom: '-150px', left: '-250px', animationDelay: '-5s' }}
        />
        {/* Middle Right Blob */}
        <div
          className="gradient-blob gradient-blob-sm"
          style={{ top: '40%', right: '-150px', animationDelay: '-10s' }}
        />
        {/* Middle Left Blob */}
        <div
          className="gradient-blob gradient-blob-sm gradient-blob-accent"
          style={{ top: '60%', left: '-150px', animationDelay: '-15s' }}
        />
      </div>

      <div className="relative z-10">
        <Navigation />
        <Hero />
        <FeaturedIn />
        <HowItWorks />
        <Testimonials />
        <Features />
        <Mission />
        <Pricing />
        <FAQ />
        <Footer />
      </div>
    </main>
  );
};

export default Index;
