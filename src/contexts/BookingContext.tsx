
import React, { createContext, useContext, useState } from 'react';

type Service = {
  id: string;
  title: string;
  category: string;
  price: string;
};

type BookingDetails = {
  serviceId: string;
  date: Date | null;
  timeSlot: string | null;
  notes: string;
};

interface BookingContextType {
  selectedService: Service | null;
  bookingDetails: BookingDetails;
  setSelectedService: (service: Service | null) => void;
  setBookingDate: (date: Date | null) => void;
  setBookingTimeSlot: (timeSlot: string | null) => void;
  setBookingNotes: (notes: string) => void;
  resetBooking: () => void;
}

const defaultBookingDetails: BookingDetails = {
  serviceId: '',
  date: null,
  timeSlot: null,
  notes: '',
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>(defaultBookingDetails);
  
  const setBookingDate = (date: Date | null) => {
    setBookingDetails(prev => ({ ...prev, date }));
  };
  
  const setBookingTimeSlot = (timeSlot: string | null) => {
    setBookingDetails(prev => ({ ...prev, timeSlot }));
  };
  
  const setBookingNotes = (notes: string) => {
    setBookingDetails(prev => ({ ...prev, notes }));
  };
  
  const resetBooking = () => {
    setSelectedService(null);
    setBookingDetails(defaultBookingDetails);
  };
  
  return (
    <BookingContext.Provider
      value={{
        selectedService,
        bookingDetails,
        setSelectedService,
        setBookingDate,
        setBookingTimeSlot,
        setBookingNotes,
        resetBooking
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
