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
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-3">
        <Label htmlFor="identityProof" className="text-lg">Identity Proof (Aadhar/PAN)</Label>
        <Input
          id="identityProof"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => handleChange(e, 'identity')}
          required
          className="bg-background/50 text-primary-foreground hover:bg-background/70 border-primary/20 focus:ring-2 focus:ring-accent transition-all"
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="experienceProof" className="text-lg">Experience Proof (Optional)</Label>
        <Input
          id="experienceProof"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => handleChange(e, 'experience')}
          className="bg-background/50 text-primary-foreground hover:bg-background/70 border-primary/20 focus:ring-2 focus:ring-accent transition-all"
        />
      </div>
    </div>
  );
};
