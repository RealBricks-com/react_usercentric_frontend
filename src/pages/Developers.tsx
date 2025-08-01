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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {developers.map((developer) => (
              <Card key={developer.developerId} className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-muted/20">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {developer.name || 'Unnamed Developer'}
                      </CardTitle>
                      {developer.reraId && (
                        <Badge variant="outline" className="text-xs">
                          RERA: {developer.reraId}
                        </Badge>
                      )}
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                      <Building className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Contact Information */}
                  <div className="space-y-2">
                    {developer.email && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span className="truncate">{developer.email}</span>
                      </div>
                    )}
                    
                    {developer.phone && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{developer.phone}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" className="flex-1" size="sm">
                      <Building className="h-4 w-4 mr-1" />
                      View Projects
                    </Button>
                    
                    <Button variant="premium" className="flex-1" size="sm">
                      <Phone className="h-4 w-4 mr-1" />
                      Contact
                    </Button>
                  </div>

                  {/* Developer Stats or Additional Info */}
                  <div className="pt-2 border-t border-border/50">
                    <div className="text-xs text-muted-foreground text-center">
                      Verified Developer • RERA Registered
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