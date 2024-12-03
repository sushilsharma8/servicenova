import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ServiceProviderProfile {
  business_name: string;
  service_type: "bartender" | "chef" | "server";
  description: string;
  hourly_rate: number;
  years_experience: number;
  certifications: string[];
}

const ServiceProviderProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ServiceProviderProfile>({
    business_name: "",
    service_type: "bartender",
    description: "",
    hourly_rate: 0,
    years_experience: 0,
    certifications: [],
  });
  const [loading, setLoading] = useState(true);
  const [newCertification, setNewCertification] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/login");
        return;
      }

      const { data, error } = await supabase
        .from("service_providers")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) throw error;

      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/login");
        return;
      }

      const { error } = await supabase.from("service_providers").upsert({
        user_id: user.id,
        ...profile,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  const addCertification = () => {
    if (newCertification.trim()) {
      setProfile((prev) => ({
        ...prev,
        certifications: [...(prev.certifications || []), newCertification.trim()],
      }));
      setNewCertification("");
    }
  };

  const removeCertification = (index: number) => {
    setProfile((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8 animate-fade-in">
      <h1 className="text-3xl font-bold">Service Provider Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="business_name">Business Name</Label>
            <Input
              id="business_name"
              value={profile.business_name}
              onChange={(e) =>
                setProfile({ ...profile, business_name: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="service_type">Service Type</Label>
            <select
              id="service_type"
              className="w-full p-2 border rounded-md"
              value={profile.service_type}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  service_type: e.target.value as ServiceProviderProfile["service_type"],
                })
              }
              required
            >
              <option value="bartender">Bartender</option>
              <option value="chef">Chef</option>
              <option value="server">Server</option>
            </select>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={profile.description}
              onChange={(e) =>
                setProfile({ ...profile, description: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="hourly_rate">Hourly Rate ($)</Label>
            <Input
              id="hourly_rate"
              type="number"
              min="0"
              step="0.01"
              value={profile.hourly_rate}
              onChange={(e) =>
                setProfile({ ...profile, hourly_rate: parseFloat(e.target.value) })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="years_experience">Years of Experience</Label>
            <Input
              id="years_experience"
              type="number"
              min="0"
              value={profile.years_experience}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  years_experience: parseInt(e.target.value),
                })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Certifications</Label>
            <div className="flex gap-2">
              <Input
                value={newCertification}
                onChange={(e) => setNewCertification(e.target.value)}
                placeholder="Add certification"
              />
              <Button type="button" onClick={addCertification}>
                Add
              </Button>
            </div>
            <div className="space-y-2">
              {profile.certifications?.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-2 rounded"
                >
                  <span>{cert}</span>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeCertification(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full">
          Save Profile
        </Button>
      </form>
    </div>
  );
};

export default ServiceProviderProfile;