import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ProfileForm } from "@/components/service-provider/ProfileForm";
import type { ServiceProviderProfile } from "@/types/service-provider";

const EditProviderProfile = () => {
  const navigate = useNavigate();

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ["provider-profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data: providerData, error } = await supabase
        .from("provider_applications")
        .select("*")
        .eq("user_id", user.id)
        .eq("status", "approved")
        .single();

      if (error) throw error;
      return providerData;
    },
  });

  useEffect(() => {
    if (error) {
      toast.error("Failed to load profile");
      navigate("/provider/dashboard");
    }
  }, [error, navigate]);

  if (isLoading) return <LoadingSpinner />;
  if (!profile) return null;

  const handleUpdateProfile = async (updatedProfile: ServiceProviderProfile) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { error } = await supabase
        .from("provider_applications")
        .update({
          full_name: updatedProfile.business_name,
          service_type: updatedProfile.service_type,
          years_experience: updatedProfile.years_experience,
          certifications: updatedProfile.certifications,
        })
        .eq("user_id", user.id)
        .eq("status", "approved");

      if (error) throw error;

      toast.success("Profile updated successfully");
      navigate("/provider/dashboard");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const initialProfile: ServiceProviderProfile = {
    business_name: profile.full_name,
    service_type: profile.service_type,
    description: "", // Removed as it's not in our schema
    hourly_rate: 0, // Removed as it's not in our schema
    years_experience: profile.years_experience,
    certifications: profile.certifications || [],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#0A0A0A] py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Edit Profile
            </h1>
            <p className="mt-2 text-lg text-gray-400">
              Update your service provider information
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border-white/10 p-8 rounded-lg">
            <ProfileForm
              profile={initialProfile}
              onSubmit={handleUpdateProfile}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProviderProfile;