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

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, FileText, CalendarDays } from "lucide-react";

const AdminReview = () => {
  const { data: applications, isLoading, refetch } = useQuery({
    queryKey: ["provider-applications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("provider_applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleUpdateStatus = async (applicationId, newStatus) => {
    try {
      const { error } = await supabase
        .from("provider_applications")
        .update({ status: newStatus })
        .eq("id", applicationId);

      if (error) throw error;

      toast.success(`Application ${newStatus} successfully!`);
      refetch(); // Refresh data
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black to-gray-900">
        <div className="loader border-t-transparent border-4 border-[#CCFF00] w-8 h-8 rounded-full animate-spin"></div>
      </div>
    );
  }

  const pendingApplications = applications?.filter(
    (app) => app.status === "pending"
  );
  const reviewedApplications = applications?.filter(
    (app) => app.status === "approved" || app.status === "rejected"
  );
  
  // Function to handle status update and scheduling the interview
  const handleScheduleInterview = async (applicationId) => {
    try {
      // Fetch the current application data
      const { data: application, error: fetchError } = await supabase
        .from("provider_applications")
        .select("*")
        .eq("id", applicationId)
        .single();
  
      if (fetchError) throw fetchError;
  
      // Generate a Google Meet link (simulated)
      const meetLink = "https://meet.google.com/" + Math.random().toString(36).substring(2, 15);
  
      // Update application status to "interview_scheduled" and add the meet link
      const { error: updateError } = await supabase
        .from("provider_applications")
        .update({ status: "interview_scheduled", interview_link: meetLink })
        .eq("id", applicationId);
  
      if (updateError) throw updateError;
  
      // Send interview email notification with Google Meet link
      const { error: emailError } = await supabase.functions.invoke("send-interview-email", {
        body: {
          to: application.email || "applicant@example.com",
          applicantName: application.full_name,
          interviewDate: application.preferred_interview_date, // Or any date field you want
          meetingLink: meetLink, // The Google Meet link generated above
        },
      });
  
      if (emailError) {
        console.error("Error sending email:", emailError);
        toast.error("Interview scheduled but failed to send email notification");
      } else {
        toast.success("Interview scheduled and email notification sent");
      }
  
      // Refresh the applications data
      refetch();
  
    } catch (error) {
      console.error("Error scheduling interview:", error);
      toast.error("Failed to schedule interview. Please try again.");
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-white">Provider Applications</h1>
          <p className="text-gray-400 text-lg mt-2">
            Review and manage applications efficiently.
          </p>
        </div>

        {/* Pending Applications */}
        <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg mb-8">
          <CardHeader className="bg-white/10 border-b border-white/10 px-6 py-4">
            <CardTitle className="text-xl text-white">Pending Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="w-full text-white">
              <TableHeader>
                <TableRow className="bg-white/10">
                  <TableHead className="px-4 py-2">Name</TableHead>
                  <TableHead className="px-4 py-2">Service Type</TableHead>
                  <TableHead className="px-4 py-2">Experience</TableHead>
                  <TableHead className="px-4 py-2">Documents</TableHead>
                  <TableHead className="px-4 py-2">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingApplications.map((application) => (
                  <TableRow key={application.id} className="hover:bg-white/10 transition">
                    <TableCell className="px-4 py-2">{application.full_name}</TableCell>
                    <TableCell className="px-4 py-2">{application.service_type}</TableCell>
                    <TableCell className="px-4 py-2">
                      {application.years_experience} years
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      <a
                        href={application.identity_proof_url || "#"}
                        className="text-[#CCFF00] hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileText className="inline w-4 h-4 mr-1" /> ID Proof
                      </a>
                      {application.experience_proof_url && (
                        <>
                          <br />
                          <a
                            href={application.experience_proof_url}
                            className="text-[#CCFF00] hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FileText className="inline w-4 h-4 mr-1" /> Experience Proof
                          </a>
                        </>
                      )}
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      <div className="flex flex-col space-y-3">
                        <Button
                          size="sm"
                          className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90"
                          onClick={() => handleUpdateStatus(application.id, "approved")}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleUpdateStatus(application.id, "rejected")}
                        >
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleScheduleInterview(application.id)}
                        >
                          <CalendarDays className="w-4 h-4 mr-1" />
                          Schedule Interview
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Reviewed Applications */}
        <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg shadow-md">
          <CardHeader className="bg-white/10 border-b border-white/10 px-6 py-4">
            <CardTitle className="text-xl text-white">Reviewed Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="w-full text-white">
              <TableHeader>
                <TableRow className="bg-white/10">
                  <TableHead className="px-4 py-2">Name</TableHead>
                  <TableHead className="px-4 py-2">Service Type</TableHead>
                  <TableHead className="px-4 py-2">Experience</TableHead>
                  <TableHead className="px-4 py-2">Status</TableHead>
                  <TableHead className="px-4 py-2">Documents</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviewedApplications.map((application) => (
                  <TableRow key={application.id} className="hover:bg-white/10 transition">
                    <TableCell className="px-4 py-2">{application.full_name}</TableCell>
                    <TableCell className="px-4 py-2">{application.service_type}</TableCell>
                    <TableCell className="px-4 py-2">
                      {application.years_experience} years
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      <Badge
                        variant={
                          application.status === "approved" ? "default" : "destructive"
                        }
                        className="text-sm px-2 py-1"
                      >
                        {application.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      <a
                        href={application.identity_proof_url || "#"}
                        className="text-[#CCFF00] hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileText className="inline w-4 h-4 mr-1" /> ID Proof
                      </a>
                      {application.experience_proof_url && (
                        <>
                          <br />
                          <a
                            href={application.experience_proof_url}
                            className="text-[#CCFF00] hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FileText className="inline w-4 h-4 mr-1" /> Experience Proof
                          </a>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminReview;
