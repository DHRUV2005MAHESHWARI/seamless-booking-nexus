
import { toast } from "sonner";

// Service types that can be detected
export type ServiceType = 
  | 'healthcare' 
  | 'sports' 
  | 'entertainment' 
  | 'dining' 
  | 'hospitality' 
  | 'education'
  | 'all';

export interface ServiceLocation {
  id: string;
  name: string;
  type: ServiceType;
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
  distance?: number; // in miles
  rating?: number;
  availability?: {
    available: boolean;
    nextAvailable?: string; // ISO date string
    slots?: number; // number of available slots
  };
}

// Mock database of services - in a real app, this would come from an API
const mockServices: ServiceLocation[] = [
  {
    id: 'svc1001',
    name: 'City General Hospital',
    type: 'healthcare',
    location: {
      lat: 40.7138,
      lng: -74.0060,
      address: '123 Broadway, New York, NY 10010'
    },
    rating: 4.5,
    availability: {
      available: true,
      slots: 5
    }
  },
  {
    id: 'svc1002',
    name: 'Downtown Sports Complex',
    type: 'sports',
    location: {
      lat: 40.7238,
      lng: -74.0090,
      address: '456 Park Ave, New York, NY 10012'
    },
    rating: 4.2,
    availability: {
      available: true,
      slots: 3
    }
  },
  {
    id: 'svc1003',
    name: 'Grand Theater',
    type: 'entertainment',
    location: {
      lat: 40.7318,
      lng: -74.0120,
      address: '789 5th Ave, New York, NY 10013'
    },
    rating: 4.8,
    availability: {
      available: false,
      nextAvailable: new Date(Date.now() + 86400000).toISOString() // tomorrow
    }
  },
  {
    id: 'svc1004',
    name: 'Riverfront Restaurant',
    type: 'dining',
    location: {
      lat: 40.7158,
      lng: -74.0160,
      address: '321 Water St, New York, NY 10014'
    },
    rating: 4.7,
    availability: {
      available: true,
      slots: 2
    }
  },
  {
    id: 'svc1005',
    name: 'Central Hotel & Spa',
    type: 'hospitality',
    location: {
      lat: 40.7278,
      lng: -74.0030,
      address: '555 Main St, New York, NY 10015'
    },
    rating: 4.6,
    availability: {
      available: true,
      slots: 8
    }
  },
  {
    id: 'svc1006',
    name: 'Metropolitan University',
    type: 'education',
    location: {
      lat: 40.7348,
      lng: -74.0050,
      address: '888 College Blvd, New York, NY 10016'
    },
    rating: 4.4,
    availability: {
      available: true,
      slots: 15
    }
  }
];

// This function simulates an AI-based recommendation engine
// In a real implementation, this would connect to a backend AI service
export const getAIRecommendations = async (
  userLocation: { lat: number; lng: number },
  serviceType: ServiceType = 'all',
  maxDistance: number = 5 // miles
): Promise<ServiceLocation[]> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      try {
        console.log(`Finding ${serviceType} services near [${userLocation.lat}, ${userLocation.lng}]`);
        
        // Filter by service type if needed
        let filteredServices = mockServices;
        if (serviceType !== 'all') {
          filteredServices = mockServices.filter(svc => svc.type === serviceType);
        }
        
        // Calculate distance for each service and filter by max distance
        const servicesWithDistance = filteredServices.map(service => {
          const distance = calculateDistance(
            userLocation.lat, 
            userLocation.lng,
            service.location.lat,
            service.location.lng
          );
          
          return {
            ...service,
            distance
          };
        }).filter(service => service.distance <= maxDistance);
        
        // AI sorting algorithm (simulated):
        // Sort by an "AI score" based on:
        // - Distance (40% weight)
        // - Rating (30% weight)
        // - Availability (30% weight)
        const sortedServices = servicesWithDistance.sort((a, b) => {
          const scoreA = calculateAIScore(a);
          const scoreB = calculateAIScore(b);
          return scoreB - scoreA; // Higher score first
        });
        
        resolve(sortedServices);
      } catch (error) {
        console.error("Error in AI recommendations:", error);
        toast.error("Could not get service recommendations");
        resolve([]);
      }
    }, 1000); // 1-second delay to simulate API call
  });
};

// Calculate a distance between two points in miles using the Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3958.8; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Calculate an "AI score" for a service based on multiple factors
function calculateAIScore(service: ServiceLocation): number {
  // Distance score (0-40): closer is better
  const distanceScore = service.distance ? 
    Math.max(0, 40 - (service.distance * 8)) : 0;
  
  // Rating score (0-30): higher rating is better
  const ratingScore = service.rating ? 
    (service.rating / 5) * 30 : 15;
  
  // Availability score (0-30): available is better
  const availabilityScore = service.availability?.available ? 30 : 0;
  
  return distanceScore + ratingScore + availabilityScore;
}
