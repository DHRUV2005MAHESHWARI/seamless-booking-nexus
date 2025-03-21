
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ChevronRight, 
  CheckCircle2, 
  Filter 
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock booking data for demonstration
const bookings = [
  {
    id: 'bk1001',
    serviceId: 'doctor-smith',
    serviceName: 'Dr. Smith - General Consultation',
    serviceImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2940&auto=format&fit=crop',
    date: new Date('2024-04-15T14:30:00'),
    duration: '30 min',
    status: 'upcoming',
    location: {
      address: '123 Medical Center Dr, San Francisco, CA 94102',
      lat: 37.7749,
      lng: -122.4194
    },
    price: '$120'
  },
  {
    id: 'bk1002',
    serviceId: 'yoga-class',
    serviceName: 'Morning Yoga with Sarah',
    serviceImage: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=2940&auto=format&fit=crop',
    date: new Date('2024-04-12T09:00:00'),
    duration: '1 hour',
    status: 'upcoming',
    location: {
      address: '456 Wellness Ave, San Francisco, CA 94103',
      lat: 37.7833,
      lng: -122.4167
    },
    price: '$25'
  },
  {
    id: 'bk1003',
    serviceId: 'haircut-deluxe',
    serviceName: 'Deluxe Haircut & Styling',
    serviceImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2874&auto=format&fit=crop',
    date: new Date('2024-03-25T11:00:00'),
    duration: '45 min',
    status: 'completed',
    location: {
      address: '789 Beauty Blvd, San Francisco, CA 94108',
      lat: 37.7915,
      lng: -122.4089
    },
    price: '$65'
  },
  {
    id: 'bk1004',
    serviceId: 'tennis-court',
    serviceName: 'Tennis Court Reservation',
    serviceImage: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=2940&auto=format&fit=crop',
    date: new Date('2024-03-20T16:00:00'),
    duration: '2 hours',
    status: 'cancelled',
    location: {
      address: '101 Sports Complex, San Francisco, CA 94110',
      lat: 37.7587,
      lng: -122.4358
    },
    price: '$40'
  }
];

const Bookings = () => {
  const [filter, setFilter] = useState('all');
  
  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge variant="default" className="bg-blue-500">Upcoming</Badge>;
      case 'completed':
        return <Badge variant="default" className="bg-green-500">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">My Bookings</h1>
              <p className="text-muted-foreground">Manage your appointments and reservations</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setFilter('all')}>
                      All Bookings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilter('upcoming')}>
                      Upcoming
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilter('completed')}>
                      Completed
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilter('cancelled')}>
                      Cancelled
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Link to="/">
                <Button>Book New Service</Button>
              </Link>
            </div>
          </div>
          
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="map">Map View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="list" className="animate-fade-in mt-6">
              {filteredBookings.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No bookings found with the selected filter.</p>
                  <Link to="/">
                    <Button>Browse Services</Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {filteredBookings.map((booking) => (
                    <Card key={booking.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-48 h-40 md:h-auto flex-shrink-0">
                          <img 
                            src={booking.serviceImage} 
                            alt={booking.serviceName} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow p-5">
                          <div className="flex flex-col md:flex-row md:justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                {getStatusBadge(booking.status)}
                                <h3 className="text-lg font-medium">{booking.serviceName}</h3>
                              </div>
                              
                              <div className="space-y-2 text-sm">
                                <div className="flex items-start">
                                  <Calendar className="h-4 w-4 text-muted-foreground mt-0.5 mr-2" />
                                  <span>{formatDate(booking.date)} at {formatTime(booking.date)}</span>
                                </div>
                                <div className="flex items-start">
                                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5 mr-2" />
                                  <span>{booking.duration}</span>
                                </div>
                                <div className="flex items-start">
                                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 mr-2" />
                                  <span className="text-muted-foreground">{booking.location.address}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-4 md:mt-0 text-right">
                              <p className="text-lg font-medium text-primary">{booking.price}</p>
                              <p className="text-sm text-muted-foreground mb-4">Booking #{booking.id}</p>
                              
                              <Link to={`/booking/details/${booking.id}`}>
                                <Button variant="outline" size="sm">
                                  View Details
                                  <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="map" className="animate-fade-in mt-6">
              <p className="text-center py-8 text-muted-foreground">
                The map view will display all your bookings on an interactive map.
                Please select the "Map View" in the booking details to see the exact location.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Bookings;
