
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MapComponent from '@/components/booking/MapComponent';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  AlertCircle, 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Download, 
  Edit2, 
  MapPin, 
  MessageSquare, 
  Phone, 
  Printer, 
  Share2, 
  User 
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

// Mock booking data - in a real app, this would come from an API
const bookingData = {
  id: 'bk1001',
  serviceId: 'doctor-smith',
  serviceName: 'Dr. Smith - General Consultation',
  serviceImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2940&auto=format&fit=crop',
  provider: {
    name: 'Dr. John Smith',
    avatar: 'https://i.pravatar.cc/300?img=8',
    phone: '+1 (555) 123-4567',
    email: 'dr.smith@example.com'
  },
  date: new Date('2024-04-15T14:30:00'),
  duration: '30 min',
  status: 'upcoming',
  location: {
    name: 'Central Medical Center',
    address: '123 Medical Center Dr, San Francisco, CA 94102',
    lat: 37.7749,
    lng: -122.4194
  },
  price: '$120',
  reference: 'REF-123456',
  notes: 'First-time consultation. Please bring your insurance card and list of current medications.',
  paymentMethod: 'Credit Card (ending in 4242)',
  invoiceUrl: '#',
  cancelationPolicy: 'Free cancellation up to 24 hours before your appointment. After that, a fee of $30 applies.'
};

const BookingDetails = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; address?: string } | null>(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // In a real app, you would fetch the booking data based on the bookingId
  
  const handleLocationSelect = (location: { lat: number; lng: number; address?: string }) => {
    setUserLocation(location);
  };
  
  const handleCancelBooking = () => {
    // In a real app, this would send a request to the server
    toast({
      title: "Booking Cancelled",
      description: "Your booking has been successfully cancelled. A confirmation email has been sent.",
    });
    setCancelDialogOpen(false);
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
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
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="flex items-center text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/bookings" className="hover:text-foreground transition-colors">My Bookings</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Booking Details</span>
            </nav>
          </div>
          
          <div className="flex flex-col lg:flex-row justify-between mb-6">
            <div className="flex items-center">
              <Link to="/bookings" className="mr-4">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                  Booking Details
                  {getStatusBadge(bookingData.status)}
                </h1>
                <p className="text-muted-foreground mt-1">Reference: {bookingData.reference}</p>
              </div>
            </div>
            
            <div className="mt-4 lg:mt-0 flex flex-wrap gap-3">
              <Button variant="outline" size="sm">
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              
              {bookingData.status === 'upcoming' && (
                <>
                  <Button variant="default" size="sm">
                    <Edit2 className="mr-2 h-4 w-4" />
                    Reschedule
                  </Button>
                  <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        Cancel Booking
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Cancel Booking</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to cancel this booking? This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <div className="flex items-center p-4 border rounded-lg bg-muted">
                          <AlertCircle className="h-5 w-5 text-amber-500 mr-3" />
                          <div className="text-sm">
                            <p className="font-medium">Cancellation Policy</p>
                            <p className="text-muted-foreground">{bookingData.cancelationPolicy}</p>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
                          Keep Booking
                        </Button>
                        <Button variant="destructive" onClick={handleCancelBooking}>
                          Yes, Cancel Booking
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Booking Details Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Booking Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={bookingData.serviceImage}
                        alt={bookingData.serviceName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-xl font-medium mb-2">{bookingData.serviceName}</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <Calendar className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                            <div>
                              <p className="font-medium">Date & Time</p>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(bookingData.date)}
                                <br />
                                {formatTime(bookingData.date)}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <Clock className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                            <div>
                              <p className="font-medium">Duration</p>
                              <p className="text-sm text-muted-foreground">{bookingData.duration}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <MapPin className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                            <div>
                              <p className="font-medium">{bookingData.location.name}</p>
                              <p className="text-sm text-muted-foreground">{bookingData.location.address}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <User className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                            <div>
                              <p className="font-medium">Service Provider</p>
                              <p className="text-sm text-muted-foreground">{bookingData.provider.name}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {bookingData.notes && (
                    <div>
                      <h3 className="font-medium mb-2">Notes</h3>
                      <p className="text-sm text-muted-foreground">{bookingData.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Location Card with Map */}
              <Card>
                <CardHeader>
                  <CardTitle>Location</CardTitle>
                  <CardDescription>
                    View the service location and get directions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="map">
                    <TabsList className="mb-4">
                      <TabsTrigger value="map">Map View</TabsTrigger>
                      <TabsTrigger value="directions">Get Directions</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="map">
                      <MapComponent 
                        serviceLocation={bookingData.location}
                        isEditable={false}
                      />
                    </TabsContent>
                    
                    <TabsContent value="directions">
                      <div className="space-y-4">
                        <MapComponent 
                          serviceLocation={bookingData.location}
                          onLocationSelect={handleLocationSelect}
                          isEditable={true}
                        />
                        
                        {userLocation && (
                          <div className="mt-4">
                            <Button className="w-full">
                              Get Directions
                            </Button>
                            <p className="text-sm text-muted-foreground mt-2 text-center">
                              This will open directions in your default maps application.
                            </p>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-1 space-y-6">
              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service Fee</span>
                      <span>{bookingData.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Booking Fee</span>
                      <span>$0.00</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total Paid</span>
                      <span className="text-primary">{bookingData.price}</span>
                    </div>
                    <div className="pt-2">
                      <p className="text-sm mb-1 font-medium">Payment Method</p>
                      <p className="text-sm text-muted-foreground">{bookingData.paymentMethod}</p>
                    </div>
                    <div className="pt-2">
                      <Button variant="outline" size="sm" className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Download Invoice
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Contact Provider */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Provider</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={bookingData.provider.avatar} alt={bookingData.provider.name} />
                      <AvatarFallback>{bookingData.provider.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{bookingData.provider.name}</p>
                      <p className="text-sm text-muted-foreground">Service Provider</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Provider
                    </Button>
                    <Button variant="outline" className="w-full">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Cancellation Policy */}
              <Card>
                <CardHeader>
                  <CardTitle>Cancellation Policy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {bookingData.cancelationPolicy}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookingDetails;
