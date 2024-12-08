import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Database } from "@/integrations/supabase/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ProviderApplication = Database["public"]["Tables"]["provider_applications"]["Row"];

const AdminReview = () => {
  const { data: applications, isLoading, refetch } = useQuery({
    queryKey: ["provider-applications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("provider_applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as ProviderApplication[];
    },
  });

  const handleUpdateStatus = async (
    applicationId: string,
    newStatus: Database["public"]["Enums"]["provider_application_status"],
    interviewLink?: string
  ) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      console.log("Current session:", session);

      const meetLink = "https://meet.google.com/" + Math.random().toString(36).substring(2, 15);

      const { data: application, error: fetchError } = await supabase
        .from("provider_applications")
        .select("*")
        .eq("id", applicationId)
        .single();

      console.log("Current application data:", application);

      if (fetchError) {
        console.error("Error fetching application:", fetchError);
        throw fetchError;
      }

      const { data: updateData, error: updateError } = await supabase
        .from("provider_applications")
        .update({
          status: newStatus,
          interview_link: meetLink,
        })
        .eq("id", applicationId)
        .select()
        .single();

      console.log("Update response:", { data: updateData, error: updateError });

      if (updateError) throw updateError;

      if (newStatus === "interview_scheduled") {
        const { error: emailError } = await supabase.functions.invoke("send-interview-email", {
          body: {
            to: application.email || "applicant@example.com",
            applicantName: application.full_name,
            interviewDate: application.preferred_interview_date,
            meetingLink: meetLink,
          },
        });

        if (emailError) {
          console.error("Error sending email:", emailError);
          toast.error("Interview scheduled but failed to send email notification");
        } else {
          toast.success("Interview scheduled and email notification sent");
        }
      } else {
        toast.success(`Application ${newStatus} successfully`);
      }

      refetch();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update application status");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Provider Applications Review</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Service Type</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications?.map((application) => (
                <TableRow key={application.id}>
                  <TableCell>{application.full_name}</TableCell>
                  <TableCell>{application.service_type}</TableCell>
                  <TableCell>{application.years_experience} years</TableCell>
                  <TableCell>
                    <Badge variant={application.status === "pending" ? "secondary" : 
                                application.status === "approved" ? "outline" : 
                                application.status === "rejected" ? "destructive" : 
                                "default"}>
                      {application.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {application.identity_proof_url && (
                      <a
                        href={`${supabase.storage.from('provider_documents').getPublicUrl(application.identity_proof_url).data.publicUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline mr-2"
                      >
                        ID Proof
                      </a>
                    )}
                    {application.experience_proof_url && (
                      <a
                        href={`${supabase.storage.from('provider_documents').getPublicUrl(application.experience_proof_url).data.publicUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Experience Proof
                      </a>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="space-x-2">
                      {application.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleUpdateStatus(application.id, "interview_scheduled")}
                          >
                            Schedule Interview
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleUpdateStatus(application.id, "rejected")}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                      {application.status === "interview_scheduled" && (
                        <Button
                          size="sm"
                          onClick={() => handleUpdateStatus(application.id, "approved")}
                        >
                          Approve
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminReview;
