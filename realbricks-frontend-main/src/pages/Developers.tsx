import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Building, Phone, Mail, MapPin, AlertCircle, Users } from 'lucide-react';
import { api, ApiError } from '@/lib/api';

const Developers = () => {
  const { data: developers, isLoading, error } = useQuery({
    queryKey: ['developers'],
    queryFn: () => api.getDevelopers(),
    retry: 2,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
              Trusted Developers
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover properties from verified and trusted real estate developers with proven track records
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Users className="h-5 w-5" />
            {isLoading ? 'Loading...' : `${developers?.length || 0} Developers`}
          </h2>
        </div>

        {/* Error State */}
        {error && (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error instanceof ApiError 
                ? error.message 
                : 'Failed to load developers. Please try again.'}
            </AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-8 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No Results */}
        {!isLoading && !error && (!developers || developers.length === 0) && (
          <div className="text-center py-12">
            <Building className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Developers Found</h3>
            <p className="text-muted-foreground">
              No developer information is available at the moment.
            </p>
          </div>
        )}

        {/* Developers Grid */}
        {!isLoading && !error && developers && developers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {developers.map((developer) => (
              <Card key={developer.developerId} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-card via-card to-muted/20 overflow-hidden relative">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-700" />
                
                <CardHeader className="relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="space-y-2">
                        <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                          {developer.name || 'Unnamed Developer'}
                        </CardTitle>
                        <div className="flex flex-wrap gap-2">
                          {developer.reraId && (
                            <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/20">
                              RERA: {developer.reraId}
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                            Verified
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-r from-primary via-primary to-accent rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Building className="h-7 w-7 text-white" />
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6 relative z-10">
                  {/* Contact Information */}
                  <div className="space-y-3">
                    {developer.email && (
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Mail className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-muted-foreground mb-1">Email</div>
                          <div className="text-sm font-medium truncate">{developer.email}</div>
                        </div>
                      </div>
                    )}
                    
                    {developer.phone && (
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                          <Phone className="h-4 w-4 text-accent" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-muted-foreground mb-1">Phone</div>
                          <div className="text-sm font-medium">{developer.phone}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      className="group/btn border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300"
                      size="sm"
                    >
                      <Building className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                      <span className="text-xs lg:text-sm">Projects</span>
                    </Button>
                    
                    <Button 
                      variant="premium" 
                      className="group/btn shadow-lg hover:shadow-xl transition-all duration-300"
                      size="sm"
                    >
                      <Phone className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                      <span className="text-xs lg:text-sm">Contact</span>
                    </Button>
                  </div>

                  {/* Developer Stats */}
                  <div className="pt-4 border-t border-border/50">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="space-y-1">
                        <div className="text-lg font-bold text-primary">5+</div>
                        <div className="text-xs text-muted-foreground">Projects</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-lg font-bold text-success">4.8</div>
                        <div className="text-xs text-muted-foreground">Rating</div>
                      </div>
                    </div>
                  </div>

                  {/* Trust Indicators */}
                  <div className="flex items-center justify-center gap-4 pt-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>RERA Registered</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Verified</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-0">
            <CardContent className="py-8">
              <h3 className="text-xl font-semibold mb-2">
                Looking for a Specific Developer?
              </h3>
              <p className="text-muted-foreground mb-4">
                Can't find the developer you're looking for? Get in touch with us and we'll help you connect.
              </p>
              <Button variant="premium">
                <Phone className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Developers;