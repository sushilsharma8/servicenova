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
    <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 rounded-lg">
      <CardHeader>
        <CardTitle className="text-white">Schedule Interview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white">Select Date and Time</Label>
          <div className="flex flex-col space-y-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              className="rounded-md border border-white/10 bg-white/5 text-white"
              disabled={(date) => date < new Date()}
            />
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
              className="w-full rounded-md border border-white/10 bg-white/5 text-white px-3 py-2 focus:border-[#CCFF00] focus:ring-[#CCFF00]"
              required
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};