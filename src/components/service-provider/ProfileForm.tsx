import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ServiceProviderProfile } from "@/types/service-provider";

interface ProfileFormProps {
  profile: ServiceProviderProfile;
  onSubmit: (profile: ServiceProviderProfile) => void;
}

export const ProfileForm = ({ profile: initialProfile, onSubmit }: ProfileFormProps) => {
  const [profile, setProfile] = useState(initialProfile);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profile);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="full_name">Full Name</Label>
        <Input
          id="full_name"
          value={profile.full_name}
          onChange={(e) =>
            setProfile({ ...profile, full_name: e.target.value })
          }
          required
        />
      </div>

      <div>
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={profile.address}
          onChange={(e) =>
            setProfile({ ...profile, address: e.target.value })
          }
          required
        />
      </div>

      <div>
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          type="number"
          min="18"
          value={profile.age}
          onChange={(e) =>
            setProfile({ ...profile, age: parseInt(e.target.value) })
          }
          required
        />
      </div>

      <div>
        <Label htmlFor="service_type">Service Type</Label>
        <select
          id="service_type"
          className="w-full p-2 border rounded-md bg-background"
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

      <div>
        <Label htmlFor="phone_number">Phone Number</Label>
        <Input
          id="phone_number"
          type="tel"
          value={profile.phone_number}
          onChange={(e) =>
            setProfile({ ...profile, phone_number: e.target.value })
          }
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={profile.email}
          onChange={(e) =>
            setProfile({ ...profile, email: e.target.value })
          }
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
              className="flex items-center justify-between bg-white/5 p-2 rounded"
            >
              <span className="text-white">{cert}</span>
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

      <Button type="submit" className="w-full bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90">
        Save Changes
      </Button>
    </form>
  );
};