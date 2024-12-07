import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ServiceRequest {
  id: string;
  events: {
    event_date: string;
    location: string;
  };
  service_providers?: {
    business_name: string | null;
  };
  status: string;
  rate_agreed: number | null;
}

interface ServiceRequestsTableProps {
  requests: ServiceRequest[];
}

export const ServiceRequestsTable = ({ requests }: ServiceRequestsTableProps) => {
  return (
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
            <TableCell>${request.rate_agreed || "Not set"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};