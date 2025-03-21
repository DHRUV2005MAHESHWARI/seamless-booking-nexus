
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

type TimeSlot = {
  id: string;
  time: string;
  available: boolean;
};

const timeSlots: TimeSlot[] = [
  { id: '1', time: '9:00 AM', available: true },
  { id: '2', time: '10:00 AM', available: true },
  { id: '3', time: '11:00 AM', available: false },
  { id: '4', time: '12:00 PM', available: true },
  { id: '5', time: '1:00 PM', available: true },
  { id: '6', time: '2:00 PM', available: true },
  { id: '7', time: '3:00 PM', available: false },
  { id: '8', time: '4:00 PM', available: false },
  { id: '9', time: '5:00 PM', available: true },
  { id: '10', time: '6:00 PM', available: true },
];

interface BookingCalendarProps {
  onSelectDate: (date: Date | undefined) => void;
  onSelectTime: (timeSlot: string) => void;
  onContinue: () => void;
}

const BookingCalendar = ({ onSelectDate, onSelectTime, onContinue }: BookingCalendarProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    onSelectDate(newDate);
  };
  
  const handleTimeSelection = (timeSlot: TimeSlot) => {
    if (!timeSlot.available) return;
    setSelectedTime(timeSlot.id);
    onSelectTime(timeSlot.time);
  };
  
  return (
    <div className="glass-morphism rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-medium mb-6">Select Date & Time</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            className={cn("p-3 pointer-events-auto rounded-xl border")}
            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
            classNames={{
              day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              day_today: "bg-accent text-accent-foreground",
              nav_button: "hover:bg-accent hover:text-accent-foreground rounded-full p-1",
              nav_button_previous: "absolute left-1 w-8 h-8",
              nav_button_next: "absolute right-1 w-8 h-8",
              head_cell: "text-muted-foreground rounded-md w-9 font-normal text-xs",
              cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-full hover:bg-accent hover:text-accent-foreground",
            }}
            components={{
              IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
              IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
            }}
          />
        </div>
        
        <div>
          <div className="mb-4 flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Available time slots</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot.id}
                className={cn(
                  "text-sm px-4 py-3 rounded-lg border transition-colors",
                  slot.available 
                    ? "hover:border-primary cursor-pointer" 
                    : "bg-accent/50 text-muted-foreground cursor-not-allowed",
                  selectedTime === slot.id && slot.available && "bg-primary/10 border-primary text-primary"
                )}
                onClick={() => handleTimeSelection(slot)}
                disabled={!slot.available}
              >
                {slot.time}
              </button>
            ))}
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button 
              onClick={onContinue}
              disabled={!date || !selectedTime}
              className="px-8"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
