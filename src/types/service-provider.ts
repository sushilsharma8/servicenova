export interface ServiceProviderProfile {
  business_name: string;
  service_type: "bartender" | "chef" | "server";
  description: string;
  hourly_rate: number;
  years_experience: number;
  certifications: string[];
}