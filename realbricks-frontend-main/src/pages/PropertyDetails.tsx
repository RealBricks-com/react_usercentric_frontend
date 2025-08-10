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
  Ruler, BedDouble, Car, Wifi, Shield, Dumbbell, Waves, Camera
} from 'lucide-react';
import EnquiryModal from '@/components/Properties/EnquiryModal';
import ImageGalleryModal from '@/components/Properties/ImageGalleryModal';
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
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

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
          <Link to="/properties" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
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
        <Link to="/properties" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Properties
        </Link>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden group">
              <div className="relative">
                {images.length > 0 ? (
                  <>
                    <div 
                      className="relative cursor-pointer"
                      onClick={() => setIsGalleryOpen(true)}
                    >
                      <img
                        src={images[selectedImageIndex]?.fileUrl || '/placeholder.svg'}
                        alt={project.name || 'Property'}
                        className="w-full h-80 lg:h-96 object-cover transition-transform group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-black/70 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                            <Camera className="h-5 w-5" />
                            <span>View Gallery ({images.length} photos)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {images.length > 1 && (
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                          {images.slice(0, 8).map((image, index) => (
                            <button
                              key={image.mediaId}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImageIndex(index);
                              }}
                              className={`flex-shrink-0 w-14 h-14 lg:w-16 lg:h-16 rounded-lg overflow-hidden border-2 transition-all ${
                                index === selectedImageIndex 
                                  ? 'border-primary ring-2 ring-primary/50' 
                                  : 'border-white/50 hover:border-white/80'
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
                          {images.length > 8 && (
                            <button
                              onClick={() => setIsGalleryOpen(true)}
                              className="flex-shrink-0 w-14 h-14 lg:w-16 lg:h-16 bg-black/70 rounded-lg flex items-center justify-center text-white text-xs hover:bg-black/80 transition-colors"
                            >
                              +{images.length - 8}
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-80 lg:h-96 bg-muted flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <ImageIcon className="h-16 w-16 text-muted-foreground mx-auto" />
                      <p className="text-muted-foreground">No images available</p>
                    </div>
                  </div>
                )}
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
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
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto p-1">
                <TabsTrigger value="overview" className="text-xs lg:text-sm py-2">Overview</TabsTrigger>
                <TabsTrigger value="amenities" className="text-xs lg:text-sm py-2">Amenities</TabsTrigger>
                <TabsTrigger value="units" className="text-xs lg:text-sm py-2">Units</TabsTrigger>
                <TabsTrigger value="location" className="text-xs lg:text-sm py-2">Location</TabsTrigger>
                <TabsTrigger value="documents" className="text-xs lg:text-sm py-2">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                {project.projectSpecifications && project.projectSpecifications.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Specifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {project.projectSpecifications.map((spec) => (
                          <Card key={spec.specificationId} className="border-0 bg-gradient-to-br from-muted/30 to-muted/50">
                            <CardContent className="p-4 space-y-2">
                              <div className="font-semibold text-primary">{spec.title}</div>
                              <div className="text-sm text-muted-foreground leading-relaxed">
                                {spec.description}
                              </div>
                              {spec.brandName && (
                                <Badge variant="outline" className="text-xs">
                                  {spec.brandName}
                                </Badge>
                              )}
                              {spec.specCategory && (
                                <div className="text-xs text-muted-foreground">
                                  Category: {spec.specCategory}
                                </div>
                              )}
                            </CardContent>
                          </Card>
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
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        Available Amenities
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {project.projectAmenities.map((amenityItem) => (
                          <Card 
                            key={amenityItem.amenity.amenityId}
                            className="border-0 bg-gradient-to-br from-success/5 to-success/10 hover:from-success/10 hover:to-success/20 transition-all duration-300"
                          >
                            <CardContent className="p-4 flex items-center gap-3">
                              <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center">
                                <CheckCircle className="h-4 w-4 text-success" />
                              </div>
                              <div className="space-y-1">
                                <div className="font-medium text-sm">
                                  {amenityItem.amenity.name}
                                </div>
                                {amenityItem.amenity.description && (
                                  <div className="text-xs text-muted-foreground">
                                    {amenityItem.amenity.description}
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="text-center py-8">
                      <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <div className="text-muted-foreground">No amenities information available</div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="units" className="space-y-4">
                {project.projectUnits && project.projectUnits.length > 0 ? (
                  <div className="space-y-4">
                    <div className="text-center py-4">
                      <h3 className="text-lg font-semibold mb-2">Available Unit Types</h3>
                      <p className="text-muted-foreground">Choose from our variety of well-designed units</p>
                    </div>
                    <div className="grid gap-6">
                      {project.projectUnits.map((unit) => (
                        <Card key={unit.unitId} className="border-0 bg-gradient-to-br from-card to-muted/20 hover:shadow-lg transition-all duration-300">
                          <CardContent className="p-6">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                              <div className="space-y-2">
                                <h3 className="text-xl font-bold text-primary">{unit.unitType}</h3>
                                <div className="text-2xl font-bold">
                                  {formatPrice(unit.priceStarting)} - {formatPrice(unit.priceEnding)}
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2 mt-4 lg:mt-0">
                                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                                  {unit.unitsAvailable} units available
                                </Badge>
                                <Badge variant="outline">
                                  {unit.floors} floors
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                                  <Ruler className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <div className="text-sm text-muted-foreground">Carpet Area</div>
                                  <div className="font-semibold">{unit.carpetAreaSqft} sq ft</div>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                                  <Building className="h-5 w-5 text-accent" />
                                </div>
                                <div>
                                  <div className="text-sm text-muted-foreground">Floors</div>
                                  <div className="font-semibold">{unit.floors}</div>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                                <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
                                  <CheckCircle className="h-5 w-5 text-success" />
                                </div>
                                <div>
                                  <div className="text-sm text-muted-foreground">Available</div>
                                  <div className="font-semibold text-success">{unit.unitsAvailable} units</div>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                                  <Home className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <div className="text-sm text-muted-foreground">Type</div>
                                  <div className="font-semibold">{unit.unitType}</div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-4 pt-4 border-t border-border">
                              <Button 
                                onClick={handleEnquireClick}
                                className="w-full sm:w-auto"
                              >
                                Enquire for {unit.unitType}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Card>
                    <CardContent className="text-center py-12">
                      <Home className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Units Available</h3>
                      <div className="text-muted-foreground">Unit information will be updated soon</div>
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
          <div className="lg:sticky lg:top-24 space-y-6">
            {/* Quick Enquiry Card */}
            <Card className="border-0 bg-gradient-to-br from-primary/5 to-accent/5">
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

      {/* Image Gallery Modal */}
      <ImageGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={images}
        initialIndex={selectedImageIndex}
        projectName={project.name}
      />
    </div>
  );
};

export default PropertyDetails;