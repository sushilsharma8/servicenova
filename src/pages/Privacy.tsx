import { ScrollArea } from "@/components/ui/scroll-area";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
        <ScrollArea className="h-[60vh] rounded-md border p-8">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-semibold mb-4">1. Information Collection</h2>
            <p className="mb-4">
              We collect information you provide directly to us, including personal details, contact information, and payment data necessary for our services.
            </p>

            <h2 className="text-2xl font-semibold mb-4">2. Use of Information</h2>
            <p className="mb-4">
              Your information is used to provide and improve our services, process payments, and communicate with you about your bookings and account.
            </p>

            <h2 className="text-2xl font-semibold mb-4">3. Data Protection</h2>
            <p className="mb-4">
              We implement appropriate security measures to protect your personal information from unauthorized access or disclosure.
            </p>

            <h2 className="text-2xl font-semibold mb-4">4. Information Sharing</h2>
            <p className="mb-4">
              We share information only with service providers necessary for fulfilling our services and as required by law.
            </p>

            <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
            <p className="mb-4">
              You have the right to access, correct, or delete your personal information. Contact us to exercise these rights.
            </p>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}