
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin, Loader2, Search, Clock, Star, CircleCheck, CircleX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ServiceLocation, ServiceType, getAIRecommendations } from '@/utils/aiRecommendations';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

// For demonstration purposes only
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZGVtby1hY2NvdW50IiwiYSI6ImNrcDk1Z2s3azA5NzEyb254eDRwNHNmOWsifQ.lA1zG7-9ow1TvGzqPEJoXw';

interface Location {
  lat: number;
  lng: number;
  address?: string;
}

interface NearbyServicesMapProps {
  initialServiceType?: ServiceType;
  onServiceSelected?: (service: ServiceLocation) => void;
}

const NearbyServicesMap: React.FC<NearbyServicesMapProps> = ({ 
  initialServiceType = 'all',
  onServiceSelected
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [nearbyServices, setNearbyServices] = useState<ServiceLocation[]>([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceLocation | null>(null);
  const [selectedServiceType, setSelectedServiceType] = useState<ServiceType>(initialServiceType);
  const { toast } = useToast();

  mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const initializeMap = () => {
      try {
        const defaultLocation = { lat: 40.7128, lng: -74.0060 }; // Default to NYC if no location
        
        map.current = new mapboxgl.Map({
          container: mapContainer.current!,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [defaultLocation.lng, defaultLocation.lat],
          zoom: 13
        });

        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

        // Get user's location on map init
        getCurrentLocation();
      } catch (error) {
        console.error("Error initializing map:", error);
        toast({
          variant: "destructive",
          title: "Map Error",
          description: "Could not initialize map. Please try again.",
        });
      }
    };

    initializeMap();

    return () => {
      clearMarkers();
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Fetch nearby services when location changes
  useEffect(() => {
    if (currentLocation) {
      findNearbyServices();
    }
  }, [currentLocation, selectedServiceType]);

  // Clear existing markers
  const clearMarkers = () => {
    markers.current.forEach(marker => marker.remove());
    markers.current = [];
  };

  // Add service markers to the map
  const addServiceMarkers = (services: ServiceLocation[]) => {
    if (!map.current) return;
    
    clearMarkers();
    
    // Add user marker first
    if (currentLocation) {
      const userMarker = new mapboxgl.Marker({ color: '#3b82f6' })
        .setLngLat([currentLocation.lng, currentLocation.lat])
        .addTo(map.current);
      
      markers.current.push(userMarker);
      
      // Add popup for user location
      new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat([currentLocation.lng, currentLocation.lat])
        .setHTML('<div class="font-medium">Your Location</div>')
        .addTo(map.current);
    }
    
    // Add service markers
    services.forEach(service => {
      const { lat, lng } = service.location;
      
      // Choose marker color based on availability
      const markerColor = service.availability?.available ? '#10b981' : '#ef4444';
      
      const marker = new mapboxgl.Marker({ color: markerColor })
        .setLngLat([lng, lat])
        .addTo(map.current!);
      
      // Add click handler to marker
      marker.getElement().addEventListener('click', () => {
        selectService(service);
      });
      
      markers.current.push(marker);
    });
    
    // Fit bounds to include all markers if there are services
    if (services.length > 0 && currentLocation) {
      const bounds = new mapboxgl.LngLatBounds();
      
      // Add user location
      bounds.extend([currentLocation.lng, currentLocation.lat]);
      
      // Add all service locations
      services.forEach(service => {
        bounds.extend([service.location.lng, service.location.lat]);
      });
      
      map.current.fitBounds(bounds, {
        padding: 70,
        maxZoom: 15
      });
    }
  };

  // Get current user location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        variant: "destructive",
        title: "Geolocation Error",
        description: "Geolocation is not supported by your browser.",
      });
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        if (map.current) {
          map.current.flyTo({ center: [longitude, latitude], zoom: 13 });
        }
        
        setCurrentLocation({ lat: latitude, lng: longitude });
        reverseGeocode(latitude, longitude);
        setLoading(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        toast({
          variant: "destructive",
          title: "Location Error",
          description: error.message || "Could not get your location. Please check your permissions.",
        });
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );
  };

  // Fetch nearby services
  const findNearbyServices = async () => {
    if (!currentLocation) return;
    
    setLoadingServices(true);
    try {
      // Use our AI recommendation service to find nearby services
      const services = await getAIRecommendations(
        currentLocation,
        selectedServiceType,
        5 // 5 miles radius
      );
      
      setNearbyServices(services);
      addServiceMarkers(services);
      
      if (services.length === 0) {
        toast({
          title: "No Services Found",
          description: `No ${selectedServiceType} services found within 5 miles.`,
        });
      }
    } catch (error) {
      console.error("Error finding nearby services:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not fetch nearby services. Please try again.",
      });
    } finally {
      setLoadingServices(false);
    }
  };

  // Select a service
  const selectService = (service: ServiceLocation) => {
    setSelectedService(service);
    
    if (map.current) {
      map.current.flyTo({
        center: [service.location.lng, service.location.lat],
        zoom: 15
      });
    }
    
    if (onServiceSelected) {
      onServiceSelected(service);
    }
  };

  // Reverse geocode to get address from coordinates
  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const address = data.features[0].place_name;
        setCurrentLocation(prev => prev ? { ...prev, address } : { lat, lng, address });
      }
    } catch (error) {
      console.error("Error reverse geocoding:", error);
    }
  };

  // Get the service type badge color
  const getServiceTypeColor = (type: ServiceType): string => {
    switch(type) {
      case 'healthcare': return 'bg-red-100 text-red-800';
      case 'sports': return 'bg-green-100 text-green-800';
      case 'entertainment': return 'bg-purple-100 text-purple-800';
      case 'dining': return 'bg-yellow-100 text-yellow-800';
      case 'hospitality': return 'bg-blue-100 text-blue-800';
      case 'education': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <Button 
          onClick={getCurrentLocation}
          disabled={loading}
          variant="default"
          className="flex-1"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Getting your location...
            </>
          ) : (
            <>
              <MapPin className="mr-2 h-4 w-4" />
              Use My Current Location
            </>
          )}
        </Button>
        
        <div className="flex gap-2 flex-wrap">
          <Badge 
            variant={selectedServiceType === 'all' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setSelectedServiceType('all')}
          >
            All
          </Badge>
          <Badge 
            variant={selectedServiceType === 'healthcare' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setSelectedServiceType('healthcare')}
          >
            Healthcare
          </Badge>
          <Badge 
            variant={selectedServiceType === 'sports' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setSelectedServiceType('sports')}
          >
            Sports
          </Badge>
          <Badge 
            variant={selectedServiceType === 'entertainment' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setSelectedServiceType('entertainment')}
          >
            Entertainment
          </Badge>
          <Badge 
            variant={selectedServiceType === 'dining' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setSelectedServiceType('dining')}
          >
            Dining
          </Badge>
        </div>
      </div>
      
      {currentLocation?.address && (
        <div className="p-3 bg-muted rounded-lg">
          <div className="flex items-start gap-2">
            <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Your Location</p>
              <p className="text-sm text-muted-foreground">{currentLocation.address}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div 
            ref={mapContainer} 
            className="w-full h-[400px] rounded-xl overflow-hidden border"
          />
        </div>
        
        <div className="h-[400px] overflow-y-auto border rounded-xl p-4">
          <h3 className="text-lg font-medium mb-4">Nearby Services</h3>
          
          {loadingServices ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col space-y-3">
                  <Skeleton className="h-[20px] w-[180px]" />
                  <Skeleton className="h-[20px] w-[150px]" />
                  <Skeleton className="h-[40px] w-full" />
                </div>
              ))}
            </div>
          ) : nearbyServices.length === 0 ? (
            <div className="text-center py-8">
              <Search className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No services found nearby.</p>
              <p className="text-sm text-muted-foreground">Try changing the service type or location.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {nearbyServices.map((service) => (
                <div 
                  key={service.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedService?.id === service.id ? 'bg-muted border-primary' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => selectService(service)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium">{service.name}</h4>
                    <Badge className={getServiceTypeColor(service.type)}>
                      {service.type.charAt(0).toUpperCase() + service.type.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{service.distance?.toFixed(1)} miles away</span>
                    
                    {service.rating && (
                      <>
                        <span className="mx-1">•</span>
                        <Star className="h-3 w-3 mr-1 fill-amber-500 text-amber-500" />
                        <span>{service.rating}</span>
                      </>
                    )}
                  </div>
                  
                  <div className="flex items-center text-sm mb-3">
                    {service.availability?.available ? (
                      <div className="flex items-center text-emerald-600">
                        <CircleCheck className="h-4 w-4 mr-1" />
                        <span>Available Now</span>
                        {service.availability.slots && (
                          <span className="ml-1">• {service.availability.slots} slots</span>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center text-rose-600">
                        <CircleX className="h-4 w-4 mr-1" />
                        <span>Currently Unavailable</span>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    size="sm"
                    variant="outline"
                    className="w-full"
                    asChild
                  >
                    <Link to={`/service/${service.id}`}>View Details</Link>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NearbyServicesMap;
