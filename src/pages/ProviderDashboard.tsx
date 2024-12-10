import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { AppointmentsSection } from "@/components/provider-dashboard/AppointmentsSection";
import { ProfileOverview } from "@/components/provider-dashboard/ProfileOverview";

const ProviderDashboard = () => {
  const { data: userData } = useQuery({
    queryKey: ["provider-profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data: providerData } = await supabase
        .from("provider_applications")
        .select("*")
        .eq("user_id", user.id)
        .eq("status", "approved")
        .single();

      return providerData;
    },
  });

  const { data: appointments, isLoading: isLoadingAppointments } = useQuery({
    queryKey: ["provider-appointments"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data: events } = await supabase
        .from("event_service_requests")
        .select(`
          *,
          events (
            event_date,
            location,
            guest_count,
            client_id
          )
        `)
        .eq("provider_id", user.id)
        .order("created_at", { ascending: false });

      return events;
    },
  });

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-[#0A0A0A] py-12 flex items-center justify-center">
        <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
          <CardContent>
            <p className="text-white">
              No provider profile found. Please complete your application.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#0A0A0A] py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Provider Dashboard
            </h1>
            <p className="mt-2 text-lg text-gray-400">
              Manage your appointments and profile
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AppointmentsSection
              appointments={appointments}
              isLoading={isLoadingAppointments}
            />
            <ProfileOverview userData={userData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;