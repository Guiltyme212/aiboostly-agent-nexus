import { Card } from "@/components/ui/card";
import { Chats, ChartLineUp, Robot, Plugs } from "@phosphor-icons/react";
import { useState } from "react";

const Features = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const features = [
    {
      title: "AI Inbox & Auto-Replies",
      description: "Intelligent email handling that responds instantly and routes queries automatically.",
      icon: Chats,
      gradient: "from-primary/20 to-primary/5",
      status: "Running Currently...",
    },
    {
      title: "Sales & CRM Agents",
      description: "Automate lead qualification, follow-ups, and pipeline management with smart AI agents.",
      icon: ChartLineUp,
      gradient: "from-accent/20 to-accent/5",
      status: "Active",
    },
    {
      title: "Operations Agent",
      description: "Handle data entry, document processing, and workflow automation effortlessly.",
      icon: Robot,
      gradient: "from-primary/20 to-primary/5",
      status: "Connected",
    },
    {
      title: "Tool Integrations",
      description: "Connect seamlessly with your CRM, Slack, Notion, email, and voice systems.",
      icon: Plugs,
      gradient: "from-accent/20 to-accent/5",
      status: "Synced",
    },
  ];

  const isCardAnimating = (index: number): string => {
    if (hoveredIndex === null) return '';
    
    const hoveredCol = hoveredIndex % 2;
    const currentCol = index % 2;
    const hoveredRow = Math.floor(hoveredIndex / 2);
    const currentRow = Math.floor(index / 2);
    
    // Only animate cards in the same column
    if (hoveredCol !== currentCol) return '';
    
    // Card directly below the hovered one
    if (currentRow === hoveredRow + 1) return 'animate-swap-up';
    
    // Card directly above the hovered one
    if (currentRow === hoveredRow - 1) return 'animate-swap-down';
    
    return '';
  };

  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 scroll-reveal">
          <p className="text-primary text-sm uppercase tracking-widest mb-2">SERVICES</p>
          <h2 className="text-5xl font-light mb-4">What We Offer</h2>
          <p className="text-muted-foreground text-lg opacity-90">Comprehensive AI automation services tailored to your business</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto relative">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`glass-card p-8 transition-all duration-500 scroll-reveal cursor-pointer relative overflow-hidden group ${isCardAnimating(index)}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
                {/* Animated border glow on hover */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 via-accent/10 to-transparent blur-xl"></div>
                </div>

                <div className="relative z-10">
                  {/* Icon and Status Badge */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                      <feature.icon size={32} weight="light" className="text-primary" />
                    </div>
                    
                    {/* Status Badge - appears on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                      <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 whitespace-nowrap">
                        {feature.status}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-light mb-4 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed opacity-90">
                    {feature.description}
                  </p>

                  {/* Hover indicator line */}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary via-accent to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
