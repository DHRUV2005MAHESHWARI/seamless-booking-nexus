
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from 'lucide-react';

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'sports', label: 'Sports & Fitness' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'dining', label: 'Restaurants' },
  { value: 'hospitality', label: 'Hospitality' },
  { value: 'education', label: 'Education' },
];

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', { query, category });
    // Implement search functionality here
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto glass-morphism rounded-2xl p-3 shadow-lg">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="What service are you looking for?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-12 text-base rounded-xl border-none bg-white/50 backdrop-blur-lg placeholder:text-muted-foreground"
          />
        </div>
        <div className="md:w-[180px]">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full h-12 rounded-xl border-none bg-white/50 backdrop-blur-lg">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="h-12 px-8 rounded-xl">
          <Search className="h-5 w-5 mr-2" />
          <span>Search</span>
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
