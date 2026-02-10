import { Button } from "@/components/ui/button";
import { Sparkle } from "@phosphor-icons/react";
import { useEffect, useRef } from "react";
import VerticalScrollingCards from "@/components/VerticalScrollingCards";
import FeaturedIn from "@/components/FeaturedIn";

const Hero = () => {
  const blobRef = useRef<HTMLDivElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const currentPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      mousePosRef.current = { x, y };
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;

    const animate = () => {
      // Lerp factor (0.1 gives a nice smooth delay)
      const ease = 0.1;

      const targetX = mousePosRef.current.x;
      const targetY = mousePosRef.current.y;

      const currentX = currentPosRef.current.x;
      const currentY = currentPosRef.current.y;

      // Interpolate
      const newX = currentX + (targetX - currentX) * ease;
      const newY = currentY + (targetY - currentY) * ease;

      currentPosRef.current = { x: newX, y: newY };

      if (blobRef.current) {
        blobRef.current.style.left = `${newX}%`;
        blobRef.current.style.top = `${newY}%`;
        blobRef.current.style.transform = 'translate(-50%, -50%)';
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-start overflow-hidden pt-32">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20 opacity-30"></div>

      {/* Mouse-following gradient spot */}
      <div
        ref={blobRef}
        className="absolute w-[600px] h-[600px] bg-primary/40 rounded-full blur-3xl pointer-events-none"
      ></div>

      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start fade-in-up">
          {/* Left Column - Text */}
          <div className="text-left">
            {/* Testimonial */}
            <div className="flex items-center gap-3 mb-8 opacity-80">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                alt="Testimonial"
                className="w-10 h-10 rounded-full border-2 border-primary/50"
              />
              <p className="text-sm italic text-muted-foreground">
                "Data dashboards now run themselves. We just watch."
              </p>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl mb-5 leading-[0.95]">
              A Conversion-First
              <br />
              <span className="text-primary font-semibold">AI Studio.</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
              We build custom AI agents and automations that handle leads, calls, workflows
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button className="neumorphic-button px-8 py-6 rounded-full text-base font-medium hover:scale-105 transition-all duration-300">
                <Sparkle size={20} weight="fill" className="mr-2" />
                Launch Agent Demo
              </Button>
              <Button
                variant="outline"
                className="px-8 py-6 rounded-full text-base font-medium bg-secondary/50 backdrop-blur border-white/10 hover:bg-secondary/70 hover:scale-105 transition-all duration-300"
              >
                Our Services
              </Button>
            </div>

            {/* Trusted By */}
            <p className="text-sm text-muted-foreground opacity-70 mb-6">
              Helped 50+ businesses save time and increase revenue
            </p>

            {/* Logo Train */}
            <div className="max-w-xl">
              <div className="relative w-full overflow-hidden mask-linear-fade py-4">
                <div
                  className="flex items-center gap-12 whitespace-nowrap"
                  style={{
                    animation: "marquee-horizontal 45s linear infinite",
                    width: "fit-content"
                  }}
                >
                  {["Forbes", "Product Hunt", "Y Combinator", "TechCrunch", "Automation Weekly", "VentureBeat", "Business Insider", "Forbes", "Product Hunt", "Y Combinator", "TechCrunch", "Automation Weekly", "VentureBeat", "Business Insider", "Forbes", "Product Hunt", "Y Combinator", "TechCrunch", "Automation Weekly", "VentureBeat", "Business Insider", "Forbes", "Product Hunt", "Y Combinator", "TechCrunch", "Automation Weekly", "VentureBeat", "Business Insider"].map((logo, index) => (
                    <span
                      key={`${logo}-${index}`}
                      className="text-lg md:text-xl font-bold text-white/25 hover:text-white/60 transition-all duration-500 cursor-default select-none"
                      style={{ fontFamily: 'system-ui, sans-serif' }}
                    >
                      {logo}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Cards placeholder */}
          <div className="hidden lg:flex items-start justify-end min-h-[500px] -mt-20">
            <div className="w-full max-w-lg">
              <VerticalScrollingCards />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
