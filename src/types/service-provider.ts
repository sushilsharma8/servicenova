export interface ServiceProviderProfile {
  id?: string;
  business_name: string;
  service_type: "bartender" | "chef" | "server";
  description: string;
  hourly_rate: number;
  years_experience: number;
  certifications: string[];
  rating?: number;
  status?: "available" | "busy" | "inactive";
}