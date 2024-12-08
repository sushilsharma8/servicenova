// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Card } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Calendar } from "@/components/ui/calendar";
// import { supabase } from "@/integrations/supabase/client";
// import { toast } from "sonner";

// interface EventRequest {
//   id: string;
//   event_date: string;
//   location: string;
//   guest_count: number;
//   hours_needed: number;
//   status: string;
// }

// interface SupabaseEventRequest {
//   id: string;
//   events: {
//     event_date: string;
//     location: string;
//     guest_count: number;
//   };
//   hours_needed: number;
//   status: string;
// }

// export default function ProviderDashboard() {
//   const navigate = useNavigate();
//   const [requests, setRequests] = useState<EventRequest[]>([]);
//   const [selectedDates, setSelectedDates] = useState<Date[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const fetchRequests = async () => {
//     try {
//       const { data: provider } = await supabase
//         .from("service_providers")
//         .select("id")
//         .single();

//       if (!provider) {
//         toast.error("Provider profile not found");
//         return;
//       }

//       const { data, error } = await supabase
//         .from("event_service_requests")
//         .select(`
//           id,
//           events (
//             event_date,
//             location,
//             guest_count
//           ),
//           hours_needed,
//           status
//         `)
//         .eq("provider_id", provider.id);

//       if (error) throw error;

//       // Transform the data to match EventRequest interface
//       const transformedData: EventRequest[] = (data as SupabaseEventRequest[]).map(
//         (request) => ({
//           id: request.id,
//           event_date: request.events.event_date,
//           location: request.events.location,
//           guest_count: request.events.guest_count,
//           hours_needed: request.hours_needed,
//           status: request.status,
//         })
//       );

//       setRequests(transformedData);
//     } catch (error) {
//       console.error("Error fetching requests:", error);
//       toast.error("Failed to load requests");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleAvailabilityChange = (dates: Date[]) => {
//     setSelectedDates(dates);
//     // TODO: Implement availability update in database
//     toast.success("Availability updated");
//   };

//   return (
//     <div className="container mx-auto p-6 space-y-6">
//       <h1 className="text-2xl font-bold">Provider Dashboard</h1>

//       <Tabs defaultValue="requests" className="w-full">
//         <TabsList>
//           <TabsTrigger value="requests">Event Requests</TabsTrigger>
//           <TabsTrigger value="availability">Availability</TabsTrigger>
//           <TabsTrigger value="earnings">Earnings</TabsTrigger>
//         </TabsList>

//         <TabsContent value="requests" className="space-y-4">
//           {isLoading ? (
//             <p>Loading requests...</p>
//           ) : requests.length === 0 ? (
//             <p>No requests found</p>
//           ) : (
//             requests.map((request) => (
//               <Card key={request.id} className="p-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <p className="font-semibold">Date</p>
//                     <p>{new Date(request.event_date).toLocaleDateString()}</p>
//                   </div>
//                   <div>
//                     <p className="font-semibold">Location</p>
//                     <p>{request.location}</p>
//                   </div>
//                   <div>
//                     <p className="font-semibold">Guest Count</p>
//                     <p>{request.guest_count}</p>
//                   </div>
//                   <div>
//                     <p className="font-semibold">Hours Needed</p>
//                     <p>{request.hours_needed}</p>
//                   </div>
//                   <div>
//                     <p className="font-semibold">Status</p>
//                     <p className="capitalize">{request.status}</p>
//                   </div>
//                 </div>
//               </Card>
//             ))
//           )}
//         </TabsContent>

//         <TabsContent value="availability">
//           <Card className="p-4">
//             <Calendar
//               mode="multiple"
//               selected={selectedDates}
//               onSelect={handleAvailabilityChange}
//               className="rounded-md border"
//             />
//           </Card>
//         </TabsContent>

//         <TabsContent value="earnings">
//           <Card className="p-4">
//             <p>Earnings overview coming soon...</p>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { CalendarDays, Users, Briefcase, CheckCircle } from "lucide-react";

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([
    { id: 1, date: "2023-11-01", time: "10:00", client: "John Doe", status: "Confirmed" },
    { id: 2, date: "2023-11-05", time: "14:00", client: "Jane Smith", status: "Pending" },
  ]);

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
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="flex justify-between items-center p-4 bg-black/20 rounded-md">
                    <div className="flex items-center space-x-4">
                      <CalendarDays className="w-5 h-5 text-[#CCFF00]" />
                      <div>
                        <div className="text-white">{appointment.date} at {appointment.time}</div>
                        <div className="text-gray-400 text-sm">Client: {appointment.client}</div>
                      </div>
                    </div>
                    <div className={`text-sm font-semibold ${appointment.status === "Confirmed" ? "text-green-500" : "text-yellow-500"}`}>
                      {appointment.status}
                    </div>
                  </div>
                ))}
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
                    <div className="text-white">John Doe</div>
                    <div className="text-gray-400 text-sm">Service: Bartender</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Briefcase className="w-5 h-5 text-[#CCFF00]" />
                  <div>
                    <div className="text-white">Experience: 5 years</div>
                    <div className="text-gray-400 text-sm">Certifications: Mixology, Wine Tasting</div>
                  </div>
                </div>
                <Button
                  className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90"
                  onClick={() => navigate("/edit-profile")}
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