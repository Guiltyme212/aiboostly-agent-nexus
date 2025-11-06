const Mission = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center scroll-reveal">
          <h2 className="text-5xl md:text-6xl font-light mb-8 leading-tight">
            Built to Remove
            <br />
            <span className="text-primary">Repetitive Work</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed opacity-90 max-w-3xl mx-auto">
            We founded AiBoostly because teams were drowning in manual tasks. Our mission is simple:
            use AI agents to automate the busywork, so you can focus on what actually moves your
            business forward. Every automation we build is designed to save you time, reduce errors,
            and scale effortlessly.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Mission;
