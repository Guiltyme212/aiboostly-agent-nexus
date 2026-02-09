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
    <section className="py-10 border-y border-white/5 relative overflow-hidden bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-6 relative z-10">
        <p className="text-center text-sm text-muted-foreground mb-8 uppercase tracking-widest font-medium opacity-60">
          Trusted by companies worldwide
        </p>

        <div className="relative w-full overflow-hidden mask-linear-fade">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-20"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-20"></div>

          {/* Slider Track */}
          <div
            className="flex items-center gap-16 whitespace-nowrap"
            style={{
              animation: "marquee-horizontal 40s linear infinite",
              width: "fit-content"
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <span
                key={`${logo}-${index}`}
                className="text-2xl md:text-3xl font-bold text-white/40 hover:text-white/80 transition-colors duration-300"
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
