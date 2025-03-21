
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, MapPin, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

interface ServiceCardProps {
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

const ServiceCard = ({
  id,
  title,
  image,
  category,
  description,
  location,
  duration,
  rating,
  reviewCount,
  price,
  path,
  featured = false
}: ServiceCardProps) => {
  return (
    <div 
      className={cn(
        "service-card bg-background rounded-xl overflow-hidden shadow-sm",
        featured && "ring-2 ring-primary/20"
      )}
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-900/20 transition-colors z-10"></div>
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full z-20">
          {category}
        </div>
        {featured && (
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full z-20">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium line-clamp-1">
            {title}
          </h3>
          <div className="bg-primary/10 text-primary font-medium rounded-full px-3 py-1 text-sm whitespace-nowrap ml-2">
            {price}
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
          {description}
        </p>
        
        <div className="flex flex-wrap items-center gap-3 text-sm mb-4">
          {location && (
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-3 w-3 mr-1" />
              <span className="truncate max-w-[180px]">{location}</span>
            </div>
          )}
          
          {duration && (
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              <span>{duration}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center text-sm mb-4">
          <div className="flex items-center text-amber-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="ml-1 font-medium">{rating}</span>
          </div>
          <span className="mx-2 text-muted-foreground">•</span>
          <span className="text-muted-foreground">{reviewCount} reviews</span>
        </div>
        
        <div className="pt-4 border-t border-border flex items-center justify-between">
          <Link to={`/service/${id}`} className="text-sm text-primary font-medium flex items-center hover:underline">
            <span>View Details</span>
            <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
          
          <Link to={`/booking/${id}`}>
            <Button variant="default" size="sm">
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
