import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Database } from "@/integrations/supabase/types";

type ProviderApplication = Database['public']['Tables']['provider_applications']['Row'];

export const ServiceProviderList = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const { data: providers, isLoading } = useQuery({
    queryKey: ["service-providers", selectedType],
    queryFn: async () => {
      let query = supabase
        .from("provider_applications")
        .select("*")
        .eq("status", "approved");

      if (selectedType) {
        query = query.eq("service_type", selectedType);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as ProviderApplication[];
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500" role="status"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-blue-50 p-6 rounded-md shadow-md flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Service Providers</h2>
        <Select
          value={selectedType || ""}
          onValueChange={(value) => setSelectedType(value || null)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Types</SelectItem>
            <SelectItem value="bartender">Bartender</SelectItem>
            <SelectItem value="chef">Chef</SelectItem>
            <SelectItem value="server">Server</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Providers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {providers?.map((provider) => (
          <Card
            key={provider.id}
            className="hover:shadow-lg transition-shadow duration-300 rounded-lg"
          >
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                {provider.full_name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  <strong>Service:</strong> {provider.service_type}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Experience:</strong> {provider.years_experience} years
                </p>
                {provider.certifications && provider.certifications.length > 0 && (
                  <p className="text-sm text-gray-600">
                    <strong>Certifications:</strong>{" "}
                    {provider.certifications.join(", ")}
                  </p>
                )}
                <Button
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => {
                    // TODO: Implement request service functionality
                  }}
                >
                  Request Service
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
