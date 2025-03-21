
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import CategoryList from '@/components/home/CategoryList';
import SearchBar from '@/components/home/SearchBar';
import FeaturedServices from '@/components/home/FeaturedServices';
import { ArrowRight, CalendarCheck, Clock, Compass, Presentation, Star, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: <Compass className="h-8 w-8 text-primary" />,
    title: 'Discover Services',
    description: 'Browse through thousands of services across multiple categories in your area.'
  },
  {
    icon: <CalendarCheck className="h-8 w-8 text-primary" />,
    title: 'Easy Booking',
    description: 'Book appointments, reserve tables, or schedule activities with just a few clicks.'
  },
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: 'Real-time Availability',
    description: 'See available time slots in real-time and choose what works best for you.'
  },
  {
    icon: <Star className="h-8 w-8 text-primary" />,
    title: 'Verified Reviews',
    description: 'Read authentic reviews from real customers to make informed decisions.'
  },
  {
    icon: <ThumbsUp className="h-8 w-8 text-primary" />,
    title: 'Instant Confirmation',
    description: 'Get instant booking confirmations and reminders for your upcoming appointments.'
  },
  {
    icon: <Presentation className="h-8 w-8 text-primary" />,
    title: 'Manage Bookings',
    description: 'View, modify, or cancel your bookings anytime from your personal dashboard.'
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        
        <section className="py-8 md:py-12 bg-background">
          <div className="container mx-auto px-4">
            <SearchBar />
          </div>
        </section>
        
        <CategoryList />
        
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose BookingHub?</h2>
              <p className="text-muted-foreground text-lg">
                Our platform makes it easy to book any service with a smooth, elegant experience that puts you in control.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="glass-morphism p-6 rounded-xl hover-scale"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="h-12 w-12 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/how-it-works">
                <Button variant="outline" className="rounded-full">
                  <span>Learn How It Works</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        <FeaturedServices />
        
        <section className="py-16 md:py-24 bg-background relative overflow-hidden">
          <div className="absolute -z-10 h-[600px] w-[600px] opacity-[0.15] -bottom-[100px] -left-[100px] bg-primary/40 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-4">
            <div className="glass-morphism rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Book Your Next Experience?</h2>
                  <p className="text-muted-foreground text-lg mb-6">
                    Join thousands of satisfied customers who use BookingHub to simplify their booking needs.
                  </p>
                  <Button size="lg" className="rounded-full px-8">
                    <Link to="/explore" className="flex items-center space-x-2">
                      <span>Start Booking Now</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                
                <div className="relative hidden md:block">
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-blue-400/20 rounded-2xl flex items-center justify-center p-6">
                    <div className="glass-morphism p-8 rounded-xl w-full max-w-xs mx-auto text-center">
                      <div className="mb-4">
                        <CalendarCheck className="h-16 w-16 text-primary mx-auto animate-float" />
                      </div>
                      <h3 className="text-2xl font-medium mb-2">Fast & Easy</h3>
                      <p className="text-muted-foreground">Book your service in less than 2 minutes</p>
                    </div>
                  </div>
                  
                  <div className="absolute -top-4 -right-4 h-8 w-8 rounded-full bg-primary"></div>
                  <div className="absolute -bottom-4 -left-4 h-12 w-12 rounded-full bg-blue-400"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
