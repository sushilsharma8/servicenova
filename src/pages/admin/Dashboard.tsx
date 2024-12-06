import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{metrics?.totalEvents}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Service Providers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{metrics?.totalProviders}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{metrics?.totalRequests}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{metrics?.pendingRequests}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="analytics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="disputes">Disputes</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
              <CardDescription>Revenue trends over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>Service Requests</CardTitle>
              <CardDescription>Manage all service requests</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests?.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        {new Date(request.events.event_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{request.events.location}</TableCell>
                      <TableCell>
                        {request.service_providers?.business_name || "Unassigned"}
                      </TableCell>
                      <TableCell>
                        <Badge>{request.status}</Badge>
                      </TableCell>
                      <TableCell>
                        ${request.rate_agreed || "Not set"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests?.filter(r => r.status === 'pending').map((dispute) => (
                    <TableRow key={dispute.id}>
                      <TableCell>
                        {new Date(dispute.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {dispute.service_providers?.business_name || "Unknown"}
                      </TableCell>
                      <TableCell>${dispute.rate_agreed || 0}</TableCell>
                      <TableCell>
                        <Badge variant="destructive">Pending Resolution</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleDisputeResolution(dispute.id, 'completed')}
                          >
                            Resolve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDisputeResolution(dispute.id, 'cancelled')}
                          >
                            Refund
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}