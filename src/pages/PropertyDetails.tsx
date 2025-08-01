import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ArrowLeft, MapPin, Building, Phone, Mail, Home, FileText, 
  CheckCircle, ImageIcon, Video, AlertCircle, Star, Calendar,
  Ruler, BedDouble, Car, Wifi, Shield, Dumbbell, Waves
} from 'lucide-react';
import EnquiryModal from '@/components/Properties/EnquiryModal';
import { api, ApiError } from '@/lib/api';

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const projectId = id ? parseInt(id) : 0;
  
  const [enquiryModal, setEnquiryModal] = useState<{
    isOpen: boolean;
    projectId?: number;
    projectName?: string;
    developerId?: number;
  }>({
    isOpen: false,
  });

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => api.getProjectDetails(projectId),
    enabled: !!projectId,
    retry: 2,
  });

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Crore`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} Lakh`;
    }
    return `₹${price.toLocaleString()}`;
  };

  const handleEnquireClick = () => {
    setEnquiryModal({
      isOpen: true,
      projectId: project?.projectId,
      projectName: project?.name || undefined,
      developerId: project?.developer?.developerId,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-80 w-full rounded-lg" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Properties
          </Link>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error instanceof ApiError ? error.message : 'Property not found or failed to load.'}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  const images = project.projectMedia?.filter(media => 
    media.mediaType?.toLowerCase().includes('image')
  ) || [];

  const videos = project.projectMedia?.filter(media => 
    media.mediaType?.toLowerCase().includes('video')
  ) || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Properties
        </Link>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="relative">
                {images.length > 0 ? (
                  <>
                    <img
                      src={images[selectedImageIndex]?.fileUrl || '/placeholder.svg'}
                      alt={project.name || 'Property'}
                      className="w-full h-80 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                    {images.length > 1 && (
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex gap-2 overflow-x-auto">
                          {images.slice(0, 6).map((image, index) => (
                            <button
                              key={image.mediaId}
                              onClick={() => setSelectedImageIndex(index)}
                              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                                index === selectedImageIndex ? 'border-primary' : 'border-white/50'
                              }`}
                            >
                              <img
                                src={image.fileUrl || '/placeholder.svg'}
                                alt={`View ${index + 1}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = '/placeholder.svg';
                                }}
                              />
                            </button>
                          ))}
                          {images.length > 6 && (
                            <div className="flex-shrink-0 w-16 h-16 bg-black/50 rounded-lg flex items-center justify-center text-white text-xs">
                              +{images.length - 6}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-80 bg-muted flex items-center justify-center">
                    <ImageIcon className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant="secondary" className="bg-background/90 backdrop-blur">
                    {project.propertyType || 'Residential'}
                  </Badge>
                  {project.reraId && (
                    <Badge variant="outline" className="bg-background/90 backdrop-blur">
                      RERA: {project.reraId}
                    </Badge>
                  )}
                </div>
              </div>
            </Card>

            {/* Property Info */}
            <Card>
              <CardHeader>
                <div className="space-y-2">
                  <CardTitle className="text-2xl">{project.name}</CardTitle>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{project.area?.name}</span>
                    {project.area?.pinCode && <span className="ml-1">- {project.area.pinCode}</span>}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Building className="h-4 w-4 mr-1" />
                    <span>By {project.developer?.name}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary mb-4">
                  Starting from {formatPrice(project.minPrice)}
                </div>
                {project.description && (
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Detailed Information Tabs */}
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="units">Units</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                {project.projectSpecifications && project.projectSpecifications.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Specifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {project.projectSpecifications.map((spec) => (
                          <div key={spec.specificationId} className="space-y-1">
                            <div className="font-medium">{spec.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {spec.description}
                              {spec.brandName && (
                                <span className="block font-medium text-foreground">
                                  Brand: {spec.brandName}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="amenities" className="space-y-4">
                {project.projectAmenities && project.projectAmenities.length > 0 ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Available Amenities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {project.projectAmenities.map((amenityItem) => (
                          <div
                            key={amenityItem.amenity.amenityId}
                            className="flex items-center gap-2 p-3 rounded-lg bg-muted/50"
                          >
                            <CheckCircle className="h-4 w-4 text-success" />
                            <span className="text-sm font-medium">
                              {amenityItem.amenity.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="text-center py-8">
                      <div className="text-muted-foreground">No amenities information available</div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="units" className="space-y-4">
                {project.projectUnits && project.projectUnits.length > 0 ? (
                  <div className="grid gap-4">
                    {project.projectUnits.map((unit) => (
                      <Card key={unit.unitId}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold">{unit.unitType}</h3>
                            <Badge variant="outline">
                              {unit.unitsAvailable} units available
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <div className="text-muted-foreground">Carpet Area</div>
                              <div className="font-medium">{unit.carpetAreaSqft} sq ft</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Price Range</div>
                              <div className="font-medium">
                                {formatPrice(unit.priceStarting)} - {formatPrice(unit.priceEnding)}
                              </div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Floors</div>
                              <div className="font-medium">{unit.floors}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Availability</div>
                              <div className="font-medium text-success">{unit.unitsAvailable} units</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="text-center py-8">
                      <div className="text-muted-foreground">No unit information available</div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="location" className="space-y-4">
                {project.projectNearbyLocations && project.projectNearbyLocations.length > 0 ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Nearby Locations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {project.projectNearbyLocations.map((location) => (
                          <div key={location.locationId} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                            <div>
                              <div className="font-medium">{location.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {location.locationType} • {location.address}
                              </div>
                            </div>
                            <Badge variant="outline">
                              {location.distanceKm} km
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="text-center py-8">
                      <div className="text-muted-foreground">No location information available</div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="documents" className="space-y-4">
                {project.projectLegalDocuments && project.projectLegalDocuments.length > 0 ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Legal Documents</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {project.projectLegalDocuments.map((doc) => (
                          <div key={doc.documentId} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <div className="font-medium">{doc.documentType}</div>
                                {doc.verificationStatus && (
                                  <Badge 
                                    variant={doc.verificationStatus === 'Verified' ? 'default' : 'outline'}
                                    className="text-xs"
                                  >
                                    {doc.verificationStatus}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            {doc.documentUrl && (
                              <Button variant="outline" size="sm" asChild>
                                <a href={doc.documentUrl} target="_blank" rel="noopener noreferrer">
                                  View
                                </a>
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="text-center py-8">
                      <div className="text-muted-foreground">No documents available</div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Enquiry Form */}
          <div className="space-y-6">
            {/* Quick Enquiry Card */}
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Get in Touch
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {formatPrice(project.minPrice)}
                  </div>
                  <div className="text-sm text-muted-foreground">Starting Price</div>
                </div>
                
                <Button
                  onClick={handleEnquireClick}
                  className="w-full"
                  variant="premium"
                  size="lg"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Send Enquiry
                </Button>
                
                {/* Developer Contact */}
                {project.developer && (
                  <div className="pt-4 border-t">
                    <div className="text-sm font-medium mb-2">Developed by:</div>
                    <div className="text-sm">
                      <div className="font-medium">{project.developer.name}</div>
                      {project.developer.reraId && (
                        <div className="text-muted-foreground">RERA: {project.developer.reraId}</div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModal.isOpen}
        onClose={() => setEnquiryModal({ isOpen: false })}
        projectId={enquiryModal.projectId}
        projectName={enquiryModal.projectName}
        developerId={enquiryModal.developerId}
      />
    </div>
  );
};

export default PropertyDetails;