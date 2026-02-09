const FeaturedIn = () => {
  const logos = [
    { name: "Forbes", opacity: 0.6 },
    { name: "Product Hunt", opacity: 0.5 },
    { name: "Y Combinator", opacity: 0.6 },
    { name: "TechCrunch", opacity: 0.5 },
    { name: "Automation Weekly", opacity: 0.6 },
  ];

  return (
    <section className="py-8 border-y border-white/10 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background"></div>
      <div className="container mx-auto px-6 relative z-10">
        <p className="text-center text-xs text-muted-foreground mb-4 uppercase tracking-wider font-medium">
          Featured In
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="text-2xl font-medium text-foreground transform scale-108"
              style={{ opacity: logo.opacity }}
            >
              {logo.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedIn;
