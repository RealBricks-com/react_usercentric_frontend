import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Home, Building, Users, Star, MapPin, Phone, Mail,
  ChevronRight, Search, Shield, Award, Clock, TrendingUp
} from 'lucide-react';
import heroImage from '@/assets/hero-real-estate.jpg';

const Index = () => {
  const features = [
    {
      icon: Search,
      title: 'Smart Property Search',
      description: 'Find your perfect property with advanced filters and intelligent recommendations.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: 'Verified Developers',
      description: 'All developers are RERA verified and have proven track records.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Award,
      title: 'Premium Properties',
      description: 'Curated selection of high-quality residential and commercial properties.',
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: Clock,
      title: 'Real-time Updates',
      description: 'Get instant updates on property availability and price changes.',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { label: 'Properties Listed', value: '1000+', icon: Home },
    { label: 'Verified Developers', value: '50+', icon: Building },
    { label: 'Happy Customers', value: '5000+', icon: Users },
    { label: 'Cities Covered', value: '10+', icon: MapPin }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10">
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
        <div className="relative z-20 container mx-auto px-4 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  #1 Real Estate Platform
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Find Your{' '}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Dream Home
                  </span>{' '}
                  Today
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Discover premium properties from verified developers. Browse, filter, and find your perfect home with our intelligent platform.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg px-8 py-6">
                  <Link to="/properties">
                    <Search className="h-5 w-5 mr-2" />
                    Browse Properties
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  <Phone className="h-5 w-5 mr-2" />
                  Contact Us
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-6 pt-8">
                {stats.slice(0, 2).map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center gap-2 text-primary">
                        <Icon className="h-5 w-5" />
                        <span className="text-2xl font-bold">{stat.value}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
              <Card className="relative bg-gradient-to-br from-card to-muted/20 border-0 shadow-2xl">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="text-center space-y-2">
                      <h3 className="text-xl font-semibold">Quick Property Search</h3>
                      <p className="text-muted-foreground">Start your search now</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <input
                          type="text"
                          placeholder="Enter location, project name..."
                          className="w-full pl-12 pr-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <select className="p-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary">
                          <option>Property Type</option>
                          <option>Apartment</option>
                          <option>Villa</option>
                          <option>Plot</option>
                        </select>
                        <select className="p-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary">
                          <option>Budget Range</option>
                          <option>₹25L - ₹50L</option>
                          <option>₹50L - ₹1Cr</option>
                          <option>₹1Cr+</option>
                        </select>
                      </div>
                      
                      <Button className="w-full py-3" asChild>
                        <Link to="/properties">
                          Search Properties
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Why Choose RealBricks?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide a seamless experience for finding and purchasing your dream property
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-muted/20">
                  <CardContent className="p-6 space-y-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center space-y-3">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-3xl font-bold text-primary">{stat.value}</div>
                    <div className="text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Ready to Find Your Dream Property?
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Join thousands of satisfied customers who found their perfect home through our platform. 
              Start your journey today with verified developers and premium properties.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
                <Link to="/properties">
                  <Home className="h-5 w-5 mr-2" />
                  Browse Properties
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
                <Link to="/developers">
                  <Building className="h-5 w-5 mr-2" />
                  View Developers
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                  <Building className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">RealBricks</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Your trusted partner in finding the perfect property. We connect you with verified developers and premium real estate opportunities.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <Link to="/properties" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Browse Properties
                </Link>
                <Link to="/developers" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Developers
                </Link>
                <Link to="/about" className="block text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Property Types</h4>
              <div className="space-y-2 text-sm">
                <div className="text-muted-foreground">Apartments</div>
                <div className="text-muted-foreground">Villas</div>
                <div className="text-muted-foreground">Plots</div>
                <div className="text-muted-foreground">Commercial</div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Contact</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>info@realbricks.com</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Mumbai, India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2024 RealBricks. All rights reserved. | Made with ❤️ for property seekers</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;