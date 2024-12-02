import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

interface FormData {
  eventDate: string;
  guestCount: string;
  location: string;
  serviceType: string;
  additionalDetails: string;
  name: string;
  email: string;
}

const EventForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    eventDate: "",
    guestCount: "",
    location: "",
    serviceType: "",
    additionalDetails: "",
    name: "",
    email: "",
  });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Request Submitted!",
      description: "We'll be in touch with you shortly.",
    });
    navigate("/success");
  };

  const progress = (step / 3) * 100;

  return (
    <div className="max-w-2xl mx-auto p-6 animate-fade-in">
      <div className="mb-8">
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="text-sm text-gray-600 mt-2">Step {step} of 3</div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className={`form-step ${step === 1 ? "active" : "hidden"}`}>
          <h2 className="text-2xl font-semibold mb-6">Event Details</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="eventDate">Event Date</Label>
              <Input
                id="eventDate"
                type="date"
                value={formData.eventDate}
                onChange={(e) => updateField("eventDate", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="guestCount">Number of Guests</Label>
              <Input
                id="guestCount"
                type="number"
                value={formData.guestCount}
                onChange={(e) => updateField("guestCount", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => updateField("location", e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className={`form-step ${step === 2 ? "active" : "hidden"}`}>
          <h2 className="text-2xl font-semibold mb-6">Service Requirements</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="serviceType">Type of Service Needed</Label>
              <select
                id="serviceType"
                className="w-full p-2 border rounded-md"
                value={formData.serviceType}
                onChange={(e) => updateField("serviceType", e.target.value)}
                required
              >
                <option value="">Select a service</option>
                <option value="bartender">Bartender</option>
                <option value="server">Server</option>
                <option value="chef">Chef</option>
              </select>
            </div>
            <div>
              <Label htmlFor="additionalDetails">Additional Details</Label>
              <Textarea
                id="additionalDetails"
                value={formData.additionalDetails}
                onChange={(e) => updateField("additionalDetails", e.target.value)}
                placeholder="Tell us more about your event..."
              />
            </div>
          </div>
        </div>

        <div className={`form-step ${step === 3 ? "active" : "hidden"}`}>
          <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(step - 1)}
            >
              Previous
            </Button>
          )}
          {step < 3 ? (
            <Button
              type="button"
              className="ml-auto"
              onClick={() => setStep(step + 1)}
            >
              Next
            </Button>
          ) : (
            <Button type="submit" className="ml-auto bg-accent hover:bg-accent/90">
              Submit Request
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EventForm;