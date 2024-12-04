import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { PersonalDetailsSection } from "@/components/provider-application/PersonalDetailsSection";
import { ProfessionalDetailsSection } from "@/components/provider-application/ProfessionalDetailsSection";
import { DocumentUploadSection } from "@/components/provider-application/DocumentUploadSection";
import { Database } from "@/integrations/supabase/types";

type ServiceType = Database["public"]["Enums"]["service_type"];

const ProviderApplication = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    age: "",
    serviceType: "bartender" as ServiceType,
    yearsExperience: "",
    certifications: "",
    identityProof: null as File | null,
    experienceProof: null as File | null,
    preferredInterviewDate: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (type: 'identity' | 'experience', file: File) => {
    setFormData(prev => ({
      ...prev,
      [type === 'identity' ? 'identityProof' : 'experienceProof']: file
    }));
  };

  const uploadFile = async (file: File, type: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No user found");

    const fileExt = file.name.split('.').pop();
    const filePath = `${user.id}/${type}_${Date.now()}.${fileExt}`;

    const { error: uploadError, data } = await supabase.storage
      .from('provider_documents')
      .upload(filePath, file);

    if (uploadError) throw uploadError;
    return filePath;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      let identityProofUrl = null;
      let experienceProofUrl = null;

      if (formData.identityProof) {
        identityProofUrl = await uploadFile(formData.identityProof, 'identity');
      }
      if (formData.experienceProof) {
        experienceProofUrl = await uploadFile(formData.experienceProof, 'experience');
      }

      const { error } = await supabase.from('provider_applications').insert({
        user_id: user.id,
        full_name: formData.fullName,
        address: formData.address,
        age: parseInt(formData.age),
        service_type: formData.serviceType,
        years_experience: parseInt(formData.yearsExperience),
        certifications: formData.certifications.split(',').map(cert => cert.trim()),
        identity_proof_url: identityProofUrl,
        experience_proof_url: experienceProofUrl,
        preferred_interview_date: formData.preferredInterviewDate,
      });

      if (error) throw error;

      toast.success("Application submitted successfully!");
      navigate("/application-success");
    } catch (error: any) {
      toast.error(error.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Service Provider Application</h1>
        <p className="text-gray-500 mt-2">
          Fill out the form below to apply as a service provider
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <PersonalDetailsSection
          fullName={formData.fullName}
          address={formData.address}
          age={formData.age}
          onChange={handleChange}
        />

        <ProfessionalDetailsSection
          serviceType={formData.serviceType}
          yearsExperience={formData.yearsExperience}
          certifications={formData.certifications}
          onChange={handleChange}
        />

        <DocumentUploadSection onFileChange={handleFileChange} />

        <div>
          <Label htmlFor="preferredInterviewDate">Preferred Interview Date</Label>
          <Input
            id="preferredInterviewDate"
            type="datetime-local"
            value={formData.preferredInterviewDate}
            onChange={(e) => handleChange("preferredInterviewDate", e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Submitting..." : "Submit Application"}
        </Button>
      </form>
    </div>
  );
};

export default ProviderApplication;