import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { PersonalDetailsSection } from "@/components/provider-application/PersonalDetailsSection";
import { ProfessionalDetailsSection } from "@/components/provider-application/ProfessionalDetailsSection";
import { DocumentUploadSection } from "@/components/provider-application/DocumentUploadSection";
import { InterviewScheduleSection } from "@/components/provider-application/InterviewScheduleSection";
import { Database } from "@/integrations/supabase/types";

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
    phoneNumber: "", 
    email: "",
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

      // Convert string values to numbers where needed
      const phoneNumber = formData.phoneNumber ? parseFloat(formData.phoneNumber) : null;
      const age = parseInt(formData.age);
      const yearsExperience = parseInt(formData.yearsExperience);

      const { error } = await supabase.from('provider_applications').insert({
        full_name: formData.fullName,
        address: formData.address,
        age: age,
        phone_number: phoneNumber,
        email: formData.email,
        service_type: formData.serviceType,
        years_experience: yearsExperience,
        certifications: formData.certifications.split(',').map(cert => cert.trim()),
        identity_proof_url: identityProofUrl,
        experience_proof_url: experienceProofUrl,
        preferred_interview_date: formData.preferredInterviewDate,
        status: 'pending', // Set status as pending initially
        user_id: user.id
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
              phoneNumber={formData.phoneNumber}
              email={formData.email}
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
            <InterviewScheduleSection
              value={formData.preferredInterviewDate}
              onChange={(value) => handleChange("preferredInterviewDate", value)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#0A0A0A] py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white">Service Provider Application</h1>
            <p className="mt-2 text-lg text-gray-400">
              Join our network of professional service providers
            </p>
          </div>

          <div className="space-y-4">
            <div className="h-1 bg-white/10 rounded-full">
              <div 
                className="h-1 bg-[#CCFF00] rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span className={currentStep >= 1 ? "text-[#CCFF00]" : ""}>Personal Details</span>
              <span className={currentStep >= 2 ? "text-[#CCFF00]" : ""}>Professional Info</span>
              <span className={currentStep >= 3 ? "text-[#CCFF00]" : ""}>Documents</span>
              <span className={currentStep >= 4 ? "text-[#CCFF00]" : ""}>Schedule</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm border-white/10 p-8 rounded-lg">
              {renderStep()}
            </div>

            <div className="flex justify-between pt-6">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="border-white/10 text-white hover:bg-white/5"
                >
                  Previous
                </Button>
              )}
              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90 ml-auto"
                  onClick={nextStep}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90 ml-auto"
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