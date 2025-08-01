import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building, Users, Award, Shield, Phone, Mail, 
  MapPin, Clock, Star, CheckCircle, Target, Heart
} from 'lucide-react';
import heroImage from '@/assets/hero-real-estate.jpg';

const About = () => {
  const stats = [
    { icon: Building, label: 'Properties Listed', value: '2,500+' },
    { icon: Users, label: 'Happy Customers', value: '15,000+' },
    { icon: Award, label: 'Years Experience', value: '10+' },
    { icon: Shield, label: 'Verified Developers', value: '200+' },
  ];

  const features = [
    {
      icon: CheckCircle,
      title: 'Verified Properties',
      description: 'All properties are thoroughly verified and RERA approved for your safety.'
    },
    {
      icon: Target,
      title: 'Expert Guidance',
      description: 'Our team of experts provides personalized assistance throughout your journey.'
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'We prioritize customer satisfaction and transparent communication.'
    },
    {
      icon: Shield,
      title: 'Secure Transactions',
      description: 'Safe and secure property transactions with legal documentation support.'
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="h-96 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/80" />
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="text-center text-white space-y-4 max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold">
                Your Trusted Real Estate Partner
              </h1>
              <p className="text-xl opacity-90">
                Connecting dreams with reality through premium properties and exceptional service
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="text-center border-0 bg-gradient-to-br from-card to-muted/20">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <div>
              <Badge className="mb-4">Our Story</Badge>
              <h2 className="text-3xl font-bold mb-4">
                Building Dreams Since 2014
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                RealBricks was founded with a simple vision: to make real estate transactions 
                transparent, efficient, and customer-centric. Over the years, we've grown to 
                become one of the most trusted names in the industry.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To revolutionize the real estate industry by providing a platform that connects 
                genuine buyers with verified properties and trusted developers, ensuring transparency 
                and trust in every transaction.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the leading real estate platform that transforms how people discover, 
                evaluate, and purchase properties by leveraging technology and human expertise.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Why Choose RealBricks?</h3>
            <div className="space-y-4">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="flex gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-0">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <h3 className="text-2xl font-bold">Ready to Find Your Dream Property?</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our team of experts is here to help you every step of the way. From property 
                selection to final documentation, we ensure a smooth and hassle-free experience.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="premium" size="lg">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Us Now
                </Button>
                <Button variant="outline" size="lg">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-border/50">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>contact@realbricks.com</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Mon-Sat 9AM-8PM</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Office Locations */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">Our Offices</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                city: 'Mumbai',
                address: '123 Business District, Bandra Kurla Complex, Mumbai - 400051',
                phone: '+91 98765 43210'
              },
              {
                city: 'Delhi',
                address: '456 Corporate Tower, Connaught Place, New Delhi - 110001',
                phone: '+91 98765 43211'
              },
              {
                city: 'Bangalore',
                address: '789 Tech Park, Electronic City, Bangalore - 560100',
                phone: '+91 98765 43212'
              }
            ].map((office) => (
              <Card key={office.city} className="border-0 bg-gradient-to-br from-card to-muted/20">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    {office.city}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {office.address}
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{office.phone}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;