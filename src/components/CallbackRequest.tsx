import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const CallbackRequest = () => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("callback_requests").insert({
        user_id: user.id,
        phone_number: phone,
        status: "pending"
      });

      if (error) throw error;

      toast.success("We'll call you back soon!");
      setPhone("");
    } catch (error: any) {
      toast.error("Failed to submit request");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
          required
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Requesting..." : "Request a Call Back"}
      </Button>
    </form>
  );
};