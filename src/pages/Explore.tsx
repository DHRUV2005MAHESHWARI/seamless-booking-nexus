
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CategoryList from '@/components/home/CategoryList';
import { Separator } from "@/components/ui/separator";
import NearbyServicesMap from '@/components/booking/NearbyServicesMap';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ServiceType } from '@/utils/aiRecommendations';
import { GlobeCross, Grid3X3, MapPin } from 'lucide-react';

const Explore = () => {
  const [activeServiceType, setActiveServiceType] = useState<ServiceType>('all');

  const handleServiceTypeChange = (type: ServiceType) => {
    setActiveServiceType(type);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Explore Services</h1>
            <p className="text-muted-foreground text-lg">
              Discover and book services in your area or browse by category to find what you need.
            </p>
          </div>

          <Tabs defaultValue="map" className="mb-10">
            <TabsList className="mb-8 justify-center">
              <TabsTrigger value="map" className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                <span>Nearby Map</span>
              </TabsTrigger>
              <TabsTrigger value="categories" className="flex items-center">
                <Grid3X3 className="mr-2 h-4 w-4" />
                <span>Categories</span>
              </TabsTrigger>
              <TabsTrigger value="featured" className="flex items-center">
                <GlobeCross className="mr-2 h-4 w-4" />
                <span>Featured</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="map" className="p-4 bg-muted/30 rounded-lg">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Services Near You</h2>
                <p className="text-muted-foreground">
                  Allow location access to see services available in your area. Filter by type to find exactly what you're looking for.
                </p>
              </div>
              <NearbyServicesMap 
                initialServiceType={activeServiceType} 
                onServiceSelected={(service) => {
                  console.log("Selected service:", service);
                  // Additional handling could go here
                }}
              />
            </TabsContent>
            
            <TabsContent value="categories">
              <CategoryList />
            </TabsContent>
            
            <TabsContent value="featured">
              <div className="text-center p-12">
                <h2 className="text-2xl font-semibold mb-4">Featured Services</h2>
                <p className="text-muted-foreground">
                  Our curated selection of top-rated services across all categories.
                </p>
                <div className="mt-6 p-8 border border-dashed rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Featured services will appear here.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Explore;
