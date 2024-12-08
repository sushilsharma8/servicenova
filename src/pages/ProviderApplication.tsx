import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { PersonalDetailsSection } from "@/components/provider-application/PersonalDetailsSection";
import { ProfessionalDetailsSection } from "@/components/provider-application/ProfessionalDetailsSection";
import { DocumentUploadSection } from "@/components/provider-application/DocumentUploadSection";
import { Database } from "@/integrations/supabase/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ServiceType = Database["public"]["Enums"]["service_type"];

const ProviderApplication = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
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

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-step active">
            <PersonalDetailsSection
              fullName={formData.fullName}
              address={formData.address}
              age={formData.age}
              onChange={handleChange}
            />
          </div>
        );
      case 2:
        return (
          <div className="form-step active">
            <ProfessionalDetailsSection
              serviceType={formData.serviceType}
              yearsExperience={formData.yearsExperience}
              certifications={formData.certifications}
              onChange={handleChange}
            />
          </div>
        );
      case 3:
        return (
          <div className="form-step active">
            <DocumentUploadSection onFileChange={handleFileChange} />
          </div>
        );
      case 4:
        return (
          <div className="form-step active">
            <Card>
              <CardHeader>
                <CardTitle>Schedule Interview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <input
                  type="datetime-local"
                  value={formData.preferredInterviewDate}
                  onChange={(e) => handleChange("preferredInterviewDate", e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  required
                />
              </CardContent>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight">Service Provider Application</h1>
            <p className="mt-2 text-lg text-gray-500">
              Join our network of professional service providers
            </p>
          </div>

          <div className="space-y-4">
            <div className="progress-bar">
              <div 
                className="progress-bar-fill"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Personal Details</span>
              <span>Professional Info</span>
              <span>Documents</span>
              <span>Schedule</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {renderStep()}

            <div className="flex justify-between pt-6">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                >
                  Previous
                </Button>
              )}
              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  className="ml-auto"
                  onClick={nextStep}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="ml-auto"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProviderApplication;
