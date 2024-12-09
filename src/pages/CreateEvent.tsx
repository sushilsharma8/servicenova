import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CalendarDays, Users, Clock, MapPin, ChefHat, ArrowLeft, ArrowRight, Martini, Utensils } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { IndianRupee } from "lucide-react";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    eventDate: "",
    location: "",
    guestCount: "",
    duration: "",
    budgetRange: "",
    serviceTypes: [] as string[],
    serviceCounts: {} as Record<string, number>
  });

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Validation: Check if service types and counts are provided
    if (formData.serviceTypes.length === 0) {
      toast.error("Please select at least one service type.");
      return;
    }
  
    if (Object.values(formData.serviceCounts).some(count => count < 1)) {
      toast.error("Please ensure all selected service counts are at least 1.");
      return;
    }
  
    try {
      let { data: session } = await supabase.auth.getSession();
  
      if (!session?.session?.user) {
        toast.error("Please sign in to create an event");
        navigate("/auth");
        return;
      }
  
      // Create the event
      const { error } = await supabase
        .from("events")
        .insert([{
          client_id: session.session.user.id,
          event_date: formData.eventDate,
          location: formData.location,
          guest_count: parseInt(formData.guestCount),
          duration_hours: parseInt(formData.duration),
          budget_range: formData.budgetRange,
          service_types: formData.serviceTypes as ("chef" | "bartender" | "server")[],
          service_counts: formData.serviceCounts,
          status: "pending"
        }]);
  
      if (error) throw error;
  
      toast.success("Event created successfully!");
      navigate("/success");
  
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Failed to create event. Please try again.");
    }
  };  

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#0A0A0A]">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Create Your Event</h1>
            <p className="text-gray-400 text-lg">
              Tell us about your event and we'll match you with the perfect staff
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="h-1 bg-white/10 rounded-full">
              <div 
                className="h-1 bg-[#CCFF00] rounded-full transition-all duration-300"
                style={{ width: `${(step / 2) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-400">
              <span className={step >= 1 ? "text-[#CCFF00]" : ""}>Event Details</span>
              <span className={step >= 2 ? "text-[#CCFF00]" : ""}>Service Requirements</span>
            </div>
          </div>

          {/* Form Card */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Event Details */}
              <div className={`space-y-6 ${step === 1 ? 'block' : 'hidden'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-white">Event Date</Label>
                    <div className="relative">
                      <CalendarDays className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        type="date"
                        value={formData.eventDate}
                        onChange={(e) => updateField("eventDate", e.target.value)}
                        className="pl-10 bg-white/5 border-white/10 text-white focus:border-[#CCFF00] focus:ring-[#CCFF00]"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        type="text"
                        value={formData.location}
                        onChange={(e) => updateField("location", e.target.value)}
                        placeholder="Event location"
                        className="pl-10 bg-white/5 border-white/10 text-white focus:border-[#CCFF00] focus:ring-[#CCFF00]"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Number of Guests</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        type="number"
                        value={formData.guestCount}
                        onChange={(e) => updateField("guestCount", e.target.value)}
                        placeholder="Expected guest count"
                        className="pl-10 bg-white/5 border-white/10 text-white focus:border-[#CCFF00] focus:ring-[#CCFF00]"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Duration (hours)</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <select
                        value={formData.duration}
                        onChange={(e) => updateField("duration", e.target.value)}
                        className="w-full pl-10 h-11 bg-white/5 border border-white/10 text-white rounded-md 
                          focus:border-[#CCFF00] focus:ring-[#CCFF00] focus:ring-1 focus:outline-none
                          appearance-none hover:border-white/20 transition-colors"
                        required
                      >
                        <option value="" className="bg-[#0A0A0A]">Select duration</option>
                        <option value="2" className="bg-[#0A0A0A]">2 hours</option>
                        <option value="4" className="bg-[#0A0A0A]">4 hours</option>
                        <option value="6" className="bg-[#0A0A0A]">6 hours</option>
                        <option value="8" className="bg-[#0A0A0A]">8 hours</option>
                        <option value="10" className="bg-[#0A0A0A]">10 hours</option>
                        <option value="12" className="bg-[#0A0A0A]">12 hours</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Service Requirements */}
              <div className={`space-y-6 ${step === 2 ? 'block' : 'hidden'}`}>
                <div className="space-y-4">
                  <Label className="text-white text-lg">Select Services</Label>
                  <div className="space-y-3">
                    {[ 
                      { id: 'chef', label: 'Chef', icon: ChefHat, description: 'Professional chef for your event' },
                      { id: 'bartender', label: 'Bartender', icon: Martini, description: 'Expert mixologist' },
                      { id: 'server', label: 'Server', icon: Utensils, description: 'Professional wait staff' }
                    ].map(({ id, label, icon: Icon, description }) => (
                      <div key={id}>
                        <div
                          className="flex items-center space-x-4 p-4 rounded-t-lg border border-white/10 bg-black/40 
              cursor-pointer hover:bg-black/60 transition-all"
                          onClick={() => {
                            const newServices = formData.serviceTypes.includes(id)
                              ? formData.serviceTypes.filter(type => type !== id)
                              : [...formData.serviceTypes, id];

                            const newServiceCounts = { ...formData.serviceCounts };
                            if (!formData.serviceTypes.includes(id)) {
                              newServiceCounts[id] = 1;
                            } else {
                              delete newServiceCounts[id];
                            }

                            setFormData({
                              ...formData,
                              serviceTypes: newServices,
                              serviceCounts: newServiceCounts
                            });
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={formData.serviceTypes.includes(id)}
                            onChange={() => { }} // Handled by div onClick
                            className="h-5 w-5 rounded border-white/30 bg-transparent checked:bg-[#CCFF00] 
                checked:border-[#CCFF00] focus:ring-[#CCFF00] focus:ring-offset-0"
                          />
                          <Icon className="h-5 w-5 text-[#CCFF00]" />
                          <div>
                            <p className="text-white font-medium">{label}</p>
                            <p className="text-sm text-gray-400">{description}</p>
                          </div>
                        </div>

                        {formData.serviceTypes.includes(id) && (
                          <div className="flex items-center space-x-3 p-3 border-t-0 border border-white/10 bg-black/20 rounded-b-lg">
                            <Label className="text-gray-400 text-sm flex-1">
                              Number of {label}s needed:
                            </Label>
                            <div className="flex items-center space-x-2">
                              <button
                                type="button"
                                onClick={() => {
                                  const currentValue = formData.serviceCounts[id] || 1;
                                  if (currentValue > 1) {
                                    setFormData({
                                      ...formData,
                                      serviceCounts: {
                                        ...formData.serviceCounts,
                                        [id]: currentValue - 1
                                      }
                                    });
                                  }
                                }}
                                className="w-8 h-8 flex items-center justify-center rounded border border-white/10 
                    text-white hover:bg-white/10 transition-colors"
                              >
                                -
                              </button>
                              <Input
                                type="number"
                                min="1"
                                max="20"
                                value={formData.serviceCounts[id] || 1}
                                onChange={(e) => {
                                  const value = Math.max(1, Math.min(20, parseInt(e.target.value) || 1));
                                  setFormData({
                                    ...formData,
                                    serviceCounts: {
                                      ...formData.serviceCounts,
                                      [id]: value
                                    }
                                  });
                                }}
                                className="w-16 text-center bg-white/5 border-white/10 text-white"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const currentValue = formData.serviceCounts[id] || 1;
                                  if (currentValue < 20) {
                                    setFormData({
                                      ...formData,
                                      serviceCounts: {
                                        ...formData.serviceCounts,
                                        [id]: currentValue + 1
                                      }
                                    });
                                  }
                                }}
                                className="w-8 h-8 flex items-center justify-center rounded border border-white/10 
                    text-white hover:bg-white/10 transition-colors"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))} 
                  </div>
                </div>

                {/* Budget Range Input Field */}
                <div className="space-y-2">
                  <Label className="text-white text-lg">Budget Range</Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      value={formData.budgetRange}
                      onChange={(e) => updateField("budgetRange", e.target.value)}
                      placeholder="e.g. INR 1000 - INR 3000"
                      className="pl-10 bg-white/5 border-white/10 text-white focus:border-[#CCFF00] focus:ring-[#CCFF00]"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    className="border-white/10 text-white hover:bg-white/5"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                )}

                {step < 2 ? (
                  <Button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90 ml-auto"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90 ml-auto"
                  >
                    Create Event
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
