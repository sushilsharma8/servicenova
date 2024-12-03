import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ServiceProviderProfile } from "@/types/service-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ServiceProviderList = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const { data: providers, isLoading } = useQuery({
    queryKey: ["service-providers", selectedType],
    queryFn: async () => {
      let query = supabase
        .from("service_providers")
        .select("*")
        .eq("status", "available");

      if (selectedType) {
        query = query.eq("service_type", selectedType);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as ServiceProviderProfile[];
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Available Service Providers</h2>
        <Select
          value={selectedType || ""}
          onValueChange={(value) => setSelectedType(value || null)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Types</SelectItem>
            <SelectItem value="bartender">Bartender</SelectItem>
            <SelectItem value="chef">Chef</SelectItem>
            <SelectItem value="server">Server</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers?.map((provider) => (
          <Card key={provider.id}>
            <CardHeader>
              <CardTitle>{provider.business_name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Service: {provider.service_type}
                </p>
                <p className="text-sm text-gray-600">
                  Rate: ${provider.hourly_rate}/hour
                </p>
                <p className="text-sm text-gray-600">
                  Experience: {provider.years_experience} years
                </p>
                {provider.rating && (
                  <p className="text-sm text-gray-600">
                    Rating: {provider.rating.toFixed(1)} / 5
                  </p>
                )}
                <Button
                  className="w-full mt-4"
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