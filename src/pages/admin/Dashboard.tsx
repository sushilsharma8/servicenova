import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useState } from "react";
import { MetricsCards } from "@/components/admin/MetricsCards";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { ServiceRequestsTable } from "@/components/admin/ServiceRequestsTable";
import { DisputesTable } from "@/components/admin/DisputesTable";
import { Calendar, CheckCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const [selectedDispute, setSelectedDispute] = useState<string | null>(null);

  const { data: metrics } = useQuery({
    queryKey: ["admin-metrics"],
    queryFn: async () => {
      const { data: events, error: eventsError } = await supabase
        .from("events")
        .select("*");

      if (eventsError) {
        console.error("Events error:", eventsError);
      }

      const { data: providers, error: providersError } = await supabase
        .from("provider_applications")
        .select("*")
        .eq('status', 'approved');

      if (providersError) {
        console.error("Providers error:", providersError);
      }

      const { data: requests, error: requestsError } = await supabase
        .from("event_service_requests")
        .select("*");

      if (requestsError) {
        console.error("Requests error:", requestsError);
      }

      return {
        totalEvents: events?.length || 0,
        totalProviders: providers?.length || 0,
        totalRequests: requests?.length || 0,
        pendingRequests: requests?.filter(r => r.status === 'pending').length || 0
      };
    },
  });

  const { data: revenueData } = useQuery({
    queryKey: ["revenue-data"],
    queryFn: async () => {
      const { data } = await supabase
        .from("event_service_requests")
        .select("created_at, rate_agreed")
        .not("rate_agreed", "is", null);

      if (!data) return [];

      const monthlyRevenue = data.reduce((acc: Record<string, number>, curr) => {
        const month = new Date(curr.created_at).toLocaleString('default', { month: 'short' });
        const amount = typeof curr.rate_agreed === 'string' 
          ? parseFloat(curr.rate_agreed) 
          : Number(curr.rate_agreed) || 0;
        
        acc[month] = (acc[month] || 0) + amount;
        return acc;
      }, {});

      return Object.entries(monthlyRevenue).map(([month, amount]) => ({
        month,
        amount: Number(amount),
      }));
    },
  });

  const { data: requests, refetch: refetchRequests } = useQuery({
    queryKey: ["service-requests"],
    queryFn: async () => {
      const { data } = await supabase
        .from("event_service_requests")
        .select(`
          *,
          events (
            event_date,
            location
          ),
          provider_applications (
            full_name,
            service_type
          )
        `)
        .order("created_at", { ascending: false });
      return data;
    },
  });

  const handleDisputeResolution = async (requestId: string, resolution: 'completed' | 'cancelled') => {
    try {
      const { error } = await supabase
        .from("event_service_requests")
        .update({ status: resolution })
        .eq("id", requestId);

      if (error) throw error;

      toast.success(`Request ${resolution === 'completed' ? 'resolved' : 'cancelled'} successfully`);
      setSelectedDispute(null);
      refetchRequests();
    } catch (error) {
      console.error("Error resolving dispute:", error);
      toast.error("Failed to resolve dispute");
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-semibold mb-6 neon-gradient">Admin Dashboard</h1>

        {metrics && <MetricsCards metrics={metrics} />}

        <Tabs defaultValue="analytics" className="space-y-4">
          <TabsList className="flex justify-center gap-4">
            <TabsTrigger value="analytics" className="bg-gradient-to-r from-neon-green to-teal-500 text-white rounded-lg p-2">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="requests" className="bg-gradient-to-r from-neon-green to-teal-500 text-white rounded-lg p-2">
              Requests
            </TabsTrigger>
            <TabsTrigger value="disputes" className="bg-gradient-to-r from-neon-green to-teal-500 text-white rounded-lg p-2">
              Disputes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-4 bg-gradient-to-b from-[#111] to-dark-bg p-4 rounded-lg shadow-lg">
            {revenueData && <RevenueChart data={revenueData} />}
          </TabsContent>

          <TabsContent value="requests" className="space-y-4 bg-gradient-to-b from-[#111] to-dark-bg p-4 rounded-lg shadow-lg">
            <Card className="bg-gradient-to-b from-[#0A0A0A] to-[#111] p-6 rounded-xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-white font-semibold">Service Requests</CardTitle>
                <CardDescription className="text-gray-400">Manage all service requests</CardDescription>
              </CardHeader>
              <CardContent>
                {requests && <ServiceRequestsTable requests={requests} />}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="disputes" className="space-y-4 bg-gradient-to-b from-[#111] to-dark-bg p-4 rounded-lg shadow-lg">
            <Card className="bg-gradient-to-b from-[#0A0A0A] to-[#111] p-6 rounded-xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-white font-semibold">Dispute Management</CardTitle>
                <CardDescription className="text-gray-400">Handle customer disputes and refunds</CardDescription>
              </CardHeader>
              <CardContent>
                {requests && (
                  <DisputesTable
                    disputes={requests.filter(r => r.status === 'pending')}
                    onResolve={(id) => handleDisputeResolution(id, 'completed')}
                    onRefund={(id) => handleDisputeResolution(id, 'cancelled')}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Button 
          className="bg-neon-green text-black hover:bg-neon-green/90 text-lg px-6 py-2 rounded-full shadow-lg mt-4 transition-transform transform hover:scale-105"
          onClick={() => refetchRequests()}
        >
          Refetch Data
          <CheckCircle className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
