import { useState, useEffect } from "react";
import { List, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import SpotlightCard from "@/components/SpotlightCard";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#how-it-works");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#how-it-works", label: "How it works" },
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "#blog", label: "Blog" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/10 shadow-sm"
        : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
              <div className="w-5 h-5 rounded bg-background"></div>
            </div>
            <span className="text-xl font-medium tracking-tight group-hover:text-primary transition-colors duration-300">AiBoostly</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 flex-1 justify-center">
            <div
              className="relative overflow-hidden group flex items-center gap-1 bg-[#0f1110]/50 border border-white/10 rounded-full px-1.5 py-1.5 backdrop-blur-md transition-all duration-300 hover:bg-[#202322]/85 hover:border-white/20 hover:shadow-lg"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
              }}
            >
              <div
                className="pointer-events-none absolute -inset-px rounded-full opacity-0 transition duration-300 group-hover:opacity-100 z-0"
                style={{
                  background: `radial-gradient(150px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(50, 205, 135, 0.15), transparent 100%)`
                }}
              />
              <div className="flex items-center gap-1 relative z-10 w-full">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setActiveLink(link.href)}
                    className={`text-sm px-4 py-2 rounded-full transition-all duration-300 ${activeLink === link.href
                      ? "bg-white/10 text-white font-medium shadow-sm"
                      : "text-white/80 hover:text-white"
                      }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <Button className="neumorphic-button px-6 py-2 rounded-full font-medium">
              Book a Call
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} weight="light" /> : <List size={24} weight="light" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 h-screen w-full bg-background/95 backdrop-blur-xl transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-2xl text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button className="neumorphic-button px-8 py-3 rounded-full text-lg font-medium mt-4">
            Book a Call
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
