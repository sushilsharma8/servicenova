import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Database } from "@/integrations/supabase/types";

type ServiceType = Database["public"]["Enums"]["service_type"];

interface ProfessionalDetailsSectionProps {
  serviceType: ServiceType;
  yearsExperience: string;
  certifications: string;
  onChange: (field: string, value: string) => void;
}

export const ProfessionalDetailsSection = ({
  serviceType,
  yearsExperience,
  certifications,
  onChange,
}: ProfessionalDetailsSectionProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="serviceType">Service Type</Label>
        <select
          id="serviceType"
          className="w-full p-2 border rounded-md"
          value={serviceType}
          onChange={(e) => onChange("serviceType", e.target.value as ServiceType)}
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
          value={yearsExperience}
          onChange={(e) => onChange("yearsExperience", e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="certifications">Certifications (comma-separated)</Label>
        <Input
          id="certifications"
          value={certifications}
          onChange={(e) => onChange("certifications", e.target.value)}
          placeholder="e.g., Food Safety, Bartending License"
        />
      </div>
    </div>
  );
};