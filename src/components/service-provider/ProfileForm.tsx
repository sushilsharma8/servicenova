import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { ServiceProviderProfile } from "@/types/service-provider";

interface ProfileFormProps {
  profile: ServiceProviderProfile;
  setProfile: (profile: ServiceProviderProfile) => void;
}

export const ProfileForm = ({ profile, setProfile }: ProfileFormProps) => {
  const [newCertification, setNewCertification] = useState("");

  const addCertification = () => {
    if (newCertification.trim()) {
      setProfile({
        ...profile,
        certifications: [...(profile.certifications || []), newCertification.trim()],
      });
      setNewCertification("");
    }
  };

  const removeCertification = (index: number) => {
    setProfile({
      ...profile,
      certifications: profile.certifications.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="business_name">Business Name</Label>
        <Input
          id="business_name"
          value={profile.business_name}
          onChange={(e) =>
            setProfile({ ...profile, business_name: e.target.value })
          }
          required
        />
      </div>

      <div>
        <Label htmlFor="service_type">Service Type</Label>
        <select
          id="service_type"
          className="w-full p-2 border rounded-md"
          value={profile.service_type}
          onChange={(e) =>
            setProfile({
              ...profile,
              service_type: e.target.value as ServiceProviderProfile["service_type"],
            })
          }
          required
        >
          <option value="bartender">Bartender</option>
          <option value="chef">Chef</option>
          <option value="server">Server</option>
        </select>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={profile.description}
          onChange={(e) =>
            setProfile({ ...profile, description: e.target.value })
          }
          required
        />
      </div>

      <div>
        <Label htmlFor="hourly_rate">Hourly Rate ($)</Label>
        <Input
          id="hourly_rate"
          type="number"
          min="0"
          step="0.01"
          value={profile.hourly_rate}
          onChange={(e) =>
            setProfile({ ...profile, hourly_rate: parseFloat(e.target.value) })
          }
          required
        />
      </div>

      <div>
        <Label htmlFor="years_experience">Years of Experience</Label>
        <Input
          id="years_experience"
          type="number"
          min="0"
          value={profile.years_experience}
          onChange={(e) =>
            setProfile({
              ...profile,
              years_experience: parseInt(e.target.value),
            })
          }
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Certifications</Label>
        <div className="flex gap-2">
          <Input
            value={newCertification}
            onChange={(e) => setNewCertification(e.target.value)}
            placeholder="Add certification"
          />
          <Button type="button" onClick={addCertification}>
            Add
          </Button>
        </div>
        <div className="space-y-2">
          {profile.certifications?.map((cert, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 p-2 rounded"
            >
              <span>{cert}</span>
              <Button
                type="button"
                variant="destructive"
                onClick={() => removeCertification(index)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};