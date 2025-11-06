import { Card } from "@/components/ui/card";
import { Chats, ChartLineUp, Robot, Plugs } from "@phosphor-icons/react";

const Features = () => {
  const features = [
    {
      title: "AI Inbox & Auto-Replies",
      description: "Intelligent email handling that responds instantly and routes queries automatically.",
      icon: Chats,
      gradient: "from-primary/20 to-primary/5",
    },
    {
      title: "Sales & CRM Agents",
      description: "Automate lead qualification, follow-ups, and pipeline management with smart AI agents.",
      icon: ChartLineUp,
      gradient: "from-accent/20 to-accent/5",
    },
    {
      title: "Operations Agent",
      description: "Handle data entry, document processing, and workflow automation effortlessly.",
      icon: Robot,
      gradient: "from-primary/20 to-primary/5",
    },
    {
      title: "Tool Integrations",
      description: "Connect seamlessly with your CRM, Slack, Notion, email, and voice systems.",
      icon: Plugs,
      gradient: "from-accent/20 to-accent/5",
    },
  ];

  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-5xl font-light mb-4">What We Offer</h2>
          <p className="text-muted-foreground text-lg">Comprehensive AI automation services</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="glass-card p-8 hover:scale-105 transition-all duration-300 scroll-reveal"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6`}>
                <feature.icon size={32} weight="light" className="text-primary" />
              </div>
              <h3 className="text-2xl font-light mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed opacity-90">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
