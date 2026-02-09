import { ArrowRight } from "@phosphor-icons/react";
import dashboardPreview from "@/assets/dashboard-preview.jpg";

// 3D Sphere component matching Helium design
const Sphere = ({ size = "lg", delay = 0 }: { size?: "sm" | "md" | "lg" | "xl"; delay?: number }) => {
  const sizes = {
    sm: "w-12 h-12",
    md: "w-16 h-16", 
    lg: "w-20 h-20",
    xl: "w-28 h-28"
  };

  return (
    <div
      className={`${sizes[size]} hiw-sphere`}
      style={{
        animationDelay: `${delay}s`
      }}
    />
  );
};

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Share Your Workflow",
      description: "From lead gen to client onboarding, just share your workflow and the tools you use.",
      sphereCount: 3
    },
    {
      number: "02", 
      title: "We Build the System",
      description: "We design and set up custom automations that connect your tools with AI—so work happens while you sleep.",
      sphereCount: 2
    },
    {
      number: "03",
      title: "Launch and Take Control",
      description: "You get a plug-and-play dashboard with a walkthrough to manage everything easily.",
      hasDashboard: true
    }
  ];

  return (
    <section id="how-it-works" className="py-32 relative overflow-hidden">
      {/* Background gradient accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 scroll-reveal">
          <p className="text-primary text-sm uppercase tracking-[0.2em] mb-4 font-medium">
            PROCESS
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight">
            How it works
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Card */}
              <div 
                className="hiw-card p-8 h-full scroll-reveal"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Step Number Badge */}
                <div className="absolute top-6 right-6">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                    <span className="text-lg font-semibold text-background">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="mb-8">
                  <h3 className="text-2xl font-medium mb-4 pr-14">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-[15px]">
                    {step.description}
                  </p>
                </div>

                {/* Visual Area */}
                <div className="mt-auto pt-4">
                  {step.sphereCount && (
                    <div className="flex items-center justify-center gap-4 py-8">
                      {Array.from({ length: step.sphereCount }).map((_, i) => (
                        <Sphere 
                          key={i}
                          size={i === 1 ? "xl" : "lg"}
                          delay={i * 0.3}
                        />
                      ))}
                    </div>
                  )}

                  {step.hasDashboard && (
                    <div className="relative">
                      {/* Browser Chrome */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#28c940]" />
                      </div>

                      {/* Dashboard Preview */}
                      <div className="relative rounded-xl overflow-hidden border border-white/10 hiw-dashboard">
                        <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded font-medium z-10 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          LIVE
                        </div>
                        <img
                          src={dashboardPreview}
                          alt="Dashboard Interface"
                          className="w-full h-40 object-cover"
                        />
                      </div>

                      {/* Floating Sphere */}
                      <div className="absolute -bottom-4 -right-4">
                        <Sphere size="lg" delay={0.5} />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Arrow Between Cards (Desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute -right-4 lg:-right-5 top-1/2 -translate-y-1/2 z-20">
                  <div className="hiw-arrow">
                    <ArrowRight size={24} weight="bold" className="text-primary" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
