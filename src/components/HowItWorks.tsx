import { Card } from "@/components/ui/card";
import {
  EnvelopeSimple,
  CalendarDots,
  Table,
  FileText,
  ListBullets,
  ArrowsClockwise
} from "@phosphor-icons/react";
import heroDashboard from "@/assets/hero-dashboard.jpg";
import dashboardPreview from "@/assets/dashboard-preview.jpg";
import SpotlightCard from "@/components/SpotlightCard";
import { NotionIcon, MakeIcon, AirtableIcon, OpenAIIcon, FramerIcon } from "@/components/BrandIcons";

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 scroll-reveal">
          <p className="text-primary text-sm uppercase tracking-widest mb-3 font-medium">PROCESS</p>
          <h2 className="text-5xl md:text-6xl mb-4">How it works</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto relative" style={{ width: '92%', margin: '0 auto' }}>
          {/* Card 1 - Share Your Workflow */}
          <SpotlightCard spotlightColor="rgba(163, 56, 224, 0.4)">
            <Card className="glass-card p-12 relative transition-all duration-500 scroll-reveal shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]" style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}>
              <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl font-medium text-background">
                1
              </div>

              <h3 className="text-2xl font-semibold mb-4 pr-16">Share Your Workflow</h3>
              <p className="text-muted-foreground leading-relaxed mb-8" style={{ lineHeight: '1.6' }}>
                From lead gen to client onboarding, just share your workflow and the tools you use.
              </p>

              {/* Icon Bubbles - Z-shaped Diagonal Flow with Clear Size Hierarchy */}
              <div className="relative h-56 mt-8">
                {/* Upper Left - Checklist/Notion */}
                <div
                  className="absolute flex items-center justify-center text-white"
                  style={{
                    width: "80px",
                    height: "80px",
                    top: "40%",
                    left: "5%",
                    background: "radial-gradient(75% 75% at 42.6% 59.6%, rgb(0,0,0) 0%, rgb(94,94,94) 100%)",
                    borderTop: "1.2px solid rgb(165,165,165)",
                    borderRadius: "120%",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                    animation: "float 4s ease-in-out infinite",
                    animationDelay: "0s"
                  }}
                >
                  <div style={{
                    width: '52px',
                    height: '52px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: "rotate(15deg)",
                    mask: "radial-gradient(100% 100% at 98.5% 105.6%, transparent 0%, black 100%)",
                    WebkitMask: "radial-gradient(100% 100% at 98.5% 105.6%, transparent 0%, black 100%)"
                  }}>
                    <ListBullets size={52} weight="fill" />
                  </div>
                </div>

                {/* Upper Right - Mail/Gmail (BIGGEST - DOMINANT) */}
                <div
                  className="absolute flex items-center justify-center text-white"
                  style={{
                    width: "110px",
                    height: "110px",
                    top: "35%",
                    right: "10%",
                    background: "radial-gradient(75% 75% at 42.6% 59.6%, rgb(0,0,0) 0%, rgb(94,94,94) 100%)",
                    borderTop: "1.2px solid rgb(165,165,165)",
                    borderRadius: "120%",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                    animation: "float 4s ease-in-out infinite",
                    animationDelay: "0.4s"
                  }}
                >
                  <div style={{
                    width: '84px',
                    height: '84px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: "rotate(-15deg)",
                    mask: "radial-gradient(100% 100% at 98.5% 105.6%, transparent 0%, black 100%)",
                    WebkitMask: "radial-gradient(100% 100% at 98.5% 105.6%, transparent 0%, black 100%)"
                  }}>
                    <EnvelopeSimple size={84} weight="fill" />
                  </div>
                </div>

                {/* Mid Left - Calendar */}
                <div
                  className="absolute flex items-center justify-center text-white"
                  style={{
                    width: "68px",
                    height: "68px",
                    top: "92%",
                    left: "0%",
                    background: "radial-gradient(75% 75% at 42.6% 59.6%, rgb(0,0,0) 0%, rgb(94,94,94) 100%)",
                    borderTop: "1.2px solid rgb(165,165,165)",
                    borderRadius: "120%",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                    animation: "float 4s ease-in-out infinite",
                    animationDelay: "0.8s"
                  }}
                >
                  <div style={{
                    width: '44px',
                    height: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: "rotate(15deg)",
                    mask: "radial-gradient(100% 100% at 98.5% 105.6%, transparent 0%, black 100%)",
                    WebkitMask: "radial-gradient(100% 100% at 98.5% 105.6%, transparent 0%, black 100%)"
                  }}>
                    <CalendarDots size={44} weight="fill" />
                  </div>
                </div>

                {/* Mid Right - Airtable */}
                <div
                  className="absolute flex items-center justify-center text-white"
                  style={{
                    width: "52px",
                    height: "52px",
                    top: "107%",
                    right: "12%",
                    background: "radial-gradient(75% 75% at 42.6% 59.6%, rgb(0,0,0) 0%, rgb(94,94,94) 100%)",
                    borderTop: "1.2px solid rgb(165,165,165)",
                    borderRadius: "120%",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                    animation: "float 4s ease-in-out infinite",
                    animationDelay: "1.2s"
                  }}
                >
                  <div style={{
                    width: '34px',
                    height: '34px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: "rotate(-15deg)",
                    mask: "radial-gradient(100% 100% at 98.5% 105.6%, transparent 0%, black 100%)",
                    WebkitMask: "radial-gradient(100% 100% at 98.5% 105.6%, transparent 0%, black 100%)"
                  }}>
                    <Table size={34} weight="fill" />
                  </div>
                </div>

                {/* Bottom - Notion Note */}
                <div
                  className="absolute flex items-center justify-center text-white"
                  style={{
                    width: "56px",
                    height: "56px",
                    top: "118%",
                    left: "35%",
                    background: "radial-gradient(75% 75% at 42.6% 59.6%, rgb(0,0,0) 0%, rgb(94,94,94) 100%)",
                    borderTop: "1.2px solid rgb(165,165,165)",
                    borderRadius: "120%",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                    animation: "float 4s ease-in-out infinite",
                    animationDelay: "1.6s"
                  }}
                >
                  <div style={{
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: "rotate(15deg)",
                    mask: "radial-gradient(100% 100% at 98.5% 105.6%, transparent 0%, black 100%)",
                    WebkitMask: "radial-gradient(100% 100% at 98.5% 105.6%, transparent 0%, black 100%)"
                  }}>
                    <FileText size={36} weight="fill" />
                  </div>
                </div>
              </div>
            </Card>
          </SpotlightCard>

          {/* Card 2 - We Build the System */}
          <SpotlightCard spotlightColor="rgba(163, 56, 224, 0.4)">
            <Card className="glass-card p-12 relative hover:scale-105 transition-all duration-500 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]" style={{ animationDelay: "0.2s", background: 'transparent', border: 'none', boxShadow: 'none' }}>
              <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl font-medium text-background">
                2
              </div>

              <h3 className="text-2xl font-semibold mb-4 pr-16">We Build the System</h3>
              <p className="text-muted-foreground leading-relaxed mb-8" style={{ lineHeight: '1.6' }}>
                We design and set up custom automations that connect your tools with AI—so work happens while you sleep.
              </p>

              {/* Icon Bubbles - Animated with Vertical Flow */}
              <div className="relative h-80 mt-8 overflow-hidden flex items-center justify-end"
                style={{
                  WebkitMask: 'radial-gradient(133% 50% at 33% 45%, black 0%, transparent 100%)',
                  mask: 'radial-gradient(133% 50% at 33% 45%, black 0%, transparent 100%)',
                }}
              >
                {/* Inner container with linear fade mask */}
                <div className="absolute inset-0"
                  style={{
                    WebkitMaskImage: 'linear-gradient(transparent 0%, black 35%, black 65%, transparent 100%)',
                    maskImage: 'linear-gradient(transparent 0%, black 35%, black 65%, transparent 100%)',
                  }}
                >
                  {/* Moving Brand Icons - 5 in sequence */}
                  <div
                    className="absolute bottom-0 left-1/3 flex items-center justify-center z-10 text-white"
                    style={{
                      width: "96px",
                      height: "96px",
                      background: "radial-gradient(75% 75% at 42.6% 59.6%, rgb(0,0,0) 0%, rgb(94,94,94) 100%)",
                      borderTop: "0.8px solid rgba(165,165,165,0.3)",
                      borderRadius: "138.54%",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                      animation: "moveUpLoop 6s linear infinite backwards",
                      animationDelay: "0s"
                    }}
                  >
                    <div style={{
                      mask: "radial-gradient(100% 100% at 98.5% 105.6%, transparent 0%, black 100%)",
                      WebkitMask: "radial-gradient(100% 100% at 98.5% 105.6%, transparent 0%, black 100%)"
                    }}>
                      <NotionIcon size={48} />
                    </div>
                  </div>

                  <div
                    className="absolute bottom-0 left-1/3 flex items-center justify-center z-10 text-white"
                    style={{
                      width: "96px",
                      height: "96px",
                      background: "radial-gradient(75% 75% at 42.6% 59.6%, rgb(0,0,0) 0%, rgb(94,94,94) 100%)",
                      borderTop: "0.8px solid rgba(165,165,165,0.3)",
                      borderRadius: "138.54%",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                      animation: "moveUpLoop 6s linear infinite backwards",
                      animationDelay: "1.2s"
                    }}
                  >
                    <div style={{
                      mask: "radial-gradient(100% 100% at 98.5% 105.6%, transparent 0%, black 100%)",
                      WebkitMask: "radial-gradient(100% 100% at 98.5% 105.6%, transparent 0%, black 100%)"
                    }}>
                      <MakeIcon size={48} />
                    </div>
                  </div>

                  <div
                    className="absolute bottom-0 left-1/3 flex items-center justify-center z-10 text-white"
                    style={{
                      width: "96px",
                      height: "96px",
                      background: "radial-gradient(75% 75% at 42.6% 59.6%, rgb(0,0,0) 0%, rgb(94,94,94) 100%)",
                      borderTop: "0.8px solid rgba(165,165,165,0.3)",
                      borderRadius: "138.54%",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                      animation: "moveUpLoop 6s linear infinite backwards",
                      animationDelay: "2.4s"
                    }}
                  >
                    <div style={{
                      mask: "radial-gradient(100% 100% at 98.5% 105.6%, transparent 0%, black 100%)",
                      WebkitMask: "radial-gradient(100% 100% at 98.5% 105.6%, transparent 0%, black 100%)"
                    }}>
                      <AirtableIcon size={48} />
                    </div>
                  </div>

                  <div
                    className="absolute bottom-0 left-1/3 flex items-center justify-center z-10 text-white"
                    style={{
                      width: "96px",
                      height: "96px",
                      background: "radial-gradient(75% 75% at 42.6% 59.6%, rgb(0,0,0) 0%, rgb(94,94,94) 100%)",
                      borderTop: "0.8px solid rgba(165,165,165,0.3)",
                      borderRadius: "138.54%",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                      animation: "moveUpLoop 6s linear infinite backwards",
                      animationDelay: "3.6s"
                    }}
                  >
                    <div style={{
                      mask: "radial-gradient(100% 100% at 98.5% 105.6%, transparent 0%, black 100%)",
                      WebkitMask: "radial-gradient(100% 100% at 98.5% 105.6%, transparent 0%, black 100%)"
                    }}>
                      <OpenAIIcon size={48} />
                    </div>
                  </div>

                  <div
                    className="absolute bottom-0 left-1/3 flex items-center justify-center z-10 text-white"
                    style={{
                      width: "96px",
                      height: "96px",
                      background: "radial-gradient(75% 75% at 42.6% 59.6%, rgb(0,0,0) 0%, rgb(94,94,94) 100%)",
                      borderTop: "0.8px solid rgba(165,165,165,0.3)",
                      borderRadius: "138.54%",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                      animation: "moveUpLoop 6s linear infinite backwards",
                      animationDelay: "4.8s"
                    }}
                  >
                    <div style={{
                      mask: "radial-gradient(100% 100% at 98.5% 105.6%, transparent 0%, black 100%)",
                      WebkitMask: "radial-gradient(100% 100% at 98.5% 105.6%, transparent 0%, black 100%)"
                    }}>
                      <FramerIcon size={48} />
                    </div>
                  </div>
                </div>

                {/* Green Rotating Arrow — positioned to the right */}
                <div
                  className="absolute"
                  style={{
                    top: '50%',
                    right: '15%',
                    transform: 'translateY(-50%) rotate(74deg)',
                    animation: 'spin 3s linear infinite',
                  }}
                >
                  <div style={{
                    mask: "radial-gradient(100% 100% at 98.5% 105.6%, transparent 0%, black 100%)",
                    WebkitMask: "radial-gradient(100% 100% at 98.5% 105.6%, transparent 0%, black 100%)"
                  }}>
                    <ArrowsClockwise size={56} weight="bold" style={{ color: 'rgb(50, 205, 135)' }} />
                  </div>
                </div>
              </div>
            </Card>
          </SpotlightCard>

          {/* Card 3 - Launch and Take Control */}
          <SpotlightCard spotlightColor="rgba(163, 56, 224, 0.4)">
            <Card className="glass-card p-12 relative hover:scale-105 transition-all duration-500 scroll-reveal shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]" style={{ animationDelay: "0.4s", background: 'transparent', border: 'none', boxShadow: 'none' }}>
              <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl font-medium text-background">
                3
              </div>

              <h3 className="text-2xl font-semibold mb-4 pr-16">Launch and Take Control</h3>
              <p className="text-muted-foreground leading-relaxed mb-8" style={{ lineHeight: '1.6' }}>
                You get a plug-and-play dashboard with a walkthrough to manage everything easily.
              </p>

              {/* Dashboard Mockup */}
              <div className="relative mt-8">
                {/* macOS Chrome Dots */}
                <div className="flex gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>

                {/* Dashboard Image Container with Sliding Animation */}
                <div
                  className="relative glass-card rounded-lg overflow-hidden border border-white/10"
                  style={{
                    animation: "slideLeftRight 8s ease-in-out infinite"
                  }}
                >
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-medium z-10">
                    ● LIVE
                  </div>
                  <img
                    src={dashboardPreview}
                    alt="Dashboard Interface"
                    className="w-full h-64 object-cover"
                  />
                </div>

                {/* Automation Icon Bubble with Glossy Effect */}
                <div
                  className="absolute -bottom-6 -right-6 flex items-center justify-center text-white"
                  style={{
                    width: "80px",
                    height: "80px",
                    background: "radial-gradient(75% 75% at 42.6% 59.6%, rgb(0,0,0) 0%, rgb(94,94,94) 100%)",
                    borderTop: "1.2px solid rgb(165,165,165)",
                    borderRadius: "120%",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                    animation: "float 4s ease-in-out infinite",
                    animationDelay: "0s"
                  }}
                >
                  <div style={{
                    transform: "rotate(15deg)",
                    mask: "radial-gradient(100% 100% at 98.5% 105.6%, transparent 0%, black 100%)",
                    WebkitMask: "radial-gradient(100% 100% at 98.5% 105.6%, transparent 0%, black 100%)"
                  }}>
                    <MakeIcon size={40} />
                  </div>
                </div>
              </div>
            </Card>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
