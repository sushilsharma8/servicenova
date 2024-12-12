import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I book a service provider?",
    answer: "Booking a service provider is simple: Create an account, browse available providers, select your preferred professional, specify your event details, and submit your request. The provider will confirm their availability and you can proceed with the booking."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, and digital wallets. Payments are processed securely through our platform, and you'll only be charged once the service provider confirms your booking."
  },
  {
    question: "How are service providers vetted?",
    answer: "All service providers undergo a thorough verification process including background checks, professional certification verification, and reference checks. We also maintain a review system to ensure ongoing quality of service."
  },
  {
    question: "What if I need to cancel or reschedule?",
    answer: "You can cancel or reschedule your booking up to 48 hours before the event start time through your dashboard. Different cancellation policies may apply depending on the timing and specific service provider."
  },
  {
    question: "How do I become a service provider?",
    answer: "To become a service provider, click on 'Join as Provider' and complete the application process. You'll need to provide professional credentials, references, and undergo our verification process."
  },
  {
    question: "What happens if there's an issue during the event?",
    answer: "We have a 24/7 support team available to handle any issues that arise during events. Contact our emergency support line immediately, and we'll work to resolve the situation promptly."
  }
];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about our services, booking process, and more.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}