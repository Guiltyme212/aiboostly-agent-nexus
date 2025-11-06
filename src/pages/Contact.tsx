import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EnvelopeSimple, Phone, MapPin } from "@phosphor-icons/react";

const Contact = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      
      <section id="contact" className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-6xl font-light mb-6">Get In Touch</h1>
              <p className="text-xl text-muted-foreground opacity-90">
                Ready to automate your workflow? Let's talk.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="glass-card p-12 rounded-2xl">
                <h2 className="text-2xl font-light mb-8">Send us a message</h2>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">Name</label>
                    <Input className="bg-secondary/50 border-white/10" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">Email</label>
                    <Input className="bg-secondary/50 border-white/10" placeholder="your@email.com" type="email" />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">Company</label>
                    <Input className="bg-secondary/50 border-white/10" placeholder="Your company" />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-muted-foreground">Message</label>
                    <Textarea 
                      className="bg-secondary/50 border-white/10 min-h-[150px]" 
                      placeholder="Tell us about your automation needs..."
                    />
                  </div>
                  <Button className="neumorphic-button w-full py-6 rounded-full font-light">
                    Send Message
                  </Button>
                </form>
              </div>

              <div className="space-y-8">
                <div className="glass-card p-8 rounded-2xl">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <EnvelopeSimple size={24} weight="light" className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Email</h3>
                      <p className="text-muted-foreground opacity-90">hello@aiboostly.com</p>
                      <p className="text-muted-foreground opacity-90">support@aiboostly.com</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-8 rounded-2xl">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone size={24} weight="light" className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Phone</h3>
                      <p className="text-muted-foreground opacity-90">+1 (555) 123-4567</p>
                      <p className="text-sm text-muted-foreground opacity-70 mt-1">Mon-Fri 9am-6pm EST</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-8 rounded-2xl">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin size={24} weight="light" className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Office</h3>
                      <p className="text-muted-foreground opacity-90">
                        123 Automation Street
                        <br />
                        San Francisco, CA 94105
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Contact;
