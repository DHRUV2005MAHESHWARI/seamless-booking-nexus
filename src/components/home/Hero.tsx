
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-background pt-28 pb-16 md:pt-32 md:pb-24">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      
      <div className="absolute -z-10 h-[600px] w-[600px] opacity-[0.15] -top-[100px] -left-[100px] bg-primary/40 rounded-full blur-3xl"></div>
      <div className="absolute -z-10 h-[600px] w-[600px] opacity-[0.15] -bottom-[100px] -right-[100px] bg-blue-400/40 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="animate-fade-in text-center max-w-3xl mx-auto mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance leading-[1.15]">
              Book Everything in <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">One Place</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-balance">
              Seamlessly book appointments, reserve tables, schedule activities, and more. The simple, elegant solution for all your booking needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="text-base px-8 rounded-full shadow-lg hover:shadow-xl transition-all">
                <Link to="/explore" className="flex items-center space-x-2">
                  <span>Start Booking</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-base px-8 rounded-full">
                <Link to="/how-it-works">Learn How It Works</Link>
              </Button>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="w-full max-w-5xl mx-auto animate-fade-in opacity-0" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
            <div className="relative">
              <div className="glass-morphism p-2 md:p-4 rounded-2xl shadow-lg">
                <div className="aspect-[16/9] rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  {/* Placeholder for image or illustration */}
                  <div className="p-12 text-center">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                      {[
                        "Healthcare", "Sports", "Entertainment",
                        "Dining", "Hospitality", "Education"
                      ].map((category, index) => (
                        <div key={index} className="glass-morphism p-6 rounded-xl flex flex-col items-center justify-center text-center hover-scale">
                          <div className="h-12 w-12 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-2xl">{
                              index === 0 ? '🏥' :
                              index === 1 ? '🏀' :
                              index === 2 ? '🎬' :
                              index === 3 ? '🍽️' :
                              index === 4 ? '🏨' : '📚'
                            }</span>
                          </div>
                          <h3 className="font-medium">{category}</h3>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 h-12 w-12 rounded-full bg-primary shadow-lg"></div>
              <div className="absolute -top-4 -left-4 h-8 w-8 rounded-full bg-blue-400 shadow-lg"></div>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 md:mt-20 w-full animate-fade-in opacity-0" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
            <p className="text-center text-sm text-muted-foreground mb-8">TRUSTED BY THOUSANDS OF BUSINESSES AND CUSTOMERS</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-60">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-8 w-24 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
