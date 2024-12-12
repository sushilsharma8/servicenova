import { ScrollArea } from "@/components/ui/scroll-area";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>
        <ScrollArea className="h-[60vh] rounded-md border p-8">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using this platform, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>

            <h2 className="text-2xl font-semibold mb-4">2. User Accounts</h2>
            <p className="mb-4">
              Users must register for an account to access certain features. You are responsible for maintaining the confidentiality of your account information.
            </p>

            <h2 className="text-2xl font-semibold mb-4">3. Service Provider Terms</h2>
            <p className="mb-4">
              Service providers must complete the verification process and maintain professional standards. We reserve the right to suspend or terminate accounts that violate our policies.
            </p>

            <h2 className="text-2xl font-semibold mb-4">4. Booking and Payments</h2>
            <p className="mb-4">
              All bookings are subject to availability. Payment terms and cancellation policies are specified during the booking process.
            </p>

            <h2 className="text-2xl font-semibold mb-4">5. Liability</h2>
            <p className="mb-4">
              We strive to maintain high standards but are not liable for any direct, indirect, or consequential damages arising from the use of our services.
            </p>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}