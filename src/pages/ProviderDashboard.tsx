import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Users, Briefcase, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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

      return events || [];
    },
  });

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-[#0A0A0A] py-12 flex items-center justify-center">
        <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
          <CardContent>
            <p className="text-white">No provider profile found. Please complete your application.</p>
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
            <h1 className="text-4xl font-bold tracking-tight text-white">Provider Dashboard</h1>
            <p className="mt-2 text-lg text-gray-400">
              Manage your appointments and profile
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Appointments Section */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 rounded-lg">
              <CardHeader>
                <CardTitle className="text-white">Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoadingAppointments ? (
                  <div className="flex items-center justify-center p-4">
                    <Loader2 className="w-6 h-6 text-[#CCFF00] animate-spin" />
                  </div>
                ) : appointments && appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <div key={appointment.id} className="flex justify-between items-center p-4 bg-black/20 rounded-md">
                      <div className="flex items-center space-x-4">
                        <CalendarDays className="w-5 h-5 text-[#CCFF00]" />
                        <div>
                          <div className="text-white">
                            {new Date(appointment.events.event_date).toLocaleDateString()} at{" "}
                            {new Date(appointment.events.event_date).toLocaleTimeString()}
                          </div>
                          <div className="text-gray-400 text-sm">
                            Location: {appointment.events.location}
                          </div>
                          <div className="text-gray-400 text-sm">
                            Guests: {appointment.events.guest_count}
                          </div>
                        </div>
                      </div>
                      <div className={`text-sm font-semibold ${
                        appointment.status === "confirmed" 
                          ? "text-green-500" 
                          : "text-yellow-500"
                      }`}>
                        {appointment.status}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-4 text-gray-400">
                    No appointments found. New bookings will appear here.
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Profile Section */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 rounded-lg">
              <CardHeader>
                <CardTitle className="text-white">Profile Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Users className="w-5 h-5 text-[#CCFF00]" />
                  <div>
                    <div className="text-white">{userData.full_name}</div>
                    <div className="text-gray-400 text-sm">
                      Service: {userData.service_type}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Briefcase className="w-5 h-5 text-[#CCFF00]" />
                  <div>
                    <div className="text-white">
                      Experience: {userData.years_experience} years
                    </div>
                    {userData.certifications && userData.certifications.length > 0 && (
                      <div className="text-gray-400 text-sm">
                        Certifications: {userData.certifications.join(", ")}
                      </div>
                    )}
                  </div>
                </div>
                <Button
                  className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90 w-full"
                  onClick={() => {
                    // TODO: Implement profile editing
                    console.log("Edit profile clicked");
                  }}
                >
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
