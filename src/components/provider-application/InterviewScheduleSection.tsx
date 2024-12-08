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
    <Card>
      <CardHeader>
        <CardTitle>Schedule Interview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Select Date and Time</Label>
          <div className="flex flex-col space-y-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              className="rounded-md border"
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
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              required
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};