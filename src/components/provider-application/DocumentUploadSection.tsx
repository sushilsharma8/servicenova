import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DocumentUploadSectionProps {
  onFileChange: (type: 'identity' | 'experience', file: File) => void;
}

export const DocumentUploadSection = ({ onFileChange }: DocumentUploadSectionProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'identity' | 'experience') => {
    if (e.target.files && e.target.files[0]) {
      onFileChange(type, e.target.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="identityProof">Identity Proof (Aadhar/PAN)</Label>
        <Input
          id="identityProof"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => handleChange(e, 'identity')}
          required
        />
      </div>

      <div>
        <Label htmlFor="experienceProof">Experience Proof</Label>
        <Input
          id="experienceProof"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => handleChange(e, 'experience')}
          required
        />
      </div>
    </div>
  );
};