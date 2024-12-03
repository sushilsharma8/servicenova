import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ProfileForm } from "@/components/service-provider/ProfileForm";
import type { ServiceProviderProfile as ServiceProviderProfileType } from "@/types/service-provider";

const ServiceProviderProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ServiceProviderProfileType>({
    business_name: "",
    service_type: "bartender",
    description: "",
    hourly_rate: 0,
    years_experience: 0,
    certifications: [],
  });
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8 animate-fade-in">
      <h1 className="text-3xl font-bold">Service Provider Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <ProfileForm profile={profile} setProfile={setProfile} />
        <Button type="submit" className="w-full">
          Save Profile
        </Button>
      </form>
    </div>
  );
};

export default ServiceProviderProfile;