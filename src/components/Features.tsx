import { Chats, ChartLineUp, Robot, Plugs, EnvelopeSimple, Users, Database, VideoCamera } from "@phosphor-icons/react";

const Features = () => {
  const features = [
    {
      title: "Lead Generation & Outreach",
      description: "Automate lead sourcing, email follow-ups, and engagement to grow your business effortlessly.",
      icon: EnvelopeSimple,
      gradient: "from-[#d7cfcf] to-[#9198e5]",
      status: "Running Currently...",
      integrations: [
        { name: "Gmail", subtitle: "Compose a mail", icon: "M" },
        { name: "AirTable", subtitle: "Send mail to the users", icon: "📦" },
        { name: "Zoom", subtitle: "Schedule the call", icon: "🎥" },
      ],
    },
    {
      title: "Data Intelligence",
      description: "Turn raw data into actionable insights with AI-powered analytics.",
      icon: Database,
      gradient: "from-[#9198e5] to-[#712020]",
      status: "Active",
      integrations: [],
    },
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 scroll-reveal">
          <p className="text-primary text-sm uppercase tracking-widest mb-2">SERVICES</p>
          <h2 className="text-5xl font-light mb-4">What We Offer</h2>
          <p className="text-muted-foreground text-lg opacity-90">Comprehensive AI automation services tailored to your business</p>
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

                <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
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
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-lg font-bold">
                            {integration.icon}
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
