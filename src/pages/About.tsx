import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl font-light mb-8">About AiBoostly</h1>
            <p className="text-xl text-muted-foreground mb-12 opacity-90">
              We're on a mission to eliminate repetitive work through intelligent automation.
            </p>

            <div className="glass-card p-12 rounded-2xl mb-12">
              <h2 className="text-3xl font-light mb-6">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed mb-6 opacity-90">
                AiBoostly was founded in 2023 by a team of automation engineers and AI specialists who
                saw teams struggling with the same problem: too much manual work, not enough time to
                focus on what matters.
              </p>
              <p className="text-muted-foreground leading-relaxed opacity-90">
                We started building custom AI agents for startups and quickly realized the massive
                potential. Today, we've helped over 150 companies automate their workflows, save
                thousands of hours, and scale their operations without adding headcount.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-2xl font-light mb-4">Our Vision</h3>
                <p className="text-muted-foreground opacity-90">
                  A world where every business has access to intelligent automation, regardless of
                  technical expertise or budget.
                </p>
              </div>
              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-2xl font-light mb-4">Our Values</h3>
                <ul className="text-muted-foreground space-y-2 opacity-90">
                  <li>• Simplicity over complexity</li>
                  <li>• Results over buzzwords</li>
                  <li>• Partnership over transactions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
