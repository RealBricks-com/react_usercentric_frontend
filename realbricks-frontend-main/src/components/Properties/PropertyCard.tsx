import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Home, Building, Phone } from 'lucide-react';
import { ProjectCoreCardDto } from '@/types/api';

interface PropertyCardProps {
  project: ProjectCoreCardDto;
  onEnquireClick?: (projectId: number) => void;
}

const PropertyCard = ({ project, onEnquireClick }: PropertyCardProps) => {
  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)}Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)}L`;
    }
    return `₹${price.toLocaleString()}`;
  };

  const mainImage = project.projectMedium?.find(media => 
    media.mediaType?.toLowerCase() === 'image'
  )?.fileUrl || '/placeholder.svg';

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-muted/20">
      <div className="relative overflow-hidden">
        <img
          src={mainImage}
          alt={project.name || 'Property'}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-background/90 backdrop-blur">
            {project.propertyType || 'Residential'}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="outline" className="bg-background/90 backdrop-blur border-primary text-primary">
            Starting {formatPrice(project.minPrice)}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Title and Location */}
          <div>
            <Link 
              to={`/properties/${project.projectId}`}
              className="block hover:text-primary transition-colors"
            >
              <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                {project.name || 'Unnamed Project'}
              </h3>
            </Link>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{project.area?.name || 'Location not specified'}</span>
            </div>
          </div>

          {/* Developer */}
          <div className="flex items-center space-x-2">
            <Building className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">
              {project.developerCard?.name || 'Unknown Developer'}
            </span>
          </div>

          {/* Description */}
          {project.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {project.description}
            </p>
          )}

          {/* RERA ID */}
          {project.reraId && (
            <div className="text-xs text-muted-foreground">
              RERA: {project.reraId}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-2">
            <Link to={`/properties/${project.projectId}`} className="flex-1">
              <Button variant="outline" className="w-full" size="sm">
                <Home className="h-4 w-4 mr-1" />
                View Details
              </Button>
            </Link>
            <Button 
              variant="premium" 
              size="sm"
              onClick={() => onEnquireClick?.(project.projectId)}
              className="flex-1"
            >
              <Phone className="h-4 w-4 mr-1" />
              Enquire
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;