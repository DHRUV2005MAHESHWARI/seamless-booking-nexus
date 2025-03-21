import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ServiceCard from '@/components/ui/card/ServiceCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, Filter, SlidersHorizontal, Clock, MapPin } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from '@/lib/utils';

type CategoryInfo = {
  id: string;
  name: string;
  description: string;
  icon: string;
}

type ServiceItem = {
  id: string;
  title: string;
  image: string;
  category: string;
  description: string;
  location: string;
  duration?: string;
  rating: number;
  reviewCount: number;
  price: string;
  path: string;
  featured?: boolean;
}

const mockCategories: Record<string, CategoryInfo> = {
  'healthcare': {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Book appointments with doctors, specialists, and medical services.',
    icon: '🏥'
  },
  'sports': {
    id: 'sports',
    name: 'Sports & Fitness',
    description: 'Book sports fields, fitness sessions, and recreational activities.',
    icon: '🏀'
  },
  'entertainment': {
    id: 'entertainment',
    name: 'Entertainment',
    description: 'Book tickets for movies, concerts, and live performances.',
    icon: '🎬'
  },
  'dining': {
    id: 'dining',
    name: 'Restaurants',
    description: 'Make dining reservations at restaurants and cafes.',
    icon: '🍽️'
  },
  'hospitality': {
    id: 'hospitality',
    name: 'Hospitality',
    description: 'Book accommodations, event venues, and conference rooms.',
    icon: '🏨'
  },
  'education': {
    id: 'education',
    name: 'Education',
    description: 'Book classes, workshops, and educational sessions.',
    icon: '📚'
  }
};

