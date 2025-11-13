import { EnvelopeSimple, Database } from "@phosphor-icons/react";

// Tool Icon Components
const GmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const AirtableIcon = () => (
  <svg viewBox="0 0 54.75 45.776" fill="currentColor" className="w-5 h-5">
    <path d="M 27.357 0 C 26.367 0 25.372 0.196 24.437 0.586 L 4.058 9.013 C 2.911 9.488 2.941 11.085 4.086 11.559 L 24.576 19.676 C 26.371 20.404 28.379 20.404 30.174 19.676 L 50.664 11.559 C 51.812 11.112 51.812 9.488 50.692 9.013 L 30.258 0.586 C 29.34 0.198 28.354 -0.001 27.357 0 Z M 53.381 13.893 C 53.207 13.894 53.035 13.929 52.875 13.995 L 30.035 22.84 C 29.512 23.054 29.17 23.562 29.168 24.127 L 29.168 44.421 C 29.172 44.872 29.399 45.291 29.773 45.543 C 30.147 45.795 30.622 45.846 31.041 45.68 L 53.883 36.806 C 54.408 36.611 54.754 36.108 54.75 35.549 L 54.75 15.255 C 54.745 14.502 54.134 13.895 53.381 13.895 Z M 1.542 13.982 C 1.133 13.967 0.736 14.124 0.447 14.415 C 0.196 14.668 0 14.974 0 15.339 L 0 34.399 C 0 35.407 1.175 36.08 2.071 35.631 L 16.375 28.773 L 17.075 28.438 L 23.848 25.162 C 24.911 24.66 24.829 23.091 23.709 22.671 L 2.014 14.08 C 1.865 14.017 1.704 13.983 1.542 13.98 Z"/>
  </svg>
);

const ZoomIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19 7h-8v6h8V7zm2-2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v0z"/>
    <path d="M11 14l4.5-3L11 8v6z"/>
  </svg>
);

