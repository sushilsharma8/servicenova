import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Index() {
  const [loading, setLoading] = useState(false);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = resolve;
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Load Razorpay script
      await loadRazorpay();

      // Create order
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const response = await supabase.functions.invoke('create-razorpay-order', {
        body: { amount: 100 }, // Amount in INR
      });

      if (response.error) throw new Error(response.error.message);
      const { orderId, amount, currency } = response.data;

      // Initialize Razorpay payment
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency,
        name: 'Service Provider Platform',
        description: 'Service Payment',
        order_id: orderId,
        handler: function (response: any) {
          toast.success('Payment successful!');
          console.log('Payment success:', response);
        },
        prefill: {
          email: user.email,
        },
        theme: {
          color: '#0F172A',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      console.error('Payment error:', error);
      toast.error(error.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome to Service Provider Platform</h1>
        <p className="mb-4">Make a payment to get started:</p>
        <Button 
          onClick={handlePayment} 
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Pay ₹100'}
        </Button>
      </Card>
    </div>
  );
}