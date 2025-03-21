
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

// Temporary access token - in production this should be stored securely
// For demonstration purposes only
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZGVtby1hY2NvdW50IiwiYSI6ImNrcDk1Z2s3azA5NzEyb254eDRwNHNmOWsifQ.lA1zG7-9ow1TvGzqPEJoXw';

interface Location {
  lat: number;
  lng: number;
  address?: string;
}

interface MapComponentProps {
  onLocationSelect?: (location: Location) => void;
  initialLocation?: Location;
  serviceLocation?: Location;
  isEditable?: boolean;
}

const MapComponent: React.FC<MapComponentProps> = ({ 
  onLocationSelect, 
  initialLocation, 
  serviceLocation,
  isEditable = true
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const serviceMarker = useRef<mapboxgl.Marker | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(initialLocation || null);
  const [geocoding, setGeocoding] = useState(false);
  const { toast } = useToast();

  mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const initializeMap = () => {
      try {
        const defaultLocation = initialLocation || { lat: 40.7128, lng: -74.0060 }; // Default to NYC if no location
        
        map.current = new mapboxgl.Map({
          container: mapContainer.current!,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [defaultLocation.lng, defaultLocation.lat],
          zoom: 12
        });

        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

        // Add marker for the initial location
        if (initialLocation) {
          marker.current = new mapboxgl.Marker({ color: '#3b82f6' })
            .setLngLat([initialLocation.lng, initialLocation.lat])
            .addTo(map.current);
          setCurrentLocation(initialLocation);
        }
        
        // Add service location marker if provided
        if (serviceLocation) {
          serviceMarker.current = new mapboxgl.Marker({ color: '#ef4444' })
            .setLngLat([serviceLocation.lng, serviceLocation.lat])
            .addTo(map.current);
          
          // Add popup for service location
          new mapboxgl.Popup({ closeOnClick: false })
            .setLngLat([serviceLocation.lng, serviceLocation.lat])
            .setHTML('<div class="font-medium">Service Location</div>')
            .addTo(map.current);
        }

        // Allow clicking on map to set location if editable
        if (isEditable) {
          map.current.on('click', (e) => {
            const { lng, lat } = e.lngLat;
            updateMarker(lat, lng);
            reverseGeocode(lat, lng);
          });
        }
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
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Function to update marker position
  const updateMarker = (lat: number, lng: number) => {
    if (map.current) {
      if (marker.current) {
        marker.current.setLngLat([lng, lat]);
      } else {
        marker.current = new mapboxgl.Marker({ color: '#3b82f6', draggable: isEditable })
          .setLngLat([lng, lat])
          .addTo(map.current);
        
        // Handle marker drag end if editable
        if (isEditable) {
          marker.current.on('dragend', () => {
            const lngLat = marker.current!.getLngLat();
            setCurrentLocation({ lat: lngLat.lat, lng: lngLat.lng });
            reverseGeocode(lngLat.lat, lngLat.lng);
            if (onLocationSelect) {
              onLocationSelect({ lat: lngLat.lat, lng: lngLat.lng });
            }
          });
        }
      }
      
      setCurrentLocation({ lat, lng });
      
      if (onLocationSelect) {
        onLocationSelect({ lat, lng });
      }
    }
  };

  // Reverse geocode to get address from coordinates
  const reverseGeocode = async (lat: number, lng: number) => {
    setGeocoding(true);
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const address = data.features[0].place_name;
        setCurrentLocation(prev => prev ? { ...prev, address } : { lat, lng, address });
        
        if (onLocationSelect) {
          onLocationSelect({ lat, lng, address });
        }
      }
    } catch (error) {
      console.error("Error reverse geocoding:", error);
    } finally {
      setGeocoding(false);
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
          map.current.flyTo({ center: [longitude, latitude], zoom: 14 });
        }
        
        updateMarker(latitude, longitude);
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

  return (
    <div className="space-y-4">
      {isEditable && (
        <Button 
          onClick={getCurrentLocation}
          disabled={loading}
          variant="outline"
          className="w-full"
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
      )}
      
      <div 
        ref={mapContainer} 
        className="w-full h-[300px] rounded-xl overflow-hidden border"
      />
      
      {currentLocation?.address && (
        <div className="p-3 bg-muted rounded-lg">
          <div className="flex items-start gap-2">
            <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Selected Location</p>
              <p className="text-sm text-muted-foreground">{currentLocation.address}</p>
              {geocoding && <p className="text-xs text-muted-foreground">Updating address...</p>}
            </div>
          </div>
        </div>
      )}
      
      {serviceLocation && currentLocation && (
        <div className="mt-4">
          <Separator className="my-2" />
          <p className="text-sm text-muted-foreground mt-2">
            The service location is approximately {calculateDistance(currentLocation, serviceLocation).toFixed(2)} miles from your selected location.
          </p>
        </div>
      )}
    </div>
  );
};

// Helper function to calculate distance between two points in miles
function calculateDistance(point1: Location, point2: Location): number {
  const R = 3958.8; // Earth's radius in miles
  const dLat = (point2.lat - point1.lat) * Math.PI / 180;
  const dLon = (point2.lng - point1.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export default MapComponent;
