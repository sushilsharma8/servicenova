import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface EventRequest {
  id: string;
  event_date: string;
  location: string;
  guest_count: number;
  hours_needed: number;
  status: string;
}

export default function ProviderDashboard() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<EventRequest[]>([]);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const { data: provider } = await supabase
        .from("service_providers")
        .select("id")
        .single();

      if (!provider) {
        toast.error("Provider profile not found");
        return;
      }

      const { data, error } = await supabase
        .from("event_service_requests")
        .select(`
          id,
          events (
            event_date,
            location,
            guest_count
          ),
          hours_needed,
          status
        `)
        .eq("provider_id", provider.id);

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error("Failed to load requests");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvailabilityChange = (dates: Date[]) => {
    setSelectedDates(dates);
    // TODO: Implement availability update in database
    toast.success("Availability updated");
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Provider Dashboard</h1>

      <Tabs defaultValue="requests" className="w-full">
        <TabsList>
          <TabsTrigger value="requests">Event Requests</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-4">
          {isLoading ? (
            <p>Loading requests...</p>
          ) : requests.length === 0 ? (
            <p>No requests found</p>
          ) : (
            requests.map((request) => (
              <Card key={request.id} className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">Date</p>
                    <p>{new Date(request.event_date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Location</p>
                    <p>{request.location}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Guest Count</p>
                    <p>{request.guest_count}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Hours Needed</p>
                    <p>{request.hours_needed}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Status</p>
                    <p className="capitalize">{request.status}</p>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="availability">
          <Card className="p-4">
            <Calendar
              mode="multiple"
              selected={selectedDates}
              onSelect={handleAvailabilityChange}
              className="rounded-md border"
            />
          </Card>
        </TabsContent>

        <TabsContent value="earnings">
          <Card className="p-4">
            <p>Earnings overview coming soon...</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}