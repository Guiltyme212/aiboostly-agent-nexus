import {
  EnvelopeSimple,
  Database,
  Robot,
  ShareNetwork,
  Cpu,
  Globe,
  FigmaLogo,
  NotionLogo,
  SlackLogo,
  WhatsappLogo,
  Lightning,
  User
} from "@phosphor-icons/react";

// Tool Icon Components
const GmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const AirtableIcon = () => (
  <svg viewBox="0 0 54.75 45.776" fill="currentColor" className="w-5 h-5">
    <path d="M 27.357 0 C 26.367 0 25.372 0.196 24.437 0.586 L 4.058 9.013 C 2.911 9.488 2.941 11.085 4.086 11.559 L 24.576 19.676 C 26.371 20.404 28.379 20.404 30.174 19.676 L 50.664 11.559 C 51.812 11.112 51.812 9.488 50.692 9.013 L 30.258 0.586 C 29.34 0.198 28.354 -0.001 27.357 0 Z M 53.381 13.893 C 53.207 13.894 53.035 13.929 52.875 13.995 L 30.035 22.84 C 29.512 23.054 29.17 23.562 29.168 24.127 L 29.168 44.421 C 29.172 44.872 29.399 45.291 29.773 45.543 C 30.147 45.795 30.622 45.846 31.041 45.68 L 53.883 36.806 C 54.408 36.611 54.754 36.108 54.75 35.549 L 54.75 15.255 C 54.745 14.502 54.134 13.895 53.381 13.895 Z M 1.542 13.982 C 1.133 13.967 0.736 14.124 0.447 14.415 C 0.196 14.668 0 14.974 0 15.339 L 0 34.399 C 0 35.407 1.175 36.08 2.071 35.631 L 16.375 28.773 L 17.075 28.438 L 23.848 25.162 C 24.911 24.66 24.829 23.091 23.709 22.671 L 2.014 14.08 C 1.865 14.017 1.704 13.983 1.542 13.98 Z" />
  </svg>
);

const ZoomIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19 7h-8v6h8V7zm2-2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v0z" />
    <path d="M11 14l4.5-3L11 8v6z" />
  </svg>
);

