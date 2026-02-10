const FeaturedIn = () => {
  const logos = [
    "Forbes",
    "Product Hunt",
    "Y Combinator",
    "TechCrunch",
    "Automation Weekly",
    "VentureBeat",
    "Business Insider"
  ];

  // Duplicate logos to create seamless loop
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="py-16 border-y border-white/5 relative overflow-hidden bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-6 relative z-10">
        <p className="text-center text-sm text-muted-foreground mb-10 uppercase tracking-widest font-medium opacity-60">
          Trusted by companies worldwide
        </p>

        <div className="relative w-full overflow-hidden mask-linear-fade">
            <div
              className="flex items-center gap-16 md:gap-20 whitespace-nowrap"
              style={{
                animation: "marquee-horizontal 45s linear infinite",
                width: "fit-content"
              }}
            >
              {duplicatedLogos.map((logo, index) => (
                <span
                  key={`${logo}-${index}`}
                  className="text-2xl md:text-3xl font-bold text-white/30 hover:text-white/70 transition-all duration-500 cursor-default select-none"
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  {logo}
                </span>
              ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedIn;
