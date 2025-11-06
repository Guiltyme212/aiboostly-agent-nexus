import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "@phosphor-icons/react";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$2,499",
      period: "one-time",
      description: "Perfect for small teams getting started with automation",
      features: [
        "1 AI agent",
        "Up to 3 tool integrations",
        "Basic dashboard",
        "Email support",
        "30-day implementation",
      ],
      recommended: false,
    },
    {
      name: "Pro",
      price: "$5,999",
      period: "one-time",
      description: "Most popular for growing businesses",
      features: [
        "3 AI agents",
        "Unlimited integrations",
        "Advanced dashboard",
        "Priority support",
        "Custom workflows",
        "14-day implementation",
      ],
      recommended: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For teams that need everything",
      features: [
        "Unlimited AI agents",
        "All integrations",
        "White-label dashboard",
        "Dedicated support",
        "Custom SLAs",
        "7-day implementation",
      ],
      recommended: false,
    },
  ];

  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-5xl md:text-6xl mb-4">Pricing</h2>
          <p className="text-muted-foreground text-base leading-relaxed">Choose the plan that fits your needs</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`glass-card p-8 relative hover:scale-105 transition-all duration-300 scroll-reveal ${
                plan.recommended ? "border-2 border-primary" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                  Recommended
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-medium mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">/ {plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check size={20} weight="bold" className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full py-6 rounded-full font-medium ${
                  plan.recommended
                    ? "neumorphic-button"
                    : "bg-secondary/50 backdrop-blur border border-white/10 hover:bg-secondary/70"
                }`}
              >
                Get Started
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
