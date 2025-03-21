import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from '@/components/ui/avatar';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Bell, 
  Calendar, 
  Check, 
  CreditCard, 
  History, 
  LockKeyhole, 
  LogOut, 
  Mail, 
  MapPin, 
  Phone, 
  Settings, 
  User, 
  X,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

type Booking = {
  id: string;
  service: string;
  provider: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  image: string;
};

const mockBookings: Booking[] = [
  {
    id: 'B1234',
    service: 'General Medical Consultation',
    provider: 'Dr. Smith',
    date: '2023-10-15',
    time: '10:00 AM',
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2940&auto=format&fit=crop'
  },
  {
    id: 'B1235',
    service: 'Tennis Court Reservation',
    provider: 'City Sports Complex',
    date: '2023-10-20',
    time: '2:00 PM',
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1622279457486-28f804956bad?q=80&w=2940&auto=format&fit=crop'
  },
  {
    id: 'B1230',
    service: 'Movie Tickets - Avengers',
    provider: 'Cineplex Downtown',
    date: '2023-09-25',
    time: '7:30 PM',
    status: 'completed',
    image: 'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?q=80&w=2942&auto=format&fit=crop'
  },
  {
    id: 'B1229',
    service: 'Dinner Reservation',
    provider: 'Le Gourmet Restaurant',
    date: '2023-09-18',
    time: '8:00 PM',
    status: 'completed',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2940&auto=format&fit=crop'
  },
  {
    id: 'B1228',
    service: 'Spa Treatment',
    provider: 'Wellness Center',
    date: '2023-09-10',
    time: '3:00 PM',
    status: 'cancelled',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2940&auto=format&fit=crop'
  }
];

