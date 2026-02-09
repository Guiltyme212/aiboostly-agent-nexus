import { Button } from "@/components/ui/button";
import { Sparkle } from "@phosphor-icons/react";
import { useEffect, useRef } from "react";

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20 opacity-30"></div>

      {/* Mouse-following gradient spot */}
      <div
        ref={blobRef}
        className="absolute w-[600px] h-[600px] bg-primary/40 rounded-full blur-3xl pointer-events-none"
      ></div>

      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center fade-in-up">
          {/* Testimonial */}
          <div className="flex items-center justify-center gap-3 mb-8 opacity-80">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
              alt="Testimonial"
              className="w-10 h-10 rounded-full border-2 border-primary/50"
            />
            <p className="text-sm italic text-muted-foreground">
              "Data dashboards now run themselves. We just watch."
            </p>
            <span className="text-xs text-muted-foreground">— Jamal Ortiz, Co-founder, Taskflux</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl mb-5 leading-[0.95]">
            Conversion-First
            <br />
            AI Studio
            <br />
            <span className="text-green-500 font-semibold">Green</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Boost efficiency and eliminate repetitive tasks with AI-powered automation solutions
            tailored to your business needs.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
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
          <p className="text-sm text-muted-foreground mt-16 opacity-70">
            Trusted by 150+ startups & teams
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
