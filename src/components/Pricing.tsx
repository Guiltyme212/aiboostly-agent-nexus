import { Button } from "@/components/ui/button";
import { Check, Lightning, RocketLaunch, Brain } from "@phosphor-icons/react";
import "./ElectricPricing.css";
const Pricing = () => {
  const plans = [
    {
      name: "New Website",
      price: "390",
      hasCurrency: true,
      period: "one-time payment",
      description: "A modern site that actually makes people pick up the phone.",
      subPriceNote: "",
      featuresTitle: "WHAT YOU GET",
      features: [
        { text: "Custom-designed modern website", isAI: false },
        { text: "Looks perfect on every device", isAI: false },
        { text: "Built to rank on Google", isAI: false },
        { text: "One-tap calling, contact form & directions", isAI: false },
        { text: "Hosted, secured & maintained", isAI: false },
        { text: "Live in 10 business days", isAI: false },
      ],
      ctaText: "Get started →",
      recommended: false,
      badgeText: "",
      icon: <Lightning size={24} weight="fill" className="text-orange-400" />,
    },
    {
      name: "Growth Engine",
      price: "990",
      hasCurrency: true,
      period: "one-time setup",
      description: "Your website + AI systems that bring in customers while you're on the job.",
      subPriceNote: "+ €149/mo for AI tools & support",
      featuresTitle: "EVERYTHING IN NEW WEBSITE, PLUS",
      features: [
        { text: "Missed-call text-back — never lose a lead again", isAI: true },
        { text: "AI employee on your website — answers questions 24/7", isAI: true },
        { text: "Smart follow-ups via WhatsApp & email", isAI: true },
        { text: "Online appointment booking", isAI: false },
        { text: "Google Business profile setup & optimization", isAI: false },
        { text: "5-star reviews on autopilot after every job", isAI: false },
        { text: "See every lead in one place — no more missed inquiries", isAI: false },
        { text: "Monthly check-in — we keep improving what works", isAI: false },
      ],
      ctaText: "Get started →",
      recommended: true,
      badgeText: "BEST VALUE",
      icon: <RocketLaunch size={24} weight="fill" className="text-rose-400" />,
    },
    {
      name: "Full Autopilot",
      price: "Let's talk",
      hasCurrency: false,
      period: "Custom — tailored to how your business runs",
      description: "We run your admin, marketing & customer follow-up — you focus on the work.",
      subPriceNote: "",
      featuresTitle: "EVERYTHING IN GROWTH ENGINE, PLUS",
      features: [
        { text: "Custom AI workflows — quotes, invoices & scheduling automated", isAI: true },
        { text: "Social media posts created & published for you", isAI: true },
        { text: "All your customer info in one system", isAI: false },
        { text: "Branded quote & invoice templates", isAI: false },
        { text: "Ongoing optimization & strategy", isAI: false },
        { text: "Dedicated account manager", isAI: false },
      ],
      ctaText: "Book a free call →",
      recommended: false,
      badgeText: "",
      icon: <Brain size={24} weight="fill" className="text-pink-400" />,
    },
  ];

  return (
    <section id="pricing" className="py-24 relative">
      {/* SVG Filters for Electric Border */}
      <svg className="w-0 h-0 absolute pointer-events-none">
        <defs>
          <filter id="electric-noise-orange" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
              <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
              <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="2" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
              <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="2" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
              <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
            <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />
            <feDisplacementMap in="SourceGraphic" in2="combinedNoise" scale="30" xChannelSelector="R" yChannelSelector="B" />
          </filter>

          <filter id="electric-noise-blue" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="7" />
            <feColorMatrix type="hueRotate" result="pt1">
              <animate attributeName="values" values="0;360;" dur=".6s" repeatCount="indefinite" calcMode="paced" />
            </feColorMatrix>
            <feComposite />
            <feTurbulence type="turbulence" baseFrequency="0.03" numOctaves="7" seed="5" />
            <feColorMatrix type="hueRotate" result="pt2">
              <animate attributeName="values" values="0; 333; 199; 286; 64; 168; 256; 157; 360;" dur="5s" repeatCount="indefinite" calcMode="paced" />
            </feColorMatrix>
            <feBlend in="pt1" in2="pt2" mode="normal" result="combinedNoise" />
            <feDisplacementMap in="SourceGraphic" scale="30" xChannelSelector="R" yChannelSelector="B" />
          </filter>

          <filter id="electric-noise-pink" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="7" />
            <feColorMatrix type="hueRotate" result="pt1">
              <animate attributeName="values" values="0;360;" dur=".8s" repeatCount="indefinite" calcMode="paced" />
            </feColorMatrix>
            <feComposite />
            <feTurbulence type="turbulence" baseFrequency="0.03" numOctaves="7" seed="8" />
            <feColorMatrix type="hueRotate" result="pt2">
              <animate attributeName="values" values="0; 120; 250; 360;" dur="4s" repeatCount="indefinite" calcMode="paced" />
            </feColorMatrix>
            <feBlend in="pt1" in2="pt2" mode="normal" result="combinedNoise" />
            <feDisplacementMap in="SourceGraphic" scale="30" xChannelSelector="R" yChannelSelector="B" />
          </filter>
        </defs>
      </svg>

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
          {plans.map((plan, index) => {
            const themeClass = index === 0 ? "theme-blue" : index === 1 ? "theme-orange" : "theme-pink";

            const cardContent = (
              <>
                {/* Badge */}
                {plan.recommended && (
                  <div className="absolute -top-4 left-6 z-20">
                    <span className="bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
                      {plan.badgeText}
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className="mb-6 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                    {plan.icon}
                  </div>
                </div>

                {/* Plan Name */}
                <h3 className="text-2xl font-bold tracking-tight mb-3 relative z-10">
                  {plan.name}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 pr-4 min-h-[40px] relative z-10">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6 relative z-10">
                  <div className="flex items-start">
                    {plan.hasCurrency && (
                      <span className="text-xl font-medium text-muted-foreground mt-2 mr-1">€</span>
                    )}
                    <span className="text-6xl font-bold tracking-tighter">
                      {plan.price}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mt-2">
                    {plan.period}
                  </p>
                  {plan.subPriceNote && (
                    <p className="text-primary text-sm font-medium mt-2">
                      {plan.subPriceNote}
                    </p>
                  )}
                </div>

                {/* Divider */}
                <div className="h-px bg-white/10 mb-8 relative z-10" />

                {/* Features Structure */}
                <div className="flex-grow relative z-10">
                  {plan.featuresTitle && (
                    <p className="text-muted-foreground/80 text-[11px] font-bold tracking-widest uppercase mb-6">
                      {plan.featuresTitle}
                    </p>
                  )}

                  <ul className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="mt-1 bg-primary/20 rounded-full p-0.5 flex-shrink-0">
                          <Check
                            size={12}
                            weight="bold"
                            className="text-primary"
                          />
                        </div>
                        <span className="text-gray-300 text-sm leading-tight flex-grow">
                          {feature.text}
                        </span>
                        {feature.isAI && (
                          <span className="flex-shrink-0 ml-2 bg-primary/20 text-primary text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center justify-center mt-0.5">
                            AI
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="pt-8 mt-auto relative z-10">
                  <Button
                    className={`w-full py-6 rounded-xl font-medium transition-all duration-300 ${plan.recommended
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "bg-secondary/60 hover:bg-secondary/80 border border-white/5 text-foreground"
                      }`}
                  >
                    {plan.ctaText}
                  </Button>
                </div>
              </>
            );

            return (
              <div key={index} className={`electric-card-container ${themeClass} scroll-reveal`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="inner-container">
                  <div className="border-outer">
                    <div className="main-card-border"></div>
                  </div>
                  <div className="glow-layer-1"></div>
                  <div className="glow-layer-2"></div>
                </div>

                <div className="overlay-1"></div>
                <div className="overlay-2"></div>
                <div className="background-glow"></div>

                <div className="content-container pricing-card p-8 flex flex-col h-full bg-[#0a0a0f] border-0">
                  {cardContent}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
