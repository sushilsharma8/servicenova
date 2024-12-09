import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface PersonalDetailsSectionProps {
  fullName: string;
  address: string;
  age: string;
  phoneNumber: string; // Added phone number prop
  onChange: (field: string, value: string) => void;
}

export const PersonalDetailsSection = ({
  fullName,
  address,
  age,
  phoneNumber, // Added phone number prop
  onChange,
}: PersonalDetailsSectionProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          value={fullName}
          onChange={(e) => onChange("fullName", e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="address">Address</Label>
        <Textarea
          id="address"
          value={address}
          onChange={(e) => onChange("address", e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          type="number"
          min="18"
          value={age}
          onChange={(e) => onChange("age", e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="phoneNumber">Phone Number</Label> {/* New Phone Number Label */}
        <Input
          id="phoneNumber"
          value={phoneNumber} // New Phone Number Input
          onChange={(e) => onChange("phoneNumber", e.target.value)} // Handle change
          required
        />
      </div>
    </div>
  );
};
