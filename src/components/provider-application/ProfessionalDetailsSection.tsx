import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Database } from "@/integrations/supabase/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChefHat, GlassWater, Utensils, LucideIcon, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

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
    <CardContent className="p-3 flex flex-col items-center text-center space-x y-2">
      <Icon className={`w-8 h-8 ${isSelected ? 'text-accent' : 'text-primary-foreground'}`} />
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
  const [certificationInput, setCertificationInput] = useState("");
  const [certificationsList, setCertificationsList] = useState<string[]>(
    certifications ? certifications.split(",").map(cert => cert.trim()) : []
  );

  useEffect(() => {
    onChange("certifications", certificationsList.join(", "));
  }, [certificationsList, onChange]);

  const handleAddCertification = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && certificationInput.trim()) {
      e.preventDefault();
      setCertificationsList(prev => [...prev, certificationInput.trim()]);
      setCertificationInput("");
    }
  };

  const removeCertification = (index: number) => {
    setCertificationsList(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3 animate-fade-in">
      <CardHeader className="px-0">
        <CardTitle className="text-4xl font-bold text-center">Choose Your Role</CardTitle>
      </CardHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
        <div className="space-y-4">
          <Label htmlFor="yearsExperience" className="text-lg mb-2 block">
            Years of Experience
          </Label>
          <Input
            id="yearsExperience"
            type="number"
            min="0"
            max="50"
            value={yearsExperience}
            onChange={(e) => onChange("yearsExperience", e.target.value)}
            className="w-full"
            required
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="certifications" className="text-lg mb-2 block">
            Certifications
          </Label>
          <div className="space-y-2">
            <Input
              id="certifications"
              value={certificationInput}
              onChange={(e) => setCertificationInput(e.target.value)}
              onKeyDown={handleAddCertification}
              placeholder="Type certification and press Enter"
              className="bg-background/50 border-primary/20"
            />
            <div className="flex flex-wrap gap-2 min-h-[2rem]">
              {certificationsList.map((cert, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="px-3 py-1 flex items-center gap-2"
                >
                  {cert}
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-destructive"
                    onClick={() => removeCertification(index)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};