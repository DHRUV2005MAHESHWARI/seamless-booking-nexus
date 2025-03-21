
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type Category = {
  id: string;
  name: string;
  icon: string;
  description: string;
  path: string;
  color: string;
};

const categories: Category[] = [
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: '🏥',
    description: 'Book doctor appointments, medical tests, and wellness consultations.',
    path: '/category/healthcare',
    color: 'from-blue-500/20 to-blue-600/20'
  },
  {
    id: 'sports',
    name: 'Sports & Fitness',
    icon: '🏀',
    description: 'Reserve fields, courts, and sessions with trainers.',
    path: '/category/sports',
    color: 'from-green-500/20 to-green-600/20'
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: '🎬',
    description: 'Get tickets for movies, concerts, and live performances.',
    path: '/category/entertainment',
    color: 'from-purple-500/20 to-purple-600/20'
  },
  {
    id: 'dining',
    name: 'Restaurants',
    icon: '🍽️',
    description: 'Make reservations at your favorite restaurants and cafes.',
    path: '/category/dining',
    color: 'from-red-500/20 to-red-600/20'
  },
  {
    id: 'hospitality',
    name: 'Hospitality',
    icon: '🏨',
    description: 'Book hotels, event venues, and conference rooms.',
    path: '/category/hospitality',
    color: 'from-yellow-500/20 to-yellow-600/20'
  },
  {
    id: 'education',
    name: 'Education',
    icon: '📚',
    description: 'Schedule classes, workshops, and educational sessions.',
    path: '/category/education',
    color: 'from-indigo-500/20 to-indigo-600/20'
  }
];

const CategoryList = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse By Category</h2>
          <p className="text-muted-foreground text-lg">
            Discover and book services across a wide range of categories tailored to your needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category) => (
            <div 
              key={category.id}
              className={cn(
                "category-card rounded-xl overflow-hidden glass-morphism transition-all duration-300 p-1",
                selectedCategory === category.id && "ring-2 ring-primary ring-offset-2"
              )}
              onMouseEnter={() => setSelectedCategory(category.id)}
              onMouseLeave={() => setSelectedCategory(null)}
            >
              <div className={`h-full rounded-lg bg-gradient-to-br ${category.color} p-6`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{category.icon}</span>
                    <h3 className="text-xl font-medium">{category.name}</h3>
                  </div>
                  <Link to={category.path} className="text-primary">
                    <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
                <p className="mt-4 text-muted-foreground">{category.description}</p>
                <div className="mt-6">
                  <Link to={category.path}>
                    <Button variant="secondary" className="w-full group">
                      <span>Explore {category.name}</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/categories">
            <Button variant="outline" size="lg" className="rounded-full">
              <span>View All Categories</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
