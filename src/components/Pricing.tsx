import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "@phosphor-icons/react";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "STARTER",
      price: "$2,499",
      period: "ONE-TIME",
      description: "Perfect for small teams getting started with automation",
      features: [
        "1 AI agent",
        "Up to 3 tool integrations",
        "Basic dashboard",
        "Email support",
        "30-day implementation",
      ],
      recommended: false,
      sphereType: "single",
    },
    {
      name: "PRO",
      price: "$5,999",
      period: "ONE-TIME",
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
      sphereType: "double",
    },
    {
      name: "ENTERPRISE",
      price: "Custom",
      period: "PRICING",
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
      sphereType: "triple",
    },
  ];

  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-12 scroll-reveal">
          <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
            PRICINGS
          </span>
          <h2 className="text-5xl md:text-6xl font-light tracking-tight">
            Our Subscriptions
          </h2>
        </div>

        {/* Toggle */}
        <div className="mb-16 scroll-reveal">
          <div className="inline-flex items-center bg-secondary/40 rounded-full p-1.5 border border-white/5">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                !isYearly
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                isYearly
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="pricing-card relative rounded-3xl p-8 scroll-reveal"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Most Popular Badge */}
              {plan.recommended && (
                <div className="absolute top-6 right-6">
                  <span className="bg-secondary/80 backdrop-blur text-foreground text-xs font-medium px-4 py-2 rounded-full border border-white/10">
                    Most Popular
                  </span>
                </div>
              )}

              {/* 3D Sphere Icons */}
              <div className="mb-8 h-20 relative">
                {plan.sphereType === "single" && (
                  <div className="pricing-sphere-container">
                    <div className="pricing-sphere w-16 h-16" />
                  </div>
                )}
                {plan.sphereType === "double" && (
                  <div className="pricing-sphere-container relative">
                    <div className="pricing-sphere w-14 h-14" />
                    <div className="pricing-sphere w-10 h-10 absolute top-2 left-10" />
                  </div>
                )}
                {plan.sphereType === "triple" && (
                  <div className="pricing-sphere-container relative">
                    <div className="pricing-sphere w-12 h-12" />
                    <div className="pricing-sphere w-9 h-9 absolute -top-1 left-8" />
                    <div className="pricing-sphere w-7 h-7 absolute top-6 left-14" />
                  </div>
                )}
              </div>

              {/* Plan Name */}
              <h3 className="text-xl font-semibold tracking-wide mb-3">
                {plan.name}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 pr-8">
                {plan.description}
              </p>

              {/* Divider */}
              <div className="h-px bg-white/10 mb-8" />

              {/* Price */}
              <div className="mb-8">
                <span className="text-5xl font-light tracking-tight">
                  {plan.price}
                </span>
                <p className="text-muted-foreground text-xs tracking-wider mt-2 uppercase">
                  {plan.period}
                </p>
              </div>

              {/* CTA Button */}
              <Button
                className="w-full py-6 rounded-xl font-medium bg-secondary/60 hover:bg-secondary/80 border border-white/5 text-foreground transition-all duration-300"
              >
                Get Started
              </Button>

              {/* Divider */}
              <div className="h-px bg-white/10 my-8" />

              {/* Features */}
              <ul className="space-y-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check
                      size={18}
                      weight="bold"
                      className="text-primary mt-0.5 flex-shrink-0"
                    />
                    <span className="text-muted-foreground text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
