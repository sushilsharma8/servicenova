import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ProviderApplication = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    age: "",
    serviceType: "bartender",
    yearsExperience: "",
    certifications: "",
    identityProof: null as File | null,
    experienceProof: null as File | null,
    preferredInterviewDate: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'identity' | 'experience') => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        [type === 'identity' ? 'identityProof' : 'experienceProof']: e.target.files![0]
      }));
    }
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
        <div className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              min="18"
              value={formData.age}
              onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="serviceType">Service Type</Label>
            <select
              id="serviceType"
              className="w-full p-2 border rounded-md"
              value={formData.serviceType}
              onChange={(e) => setFormData(prev => ({ ...prev, serviceType: e.target.value }))}
              required
            >
              <option value="bartender">Bartender</option>
              <option value="chef">Chef</option>
              <option value="server">Server</option>
            </select>
          </div>

          <div>
            <Label htmlFor="yearsExperience">Years of Experience</Label>
            <Input
              id="yearsExperience"
              type="number"
              min="0"
              value={formData.yearsExperience}
              onChange={(e) => setFormData(prev => ({ ...prev, yearsExperience: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="certifications">Certifications (comma-separated)</Label>
            <Input
              id="certifications"
              value={formData.certifications}
              onChange={(e) => setFormData(prev => ({ ...prev, certifications: e.target.value }))}
              placeholder="e.g., Food Safety, Bartending License"
            />
          </div>

          <div>
            <Label htmlFor="identityProof">Identity Proof (Aadhar/PAN)</Label>
            <Input
              id="identityProof"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileChange(e, 'identity')}
              required
            />
          </div>

          <div>
            <Label htmlFor="experienceProof">Experience Proof</Label>
            <Input
              id="experienceProof"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileChange(e, 'experience')}
              required
            />
          </div>

          <div>
            <Label htmlFor="preferredInterviewDate">Preferred Interview Date</Label>
            <Input
              id="preferredInterviewDate"
              type="datetime-local"
              value={formData.preferredInterviewDate}
              onChange={(e) => setFormData(prev => ({ ...prev, preferredInterviewDate: e.target.value }))}
              required
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Submitting..." : "Submit Application"}
        </Button>
      </form>
    </div>
  );
};

export default ProviderApplication;