import { Card } from "@/components/ui/card";
import { ArrowRight } from "@phosphor-icons/react";
import heroDashboard from "@/assets/hero-dashboard.jpg";
import dashboardPreview from "@/assets/dashboard-preview.jpg";

// Tool Icon Components
const SlackIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M6 15a2 2 0 01-2 2 2 2 0 01-2-2 2 2 0 012-2h2v2zm1 0a2 2 0 012-2 2 2 0 012 2v5a2 2 0 01-2 2 2 2 0 01-2-2v-5zM9 6a2 2 0 01-2-2 2 2 0 012-2 2 2 0 012 2v2H9zm0 1a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2 2 2 0 012-2h5zm9 2a2 2 0 012-2 2 2 0 012 2 2 2 0 01-2 2h-2V9zm-1 0a2 2 0 01-2 2 2 2 0 01-2-2V4a2 2 0 012-2 2 2 0 012 2v5zm-2 9a2 2 0 012 2 2 2 0 01-2 2 2 2 0 01-2-2v-2h2zm0-1a2 2 0 01-2-2 2 2 0 012-2h5a2 2 0 012 2 2 2 0 01-2 2h-5z"/>
  </svg>
);

const NotionIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M4 4.5A2.5 2.5 0 016.5 2h11A2.5 2.5 0 0120 4.5v15a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 014 19.5v-15zm3.5 2a.5.5 0 000 1h9a.5.5 0 000-1h-9zm0 3a.5.5 0 000 1h9a.5.5 0 000-1h-9zm0 3a.5.5 0 000 1h9a.5.5 0 000-1h-9zm0 3a.5.5 0 000 1h5a.5.5 0 000-1h-5z"/>
  </svg>
);

const GmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM5 8V6h14v2H5zm2 4h10v2H7v-2z"/>
  </svg>
);

const AirtableIcon = () => (
  <svg viewBox="0 0 54.75 45.776" fill="currentColor" className="w-8 h-8">
    <path d="M 27.357 0 C 26.367 0 25.372 0.196 24.437 0.586 L 4.058 9.013 C 2.911 9.488 2.941 11.085 4.086 11.559 L 24.576 19.676 C 26.371 20.404 28.379 20.404 30.174 19.676 L 50.664 11.559 C 51.812 11.112 51.812 9.488 50.692 9.013 L 30.258 0.586 C 29.34 0.198 28.354 -0.001 27.357 0 Z M 53.381 13.893 C 53.207 13.894 53.035 13.929 52.875 13.995 L 30.035 22.84 C 29.512 23.054 29.17 23.562 29.168 24.127 L 29.168 44.421 C 29.172 44.872 29.399 45.291 29.773 45.543 C 30.147 45.795 30.622 45.846 31.041 45.68 L 53.883 36.806 C 54.408 36.611 54.754 36.108 54.75 35.549 L 54.75 15.255 C 54.745 14.502 54.134 13.895 53.381 13.895 Z M 1.542 13.982 C 1.133 13.967 0.736 14.124 0.447 14.415 C 0.196 14.668 0 14.974 0 15.339 L 0 34.399 C 0 35.407 1.175 36.08 2.071 35.631 L 16.375 28.773 L 17.075 28.438 L 23.848 25.162 C 24.911 24.66 24.829 23.091 23.709 22.671 L 2.014 14.08 C 1.865 14.017 1.704 13.983 1.542 13.98 Z"/>
  </svg>
);

const ZapierIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
);

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-4 scroll-reveal">
          <p className="text-primary text-sm uppercase tracking-widest mb-3 font-medium">PROCESS</p>
          <h2 className="text-5xl md:text-6xl mb-4">How it works</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
          {/* Card 1 - Share Your Workflow */}
          <Card className="glass-card p-8 relative hover:scale-105 transition-all duration-500 scroll-reveal">
            <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl font-medium text-background">
              1
            </div>
            
            <h3 className="text-2xl font-medium mb-4">Share Your Workflow</h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              From lead gen to client onboarding, just share your workflow and the tools you use.
            </p>

            {/* Icon Bubbles - Animated */}
            <div className="relative h-64 mt-8 overflow-hidden">
              {/* Slack Icon - Top Left */}
              <div 
                className="absolute top-0 left-0 w-20 h-20 rounded-full flex items-center justify-center text-white"
                style={{
                  background: "linear-gradient(135deg, rgba(60, 60, 60, 0.9) 0%, rgba(40, 40, 40, 0.95) 50%, rgba(20, 20, 20, 1) 100%)",
                  boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.4)",
                  animation: "zoomPulse 3s ease-in-out infinite",
                  animationDelay: "0s"
                }}
              >
                <SlackIcon />
              </div>

              {/* Gmail Icon - Top Right */}
              <div 
                className="absolute top-2 right-0 w-24 h-24 rounded-full flex items-center justify-center text-white"
                style={{
                  background: "linear-gradient(135deg, rgba(60, 60, 60, 0.9) 0%, rgba(40, 40, 40, 0.95) 50%, rgba(20, 20, 20, 1) 100%)",
                  boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.4)",
                  animation: "zoomPulse 3s ease-in-out infinite",
                  animationDelay: "0.6s"
                }}
              >
                <GmailIcon />
              </div>

              {/* Calendar Icon - Middle Left */}
              <div 
                className="absolute top-[48%] left-0 w-20 h-20 rounded-full flex items-center justify-center text-white"
                style={{
                  background: "linear-gradient(135deg, rgba(60, 60, 60, 0.9) 0%, rgba(40, 40, 40, 0.95) 50%, rgba(20, 20, 20, 1) 100%)",
                  boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.4)",
                  animation: "zoomPulse 3s ease-in-out infinite",
                  animationDelay: "1.2s"
                }}
              >
                <CalendarIcon />
              </div>

              {/* Airtable Icon - Middle Right */}
              <div 
                className="absolute top-[55%] right-4 w-16 h-16 rounded-full flex items-center justify-center text-white"
                style={{
                  background: "linear-gradient(135deg, rgba(60, 60, 60, 0.9) 0%, rgba(40, 40, 40, 0.95) 50%, rgba(20, 20, 20, 1) 100%)",
                  boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.4)",
                  animation: "zoomPulse 3s ease-in-out infinite",
                  animationDelay: "1.8s"
                }}
              >
                <AirtableIcon />
              </div>

              {/* Notion Icon - Bottom Center */}
              <div 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full flex items-center justify-center text-white"
                style={{
                  background: "linear-gradient(135deg, rgba(60, 60, 60, 0.9) 0%, rgba(40, 40, 40, 0.95) 50%, rgba(20, 20, 20, 1) 100%)",
                  boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.4)",
                  animation: "zoomPulse 3s ease-in-out infinite",
                  animationDelay: "2.4s"
                }}
              >
                <NotionIcon />
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
            <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl font-medium text-background">
              2
            </div>
            
            <h3 className="text-2xl font-medium mb-4">We Build the System</h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We design and set up custom automations that connect your tools with AI—so work happens while you sleep.
            </p>

            {/* Icon Bubbles - Animated with Vertical Flow */}
            <div className="relative h-64 mt-8 overflow-hidden flex items-center justify-center">
              {/* Vertical Connecting Line */}
              <div className="absolute left-1/3 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary/30 via-primary/50 to-primary/30"></div>

              {/* Moving Icons */}
              <div 
                className="absolute bottom-0 left-1/3 w-20 h-20 rounded-full flex items-center justify-center z-10 text-white"
                style={{
                  background: "linear-gradient(135deg, rgba(60, 60, 60, 0.9) 0%, rgba(40, 40, 40, 0.95) 50%, rgba(20, 20, 20, 1) 100%)",
                  boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.4)",
                  animation: "moveUpLoop 4s linear infinite",
                  animationDelay: "0s"
                }}
              >
                <ZapierIcon />
              </div>

              <div 
                className="absolute bottom-0 left-1/3 w-20 h-20 rounded-full flex items-center justify-center z-10 text-white"
                style={{
                  background: "linear-gradient(135deg, rgba(60, 60, 60, 0.9) 0%, rgba(40, 40, 40, 0.95) 50%, rgba(20, 20, 20, 1) 100%)",
                  boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.4)",
                  animation: "moveUpLoop 4s linear infinite",
                  animationDelay: "1s"
                }}
              >
                <NotionIcon />
              </div>

              <div 
                className="absolute bottom-0 left-1/3 w-20 h-20 rounded-full flex items-center justify-center z-10 text-white"
                style={{
                  background: "linear-gradient(135deg, rgba(60, 60, 60, 0.9) 0%, rgba(40, 40, 40, 0.95) 50%, rgba(20, 20, 20, 1) 100%)",
                  boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.4)",
                  animation: "moveUpLoop 4s linear infinite",
                  animationDelay: "2s"
                }}
              >
                <AirtableIcon />
              </div>

              <div 
                className="absolute bottom-0 left-1/3 w-20 h-20 rounded-full flex items-center justify-center z-10 text-white"
                style={{
                  background: "linear-gradient(135deg, rgba(60, 60, 60, 0.9) 0%, rgba(40, 40, 40, 0.95) 50%, rgba(20, 20, 20, 1) 100%)",
                  boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.4)",
                  animation: "moveUpLoop 4s linear infinite",
                  animationDelay: "3s"
                }}
              >
                <SlackIcon />
              </div>

              {/* Circular Arrow showing direction */}
              <div 
                className="absolute top-1/2 right-12 -translate-y-1/2 w-24 h-24"
                style={{
                  animation: "zoomPulse 3s ease-in-out infinite",
                  animationDelay: "2.4s"
                }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                      <polygon points="0 0, 10 5, 0 10" fill="hsl(var(--primary))" />
                    </marker>
                  </defs>
                  <path
                    d="M 50 10 A 30 30 0 1 1 20 50"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="3"
                    strokeLinecap="round"
                    markerEnd="url(#arrowhead)"
                  />
                </svg>
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
            <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl font-medium text-background">
              3
            </div>
            
            <h3 className="text-2xl font-medium mb-4">Launch and Take Control</h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
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

              {/* Dashboard Image Container with Sliding Animation */}
              <div 
                className="relative glass-card rounded-lg overflow-hidden border border-white/10"
                style={{
                  animation: "slideLeftRight 8s ease-in-out infinite"
                }}
              >
                <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-medium z-10">
                  ● LIVE
                </div>
                <img
                  src={dashboardPreview}
                  alt="Dashboard Interface"
                  className="w-full h-48 object-cover"
                />
              </div>

              {/* Zapier Icon Bubble with Glossy Effect */}
              <div 
                className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full flex items-center justify-center text-white"
                style={{
                  background: "linear-gradient(135deg, rgba(60, 60, 60, 0.9) 0%, rgba(40, 40, 40, 0.95) 50%, rgba(20, 20, 20, 1) 100%)",
                  boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.4)",
                  animation: "zoomPulse 3s ease-in-out infinite, float 6s ease-in-out infinite",
                  animationDelay: "0.5s, 0s"
                }}
              >
                <ZapierIcon />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
