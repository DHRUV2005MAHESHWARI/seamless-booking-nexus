
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ServiceType } from '@/utils/aiRecommendations';
import NearbyServicesMap from '@/components/booking/NearbyServicesMap';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('query') || '';
  const initialCategory = (queryParams.get('category') as ServiceType) || 'all';
  
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<ServiceType>(initialCategory);
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // You would update the URL with the new search params
    const searchParams = new URLSearchParams();
    if (query) searchParams.set('query', query);
    if (category) searchParams.set('category', category);
    
    // In a real app, you would navigate to the new URL
    // For now we'll just log it
    console.log(`/search?${searchParams.toString()}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Search Services</h1>
          
          {/* Search Form */}
          <div className="bg-background rounded-xl shadow-sm p-4 mb-8">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="What service are you looking for?"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full h-12 text-base rounded-xl"
                />
              </div>
              <div className="md:w-[180px]">
                <Select value={category} onValueChange={(value) => setCategory(value as ServiceType)}>
                  <SelectTrigger className="w-full h-12 rounded-xl">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="sports">Sports & Fitness</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="dining">Restaurants</SelectItem>
                    <SelectItem value="hospitality">Hospitality</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="h-12 px-8 rounded-xl">
                <Search className="h-5 w-5 mr-2" />
                <span>Search</span>
              </Button>
            </form>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Services Near You</h2>
            </div>
            
            <Separator />
            
            <div className="bg-background rounded-xl shadow-sm p-4">
              <NearbyServicesMap initialServiceType={category} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchPage;
