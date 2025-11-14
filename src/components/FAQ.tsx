import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What exactly is an AI agent?",
      answer:
        "An AI agent is a smart automation that can understand context, make decisions, and take actions on your behalf. Unlike simple scripts, our agents can handle complex workflows, adapt to new situations, and integrate with multiple tools seamlessly.",
    },
    {
      question: "How long does implementation take?",
      answer:
        "Implementation typically takes 7-30 days depending on your plan. We start with a workflow audit, then build and test your automations, and finally hand over a fully functional system with training included.",
    },
    {
      question: "What tools can you integrate with?",
      answer:
        "We integrate with all major platforms including CRMs (Salesforce, HubSpot), communication tools (Slack, email), project management (Notion, Asana), and more. If you have a custom tool, we can build API connections for that too.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. We follow enterprise-grade security practices, use encrypted connections, and never store sensitive data unnecessarily. All integrations use secure OAuth protocols and we're GDPR compliant.",
    },
    {
      question: "Can I modify the automations later?",
      answer:
        "Yes! Your dashboard includes controls to adjust agent behavior, add new triggers, and modify workflows. We also offer ongoing support if you need more complex changes or want to scale up.",
    },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-5xl md:text-6xl mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-base leading-relaxed">Everything you need to know</p>
        </div>

        <div className="max-w-3xl mx-auto scroll-reveal">
          <Accordion type="single" collapsible className="space-y-6">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card px-6 py-6 border-none hover:bg-card/50 transition-colors duration-300"
              >
                <AccordionTrigger className="text-left text-lg font-medium hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
