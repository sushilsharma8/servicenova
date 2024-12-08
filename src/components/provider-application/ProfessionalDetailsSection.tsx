import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Database } from "@/integrations/supabase/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChefHat, GlassWater, Utensils, LucideIcon } from "lucide-react";

type ServiceType = Database["public"]["Enums"]["service_type"];

interface ProfessionalDetailsSectionProps {
  serviceType: ServiceType;
  yearsExperience: string;
  certifications: string;
  onChange: (field: string, value: string) => void;
}

interface ServiceCardProps {
  type: string;
  icon: LucideIcon;
  isSelected: boolean;
  onClick: () => void;
}

const ServiceCard = ({ type, icon: Icon, isSelected, onClick }: ServiceCardProps) => (
  <Card 
    className={`cursor-pointer transition-all hover:border-accent ${
      isSelected ? 'border-accent bg-card/50' : 'bg-card/30'
    }`}
    onClick={onClick}
  >
    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
      <Icon className={`w-12 h-12 ${isSelected ? 'text-accent' : 'text-primary-foreground'}`} />
      <h3 className="font-semibold text-lg">{type}</h3>
    </CardContent>
  </Card>
);

export const ProfessionalDetailsSection = ({
  serviceType,
  yearsExperience,
  certifications,
  onChange,
}: ProfessionalDetailsSectionProps) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <CardHeader className="px-0">
        <CardTitle className="text-3xl font-bold text-center">Choose Your Role</CardTitle>
      </CardHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ServiceCard
          type="Bartender"
          icon={GlassWater}
          isSelected={serviceType === "bartender"}
          onClick={() => onChange("serviceType", "bartender")}
        />
        <ServiceCard
          type="Chef"
          icon={ChefHat}
          isSelected={serviceType === "chef"}
          onClick={() => onChange("serviceType", "chef")}
        />
        <ServiceCard
          type="Server"
          icon={Utensils}
          isSelected={serviceType === "server"}
          onClick={() => onChange("serviceType", "server")}
        />
      </div>

      <div className="space-y-6 bg-card/30 p-6 rounded-lg backdrop-blur-sm">
        <div>
          <Label htmlFor="yearsExperience" className="text-lg mb-2 block">
            Years of Experience
          </Label>
          <Input
            id="yearsExperience"
            type="number"
            min="0"
            value={yearsExperience}
            onChange={(e) => onChange("yearsExperience", e.target.value)}
            required
            className="bg-background/50 border-primary/20"
            placeholder="Enter your years of experience"
          />
        </div>

        <div>
          <Label htmlFor="certifications" className="text-lg mb-2 block">
            Certifications
          </Label>
          <Input
            id="certifications"
            value={certifications}
            onChange={(e) => onChange("certifications", e.target.value)}
            placeholder="e.g., Food Safety, Bartending License (comma-separated)"
            className="bg-background/50 border-primary/20"
          />
        </div>
      </div>
    </div>
  );
};