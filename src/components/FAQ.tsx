import { FAQ } from "@/components/ui/faq-tabs";

const categories = {
  websites: "Websites",
  "ai-automation": "AI & Automation",
  pricing: "Pricing & Plans",
  "getting-started": "Getting Started",
};

const faqData = {
  websites: [
    {
      question: "What's included in the €390 website?",
      answer:
        "Everything you need to go live — custom design based on your business, mobile-optimized, SEO-ready, contact forms, click-to-call, Google Maps, hosting, and SSL security. No hidden fees, no extras. Most agencies charge €1,500+ for the same thing.",
    },
    {
      question: "I already have a website. Can you work with that?",
      answer:
        "Yes. We take your existing content — logo, photos, business info — and rebuild it into something modern that actually brings in customers. You keep everything, it just looks and works 10x better.",
    },
    {
      question: "What if I don't like the design?",
      answer:
        "You'll see a full preview before anything goes live. One round of revisions is included so we can get it exactly right. We've never had a client reject a design.",
    },
    {
      question: "How fast can my new website go live?",
      answer:
        "10 business days from the moment we have your content. If you're in a rush, let us know — we can often speed things up.",
    },
    {
      question: "Do I own the website?",
      answer:
        "100%. It's yours. If you ever want to move on, we hand everything over — no hostage situations, no strings attached.",
    },
  ],
  "ai-automation": [
    {
      question: "How is your AI different from a chatbot?",
      answer:
        "Night and day. Old chatbots follow a script and annoy everyone. Our AI actually understands questions, knows your services, your prices, your business hours — and gives real, helpful answers. It's the difference between an answering machine and your best employee.",
    },
    {
      question: 'What does "missed-call text-back" mean?',
      answer:
        "When a customer calls and you can't answer — because you're on a job, driving, whatever — they instantly get a text: \"Hey, saw you called. How can I help?\" Instead of calling your competitor, they reply to you. It's the single biggest lead-saver we offer.",
    },
    {
      question: "How do the automated follow-ups work?",
      answer:
        "When someone fills out your contact form or sends a message, they automatically get a confirmation via WhatsApp or email within seconds. If they don't respond, a friendly follow-up goes out. You don't lift a finger — and you never lose a lead because you forgot to reply.",
    },
    {
      question: "How does the review collection work?",
      answer:
        "After a job is done, your customer automatically gets a friendly WhatsApp or email asking them to leave a Google review. No awkward asking, no forgetting. Your 5-star reviews grow on autopilot.",
    },
    {
      question: "Do I need to be technical for any of this?",
      answer:
        "Not even a little. We build it, we run it, we manage it. You get a simple dashboard if you want to check in, but you never have to touch anything. If you can send a WhatsApp message, you're overqualified.",
    },
  ],
  pricing: [
    {
      question: "What does the €149/month actually cover?",
      answer:
        "Your AI assistant, missed-call text-backs, WhatsApp & email follow-ups, appointment booking, review collection, lead dashboard, and ongoing support. Plus we monitor and optimize every month. Think of it as a digital employee that works day and night — for less than the cost of a single job.",
    },
    {
      question: "Can I cancel anytime?",
      answer:
        "Yes. No lock-in contracts, no cancellation fees, no awkward phone calls. We keep clients because it works, not because they're stuck.",
    },
    {
      question: "Are there any hidden costs?",
      answer:
        "No. The price you see is the price you pay. Hosting, SSL, maintenance — it's all included. The only extras would be if you ask us to build something custom beyond your plan.",
    },
    {
      question: "Can I start with just the website and upgrade later?",
      answer:
        "Absolutely — most of our clients do exactly that. Get your website live, see the results, then add the AI tools whenever you're ready. It's designed to grow with you.",
    },
    {
      question: "Is it really worth it for a small business?",
      answer:
        "One new customer from a missed-call text-back or an automated follow-up pays for months of the service. Most of our clients make their investment back within the first few weeks.",
    },
  ],
  "getting-started": [
    {
      question: "How does the process work?",
      answer:
        "Simple — book a free call, we discuss what you need, and we get to work. You send us your logo, photos, and business info. We handle everything else and deliver a preview within 10 days.",
    },
    {
      question: "What do you need from me?",
      answer:
        "Minimal effort on your end. Your logo, a few photos (we can help source these too), your services & pricing info, and about 15 minutes for a quick kickoff call. That's it — we handle the rest.",
    },
    {
      question: "What kind of businesses do you work with?",
      answer:
        "Mostly local service businesses — plumbers, electricians, auto repair shops, cleaning companies, contractors, salons, chiropractors. If your customers find you through Google or word of mouth, we can help.",
    },
    {
      question: "Do you work in Dutch?",
      answer:
        "Ja zeker! We're based in the Netherlands and work in both Dutch and English. Your website and all AI systems can run in whatever language your customers speak.",
    },
    {
      question: "What if I just have a quick question?",
      answer:
        "Book a free call — zero pressure, no sales pitch. Or just send us a message through the site. We get back to everyone within 24 hours.",
    },
  ],
};

export default function FAQSection() {
  return (
    <FAQ
      title="Frequently Asked Questions"
      subtitle="Let's answer some questions"
      categories={categories}
      faqData={faqData}
    />
  );
}