const mockServices: Record<string, ServiceItem[]> = {
  'healthcare': [
    {
      id: 'doctor-smith',
      title: 'Dr. Smith - General Consultation',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2940&auto=format&fit=crop',
      category: 'Healthcare',
      description: 'General health check-up and consultations for adults and children.',
      location: 'Central Medical Center, 123 Main St',
      duration: '30 min',
      rating: 4.9,
      reviewCount: 128,
      price: '$120',
      path: '/service/doctor-smith',
      featured: true
    },
    {
      id: 'therapy-session',
      title: 'Physical Therapy Session',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2940&auto=format&fit=crop',
      category: 'Healthcare',
      description: 'Professional physical therapy for injury recovery and mobility improvement.',
      location: 'Wellness Rehabilitation Center',
      duration: '45 min',
      rating: 4.7,
      reviewCount: 95,
      price: '$85',
      path: '/service/therapy-session'
    },
    {
      id: 'dental-checkup',
      title: 'Dental Check-up & Cleaning',
      image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=2940&auto=format&fit=crop',
      category: 'Healthcare',
      description: 'Complete dental check-up with professional cleaning and consultation.',
      location: 'Bright Smile Dental Clinic',
      duration: '60 min',
      rating: 4.8,
      reviewCount: 112,
      price: '$150',
      path: '/service/dental-checkup'
    },
    {
      id: 'dermatology',
      title: 'Dermatology Consultation',
      image: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=2940&auto=format&fit=crop',
      category: 'Healthcare',
      description: 'Professional skin assessment and treatment consultation with a certified dermatologist.',
      location: 'Skin Care Specialists, 456 Park Ave',
      duration: '40 min',
      rating: 4.8,
      reviewCount: 87,
      price: '$180',
      path: '/service/dermatology'
    },
    {
      id: 'lab-tests',
      title: 'Comprehensive Lab Tests',
      image: 'https://images.unsplash.com/photo-1579165466741-7f35e4755183?q=80&w=2940&auto=format&fit=crop',
      category: 'Healthcare',
      description: 'Complete blood work and diagnostic testing for comprehensive health assessment.',
      location: 'City Medical Laboratory',
      duration: '20 min',
      rating: 4.6,
      reviewCount: 62,
      price: '$200',
      path: '/service/lab-tests'
    },
    {
      id: 'eye-exam',
      title: 'Eye Examination',
      image: 'https://images.unsplash.com/photo-1617115087770-36be6c1a6fd4?q=80&w=2940&auto=format&fit=crop',
      category: 'Healthcare',
      description: 'Complete vision assessment with a qualified optometrist.',
      location: 'Clear Vision Eye Care',
      duration: '30 min',
      rating: 4.9,
      reviewCount: 103,
      price: '$90',
      path: '/service/eye-exam'
    }
  ],
  'sports': [
    {
      id: 'tennis-court',
      title: 'Premium Tennis Court',
      image: 'https://images.unsplash.com/photo-1622279457486-28f804956bad?q=80&w=2940&auto=format&fit=crop',
      category: 'Sports',
      description: 'Professional-grade tennis court with amenities and equipment rental.',
      location: 'City Sports Complex',
      duration: '60 min',
      rating: 4.7,
      reviewCount: 95,
      price: '$40/hr',
      path: '/service/tennis-court',
      featured: true
    },
    // More sports services here
  ],
  // Other categories with their respective services
  'entertainment': [
    {
      id: 'movie-ticket',
      title: 'Premiere Movie Tickets',
      image: 'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?q=80&w=2942&auto=format&fit=crop',
      category: 'Entertainment',
      description: 'Premium seating for the latest blockbuster films in a state-of-the-art theater.',
      location: 'Cineplex Downtown',
      duration: '2-3 hrs',
      rating: 4.8,
      reviewCount: 215,
      price: '$15',
      path: '/service/movie-ticket',
      featured: true
    },
    // More entertainment services
  ],
  'dining': [
    {
      id: 'restaurant-reservation',
      title: 'Gourmet Dining Experience',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2940&auto=format&fit=crop',
      category: 'Dining',
      description: 'Fine dining experience with a specially curated menu by our master chef.',
      location: 'Le Gourmet Restaurant',
      duration: '2 hrs',
      rating: 4.9,
      reviewCount: 347,
      price: 'Varies',
      path: '/service/restaurant-reservation',
      featured: true
    },
    // More dining services
  ],
  'hospitality': [
    {
      id: 'luxury-hotel',
      title: 'Luxury Hotel Suite',
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2940&auto=format&fit=crop',
      category: 'Hospitality',
      description: 'Premium suite with panoramic city views and exclusive amenities.',
      location: 'Grand Plaza Hotel',
      rating: 4.8,
      reviewCount: 182,
      price: '$250/night',
      path: '/service/luxury-hotel',
      featured: true
    },
    // More hospitality services
  ],
  'education': [
    {
      id: 'coding-workshop',
      title: 'Advanced Coding Workshop',
      image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=2940&auto=format&fit=crop',
      category: 'Education',
      description: 'Hands-on workshop for advanced programming techniques and best practices.',
      location: 'Tech Learning Center',
      duration: '3 hrs',
      rating: 4.7,
      reviewCount: 76,
      price: '$80',
      path: '/service/coding-workshop',
      featured: true
    },
    // More education services
  ]
};

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [category, setCategory] = useState<CategoryInfo | null>(null);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [sortBy, setSortBy] = useState('recommended');
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  useEffect(() => {
    if (categoryId && mockCategories[categoryId]) {
      setCategory(mockCategories[categoryId]);
      setServices(mockServices[categoryId] || []);
      
      // Scroll to top when category changes
      window.scrollTo(0, 0);
    }
  }, [categoryId]);
  
  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-medium mb-2">Category not found</h1>
            <p className="text-muted-foreground mb-4">The category you're looking for doesn't exist.</p>
            <Button>
              <ArrowRight className="mr-2 h-4 w-4" />
              Back to Categories
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="bg-secondary/50">
          <div className="container mx-auto px-4 py-12">
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl">
                {category.icon}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">{category.name}</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl">{category.description}</p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters - Sidebar on larger screens, accordion on mobile */}
            <div className={cn(
              "lg:w-[280px] shrink-0",
              !filtersOpen && "lg:block hidden"
            )}>
              <div className="sticky top-24 glass-morphism rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium">Filters</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="lg:hidden"
                    onClick={() => setFiltersOpen(false)}
                  >
                    Close
                  </Button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Price Range</h3>
                    <div className="space-y-2">
                      {['$', '$$', '$$$', '$$$$'].map((price) => (
                        <div key={price} className="flex items-center">
                          <Switch id={`price-${price}`} />
                          <Label htmlFor={`price-${price}`} className="ml-2">{price}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-sm font-medium mb-3">Rating</h3>
                    <div className="space-y-2">
                      {[5, 4, 3, 2].map((rating) => (
                        <div key={rating} className="flex items-center">
                          <Switch id={`rating-${rating}`} />
                          <Label htmlFor={`rating-${rating}`} className="ml-2">
                            {rating}+ <Star className="inline-block h-3 w-3 fill-amber-500 text-amber-500" />
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="duration">
                      <AccordionTrigger className="text-sm font-medium">Duration</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-2">
                          {['< 30 min', '30-60 min', '1-2 hours', '> 2 hours'].map((duration) => (
                            <div key={duration} className="flex items-center">
                              <Switch id={`duration-${duration}`} />
                              <Label htmlFor={`duration-${duration}`} className="ml-2">{duration}</Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="availability">
                      <AccordionTrigger className="text-sm font-medium">Availability</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-2">
                          {['Today', 'Tomorrow', 'This Week', 'Next Week'].map((time) => (
                            <div key={time} className="flex items-center">
                              <Switch id={`time-${time}`} />
                              <Label htmlFor={`time-${time}`} className="ml-2">{time}</Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  
                  <Separator />
                  
                  <Button className="w-full">Apply Filters</Button>
                </div>
              </div>
            </div>
            
            {/* Services List */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-medium">{services.length} services available</h2>
                </div>
                
                <div className="flex items-center gap-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="lg:hidden flex items-center"
                    onClick={() => setFiltersOpen(true)}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  
                  <div className="flex items-center">
                    <SlidersHorizontal className="h-4 w-4 mr-2 text-muted-foreground" />
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recommended">Recommended</SelectItem>
                        <SelectItem value="price_low">Price: Low to High</SelectItem>
                        <SelectItem value="price_high">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    id={service.id}
                    title={service.title}
                    image={service.image}
                    category={service.category}
                    description={service.description}
                    location={service.location}
                    duration={service.duration}
                    rating={service.rating}
                    reviewCount={service.reviewCount}
                    price={service.price}
                    path={service.path}
                    featured={service.featured}
                  />
                ))}
              </div>
              
              {services.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No services found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your filters or check back later.</p>
                </div>
              )}
              
              {services.length > 0 && (
                <div className="flex justify-center mt-8">
                  <Button variant="outline">Load More</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
