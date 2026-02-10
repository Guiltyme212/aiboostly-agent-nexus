import { useState } from "react";
import { EnvelopeSimple, CalendarDots, Table, Database, ChatsCircle, ArrowsClockwise, Plugs, ShareNetwork } from "@phosphor-icons/react";
import { MagicBento, ParticleCard } from "./MagicBento";
import MagicBentoControls, { MagicBentoSettings } from "./MagicBentoControls";

// Tool Icon Components
const GmailIcon = () => <EnvelopeSimple size={22} weight="fill" />;

const AirtableIcon = () => <Table size={22} weight="fill" />;

const ZoomIcon = () => <CalendarDots size={22} weight="fill" />;

const Features = () => {
  const [settings, setSettings] = useState<MagicBentoSettings>({
    spotlightRadius: 300,
    enableStars: true,
    enableSpotlight: true,
    enableTilt: true,
    clickEffect: true,
    enableMagnetism: true,
    disableAnimations: false,
    textAutoHide: false,
    enableBorderGlow: true,
  });

  const features = [
    {
      title: "Lead Generation & Outreach",
      description: "Automate lead sourcing, email follow-ups, and engagement to grow your business effortlessly.",
      icon: EnvelopeSimple,
      gradient: "from-[#d7cfcf] to-[#9198e5]",
      layoutClass: "feature-card--lead",
      integrations: [
        { name: "Gmail", subtitle: "Compose a mail", IconComponent: GmailIcon },
        { name: "AirTable", subtitle: "Send mail to the users", IconComponent: AirtableIcon },
        { name: "Zoom", subtitle: "Schedule the call", IconComponent: ZoomIcon },
      ],
    },
    {
      title: "Data Processing & Insights",
      description: "Turn raw data into actionable insights with AI-powered analytics.",
      icon: Database,
      gradient: "from-[#9198e5] to-[#712020]",
      layoutClass: "feature-card--voice-assistant",
      hasChart: true,
    },
    {
      title: "AI-Powered Chatbots",
      description: "Enhance customer support with intelligent, 24/7 AI chatbots that handle queries instantly.",
      icon: ChatsCircle,
      gradient: "from-[#9198e5] to-[#712020]",
      layoutClass: "feature-card--chatbot",
      hasChatbot: true,
    },
    {
      title: "Workflow Automation",
      description: "Streamline repetitive tasks with AI-driven workflows that save time and boost efficiency.",
      icon: ArrowsClockwise,
      gradient: "from-[#16a34a] to-[#059669]",
      layoutClass: "feature-card--workflow",
      hasWorkflow: true,
    },
    {
      title: "Custom AI Integrations",
      description: "Seamlessly connect AI tools with your existing software—no technical setup required.",
      icon: Plugs,
      gradient: "from-[#16a34a] to-[#059669]",
      layoutClass: "feature-card--integrations",
      hasOrbit: true,
      orbitBubbles: [
        "https://framerusercontent.com/images/k24Cx8rTn5xpkZyXZyvSvQffc.png", // Zapier
        "https://framerusercontent.com/images/yWefXsZPObV4fD8QquOhab8d4.png", // Box/Package
        "https://framerusercontent.com/images/T3njBTXmxkEc1CZzG5dvC1njHo.png", // Framer
        "https://framerusercontent.com/images/5iHIu36qFoJDIvD1Bwd5YDTdOI.png", // OpenAI
        "https://framerusercontent.com/images/3a9GFEXHjQzaqsDT9iVptyYNNw.png", // Notion
        "https://framerusercontent.com/images/LYokSJ3GJownsWcSPlqSVO4S8Vo.png", // Make
      ],
    },
    {
      title: "Voice Assistant",
      description: "AI voice agents that handle calls, FAQs and support for you.",
      icon: Database,
      gradient: "from-[#d5fdc9] to-[#c9c9c9]",
      layoutClass: "feature-card--data-primary",
      hasVoiceAssistant: true,
    },
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12 scroll-reveal">
          <h2 className="text-5xl md:text-6xl mb-4">What We Offer</h2>
        </div>

        <MagicBento
          textAutoHide={settings.textAutoHide}
          enableStars={settings.enableStars}
          enableSpotlight={settings.enableSpotlight}
          enableBorderGlow={settings.enableBorderGlow}
          enableTilt={settings.enableTilt}
          enableMagnetism={settings.enableMagnetism}
          clickEffect={settings.clickEffect}
          spotlightRadius={settings.spotlightRadius}
          disableAnimations={settings.disableAnimations}
          particleCount={12}
          glowColor="180, 0, 255"
        >
          {features.map((feature, index) => (
            <ParticleCard
              key={index}
              className={`magic-bento-card magic-bento-card--border-glow scroll-reveal group p-6 ${feature.layoutClass ?? ""}`}
              style={{
                animationDelay: `${index * 0.1}s`,
                background: 'linear-gradient(180deg, #0D0F0E 0%, #121513 100%)',
                boxShadow: 'inset 0 0 12px rgba(180,0,255,0.08), 0 0 30px rgba(180,0,255,0.06)'
              }}
              particleCount={0}
              glowColor="180, 0, 255"
              enableTilt={settings.enableTilt}
              clickEffect={settings.clickEffect}
              enableMagnetism={settings.enableMagnetism}
              disableAnimations={settings.disableAnimations}
            >
              <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-primary transition-colors duration-300 relative z-10" style={{ lineHeight: '1.3' }}>
                {feature.title}
              </h3>
              <p className="text-muted-foreground font-normal relative z-10 text-sm" style={{ lineHeight: '1.6' }}>
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
                        <div
                          className="w-10 h-10 flex items-center justify-center text-white"
                          style={{
                            background: "radial-gradient(75% 75% at 42.6% 59.6%, rgb(0,0,0) 0%, rgb(94,94,94) 100%)",
                            borderTop: "1.2px solid rgb(165,165,165)",
                            borderRadius: "120%",
                            boxShadow: "0 8px 20px rgba(0,0,0,0.45)",
                          }}
                        >
                          <div
                            style={{
                              width: "28px",
                              height: "28px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transform: "translateY(0)",
                            }}
                          >
                            <integration.IconComponent />
                          </div>
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
                  <div className="absolute top-1 left-4 flex items-center gap-2 transition-all duration-500 group-hover:opacity-0 z-10">
                    <div className="w-3 h-3 rounded-full bg-muted-foreground/40"></div>
                    <span className="text-sm text-muted-foreground">Before Boostly AI</span>
                  </div>
                  <div className="absolute top-1 left-4 flex items-center gap-2 opacity-0 transition-all duration-500 group-hover:opacity-100 z-10">
                    <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))] animate-pulse"></div>
                    <span className="text-sm text-primary font-semibold">After Boostly AI</span>
                  </div>

                  {/* Percentage Tooltip */}
                  <div className="absolute top-10 right-4 opacity-0 scale-90 transition-all duration-500 delay-[600ms] group-hover:opacity-100 group-hover:scale-100 z-20">
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
              {feature.hasOrbit && feature.orbitBubbles && (
                <div className="mt-6 relative h-80 flex items-center justify-center py-8">
                  {/* Central icon - n8n style workflow */}
                  <div
                    className="absolute z-10 w-20 h-20 flex items-center justify-center"
                    style={{
                      background: "radial-gradient(75% 75% at 42.6% 59.6%, rgb(0,0,0) 0%, rgb(94,94,94) 100%)",
                      borderTop: "1.2px solid rgb(165,165,165)",
                      borderRadius: "120%",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.5)"
                    }}
                  >
                    <ShareNetwork size={40} weight="duotone" className="text-white" />
                  </div>

                  {/* Orbiting bubbles */}
                  {feature.orbitBubbles.map((bubbleUrl, idx) => {
                    return (
                      <img
                        key={idx}
                        src={bubbleUrl}
                        alt={`Integration ${idx + 1}`}
                        className="absolute"
                        style={{
                          width: '80px',
                          height: '80px',
                          borderRadius: '50%',
                          animation: `orbit 20s linear infinite`,
                          animationDelay: `${-idx * (20 / feature.orbitBubbles.length)}s`,
                        }}
                      />
                    );
                  })}
                </div>
              )}

              {/* AI Chatbot Demo */}
              {feature.hasChatbot && (
                <div className="mt-5 relative h-72 flex flex-col justify-center px-1 py-2">
                  {/* Customer Query Label */}
                  <p className="text-muted-foreground text-sm italic mb-3">Customer Query</p>

                  {/* Query Bubble */}
                  <div className="bg-primary/90 text-white rounded-3xl px-4 py-3 max-w-[92%] mb-3">
                    <p className="text-sm leading-snug">What are your business hours?</p>
                  </div>

                  {/* Avatar and Response Container */}
                  <div className="flex items-start gap-2.5 mb-2 min-w-0">
                    {/* Avatar */}
                    <div className="w-11 h-11 rounded-full bg-muted overflow-hidden flex-shrink-0">
                      <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                        alt="AI Assistant"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Response - Hidden by default, shows on hover */}
                    <div className="flex-1 min-w-0 opacity-0 scale-95 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 group-hover:delay-200">
                      <div className="bg-[#2a2a2a] text-white rounded-3xl px-4 py-3 mb-2">
                        <p className="text-sm leading-snug">We are here for you 24/7, let me know how we can help you.</p>
                      </div>
                      <p className="text-muted-foreground text-[11px] italic text-right">Automated Response</p>
                    </div>

                    {/* Green Indicator - Shows on hover */}
                    <div className="w-8 h-8 rounded-lg bg-primary/90 flex-shrink-0 opacity-0 scale-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 group-hover:delay-150"></div>
                  </div>
                </div>
              )}

              {/* Workflow Automation Demo */}
              {feature.hasWorkflow && (
                <div className="mt-6 relative h-[23rem] py-3">
                  <div className="relative h-[15rem]">
                    <div className="pointer-events-none absolute inset-0 z-0 block">
                      <svg
                        className="workflow-link-svg absolute inset-0 h-full w-full"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        <defs>
                          <linearGradient id="workflowCableGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(31, 54, 43, 0.95)" />
                            <stop offset="52%" stopColor="rgba(85, 135, 111, 0.92)" />
                            <stop offset="100%" stopColor="rgba(31, 54, 43, 0.95)" />
                          </linearGradient>
                        </defs>
                        <path
                          className="workflow-link-base"
                          d="M 63 67 C 73 67, 80 67, 84 62 C 88 58, 89 42, 84 34 C 80 27, 73 24, 63 24"
                          stroke="url(#workflowCableGradient)"
                        />
                        <path
                          className="workflow-link-snake"
                          d="M 63 67 C 73 67, 80 67, 84 62 C 88 58, 89 42, 84 34 C 80 27, 73 24, 63 24"
                          pathLength="100"
                        />
                        <circle className="workflow-cable-joint" cx="63" cy="67" r="0.75" />
                      </svg>

                      <div className="workflow-node absolute right-8 top-[38%] h-14 w-14 rounded-2xl bg-primary/85 shadow-[0_10px_28px_hsl(var(--primary)/0.35)] transition-all duration-500 group-hover:scale-105">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent"></div>
                        <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-emerald-950/55 shadow-inner shadow-black/40"></div>
                      </div>

                      <div className="workflow-midline absolute left-[36%] top-[68%] h-4 w-px bg-primary/80"></div>
                    </div>

                    <div className="relative z-10 pr-0 md:pr-28">
                      <div
                        className="rounded-3xl p-4 flex gap-3 items-start shadow-lg transition-all duration-500"
                        style={{
                          background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.9) 0%, hsl(var(--primary) / 0.85) 50%, hsl(var(--primary) / 0.8) 100%)',
                          boxShadow: 'inset 8px -8px 20px rgba(0, 0, 0, 0.4), 0 8px 32px rgba(0, 0, 0, 0.3)',
                        }}
                      >
                        <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0">
                          <img
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
                            alt="Emma"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <h4 className="text-white font-medium text-sm">Emma, RetailSync</h4>
                            <span className="text-white/80 text-xs">09:45 PM</span>
                          </div>
                          <p className="text-white/85 text-sm leading-snug">"We're looking to automate inventory updates. Can you help?"</p>
                          <p className="text-white/65 text-sm italic mt-1.5">Replying now...</p>
                        </div>
                      </div>

                      <div className="relative mt-3 h-[10.5rem]">
                        <div className="absolute inset-x-0 top-0 h-[4.75rem] bg-[#2a2a2a] rounded-2xl p-3 flex gap-3 items-start shadow-md transition-all duration-500 ease-out z-20 group-hover:translate-y-[5.25rem] group-hover:z-10">
                          <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                            <img
                              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                              alt="Liam"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0 overflow-hidden">
                            <div className="flex items-start justify-between mb-1 gap-2">
                              <h4 className="text-white font-medium text-sm truncate">Liam, FinEdge Analytics</h4>
                              <span className="text-muted-foreground text-xs flex-shrink-0">12:45 AM</span>
                            </div>
                            <p className="text-muted-foreground text-sm leading-snug whitespace-nowrap overflow-hidden text-ellipsis">"How does your AI handle financial data processing?"</p>
                          </div>
                          <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                          </div>
                        </div>

                        <div className="absolute inset-x-0 top-[5.25rem] h-[4.75rem] bg-[#2a2a2a] rounded-2xl p-3 flex gap-3 items-start shadow-md transition-all duration-500 ease-out z-10 group-hover:-translate-y-[5.25rem] group-hover:z-20">
                          <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                            <img
                              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop"
                              alt="Olivia"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0 overflow-hidden">
                            <div className="flex items-start justify-between mb-1 gap-2">
                              <h4 className="text-white font-medium text-sm truncate">Olivia, GreenTech Solutions</h4>
                              <span className="text-muted-foreground text-xs flex-shrink-0">02:45 AM</span>
                            </div>
                            <p className="text-muted-foreground text-sm leading-snug whitespace-nowrap overflow-hidden text-ellipsis">"Looking for AI automation to streamline customer inquiries. Can we discuss?"</p>
                          </div>
                          <div className="w-4 h-4 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                            <EnvelopeSimple size={10} weight="fill" className="text-primary" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Voice Assistant Demo */}
              {feature.hasVoiceAssistant && (
                <div className="mt-6 relative h-80 flex items-center justify-center overflow-hidden">
                  {/* Blurred circular gradient background */}
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      filter: 'blur(60px)',
                      opacity: 0.5
                    }}
                  >
                    <div
                      className="w-48 h-48 rounded-full"
                      style={{
                        background: 'radial-gradient(circle, hsl(var(--primary) / 0.8) 0%, hsl(var(--primary) / 0) 70%)'
                      }}
                    />
                  </div>

                  {/* Animated waveform lines */}
                  <div className="absolute inset-0 flex items-center justify-center gap-1.5 px-4">
                    {[45, 65, 38, 52, 70, 42, 58, 48, 62, 40, 68, 50, 72, 55, 60, 35, 65, 43, 58, 50, 62, 48, 55, 45, 68, 52, 60, 38, 65, 50].map((height, idx) => (
                      <div
                        key={idx}
                        className="voice-wave-bar flex-shrink-0"
                        style={{
                          width: '3px',
                          height: `${height}%`,
                          background: 'radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0) 0%, hsl(var(--primary)) 50%, rgba(255, 255, 255, 0) 100%)',
                          borderRadius: '2px',
                          animation: `voiceWave 2s ease-in-out infinite`,
                          animationDelay: `${idx * 0.05}s`,
                          opacity: 0.85
                        }}
                      />
                    ))}
                  </div>

                  {/* Central icon with layered borders */}
                  <div className="relative z-20 flex items-center justify-center">
                    <div
                      className="absolute w-32 h-32 rounded-full border-2 backdrop-blur-md"
                      style={{
                        borderColor: 'hsl(var(--primary) / 0.08)',
                        background: 'rgba(0, 0, 0, 0.3)'
                      }}
                    />
                    <div
                      className="w-28 h-28 rounded-full border-2 flex items-center justify-center relative"
                      style={{
                        borderColor: 'hsl(var(--primary) / 0.15)',
                        background: 'hsl(var(--primary) / 0.08)'
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="w-14 h-14 relative z-10"
                        style={{
                          color: 'hsl(var(--primary) / 0.85)',
                          filter: 'drop-shadow(0 0 3px hsl(var(--primary) / 0.3))'
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </ParticleCard>
          ))}
        </MagicBento>
      </div>

      {/* Floating Customization Controls */}
      <MagicBentoControls
        initialSettings={settings}
        onSettingsChange={setSettings}
      />
    </section>
  );
};

export default Features;
