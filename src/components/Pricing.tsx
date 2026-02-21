import { Button } from "@/components/ui/button";
import { Check } from "@phosphor-icons/react";

const Pricing = () => {
  const plans = [
    {
      name: "Website Upgrade",
      price: "€997",
      priceLabel: "STARTING FROM",
      period: "ONE-TIME",
      description: "A modern, professional website that makes the right first impression",
      subPriceNote: "",
      features: [
        "Custom responsive website",
        "Mobile-optimized design",
        "Basic SEO setup",
        "Contact form & Google Maps",
        "Click-to-call phone & email links",
        "14-day delivery",
      ],
      ctaText: "Get Started",
      recommended: false,
      sphereType: "single",
    },
    {
      name: "Growth Package",
      price: "€4,997",
      priceLabel: "STARTING FROM",
      period: "ONE-TIME SETUP",
      description: "Your website plus AI tools that actively bring in new customers",
      subPriceNote: "Then €149/mo for AI tools & support",
      features: [
        "Everything in Website Upgrade",
        "AI chatbot - answers customers 24/7",
        "Automated appointment booking",
        "Google Business optimization",
        "WhatsApp & email follow-ups",
        "Lead tracking dashboard",
        "Priority support",
      ],
      ctaText: "Get Started",
      recommended: true,
      sphereType: "double",
    },
    {
      name: "Full Autopilot",
      price: "Let's Talk",
      priceLabel: "CUSTOM",
      period: "TAILORED TO YOUR BUSINESS",
      description:
        "Complete AI-powered business automation - you focus on the work, we handle the rest",
      subPriceNote: "",
      features: [
        "Everything in Growth Package",
        "Social media automation",
        "CRM integration",
        "Custom AI workflows",
        "Invoicing & scheduling automation",
        "Ongoing optimization & updates",
        "Dedicated account manager",
      ],
      ctaText: "Book a Call",
      recommended: false,
      sphereType: "triple",
    },
  ];

  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-16 scroll-reveal">
          <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
            PRICING
          </span>
          <h2 className="text-5xl md:text-6xl font-light tracking-tight">
            Choose Your Growth Plan
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed mt-6">
            Start with a stunning website. Scale up with AI-powered automation
            that brings you more customers on autopilot.
          </p>
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
                    MOST POPULAR
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
                <p className="text-primary text-sm tracking-[0.18em] uppercase mb-2">
                  {plan.priceLabel}
                </p>
                <span className="text-5xl font-light tracking-tight">
                  {plan.price}
                </span>
                <p className="text-muted-foreground text-xs tracking-wider mt-2 uppercase">
                  {plan.period}
                </p>
                {plan.subPriceNote && (
                  <p className="text-muted-foreground text-sm mt-4 pt-4 border-t border-white/10">
                    {plan.subPriceNote}
                  </p>
                )}
              </div>

              {/* CTA Button */}
              <Button
                className="w-full py-6 rounded-xl font-medium bg-secondary/60 hover:bg-secondary/80 border border-white/5 text-foreground transition-all duration-300"
              >
                {plan.ctaText}
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
