import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How does the booking process work?",
      answer: "The booking process is simple: Browse available service providers, select your preferred provider, specify your event details, and submit a booking request. The provider will review and confirm your booking within 24 hours.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, and digital payment methods. Payments are processed securely through our platform to protect both clients and service providers.",
    },
    {
      question: "How can I become a service provider?",
      answer: "To become a service provider, click on 'Become a Provider' in the navigation menu. Fill out the application form, submit required documentation, and our team will review your application within 3-5 business days.",
    },
    {
      question: "What happens if I need to cancel a booking?",
      answer: "Cancellation policies vary by provider. Generally, cancellations made 48 hours before the event are eligible for a full refund. Please check the specific provider's cancellation policy before booking.",
    },
    {
      question: "How are service providers vetted?",
      answer: "All service providers undergo a thorough verification process, including license verification, background checks, and review of certifications. We also collect and verify references from past clients.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-accent">
        Frequently Asked Questions
      </h1>
      
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-card rounded-lg p-2">
              <AccordionTrigger className="text-lg font-medium px-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 px-4 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-300">
          Can't find what you're looking for?{" "}
          <a href="/contact" className="text-accent hover:underline">
            Contact our support team
          </a>
        </p>
      </div>
    </div>
  );
};

export default FAQ;