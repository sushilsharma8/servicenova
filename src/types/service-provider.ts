export interface ServiceProviderProfile {
  full_name: string;
  address: string;
  age: number;
  service_type: "bartender" | "chef" | "server";
  years_experience: number;
  certifications: string[];
  phone_number?: string;
  email?: string;
}