import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CallbackRequest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    bestTime: "Morning",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("callback_requests")
        .insert({
          user_id: user.id,
          name: formData.name,
          phone_number: formData.phone,
          email: formData.email,
          best_time: formData.bestTime,
          message: formData.message,
          status: "pending"
        });

      if (error) throw error;

      setShowConfirmation(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (error: any) {
      toast.error("Failed to submit request");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (showConfirmation) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-[#CCFF00]/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-[#CCFF00]" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-4">
          Thank you!
        </h3>
        <p className="text-gray-400">
          Our team will contact you within 24 hours during business hours.
        </p>
      </div>
    );
  }

  const inputClassName = "mt-1 bg-white/5 border-white/5 text-white placeholder:text-gray-400 focus:border-[#CCFF00] focus:ring-[#CCFF00]";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter your full name"
          className={inputClassName}
          required
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="+919xxxxxxxxx"
          className={inputClassName}
          required
        />
      </div>

      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Enter your email address"
          className={inputClassName}
          required
        />
      </div>

      <div>
        <Label htmlFor="bestTime">Best Time to Call</Label>
        <select
          id="bestTime"
          value={formData.bestTime}
          onChange={(e) => setFormData({ ...formData, bestTime: e.target.value })}
          className={`w-full rounded-md ${inputClassName}`}
        >
          <option value="Morning">Morning (9 AM - 12 PM)</option>
          <option value="Afternoon">Afternoon (12 PM - 5 PM)</option>
          <option value="Evening">Evening (5 PM - 8 PM)</option>
        </select>
      </div>

      <div>
        <Label htmlFor="message">Message (Optional)</Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Any specific questions or requirements?"
          className={inputClassName}
          rows={4}
          maxLength={200}
        />
      </div>

      <div className="flex gap-4">
        <Button 
          type="submit" 
          className="flex-1 bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Request"}
        </Button>
        <Button 
          type="button" 
          variant="outline"
          className="flex-1 border-white/10 hover:bg-white/10"
          onClick={() => navigate('/')}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};