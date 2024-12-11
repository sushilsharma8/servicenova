import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { format } from "date-fns";

interface InterviewScheduleSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export const InterviewScheduleSection = ({ value, onChange }: InterviewScheduleSectionProps) => {
  const [date, setDate] = useState<Date | undefined>(value ? new Date(value) : undefined);

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate) {
      onChange(format(newDate, "yyyy-MM-dd'T'HH:mm"));
    }
  };

  return (
    <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 rounded-lg shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-white">Schedule Interview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="text-lg text-white">Select Date and Time</Label>
          <div className="space-y-4">
            {/* Calendar Styling */}
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              className="rounded-md border border-white/10 bg-white/5 text-white focus:ring-2 focus:ring-accent transition-all"
              disabled={(date) => date < new Date()}
            />
            
            {/* Time Input Styling */}
            <input
              type="time"
              value={value ? format(new Date(value), 'HH:mm') : ''}
              onChange={(e) => {
                if (date) {
                  const newDate = new Date(date);
                  const [hours, minutes] = e.target.value.split(':');
                  newDate.setHours(parseInt(hours), parseInt(minutes));
                  onChange(format(newDate, "yyyy-MM-dd'T'HH:mm"));
                }
              }}
              className="w-full rounded-md border border-white/10 bg-white/5 text-white px-4 py-2 focus:border-accent focus:ring-2 focus:ring-accent transition-all"
              required
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
