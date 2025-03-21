
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BookingCalendar from '@/components/booking/BookingCalendar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  Clock, 
  DollarSign, 
  Heart, 
  MapPin, 
  Share2, 
  Star, 
  ThumbsUp, 
  User 
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Mock service data for demo
const serviceData = {
  id: 'doctor-smith',
  title: 'Dr. Smith - General Consultation',
  images: [
    'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2940&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2880&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2873&auto=format&fit=crop',
  ],
  category: 'Healthcare',
  subcategory: 'General Physician',
  description: 'Dr. Smith is a board-certified general practitioner with over 15 years of experience. He provides comprehensive healthcare services including routine check-ups, preventive care, and management of chronic conditions. His patient-centered approach focuses on building long-term relationships to understand your overall health goals and needs.',
  location: 'Central Medical Center, 123 Main St, San Francisco, CA',
  duration: '30 min',
  rating: 4.9,
  reviewCount: 128,
  price: '$120',
  amenities: [
    'Online medical records',
    'Insurance accepted',
    'Wheelchair accessible',
    'Same-day appointments available',
    'Multi-lingual staff'
  ],
  reviews: [
    {
      id: '1',
      author: 'Jane Cooper',
      avatar: 'https://i.pravatar.cc/300?img=1',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Dr. Smith was very thorough and took his time to explain everything. Highly recommended!'
    },
    {
      id: '2',
      author: 'Robert Johnson',
      avatar: 'https://i.pravatar.cc/300?img=2',
      rating: 4,
      date: '1 month ago',
      comment: 'Good experience overall. The wait time was a bit long but the consultation was worth it.'
    },
    {
      id: '3',
      author: 'Emily Davis',
      avatar: 'https://i.pravatar.cc/300?img=3',
      rating: 5,
      date: '2 months ago',
      comment: 'Dr. Smith is the best! He truly cares about his patients and provides excellent care.'
    }
  ],
  faqs: [
    {
      question: 'What insurance plans are accepted?',
      answer: 'Dr. Smith accepts most major insurance plans including Blue Cross, Aetna, Cigna, and Medicare. Please contact our office to verify your specific coverage.'
    },
    {
      question: 'How far in advance should I book an appointment?',
      answer: 'For routine check-ups, we recommend booking 1-2 weeks in advance. For urgent matters, same-day appointments are often available.'
    },
    {
      question: 'What should I bring to my first appointment?',
      answer: 'Please bring your insurance card, photo ID, a list of current medications, and any relevant medical records or test results.'
    },
    {
      question: 'What is the cancellation policy?',
      answer: 'We ask that you notify us at least 24 hours in advance if you need to cancel or reschedule your appointment to avoid a cancellation fee.'
    }
  ]
};

