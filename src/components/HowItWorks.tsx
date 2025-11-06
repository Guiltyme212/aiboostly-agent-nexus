import { Card } from "@/components/ui/card";
import { 
  ClipboardText, 
  Gear, 
  RocketLaunch,
  EnvelopeSimple,
  Calendar,
  File,
  Notepad,
  ArrowRight,
  Cube,
  ArrowsClockwise,
  ShareNetwork
} from "@phosphor-icons/react";

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-4 scroll-reveal">
          <p className="text-primary text-sm uppercase tracking-widest mb-2">PROCESS</p>
          <h2 className="text-5xl font-light mb-4">How it works</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
          {/* Card 1 - Share Your Workflow */}
          <Card className="glass-card p-8 relative hover:scale-105 transition-all duration-500 scroll-reveal">
            <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl font-light text-background">
              1
            </div>
            
            <h3 className="text-2xl font-light mb-4">Share Your Workflow</h3>
            <p className="text-muted-foreground leading-relaxed opacity-90 mb-8">
              From lead gen to client onboarding, just share your workflow and the tools you use.
            </p>

            {/* Icon Bubbles - Animated */}
            <div className="relative h-64 mt-8">
              {/* List Icon */}
              <div 
                className="absolute top-8 left-8 w-20 h-20 rounded-full bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center"
                style={{
                  animation: "zoomPulse 3s ease-in-out infinite",
                  animationDelay: "0s"
                }}
              >
                <ClipboardText size={32} weight="light" className="text-foreground" />
              </div>

              {/* Email Icon */}
              <div 
                className="absolute top-4 right-12 w-24 h-24 rounded-full bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center"
                style={{
                  animation: "zoomPulse 3s ease-in-out infinite",
                  animationDelay: "0.6s"
                }}
              >
                <EnvelopeSimple size={40} weight="light" className="text-foreground" />
              </div>

              {/* Calendar Icon */}
              <div 
                className="absolute bottom-16 left-4 w-20 h-20 rounded-full bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center"
                style={{
                  animation: "zoomPulse 3s ease-in-out infinite",
                  animationDelay: "1.2s"
                }}
              >
                <Calendar size={32} weight="light" className="text-foreground" />
              </div>

              {/* File Icon */}
              <div 
                className="absolute bottom-12 right-16 w-20 h-20 rounded-full bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center"
                style={{
                  animation: "zoomPulse 3s ease-in-out infinite",
                  animationDelay: "1.8s"
                }}
              >
                <File size={32} weight="light" className="text-foreground" />
              </div>

              {/* Notepad Icon */}
              <div 
                className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center"
                style={{
                  animation: "zoomPulse 3s ease-in-out infinite",
                  animationDelay: "2.4s"
                }}
              >
                <Notepad size={32} weight="light" className="text-foreground" />
              </div>
            </div>
          </Card>

          {/* Arrow Animation Between Cards 1 & 2 */}
          <div className="hidden md:flex absolute left-[33%] top-1/2 -translate-y-1/2 z-20">
            <ArrowRight 
              size={32} 
              weight="bold" 
              className="text-primary"
              style={{
                animation: "arrowFlow 2s ease-in-out infinite"
              }}
            />
          </div>

          {/* Card 2 - We Build the System */}
          <Card className="glass-card p-8 relative hover:scale-105 transition-all duration-500 scroll-reveal" style={{ animationDelay: "0.2s" }}>
            <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl font-light text-background">
              2
            </div>
            
            <h3 className="text-2xl font-light mb-4">We Build the System</h3>
            <p className="text-muted-foreground leading-relaxed opacity-90 mb-8">
              We design and set up custom automations that connect your tools with AI—so work happens while you sleep.
            </p>

            {/* Icon Bubbles - Animated */}
            <div className="relative h-64 mt-8">
              {/* 3D Cube Icon */}
              <div 
                className="absolute top-12 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center"
                style={{
                  animation: "zoomPulse 3s ease-in-out infinite",
                  animationDelay: "0.3s"
                }}
              >
                <Cube size={32} weight="light" className="text-foreground" />
              </div>

              {/* Notion-style Icon */}
              <div 
                className="absolute bottom-24 left-12 w-24 h-24 rounded-full bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center"
                style={{
                  animation: "zoomPulse 3s ease-in-out infinite",
                  animationDelay: "0.9s"
                }}
              >
                <div className="w-10 h-10 bg-foreground rounded-lg flex items-center justify-center">
                  <span className="text-background font-bold text-xl">N</span>
                </div>
              </div>

              {/* Gear/Settings Icon */}
              <div 
                className="absolute bottom-8 left-1/3 w-20 h-20 rounded-full bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center"
                style={{
                  animation: "zoomPulse 3s ease-in-out infinite, spin 8s linear infinite",
                  animationDelay: "1.5s, 0s"
                }}
              >
                <Gear size={28} weight="light" className="text-foreground" />
              </div>

              {/* Refresh/Automation Arrow */}
              <div 
                className="absolute bottom-16 right-8 w-24 h-24 rounded-full flex items-center justify-center"
                style={{
                  animation: "zoomPulse 3s ease-in-out infinite",
                  animationDelay: "2.1s"
                }}
              >
                <ArrowsClockwise size={48} weight="light" className="text-primary" />
              </div>
            </div>
          </Card>

          {/* Arrow Animation Between Cards 2 & 3 */}
          <div className="hidden md:flex absolute left-[66%] top-1/2 -translate-y-1/2 z-20">
            <ArrowRight 
              size={32} 
              weight="bold" 
              className="text-primary"
              style={{
                animation: "arrowFlow 2s ease-in-out infinite",
                animationDelay: "1s"
              }}
            />
          </div>

          {/* Card 3 - Launch and Take Control */}
          <Card className="glass-card p-8 relative hover:scale-105 transition-all duration-500 scroll-reveal" style={{ animationDelay: "0.4s" }}>
            <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl font-light text-background">
              3
            </div>
            
            <h3 className="text-2xl font-light mb-4">Launch and Take Control</h3>
            <p className="text-muted-foreground leading-relaxed opacity-90 mb-8">
              You get a plug-and-play dashboard with a walkthrough to manage everything easily.
            </p>

            {/* Dashboard Mockup */}
            <div className="relative mt-8">
              {/* macOS Chrome Dots */}
              <div className="flex gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>

              {/* Dashboard Image Container */}
              <div className="relative glass-card rounded-lg overflow-hidden border border-white/10">
                <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-medium">
                  ● LIVE
                </div>
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop"
                  alt="Dashboard Interface"
                  className="w-full h-48 object-cover"
                />
              </div>

              {/* Share Network Icon Bubble */}
              <div 
                className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center"
                style={{
                  animation: "zoomPulse 3s ease-in-out infinite, float 6s ease-in-out infinite",
                  animationDelay: "0.5s, 0s"
                }}
              >
                <ShareNetwork size={32} weight="light" className="text-foreground" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