const Features = () => {
  const features = [
    {
      title: "Lead Generation & Outreach",
      description: "Automate lead sourcing, email follow-ups, and engagement to grow your business effortlessly.",
      icon: EnvelopeSimple,
      gradient: "from-[#d7cfcf] to-[#9198e5]",
      status: "Running Currently...",
      integrations: [
        { name: "Gmail", subtitle: "Compose a mail", IconComponent: GmailIcon },
        { name: "AirTable", subtitle: "Send mail to the users", IconComponent: AirtableIcon },
        { name: "Zoom", subtitle: "Schedule the call", IconComponent: ZoomIcon },
      ],
    },
    {
      title: "Custom AI Integrations",
      description: "Seamlessly connect AI tools with your existing software—no technical setup required.",
      icon: Database,
      gradient: "from-[#16a34a] to-[#059669]",
      status: "Active",
      integrations: [],
      hasOrbit: true,
      orbitIcons: [GmailIcon, AirtableIcon, ZoomIcon, GmailIcon, AirtableIcon, ZoomIcon],
    },
    {
      title: "Data Intelligence",
      description: "Turn raw data into actionable insights with AI-powered analytics.",
      icon: Database,
      gradient: "from-[#9198e5] to-[#712020]",
      status: "Active",
      integrations: [],
      hasChart: true,
    },
    {
      title: "AI-Powered Chatbots",
      description: "Enhance customer support with intelligent, 24/7 AI chatbots that handle queries instantly.",
      icon: Database,
      gradient: "from-[#9198e5] to-[#712020]",
      status: "Active",
      integrations: [],
      hasChatbot: true,
    },
    {
      title: "Workflow Automation",
      description: "Streamline repetitive tasks with AI-driven workflows that save time and boost efficiency.",
      icon: Database,
      gradient: "from-[#16a34a] to-[#059669]",
      status: "Active",
      integrations: [],
      hasWorkflow: true,
    },
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 scroll-reveal">
          <p className="text-primary text-sm uppercase tracking-widest mb-3 font-medium">SERVICES</p>
          <h2 className="text-5xl md:text-6xl mb-4">What We Offer</h2>
          <p className="text-muted-foreground text-base leading-relaxed">Comprehensive AI automation services tailored to your business</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="scroll-reveal"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Main Feature Card */}
              <div className="bg-[#1a1a1a] rounded-3xl p-8 border border-white/5 hover:border-primary/20 transition-all duration-500 group cursor-pointer hover:scale-[1.02]">
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                    <feature.icon size={28} weight="duotone" className="text-white" />
                  </div>
                  
                  <span className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {feature.status}
                  </span>
                </div>

                <h3 className="text-2xl font-medium mb-3 text-white group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Integration Cards */}
                {feature.integrations && feature.integrations.length > 0 && (
                  <div className="mt-6 relative">
                    {/* Connecting Line - Centered */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary/30 via-accent/30 to-primary/30 group-hover:from-primary/60 group-hover:via-accent/60 group-hover:to-primary/60 transition-all duration-700"></div>
                    
                    <div className="space-y-3 relative">
                      {feature.integrations.map((integration, idx) => (
                        <div
                          key={idx}
                          className={`bg-[#2a2a2a] rounded-xl p-3 flex items-center gap-3 hover:bg-[#333333] relative z-10 transition-all duration-700 ease-out
                            ${idx === 0 ? 'group-hover:translate-y-[calc(100%+0.75rem)]' : ''}
                            ${idx === 1 ? 'group-hover:-translate-y-[calc(100%+0.75rem)]' : ''}
                            hover:scale-105`}
                        >
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-white">
                            <integration.IconComponent />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-semibold">{integration.name}</p>
                            <p className="text-muted-foreground text-xs truncate">{integration.subtitle}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Animated Chart */}
                {feature.hasChart && (
                  <div className="mt-6 relative h-64 flex items-end justify-center gap-3 px-6 py-4 overflow-hidden">
                    {/* Status Label */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 transition-all duration-500 group-hover:opacity-0">
                      <div className="w-3 h-3 rounded-full bg-muted-foreground/40"></div>
                      <span className="text-sm text-muted-foreground">Before Helium</span>
                    </div>
                    <div className="absolute top-4 left-4 flex items-center gap-2 opacity-0 transition-all duration-500 group-hover:opacity-100">
                      <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))] animate-pulse"></div>
                      <span className="text-sm text-primary font-semibold">After Helium</span>
                    </div>

                    {/* Percentage Tooltip */}
                    <div className="absolute top-16 left-12 opacity-0 scale-90 transition-all duration-500 delay-[600ms] group-hover:opacity-100 group-hover:scale-100">
                      <div className="bg-background/90 backdrop-blur-sm border border-primary/30 rounded-xl px-4 py-2.5 shadow-[0_0_20px_hsl(var(--primary)/0.3)]">
                        <span className="text-2xl font-semibold text-primary">87% +</span>
                      </div>
                    </div>

                    {/* Chart Bars */}
                    {[
                      { active: 45, inactive: 21 },
                      { active: 60, inactive: 28 },
                      { active: 38, inactive: 19 },
                      { active: 32, inactive: 15 },
                      { active: 65, inactive: 32 },
                      { active: 40, inactive: 20 }
                    ].map((bar, idx) => (
                      <div key={idx} className="relative flex-1 max-w-[24px] h-full flex flex-col justify-end items-center">
                        {/* Active Bar - grows on hover */}
                        <div 
                          className={`chart-bar-active chart-bar-${idx} w-full rounded-full bg-primary shadow-[0_0_15px_hsl(var(--primary)/0.3)] absolute bottom-0`}
                          style={{ 
                            animationDelay: `${idx * 100}ms`
                          }}
                        ></div>
                        {/* Inactive Bar - always visible */}
                        <div 
                          className="w-full rounded-full bg-muted/30 relative z-10"
                          style={{ height: `${bar.inactive}%` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Orbit Animation */}
                {feature.hasOrbit && feature.orbitIcons && (
                  <div className="mt-6 relative h-64 flex items-center justify-center overflow-hidden">
                    {/* Central icon */}
                    <div className="absolute z-10 w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center border border-primary/30 shadow-lg">
                      <Database size={40} weight="duotone" className="text-primary" />
                    </div>
                    
                    {/* Orbiting icons */}
                    {feature.orbitIcons.map((IconComponent, idx) => {
                      return (
                        <div
                          key={idx}
                          className="absolute w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm"
                          style={{
                            background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.5) 0%, hsl(var(--primary) / 0.35) 50%, hsl(var(--primary) / 0.25) 100%)',
                            boxShadow: 'inset 0 2px 12px rgba(0, 0, 0, 0.5), inset 0 -2px 8px hsl(var(--primary) / 0.4), inset 8px -8px 20px rgba(0, 0, 0, 0.9)',
                            border: '1px solid hsl(var(--primary) / 0.3)',
                            animation: `orbit 20s linear infinite`,
                            animationDelay: `${-idx * (20 / feature.orbitIcons.length)}s`,
                          }}
                        >
                          <div className="scale-150">
                            <IconComponent />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* AI Chatbot Demo */}
                {feature.hasChatbot && (
                  <div className="mt-6 relative h-64 flex flex-col justify-center px-6 py-4">
                    {/* Customer Query Label */}
                    <p className="text-muted-foreground text-sm italic mb-3 transition-all duration-500 group-hover:-translate-y-3">Customer Query</p>
                    
                    {/* Query Bubble */}
                    <div className="bg-primary/90 text-white rounded-3xl px-5 py-3.5 max-w-[85%] mb-3 transition-all duration-500 group-hover:-translate-y-3">
                      <p className="text-sm">What are your business hours?</p>
                    </div>

                    {/* Avatar and Response Container */}
                    <div className="flex items-start gap-3 mb-2 transition-all duration-500 group-hover:-translate-y-3">
                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-full bg-muted overflow-hidden flex-shrink-0">
                        <img 
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" 
                          alt="AI Assistant"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Response - Hidden by default, shows on hover */}
                      <div className="flex-1 opacity-0 scale-95 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 group-hover:delay-300">
                        <div className="bg-[#2a2a2a] text-white rounded-3xl px-5 py-3.5 mb-2">
                          <p className="text-sm">We are here for you 24/7, let me know how we can help you.</p>
                        </div>
                        <p className="text-muted-foreground text-xs italic text-right">Automated Response</p>
                      </div>

                      {/* Green Indicator - Shows on hover */}
                      <div className="w-10 h-10 rounded-xl bg-primary/90 flex-shrink-0 opacity-0 scale-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 group-hover:delay-200"></div>
                    </div>
                  </div>
                )}

                {/* Workflow Automation Demo */}
                {feature.hasWorkflow && (
                  <div className="mt-6 relative h-80 px-6 py-4 overflow-hidden">
                    {/* Message Cards Container */}
                    <div className="space-y-3 relative">
                      {/* Top Card - Active/Replying */}
                      <div className="bg-primary/90 rounded-3xl p-4 flex gap-3 items-start shadow-lg transform transition-all duration-500 group-hover:scale-105">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden flex-shrink-0">
                          <img 
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" 
                            alt="Emma"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="text-white font-medium text-sm">Emma, RetailSync</h4>
                            <span className="text-white/70 text-xs">09:45 PM</span>
                          </div>
                          <p className="text-white/80 text-sm mb-2">"We're looking to automate inventory updates. Can you help?"</p>
                          <p className="text-white/60 text-sm italic">Replying now...</p>
                        </div>
                        <div className="w-5 h-5 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0 mt-1">
                          <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                        </div>
                      </div>

                      {/* Middle Card */}
                      <div className="bg-[#2a2a2a] rounded-3xl p-4 flex gap-3 items-start shadow-md transition-all duration-500 group-hover:translate-x-2">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden flex-shrink-0">
                          <img 
                            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop" 
                            alt="Olivia"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="text-white font-medium text-sm">Olivia, GreenTech Solutions</h4>
                            <span className="text-muted-foreground text-xs">02:45 AM</span>
                          </div>
                          <p className="text-muted-foreground text-sm">"Looking for AI automation to streamline customer inquiries. Can we discuss?"</p>
                        </div>
                        <div className="w-5 h-5 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                          <EnvelopeSimple size={12} weight="fill" className="text-primary" />
                        </div>
                      </div>

                      {/* Bottom Card */}
                      <div className="bg-[#2a2a2a] rounded-3xl p-4 flex gap-3 items-start shadow-md transition-all duration-500 group-hover:translate-x-2">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden flex-shrink-0">
                          <img 
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" 
                            alt="Liam"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="text-white font-medium text-sm">Liam, FinEdge Analytics</h4>
                            <span className="text-muted-foreground text-xs">12:45 AM</span>
                          </div>
                          <p className="text-muted-foreground text-sm">"How does your AI handle financial data processing?"</p>
                        </div>
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                          <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                        </div>
                      </div>
                    </div>

                    {/* Connecting Line and Box */}
                    <div className="absolute top-12 -right-4 opacity-0 transition-all duration-700 group-hover:opacity-100">
                      <svg width="120" height="100" viewBox="0 0 120 100" className="overflow-visible">
                        <path
                          d="M 0 20 Q 60 20, 100 50"
                          stroke="hsl(var(--primary))"
                          strokeWidth="2"
                          fill="none"
                          className="opacity-60"
                        />
                      </svg>
                      <div className="absolute top-8 right-0 w-12 h-12 rounded-xl bg-primary/90 shadow-lg"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
