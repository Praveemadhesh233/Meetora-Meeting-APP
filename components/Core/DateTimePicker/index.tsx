"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateTimePickerProps {
  onChange?: (value: Date) => void;
  defaultValue?: Date;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  onChange,
  defaultValue,
}) => {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(defaultValue);
  const [time, setTime] = React.useState(
    defaultValue
      ? defaultValue.toTimeString().slice(0, 8)
      : new Date().toTimeString().slice(0, 8)
  );

  // update whenever date or time changes
  React.useEffect(() => {
    if (!date || !time) return;

    const [hours, minutes, seconds] = time.split(":").map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours, minutes, seconds);

    onChange?.(newDate);
  }, [date, time]);

  return (
    <div className="flex gap-4">
      {/* Date Picker */}
      <div className="flex flex-col gap-3">
        <Label htmlFor="date-picker" className="px-1">
          Date
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="w-36 justify-between font-normal"
            >
              {date ? date.toLocaleDateString() : "Select date"}
              <ChevronDownIcon size={16} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(selectedDate) => {
                setDate(selectedDate);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Time Picker */}
      <div className="flex flex-col gap-3">
        <Label htmlFor="time-picker" className="px-1">
          Time
        </Label>
        <Input
          type="time"
          id="time-picker"
          step="1"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="bg-background w-32 text-white [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-100"
        />
      </div>
    </div>
  );
};

export default DateTimePicker;
