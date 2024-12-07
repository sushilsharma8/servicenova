import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface MetricsCardsProps {
  metrics: {
    totalEvents: number;
    totalProviders: number;
    totalRequests: number;
    pendingRequests: number;
  };
}

export const MetricsCards = ({ metrics }: MetricsCardsProps) => {
  return (
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
  );
};