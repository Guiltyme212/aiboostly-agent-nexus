import { Card } from "@/components/ui/card";
import { Star } from "@phosphor-icons/react";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Our support tickets dropped by 35% in the first month. The AI chatbot handles everything perfectly.",
      author: "Sarah Chen",
      role: "Head of Operations, TechFlow",
      result: "35% fewer tickets",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    {
      quote: "We saved 42 hours per month on data entry. The automation just works silently in the background.",
      author: "Marcus Rodriguez",
      role: "CEO, DataSync",
      result: "42h/month saved",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    {
      quote: "Lead qualification happens automatically now. Our sales team focuses only on hot prospects.",
      author: "Emily Thompson",
      role: "VP Sales, GrowthLabs",
      result: "3x qualified leads",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-5xl md:text-6xl mb-4">What Our Clients Say</h2>
          <p className="text-muted-foreground text-base leading-relaxed">Real results from real businesses</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="glass-card p-8 hover:scale-105 transition-transform duration-300 scroll-reveal"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} weight="fill" className="text-primary" />
                ))}
              </div>
              <p className="text-foreground mb-6 leading-relaxed">"{testimonial.quote}"</p>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full border-2 border-primary/30"
                />
                <div>
                  <p className="font-medium text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-primary font-medium">{testimonial.result}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
