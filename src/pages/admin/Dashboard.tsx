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

export default function AdminDashboard() {
  const [selectedDispute, setSelectedDispute] = useState<string | null>(null);

  const { data: metrics } = useQuery({
    queryKey: ["admin-metrics"],
    queryFn: async () => {
      const { data: events } = await supabase
        .from("events")
        .select("*");

      const { data: providers } = await supabase
        .from("service_providers")
        .select("*");

      const { data: requests } = await supabase
        .from("event_service_requests")
        .select("*");

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

      const monthlyRevenue = data?.reduce((acc: any, curr) => {
        const month = new Date(curr.created_at).toLocaleString('default', { month: 'short' });
        acc[month] = (acc[month] || 0) + Number(curr.rate_agreed);
        return acc;
      }, {});

      return Object.entries(monthlyRevenue || {}).map(([month, amount]) => ({
        month,
        amount,
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
          service_providers (
            business_name
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

      toast.success(`Dispute ${resolution === 'completed' ? 'resolved' : 'cancelled'} successfully`);
      setSelectedDispute(null);
      refetchRequests();
    } catch (error) {
      console.error("Error resolving dispute:", error);
      toast.error("Failed to resolve dispute");
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {metrics && <MetricsCards metrics={metrics} />}

      <Tabs defaultValue="analytics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="disputes">Disputes</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          {revenueData && <RevenueChart data={revenueData} />}
        </TabsContent>

        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>Service Requests</CardTitle>
              <CardDescription>Manage all service requests</CardDescription>
            </CardHeader>
            <CardContent>
              {requests && <ServiceRequestsTable requests={requests} />}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="disputes">
          <Card>
            <CardHeader>
              <CardTitle>Dispute Management</CardTitle>
              <CardDescription>Handle customer disputes and refunds</CardDescription>
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
    </div>
  );
}