const Profile = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(123) 456-7890',
    address: '123 Main St, San Francisco, CA 94103'
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [activeTab, setActiveTab] = useState('bookings');
  const [formData, setFormData] = useState({ ...personalInfo });
  const { toast } = useToast();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setPersonalInfo(formData);
    setIsEditingProfile(false);
    
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
    });
  };
  
  const handleCancelBooking = (bookingId: string) => {
    toast({
      title: "Booking Cancelled",
      description: `Booking #${bookingId} has been cancelled successfully.`,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="glass-morphism p-6 rounded-xl sticky top-24">
                <div className="text-center mb-6">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src="https://i.pravatar.cc/300" alt={personalInfo.name} />
                    <AvatarFallback>{personalInfo.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-medium">{personalInfo.name}</h2>
                  <p className="text-sm text-muted-foreground">{personalInfo.email}</p>
                </div>
                
                <nav className="space-y-1">
                  <button 
                    onClick={() => setActiveTab('bookings')}
                    className={`flex items-center w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeTab === 'bookings' 
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent'
                    }`}
                  >
                    <Calendar className="h-4 w-4 mr-3" />
                    <span>My Bookings</span>
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab('history')}
                    className={`flex items-center w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeTab === 'history' 
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent'
                    }`}
                  >
                    <History className="h-4 w-4 mr-3" />
                    <span>Booking History</span>
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab('profile')}
                    className={`flex items-center w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeTab === 'profile' 
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent'
                    }`}
                  >
                    <User className="h-4 w-4 mr-3" />
                    <span>Profile Settings</span>
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab('payment')}
                    className={`flex items-center w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeTab === 'payment' 
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent'
                    }`}
                  >
                    <CreditCard className="h-4 w-4 mr-3" />
                    <span>Payment Methods</span>
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab('notifications')}
                    className={`flex items-center w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeTab === 'notifications' 
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent'
                    }`}
                  >
                    <Bell className="h-4 w-4 mr-3" />
                    <span>Notifications</span>
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab('password')}
                    className={`flex items-center w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeTab === 'password' 
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent'
                    }`}
                  >
                    <LockKeyhole className="h-4 w-4 mr-3" />
                    <span>Change Password</span>
                  </button>
                </nav>
                
                <Separator className="my-4" />
                
                <button className="flex items-center w-full px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors">
                  <LogOut className="h-4 w-4 mr-3" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
            
            <div className="lg:col-span-3">
              {activeTab === 'bookings' && (
                <div className="animate-fade-in">
                  <h1 className="text-2xl font-bold mb-6">My Upcoming Bookings</h1>
                  
                  <div className="space-y-4">
                    {mockBookings.filter(booking => booking.status === 'upcoming').map(booking => (
                      <Card key={booking.id} className="overflow-hidden hover:bg-accent/50 transition-colors">
                        <div className="flex flex-col md:flex-row">
                          <div className="h-40 md:h-auto md:w-48 flex-shrink-0">
                            <img 
                              src={booking.image}
                              alt={booking.service}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1 p-6">
                            <div className="flex flex-wrap justify-between items-start gap-2">
                              <div>
                                <h3 className="text-lg font-medium mb-1">{booking.service}</h3>
                                <p className="text-muted-foreground">{booking.provider}</p>
                              </div>
                              <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                                #{booking.id}
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-sm">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                                <span>
                                  {new Date(booking.date).toLocaleDateString('en-US', {
                                    weekday: 'short',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </span>
                              </div>
                              <span className="text-muted-foreground">•</span>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                                <span>{booking.time}</span>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap justify-between items-center mt-4 pt-4 border-t border-border">
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Link to={`/booking/${booking.id}`}>View Details</Link>
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Link to={`/booking/${booking.id}/reschedule`}>Reschedule</Link>
                                </Button>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                onClick={() => handleCancelBooking(booking.id)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                    
                    {mockBookings.filter(booking => booking.status === 'upcoming').length === 0 && (
                      <div className="text-center py-12 glass-morphism rounded-xl">
                        <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Upcoming Bookings</h3>
                        <p className="text-muted-foreground mb-6">You don't have any upcoming bookings at the moment.</p>
                        <Link to="/">
                          <Button>
                            Browse Services
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {activeTab === 'history' && (
                <div className="animate-fade-in">
                  <h1 className="text-2xl font-bold mb-6">Booking History</h1>
                  
                  <Tabs defaultValue="all">
                    <TabsList className="mb-6">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="completed">Completed</TabsTrigger>
                      <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="all" className="space-y-4">
                      {mockBookings.filter(booking => booking.status !== 'upcoming').map(booking => (
                        <Card key={booking.id} className="overflow-hidden">
                          <div className="flex flex-col md:flex-row">
                            <div className="h-40 md:h-auto md:w-48 flex-shrink-0 relative">
                              <img 
                                src={booking.image}
                                alt={booking.service}
                                className={`h-full w-full object-cover ${booking.status === 'cancelled' ? 'opacity-50' : ''}`}
                              />
                              <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-medium ${
                                booking.status === 'completed' 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-red-100 text-red-700'
                              }`}>
                                {booking.status === 'completed' ? 'Completed' : 'Cancelled'}
                              </div>
                            </div>
                            <div className="flex-1 p-6">
                              <div className="flex flex-wrap justify-between items-start gap-2">
                                <div>
                                  <h3 className="text-lg font-medium mb-1">{booking.service}</h3>
                                  <p className="text-muted-foreground">{booking.provider}</p>
                                </div>
                                <div className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm">
                                  #{booking.id}
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-sm">
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                                  <span>
                                    {new Date(booking.date).toLocaleDateString('en-US', {
                                      weekday: 'short',
                                      month: 'short',
                                      day: 'numeric'
                                    })}
                                  </span>
                                </div>
                                <span className="text-muted-foreground">•</span>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                                  <span>{booking.time}</span>
                                </div>
                              </div>
                              
                              <div className="flex justify-end mt-4 pt-4 border-t border-border">
                                <Button variant="outline" size="sm">
                                  <Link to={`/booking/${booking.id}`}>View Details</Link>
                                </Button>
                                {booking.status === 'completed' && (
                                  <Button variant="ghost" size="sm" className="ml-2">
                                    Leave Review
                                  </Button>
                                )}
                                {booking.status === 'completed' && (
                                  <Button variant="ghost" size="sm" className="ml-2">
                                    Book Again
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="completed" className="space-y-4">
                      {mockBookings.filter(booking => booking.status === 'completed').map(booking => (
                        <Card key={booking.id} className="overflow-hidden">
                          <div className="flex flex-col md:flex-row">
                            <div className="h-40 md:h-auto md:w-48 flex-shrink-0 relative">
                              <img 
                                src={booking.image}
                                alt={booking.service}
                                className="h-full w-full object-cover"
                              />
                              <div className="absolute top-2 right-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                                Completed
                              </div>
                            </div>
                            <div className="flex-1 p-6">
                              <div className="flex flex-wrap justify-between items-start gap-2">
                                <div>
                                  <h3 className="text-lg font-medium mb-1">{booking.service}</h3>
                                  <p className="text-muted-foreground">{booking.provider}</p>
                                </div>
                                <div className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm">
                                  #{booking.id}
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-sm">
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                                  <span>
                                    {new Date(booking.date).toLocaleDateString('en-US', {
                                      weekday: 'short',
                                      month: 'short',
                                      day: 'numeric'
                                    })}
                                  </span>
                                </div>
                                <span className="text-muted-foreground">•</span>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                                  <span>{booking.time}</span>
                                </div>
                              </div>
                              
                              <div className="flex justify-end mt-4 pt-4 border-t border-border">
                                <Button variant="outline" size="sm">
                                  <Link to={`/booking/${booking.id}`}>View Details</Link>
                                </Button>
                                <Button variant="ghost" size="sm" className="ml-2">
                                  Leave Review
                                </Button>
                                <Button variant="ghost" size="sm" className="ml-2">
                                  Book Again
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="cancelled" className="space-y-4">
                      {mockBookings.filter(booking => booking.status === 'cancelled').map(booking => (
                        <Card key={booking.id} className="overflow-hidden">
                          <div className="flex flex-col md:flex-row">
                            <div className="h-40 md:h-auto md:w-48 flex-shrink-0 relative">
                              <img 
                                src={booking.image}
                                alt={booking.service}
                                className="h-full w-full object-cover opacity-50"
                              />
                              <div className="absolute top-2 right-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                                Cancelled
                              </div>
                            </div>
                            <div className="flex-1 p-6">
                              <div className="flex flex-wrap justify-between items-start gap-2">
                                <div>
                                  <h3 className="text-lg font-medium mb-1">{booking.service}</h3>
                                  <p className="text-muted-foreground">{booking.provider}</p>
                                </div>
                                <div className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm">
                                  #{booking.id}
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-sm">
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                                  <span>
                                    {new Date(booking.date).toLocaleDateString('en-US', {
                                      weekday: 'short',
                                      month: 'short',
                                      day: 'numeric'
                                    })}
                                  </span>
                                </div>
                                <span className="text-muted-foreground">•</span>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                                  <span>{booking.time}</span>
                                </div>
                              </div>
                              
                              <div className="flex justify-end mt-4 pt-4 border-t border-border">
                                <Button variant="outline" size="sm">
                                  <Link to={`/booking/${booking.id}`}>View Details</Link>
                                </Button>
                                <Button variant="ghost" size="sm" className="ml-2">
                                  Book Again
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </TabsContent>
                  </Tabs>
                </div>
              )}
              
              {activeTab === 'profile' && (
                <div className="animate-fade-in">
                  <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Profile Settings</h1>
                    {!isEditingProfile && (
                      <Button onClick={() => setIsEditingProfile(true)}>
                        <Settings className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    )}
                  </div>
                  
                  <Card className="glass-morphism">
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Update your personal details and contact information</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {isEditingProfile ? (
                        <form onSubmit={handleProfileUpdate} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Full Name</Label>
                              <Input 
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email Address</Label>
                              <Input 
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone Number</Label>
                              <Input 
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="address">Address</Label>
                              <Input 
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          
                          <div className="flex justify-end space-x-2 pt-4">
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={() => {
                                setFormData({ ...personalInfo });
                                setIsEditingProfile(false);
                              }}
                            >
                              <X className="h-4 w-4 mr-2" />
                              Cancel
                            </Button>
                            <Button type="submit">
                              <Check className="h-4 w-4 mr-2" />
                              Save Changes
                            </Button>
                          </div>
                        </form>
                      ) : (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                              <Label className="text-muted-foreground text-sm">Full Name</Label>
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-2 text-primary" />
                                <span className="font-medium">{personalInfo.name}</span>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <Label className="text-muted-foreground text-sm">Email Address</Label>
                              <div className="flex items-center">
                                <Mail className="h-4 w-4 mr-2 text-primary" />
                                <span className="font-medium">{personalInfo.email}</span>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <Label className="text-muted-foreground text-sm">Phone Number</Label>
                              <div className="flex items-center">
                                <Phone className="h-4 w-4 mr-2 text-primary" />
                                <span className="font-medium">{personalInfo.phone}</span>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <Label className="text-muted-foreground text-sm">Address</Label>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2 text-primary" />
                                <span className="font-medium">{personalInfo.address}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
              
              {(activeTab === 'payment' || activeTab === 'notifications' || activeTab === 'password') && (
                <div className="animate-fade-in">
                  <h1 className="text-2xl font-bold mb-6">
                    {activeTab === 'payment' && 'Payment Methods'}
                    {activeTab === 'notifications' && 'Notification Preferences'}
                    {activeTab === 'password' && 'Change Password'}
                  </h1>
                  
                  <Card className="glass-morphism">
                    <CardHeader>
                      <CardTitle>
                        {activeTab === 'payment' && 'Manage Payment Methods'}
                        {activeTab === 'notifications' && 'Manage Notifications'}
                        {activeTab === 'password' && 'Update Password'}
                      </CardTitle>
                      <CardDescription>
                        {activeTab === 'payment' && 'Add, edit, or remove your payment methods'}
                        {activeTab === 'notifications' && 'Customize your notification preferences'}
                        {activeTab === 'password' && 'Change your account password for better security'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-48 flex items-center justify-center">
                      <div className="text-center">
                        <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
                        <p className="text-muted-foreground">This feature is currently under development.</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
