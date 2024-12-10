import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import type { EventServiceRequest } from "@/types/events";

interface AppointmentsSectionProps {
  appointments: EventServiceRequest[] | undefined;
  isLoading: boolean;
}

export const AppointmentsSection = ({ appointments, isLoading }: AppointmentsSectionProps) => {
  if (isLoading) return <LoadingSpinner />;

  return (
    <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 rounded-lg">
      <CardHeader>
        <CardTitle className="text-white">Upcoming Appointments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {appointments && appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex justify-between items-center p-4 bg-black/20 rounded-md"
            >
              <div className="flex items-center space-x-4">
                <CalendarDays className="w-5 h-5 text-[#CCFF00]" />
                <div>
                  <div className="text-white">
                    {new Date(appointment.events.event_date).toLocaleDateString()}{" "}
                    at {new Date(appointment.events.event_date).toLocaleTimeString()}
                  </div>
                  <div className="text-gray-400 text-sm">
                    Location: {appointment.events.location}
                  </div>
                  <div className="text-gray-400 text-sm">
                    Guests: {appointment.events.guest_count}
                  </div>
                </div>
              </div>
              <div
                className={`text-sm font-semibold ${
                  appointment.status === "confirmed"
                    ? "text-green-500"
                    : "text-yellow-500"
                }`}
              >
                {appointment.status}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-4 text-gray-400">
            No appointments found. New bookings will appear here.
          </div>
        )}
      </CardContent>
    </Card>
  );
};