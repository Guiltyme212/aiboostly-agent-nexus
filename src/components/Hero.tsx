import { Button } from "@/components/ui/button";
import { Sparkle, MagnifyingGlass, PencilLine, CalendarCheck, Star, ArrowsClockwise } from "@phosphor-icons/react";
import { useEffect, useRef } from "react";
import { AnimatedList } from "@/components/AnimatedList";

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center fade-in-up">
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
              Automate,
              <br />
              Optimize, Scale
              <br />
              <span className="text-primary font-semibold">With AI.</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
              Boost efficiency and eliminate repetitive tasks with AI-powered automation solutions
              tailored to your business needs.
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
            <p className="text-sm text-muted-foreground opacity-70">
              Trusted by 150+ startups & teams
            </p>
          </div>

          {/* Right Column - Cards placeholder */}
          <div className="hidden lg:flex items-start justify-end min-h-[500px] pt-8">
            <div className="w-full max-w-md">
              <AnimatedList delay={2000}>
                {[
                  { name: "RAG Knowledge Search", stat: "35% MANUAL WORK REDUCED", icon: <MagnifyingGlass size={24} weight="duotone" />, color: "bg-primary/20 text-primary" },
                  { name: "Sales Email Drafter", stat: "60% LESS TIME ON COLD OUTREACH", icon: <PencilLine size={24} weight="duotone" />, color: "bg-primary/20 text-primary" },
                  { name: "Calendar Booking Concierge", stat: "30% MORE MEETINGS, AUTOMATICALLY", icon: <CalendarCheck size={24} weight="duotone" />, color: "bg-primary/20 text-primary" },
                  { name: "Lead Qualification Bot", stat: "60% MORE LEADS AUTO-QUALIFIED", icon: <Star size={24} weight="duotone" />, color: "bg-primary/20 text-primary" },
                  { name: "Data Cleanup & Sync", stat: "99% OF CRM DATA CLEAN AND CURRENT", icon: <ArrowsClockwise size={24} weight="duotone" />, color: "bg-primary/20 text-primary" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 rounded-2xl p-4"
                    style={{
                      background: "linear-gradient(135deg, rgba(15, 20, 18, 0.95) 0%, rgba(10, 14, 12, 0.98) 100%)",
                      border: "1px solid rgba(50, 205, 135, 0.12)",
                      boxShadow: "inset 0 0 12px rgba(0, 255, 140, 0.04), 0 4px 20px -4px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 border border-primary/20">
                      <span className="text-primary">{item.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{item.name}</p>
                      <p className="text-[11px] text-primary/60 tracking-widest uppercase mt-0.5">{item.stat}</p>
                    </div>
                    <div className="text-muted-foreground/25 grid grid-cols-2 gap-[3px]">
                      {[...Array(6)].map((_, i) => (
                        <svg key={i} width="4" height="4" viewBox="0 0 4 4" fill="currentColor">
                          <circle cx="2" cy="2" r="1.5" />
                        </svg>
                      ))}
                    </div>
                  </div>
                ))}
              </AnimatedList>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