const Features = () => {
  const topFeatures = [
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
      title: "Data Processing & Insights",
      description: "Turn raw data into actionable insights with AI-driven analysis and reporting.",
      icon: Database,
      gradient: "from-[#9198e5] to-[#712020]",
      status: "Active",
      hasChart: true,
    },
    {
      title: "AI-Powered Chatbots",
      description: "Enhance customer support with intelligent, 24/7 AI chatbots that handle queries instantly.",
      icon: Robot,
      gradient: "from-[#9198e5] to-[#712020]",
      status: "Active",
      hasChatbot: true,
    },
  ];

  const bottomFeatures = [
    {
      title: "Workflow Automation",
      description: "Streamline repetitive tasks with AI-driven workflows that save time and boost efficiency.",
      icon: ShareNetwork,
      gradient: "from-[#d7cfcf] to-[#9198e5]",
      hasWorkflow: true,
    },
    {
      title: "Custom AI Integrations",
      description: "Seamlessly connect AI tools with your existing software—no technical setup required.",
      icon: Cpu,
      gradient: "from-[#9198e5] to-[#712020]",
      hasIntegrations: true,
    },
  ];

  return (
    <section id="features" className="py-24 relative bg-background overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 scroll-reveal">
          <p className="text-primary text-sm uppercase tracking-widest mb-3 font-medium">SERVICES</p>
          <h2 className="text-5xl md:text-6xl mb-4 font-light">What We Offer</h2>
          <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mx-auto">
            Comprehensive AI automation services tailored to your business needs
          </p>
        </div>

        {/* Top Row - 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {topFeatures.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* Bottom Row - 2 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bottomFeatures.map((feature, index) => (
            <FeatureCard key={index + 3} feature={feature} index={index + 3} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ feature, index }: { feature: any, index: number }) => {
  return (
    <div
      className="scroll-reveal h-full"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="bg-[#1a1a1a] rounded-3xl p-8 border border-white/5 hover:border-primary/20 transition-all duration-500 group cursor-pointer hover:scale-[1.02] h-full flex flex-col overflow-hidden relative">

        {/* Card Content Header */}
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg`}>
              <feature.icon size={28} weight="duotone" className="text-white" />
            </div>

            {feature.status && (
              <span className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                {feature.status}
              </span>
            )}
          </div>
        </div>

        {/* Visualizations Area */}
        <div className="flex-1 min-h-[200px] relative mb-6">

          {/* Lead Generation Visual */}
          {feature.integrations && feature.integrations.length > 0 && (
            <div className="mt-6 relative">
              <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary/30 via-accent/30 to-primary/30 group-hover:from-primary/60 group-hover:via-accent/60 group-hover:to-primary/60 transition-all duration-700"></div>
              <div className="space-y-3 relative">
                {feature.integrations.map((integration: any, idx: number) => (
                  <div
                    key={idx}
                    className={`bg-[#2a2a2a] rounded-xl p-3 flex items-center gap-3 hover:bg-[#333333] relative z-10 transition-all duration-700 ease-out border border-white/5
                      ${idx === 0 ? 'group-hover:translate-y-[calc(100%+0.75rem)]' : ''}
                      ${idx === 1 ? 'group-hover:-translate-y-[calc(100%+0.75rem)]' : ''}
                      hover:scale-105 hover:border-primary/30`}
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

          {/* Data Processing Visual */}
          {feature.hasChart && (
            <div className="mt-6 relative h-64 flex items-end justify-center gap-3 px-2 py-4 overflow-hidden">
              <div className="absolute top-0 left-0 flex items-center gap-2 transition-all duration-500 group-hover:opacity-0">
                <div className="w-3 h-3 rounded-full bg-muted-foreground/40"></div>
                <span className="text-sm text-muted-foreground">Before Helium</span>
              </div>
              <div className="absolute top-0 left-0 flex items-center gap-2 opacity-0 transition-all duration-500 group-hover:opacity-100">
                <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))] animate-pulse"></div>
                <span className="text-sm text-primary font-semibold">After Helium</span>
              </div>

              <div className="absolute top-12 left-8 opacity-0 scale-90 transition-all duration-500 delay-[600ms] group-hover:opacity-100 group-hover:scale-100 z-20">
                <div className="bg-background/90 backdrop-blur-sm border border-primary/30 rounded-xl px-4 py-2.5 shadow-[0_0_20px_hsl(var(--primary)/0.3)]">
                  <span className="text-2xl font-semibold text-primary">87% +</span>
                </div>
              </div>

              {[
                { active: 45, inactive: 21 },
                { active: 60, inactive: 28 },
                { active: 38, inactive: 19 },
                { active: 32, inactive: 15 },
                { active: 65, inactive: 32 },
                { active: 40, inactive: 20 }
              ].map((bar, idx) => (
                <div key={idx} className="relative flex-1 max-w-[24px] h-full flex flex-col justify-end items-center group/bar">
                  <div
                    className={`chart-bar-active chart-bar-${idx} w-full rounded-t-full bg-primary shadow-[0_0_15px_hsl(var(--primary)/0.3)] absolute bottom-0`}
                    style={{ animationDelay: `${idx * 100}ms` }}
                  ></div>
                  <div
                    className="w-full rounded-t-full bg-muted/30 relative z-10 transition-all duration-300 group-hover/bar:bg-muted/50"
                    style={{ height: `${bar.inactive}%` }}
                  ></div>
                </div>
              ))}
            </div>
          )}

          {/* AI Chatbot Visual */}
          {feature.hasChatbot && (
            <div className="mt-6 relative h-64 flex flex-col justify-center px-2 py-4">
              <p className="text-muted-foreground text-sm italic mb-3 transition-all duration-500 group-hover:-translate-y-3">Customer Query</p>
              <div className="bg-[#2a2a2a] border border-white/5 text-white rounded-3xl px-5 py-3.5 max-w-[90%] mb-3 transition-all duration-500 group-hover:-translate-y-3 shadow-lg">
                <p className="text-sm">What are your business hours?</p>
              </div>

              <div className="flex items-start gap-3 mb-2 transition-all duration-500 group-hover:-translate-y-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent p-[1px]">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="AI" className="w-full h-full object-cover opacity-80" />
                  </div>
                </div>
                <div className="flex-1 opacity-0 scale-95 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 group-hover:delay-300">
                  <div className="bg-primary/20 border border-primary/20 text-white rounded-3xl px-5 py-3.5 mb-2">
                    <p className="text-sm">We are here for you 24/7, let me know how we can help you.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Workflow Automation Visual */}
          {feature.hasWorkflow && (
            <div className="mt-6 relative h-64 w-full overflow-hidden">
              {/* Connecting Lines (SVG) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <path d="M80 60 C 150 60, 150 120, 250 120" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                <path d="M80 120 C 150 120, 150 120, 250 120" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                <path d="M80 180 C 150 180, 150 120, 250 120" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />

                {/* Animated paths on hover */}
                <path d="M80 60 C 150 60, 150 120, 250 120" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="200" strokeDashoffset="200" className="transition-all duration-[1.5s] ease-in-out group-hover:stroke-dashoffset-0" />
                <path d="M80 120 C 150 120, 150 120, 250 120" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="200" strokeDashoffset="200" className="transition-all duration-[1.5s] delay-300 ease-in-out group-hover:stroke-dashoffset-0" />
                <path d="M80 180 C 150 180, 150 120, 250 120" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="200" strokeDashoffset="200" className="transition-all duration-[1.5s] delay-500 ease-in-out group-hover:stroke-dashoffset-0" />
              </svg>

              {/* Nodes */}
              <div className="absolute top-8 left-4 z-10 flex items-center gap-3 bg-[#2a2a2a] border border-white/5 p-2 rounded-xl pr-4 transition-all duration-500 group-hover:scale-105 group-hover:border-primary/30">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-white">
                  <User weight="fill" size={16} />
                </div>
                <div className="text-xs">
                  <p className="text-white font-medium">Emma</p>
                  <p className="text-muted-foreground">RetailSync</p>
                </div>
              </div>

              <div className="absolute top-[calc(50%-24px)] left-4 z-10 flex items-center gap-3 bg-[#2a2a2a] border border-white/5 p-2 rounded-xl pr-4 transition-all duration-500 delay-100 group-hover:scale-105 group-hover:border-primary/30">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-white">
                  <User weight="fill" size={16} />
                </div>
                <div className="text-xs">
                  <p className="text-white font-medium">Liam</p>
                  <p className="text-muted-foreground">FinEdge</p>
                </div>
              </div>

              <div className="absolute bottom-8 left-4 z-10 flex items-center gap-3 bg-[#2a2a2a] border border-white/5 p-2 rounded-xl pr-4 transition-all duration-500 delay-200 group-hover:scale-105 group-hover:border-primary/30">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-white">
                  <User weight="fill" size={16} />
                </div>
                <div className="text-xs">
                  <p className="text-white font-medium">Olivia</p>
                  <p className="text-muted-foreground">GreenTech</p>
                </div>
              </div>

              {/* Central Hub */}
              <div className="absolute top-1/2 right-8 -translate-y-1/2 w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_30px_hsl(var(--primary)/0.4)] z-20 transition-all duration-500 group-hover:scale-110">
                <ShareNetwork size={24} weight="fill" className="text-white" />
              </div>
            </div>
          )}

          {/* Custom AI Integrations Visual */}
          {feature.hasIntegrations && (
            <div className="mt-6 relative h-64 w-full flex items-center justify-center overflow-hidden">
              {/* Central Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_30px_hsl(var(--primary)/0.4)] z-20 relative">
                <Cpu size={32} weight="duotone" className="text-white" />

                {/* Ripple Effect */}
                <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-ping"></div>
              </div>

              {/* Orbiting Icons */}
              <div className="absolute inset-0 animate-[spin_20s_linear_infinite] group-hover:pause">
                {/* Orbit 1 */}
                <div className="absolute top-1/2 left-1/2 w-[180px] h-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"></div>

                {/* Icons on Orbit */}
                {[
                  { Icon: NotionLogo, angle: 0 },
                  { Icon: FigmaLogo, angle: 72 },
                  { Icon: SlackLogo, angle: 144 },
                  { Icon: WhatsappLogo, angle: 216 },
                  { Icon: Lightning, angle: 288 },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="absolute top-1/2 left-1/2 w-10 h-10 -ml-5 -mt-5 rounded-lg flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110"
                    style={{
                      transform: `rotate(${item.angle}deg) translate(90px) rotate(-${item.angle}deg)`,
                    }}
                  >
                    <div className="w-full h-full rounded-lg bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-white border border-white/10">
                      <item.Icon size={20} weight="fill" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Inner Orbit */}
              <div className="absolute inset-0 animate-[spin_15s_linear_infinite_reverse] group-hover:pause">
                <div className="absolute top-1/2 left-1/2 w-[100px] h-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"></div>
                {[
                  { Icon: Globe, angle: 45 },
                  { Icon: Robot, angle: 225 },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="absolute top-1/2 left-1/2 w-8 h-8 -ml-4 -mt-4 rounded-lg flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110"
                    style={{
                      transform: `rotate(${item.angle}deg) translate(50px) rotate(-${item.angle}deg)`,
                    }}
                  >
                    <div className="w-full h-full rounded-lg bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-white border border-white/10">
                      <item.Icon size={16} weight="fill" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        <h3 className="text-2xl font-medium mb-3 text-white group-hover:text-primary transition-colors duration-300 relative z-10">
          {feature.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed relative z-10">
          {feature.description}
        </p>
      </div>
    </div>
  );
};

export default Features;
