
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

type FeaturedService = {
  id: string;
  title: string;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: string;
  path: string;
};

const featuredServices: FeaturedService[] = [
  {
    id: 'doctor-consultation',
    title: 'Consultation with Dr. Smith',
    category: 'Healthcare',
    image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=2942&auto=format&fit=crop',
    rating: 4.9,
    reviewCount: 128,
    price: '$120',
    path: '/service/doctor-consultation'
  },
  {
    id: 'tennis-court',
    title: 'Premium Tennis Court',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1622279457486-28f804956bad?q=80&w=2940&auto=format&fit=crop',
    rating: 4.7,
    reviewCount: 95,
    price: '$40/hr',
    path: '/service/tennis-court'
  },
  {
    id: 'movie-ticket',
    title: 'Premiere Movie Tickets',
    category: 'Entertainment',
    image: 'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?q=80&w=2942&auto=format&fit=crop',
    rating: 4.8,
    reviewCount: 215,
    price: '$15',
    path: '/service/movie-ticket'
  },
  {
    id: 'restaurant-reservation',
    title: 'Gourmet Dining Experience',
    category: 'Dining',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2940&auto=format&fit=crop',
    rating: 4.9,
    reviewCount: 347,
    price: 'Varies',
    path: '/service/restaurant-reservation'
  },
  {
    id: 'luxury-hotel',
    title: 'Luxury Hotel Suite',
    category: 'Hospitality',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2940&auto=format&fit=crop',
    rating: 4.8,
    reviewCount: 182,
    price: '$250/night',
    path: '/service/luxury-hotel'
  },
  {
    id: 'coding-workshop',
    title: 'Advanced Coding Workshop',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=2940&auto=format&fit=crop',
    rating: 4.7,
    reviewCount: 76,
    price: '$80',
    path: '/service/coding-workshop'
  }
];

const FeaturedServices = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Services</h2>
            <p className="text-muted-foreground text-lg">
              Discover our most popular services with top ratings from satisfied customers.
            </p>
          </div>
          <Link to="/services">
            <Button variant="ghost" className="mt-4 md:mt-0 group">
              <span>View All Services</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredServices.map((service) => (
            <Link 
              key={service.id} 
              to={service.path}
              className="service-card block group"
            >
              <div className="bg-background rounded-xl overflow-hidden shadow-sm">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gray-900/20 group-hover:bg-gray-900/10 transition-colors z-10"></div>
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full z-20">
                    {service.category}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <div className="bg-primary/10 text-primary font-medium rounded-full px-3 py-1 text-sm">
                      {service.price}
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="flex items-center text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 font-medium">{service.rating}</span>
                    </div>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{service.reviewCount} reviews</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className={cn(
                      "text-sm text-primary font-medium flex items-center",
                      "group-hover:underline"
                    )}>
                      <span>Book Now</span>
                      <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
