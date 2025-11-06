import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { CalendarBlank, Clock } from "@phosphor-icons/react";

const Blog = () => {
  const articles = [
    {
      title: "How AI Agents Are Transforming Customer Support",
      excerpt: "Discover how AI-powered support agents can handle 80% of customer queries while maintaining a personal touch.",
      date: "Jan 15, 2025",
      readTime: "5 min",
      category: "AI Agents",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=400&fit=crop",
    },
    {
      title: "Automation vs Manual Work: The Real ROI Breakdown",
      excerpt: "A detailed analysis of how automation investments pay off within the first 90 days for most businesses.",
      date: "Jan 10, 2025",
      readTime: "7 min",
      category: "Automation",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop",
    },
    {
      title: "5 Operations Workflows You Should Automate Today",
      excerpt: "From data entry to report generation, these are the workflows delivering the highest ROI for our clients.",
      date: "Jan 5, 2025",
      readTime: "6 min",
      category: "Operations",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    },
    {
      title: "Building AI Agents That Scale: A Technical Deep Dive",
      excerpt: "The architecture and strategies behind creating AI agents that handle thousands of tasks daily.",
      date: "Dec 28, 2024",
      readTime: "10 min",
      category: "Technical",
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=400&fit=crop",
    },
  ];

  return (
    <main className="min-h-screen">
      <Navigation />
      
      <section id="blog" className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-6xl font-light mb-6">Blog</h1>
              <p className="text-xl text-muted-foreground opacity-90">
                Insights on AI automation, agents, and operations
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {articles.map((article, index) => (
                <Card key={index} className="glass-card overflow-hidden hover:scale-105 transition-all duration-300">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-8">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="text-primary font-medium">{article.category}</span>
                      <div className="flex items-center gap-1">
                        <CalendarBlank size={16} weight="light" />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={16} weight="light" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-light mb-3 hover:text-primary transition-colors cursor-pointer">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground opacity-90 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Blog;
