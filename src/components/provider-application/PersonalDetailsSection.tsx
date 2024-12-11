import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Home, Calendar, Phone, Mail } from "lucide-react"; // Importing icons

interface PersonalDetailsSectionProps {
  fullName: string;
  age: string;
  phoneNumber: string;
  email: string;
  address: string;
  onChange: (field: string, value: string) => void;
}

export const PersonalDetailsSection = ({
  fullName,
  age,
  phoneNumber,
  email,
  address,
  onChange,
}: PersonalDetailsSectionProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6"> {/* Two-column grid layout */}
      {/* Full Name */}
      <div>
        <Label htmlFor="fullName" className="block text-lg font-medium text-gray-300 mb-2">
          Full Name
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            id="fullName"
            value={fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            required
            placeholder=" John Doe "
            className="pl-10"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="email" className="block text-lg font-medium text-gray-300 mb-2">
          Email
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => onChange("email", e.target.value)}
            required
            placeholder="john@example.com"
            className="pl-10"
          />
        </div>
      </div>

      {/* Age */}
      <div>
        <Label htmlFor="age" className="block text-lg font-medium text-gray-300 mb-2">
          Age
        </Label>
        <div className="relative">
          <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            id="age"
            type="number"
            min="18"
            value={age}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "") {
                onChange("age", ""); // Handle empty input
              } else {
                onChange("age", value);
              }
            }}
            required
            placeholder="30 years of culinary magic"
            className="pl-10"
          />
        </div>
      </div>

      {/* Phone Number */}
      <div>
        <Label htmlFor="phoneNumber" className="block text-lg font-medium text-gray-300 mb-2">
          Phone Number
        </Label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => onChange("phoneNumber", e.target.value)}
            required
            placeholder="+91 1234567890"
            className="pl-10"
          />
        </div>
      </div>

      {/* Address */}
      <div className="sm:col-span-2"> {/* Spanning two columns */}
        <Label htmlFor="address" className="block text-lg font-medium text-gray-300 mb-2">
          Address
        </Label>
        <div className="relative">
          <Home className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Textarea
            id="address"
            value={address}
            onChange={(e) => onChange("address", e.target.value)}
            required
            placeholder="123 Culinary St., Gourmet City"
            className="pl-10"
          />
        </div>
      </div>
    </div>
  );
};
