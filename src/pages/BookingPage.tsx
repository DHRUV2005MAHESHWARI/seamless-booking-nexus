
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BookingCalendar from '@/components/booking/BookingCalendar';
import MapComponent from '@/components/booking/MapComponent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  Check, 
  CreditCard, 
  MapPin
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useBooking } from "@/contexts/BookingContext";

// Mock service info for the demo
const serviceInfo = {
  id: 'doctor-smith',
  title: 'Dr. Smith - General Consultation',
  image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2940&auto=format&fit=crop',
  duration: '30 min',
  price: '$120',
  location: {
    name: 'Central Medical Center',
    address: '123 Medical Center Dr, San Francisco, CA 94102',
    lat: 37.7749,
    lng: -122.4194
  }
};

const BookingPage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; address?: string } | null>(null);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { setBookingDate, setBookingTimeSlot, setBookingNotes } = useBooking();
  
  const handleSelectDate = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) setBookingDate(date);
  };
  
  const handleSelectTime = (timeSlot: string) => {
    setSelectedTime(timeSlot);
    setBookingTimeSlot(timeSlot);
  };
  
  const handleLocationSelect = (location: { lat: number; lng: number; address?: string }) => {
    setUserLocation(location);
  };
  
  const handleContactInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({ ...prev, [name]: value }));
    
    if (name === 'notes') {
      setBookingNotes(value);
    }
  };
  
  const handleContinue = () => {
    setCurrentStep(currentStep + 1);
  };
  
  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Booking Confirmed!",
        description: `Your appointment with ${serviceInfo.title} on ${selectedDate?.toLocaleDateString()} at ${selectedTime} has been confirmed.`,
      });
      
      // For demo, navigate to confirmation step
      setCurrentStep(3);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem confirming your booking. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Render different steps based on currentStep
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Select Date & Time</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <BookingCalendar
                  onSelectDate={handleSelectDate}
                  onSelectTime={handleSelectTime}
                  onContinue={handleContinue}
                />
              </div>
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Booking Summary</CardTitle>
                    <CardDescription>Your selected service details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={serviceInfo.image}
                          alt={serviceInfo.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{serviceInfo.title}</h3>
                        <p className="text-sm text-muted-foreground">{serviceInfo.duration} session</p>
                        <p className="text-sm font-medium text-primary mt-1">{serviceInfo.price}</p>
                      </div>
                    </div>
                    
                    {selectedDate && selectedTime && (
                      <div className="pt-4 space-y-2">
                        <Separator />
                        <div className="flex items-start gap-2 mt-4">
                          <Calendar className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium">
                              {selectedDate.toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </p>
                            <p className="text-muted-foreground">{selectedTime}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="pt-4 space-y-2">
                      <Separator />
                      <div className="flex items-start gap-2 mt-4">
                        <MapPin className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">{serviceInfo.location.name}</p>
                          <p className="text-muted-foreground text-sm">{serviceInfo.location.address}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Contact Information & Location</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="glass-morphism rounded-xl p-6 shadow-lg">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          value={contactInfo.name}
                          onChange={handleContactInfoChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          value={contactInfo.email}
                          onChange={handleContactInfoChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone"
                        name="phone"
                        placeholder="(123) 456-7890"
                        value={contactInfo.phone}
                        onChange={handleContactInfoChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Your Location</Label>
                      <MapComponent 
                        onLocationSelect={handleLocationSelect}
                        serviceLocation={serviceInfo.location}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="notes">Special Requests or Notes</Label>
                      <Textarea 
                        id="notes"
                        name="notes"
                        placeholder="Any special requirements or information you'd like to provide"
                        rows={4}
                        value={contactInfo.notes}
                        onChange={handleContactInfoChange}
                      />
                    </div>
                    
                    <div className="pt-4 flex flex-col sm:flex-row justify-between gap-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handleBack}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                      <Button 
                        type="submit"
                        className="sm:w-1/3"
                        disabled={isSubmitting || !userLocation}
                      >
                        {isSubmitting ? (
                          <span>Processing...</span>
                        ) : (
                          <>
                            <span>Pay & Confirm</span>
                            <CreditCard className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
              
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Booking Summary</CardTitle>
                    <CardDescription>Your selected service details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={serviceInfo.image}
                          alt={serviceInfo.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{serviceInfo.title}</h3>
                        <p className="text-sm text-muted-foreground">{serviceInfo.duration} session</p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-start gap-2">
                      <Calendar className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">
                          {selectedDate?.toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                        <p className="text-muted-foreground">{selectedTime}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">{serviceInfo.location.name}</p>
                        <p className="text-muted-foreground text-sm">{serviceInfo.location.address}</p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="pt-2">
                      <div className="flex justify-between mb-2">
                        <span>Service Fee</span>
                        <span>{serviceInfo.price}</span>
                      </div>
                      <div className="flex justify-between mb-2 text-sm text-muted-foreground">
                        <span>Booking Fee</span>
                        <span>$0</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span className="text-primary">{serviceInfo.price}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="max-w-2xl mx-auto text-center py-12 animate-fade-in">
            <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Booking Confirmed!</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Your appointment with {serviceInfo.title} on{' '}
              {selectedDate?.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}{' '}
              at {selectedTime} has been confirmed.
            </p>
            <div className="glass-morphism p-6 rounded-xl mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Booking Reference</h3>
                <span className="text-sm font-mono bg-secondary px-2 py-1 rounded">
                  #BK{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}
                </span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service</span>
                  <span>{serviceInfo.title}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date & Time</span>
                  <span>
                    {selectedDate?.toLocaleDateString()}, {selectedTime}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span>{serviceInfo.duration}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Paid</span>
                  <span className="font-medium text-primary">{serviceInfo.price}</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              A confirmation email with all the details has been sent to your email address.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/bookings')}
              >
                View My Bookings
              </Button>
              <Button onClick={() => navigate('/')}>
                Back to Home
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-8">
            <nav className="flex items-center text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link to={`/service/${serviceId}`} className="hover:text-foreground transition-colors">Service Details</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Booking</span>
            </nav>
          </div>
          
          {/* Progress Steps */}
          {currentStep < 3 && (
            <div className="max-w-3xl mx-auto mb-8">
              <div className="relative flex items-center justify-between">
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-border" />
                
                <div className={`relative z-10 h-10 w-10 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {currentStep > 1 ? <Check className="h-5 w-5" /> : 1}
                </div>
                
                <div className={`relative z-10 h-10 w-10 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {currentStep > 2 ? <Check className="h-5 w-5" /> : 2}
                </div>
                
                <div className={`relative z-10 h-10 w-10 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  3
                </div>
              </div>
              
              <div className="flex justify-between mt-2 text-sm">
                <div className={`${currentStep === 1 ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                  Select Date
                </div>
                <div className={`${currentStep === 2 ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                  Contact Info
                </div>
                <div className={`${currentStep === 3 ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                  Confirmation
                </div>
              </div>
            </div>
          )}
          
          {renderStep()}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookingPage;