const ServiceDetails = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [mainImage, setMainImage] = useState(serviceData.images[0]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  
  const handleSelectDate = (date: Date | undefined) => {
    setSelectedDate(date);
  };
  
  const handleSelectTime = (timeSlot: string) => {
    setSelectedTime(timeSlot);
  };
  
  const handleContinueBooking = () => {
    // In a real app, you would navigate to checkout or gather more info
    console.log('Booking details:', { 
      service: serviceData.title, 
      date: selectedDate, 
      time: selectedTime 
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 pb-16">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="flex items-center text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link to={`/category/${serviceData.category.toLowerCase()}`} className="hover:text-foreground transition-colors">{serviceData.category}</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">{serviceData.title}</span>
            </nav>
          </div>
          
          {/* Service Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <h1 className="text-3xl md:text-4xl font-bold">{serviceData.title}</h1>
              <div className="flex items-center mt-2 md:mt-0 space-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Save to favorites</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share this service</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <div className="flex items-center text-amber-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="ml-1 font-medium">{serviceData.rating}</span>
                <span className="ml-1 text-muted-foreground">({serviceData.reviewCount} reviews)</span>
              </div>
              
              <span className="text-muted-foreground">•</span>
              
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{serviceData.subcategory}</span>
              </div>
              
              <span className="text-muted-foreground">•</span>
              
              <div className="flex items-center text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                <span>{serviceData.duration}</span>
              </div>
            </div>
          </div>
          
          {/* Service Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Images and Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="aspect-[16/9] overflow-hidden rounded-xl">
                  <img 
                    src={mainImage} 
                    alt={serviceData.title}
                    className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
                  />
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {serviceData.images.map((image, index) => (
                    <button
                      key={index}
                      className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden transition-all ${mainImage === image ? 'ring-2 ring-primary' : 'opacity-80 hover:opacity-100'}`}
                      onClick={() => setMainImage(image)}
                    >
                      <img 
                        src={image} 
                        alt={`${serviceData.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Tabs for Description, Reviews, FAQs */}
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="faqs">FAQs</TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="space-y-6 animate-fade-in pt-6">
                  <div>
                    <h2 className="text-xl font-medium mb-4">About This Service</h2>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {serviceData.description}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Location</h3>
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="ml-2 text-muted-foreground">{serviceData.location}</p>
                    </div>
                    <div className="mt-4 bg-muted aspect-[16/9] rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Map would be displayed here</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Amenities</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                      {serviceData.amenities.map((amenity, index) => (
                        <li key={index} className="flex items-center">
                          <ThumbsUp className="h-4 w-4 text-primary mr-2" />
                          <span>{amenity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews" className="animate-fade-in pt-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-medium mb-1">Customer Reviews</h2>
                    <div className="flex items-center">
                      <div className="flex text-amber-500">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`h-5 w-5 ${star <= Math.round(serviceData.rating) ? 'fill-current' : ''}`}
                          />
                        ))}
                      </div>
                      <p className="ml-2 text-muted-foreground">
                        Based on {serviceData.reviewCount} reviews
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {serviceData.reviews.map((review) => (
                      <div key={review.id} className="border-b border-border pb-6">
                        <div className="flex items-start">
                          <Avatar className="h-10 w-10 mr-4">
                            <AvatarImage src={review.avatar} alt={review.author} />
                            <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium">{review.author}</h4>
                              <span className="text-sm text-muted-foreground">{review.date}</span>
                            </div>
                            <div className="flex text-amber-500 mb-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star} 
                                  className={`h-4 w-4 ${star <= review.rating ? 'fill-current' : ''}`}
                                />
                              ))}
                            </div>
                            <p className="text-muted-foreground">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 text-center">
                    <Button variant="outline">View All Reviews</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="faqs" className="animate-fade-in pt-6">
                  <h2 className="text-xl font-medium mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {serviceData.faqs.map((faq, index) => (
                      <div key={index} className="p-4 bg-muted rounded-lg">
                        <h4 className="font-medium mb-2">{faq.question}</h4>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {!showBookingForm ? (
                  <Card className="glass-morphism overflow-hidden">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center justify-between">
                        <span>Book This Service</span>
                        <span className="text-xl text-primary">{serviceData.price}</span>
                      </CardTitle>
                      <CardDescription>
                        Select a date and time to book your appointment
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{serviceData.duration} session</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>1-on-1 consultation</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Payment upon confirmation</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        onClick={() => setShowBookingForm(true)} 
                        className="w-full"
                      >
                        Check Availability
                      </Button>
                    </CardFooter>
                  </Card>
                ) : (
                  <div className="animate-fade-in">
                    <div className="flex items-center mb-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setShowBookingForm(false)}
                        className="p-0 mr-2"
                      >
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Back
                      </Button>
                      <h2 className="text-lg font-medium">Book Appointment</h2>
                    </div>
                    
                    <BookingCalendar
                      onSelectDate={handleSelectDate}
                      onSelectTime={handleSelectTime}
                      onContinue={handleContinueBooking}
                    />
                  </div>
                )}
                
                {/* Related Services */}
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">You Might Also Like</h3>
                  <div className="space-y-4">
                    {[1, 2].map((i) => (
                      <Link key={i} to={`/service/related-${i}`}>
                        <Card className="hover:bg-accent transition-colors overflow-hidden">
                          <div className="flex">
                            <div className="h-24 w-24 flex-shrink-0">
                              <img 
                                src={`https://i.pravatar.cc/300?img=${i + 5}`}
                                alt={`Related Service ${i}`}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="p-3">
                              <h4 className="font-medium text-sm line-clamp-1">
                                {i === 1 ? "Specialized Health Check-up" : "Advanced Medical Test"}
                              </h4>
                              <div className="flex items-center mt-1 text-sm">
                                <div className="flex text-amber-500">
                                  <Star className="h-3 w-3 fill-current" />
                                  <span className="ml-1">4.8</span>
                                </div>
                                <span className="mx-2 text-muted-foreground">•</span>
                                <span className="text-primary font-medium">${i === 1 ? "150" : "95"}</span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServiceDetails;
