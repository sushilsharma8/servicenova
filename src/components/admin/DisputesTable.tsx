import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Dispute {
  id: string;
  created_at: string;
  service_providers?: {
    business_name: string | null;
  };
  rate_agreed: number | null;
}

interface DisputesTableProps {
  disputes: Dispute[];
  onResolve: (id: string) => void;
  onRefund: (id: string) => void;
}

export const DisputesTable = ({ disputes, onResolve, onRefund }: DisputesTableProps) => {
  return (
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
        {disputes?.map((dispute) => (
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
                  onClick={() => onResolve(dispute.id)}
                >
                  Resolve
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onRefund(dispute.id)}
                >
                  Refund
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};