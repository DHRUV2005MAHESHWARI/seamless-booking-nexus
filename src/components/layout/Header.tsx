
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Calendar, Search, User, Menu, X } from 'lucide-react';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';

const categories = [
  { name: 'Healthcare', path: '/category/healthcare', icon: '🏥' },
  { name: 'Sports', path: '/category/sports', icon: '🏀' },
  { name: 'Entertainment', path: '/category/entertainment', icon: '🎬' },
  { name: 'Dining', path: '/category/dining', icon: '🍽️' },
  { name: 'Hospitality', path: '/category/hospitality', icon: '🏨' },
  { name: 'Education', path: '/category/education', icon: '📚' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 ease-in-out py-4',
        scrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Calendar className="h-6 w-6 text-primary animate-float" />
          <span className="text-xl font-medium tracking-tight">BookingHub</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-background/50">Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {categories.map((category) => (
                      <li key={category.name}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={category.path}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-lg font-medium leading-none">{category.name}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Book {category.name.toLowerCase()} services with ease
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/bookings" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  My Bookings
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex items-center space-x-4">
            <Link to="/search">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="default" className="ml-2 transition-all hover:shadow-md">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-morphism animate-fade-in absolute top-full left-0 w-full py-4 px-4">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="px-4 py-2 rounded-md hover:bg-accent">
              Home
            </Link>
            <div className="border-t border-border my-2"></div>
            <h3 className="px-4 text-sm font-medium text-muted-foreground">Categories</h3>
            {categories.map((category) => (
              <Link 
                key={category.name}
                to={category.path}
                className="px-4 py-2 rounded-md hover:bg-accent"
              >
                {category.name}
              </Link>
            ))}
            <div className="border-t border-border my-2"></div>
            <Link to="/bookings" className="px-4 py-2 rounded-md hover:bg-accent">
              My Bookings
            </Link>
            <Link to="/profile" className="px-4 py-2 rounded-md hover:bg-accent">
              Profile
            </Link>
            <div className="pt-2">
              <Link to="/login">
                <Button className="w-full">Sign In</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
