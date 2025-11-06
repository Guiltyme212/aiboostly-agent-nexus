import { Card } from "@/components/ui/card";
import { ClipboardText, Gear, RocketLaunch } from "@phosphor-icons/react";

const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "Share Your Workflow",
      description:
        "From lead gen to client onboarding, just share your workflow and the tools you use.",
      icon: ClipboardText,
      iconBg: "bg-primary/10",
    },
    {
      number: "2",
      title: "We Build the System",
      description:
        "We design and set up custom automations that connect your tools with AI—so work happens while you sleep.",
      icon: Gear,
      iconBg: "bg-accent/10",
    },
    {
      number: "3",
      title: "Launch and Take Control",
      description: "You get a plug-and-play dashboard with a walkthrough to manage everything easily.",
      icon: RocketLaunch,
      iconBg: "bg-primary/10",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-5xl font-light mb-4">How it works</h2>
          <p className="text-muted-foreground text-lg">Three simple steps to automation</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="glass-card p-8 relative hover:scale-105 transition-all duration-500 floating-animation scroll-reveal"
              style={{ animationDelay: `${index * 0.2}s`, animationDuration: `${6 + index}s` }}
            >
              <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-2xl font-light">
                {step.number}
              </div>
              
              <div className={`w-16 h-16 rounded-2xl ${step.iconBg} flex items-center justify-center mb-6`}>
                <step.icon size={32} weight="light" className="text-primary" />
              </div>

              <h3 className="text-2xl font-light mb-4">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed opacity-90">{step.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
