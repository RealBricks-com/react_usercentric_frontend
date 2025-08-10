import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Filter, X, Search } from 'lucide-react';
import { ProjectFilters, AreaReadDto } from '@/types/api';
import { api } from '@/lib/api';

interface PropertyFiltersProps {
  filters: ProjectFilters;
  onFiltersChange: (filters: ProjectFilters) => void;
  onClearFilters: () => void;
}

const PropertyFilters = ({ filters, onFiltersChange, onClearFilters }: PropertyFiltersProps) => {
  const [areas, setAreas] = useState<AreaReadDto[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 50000000]);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const areasData = await api.getAreas();
        setAreas(areasData);
      } catch (error) {
        console.error('Failed to fetch areas:', error);
      }
    };

    fetchAreas();
  }, []);

  useEffect(() => {
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      setPriceRange([
        filters.minPrice || 0,
        filters.maxPrice || 50000000
      ]);
    }
  }, [filters.minPrice, filters.maxPrice]);

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
    onFiltersChange({
      ...filters,
      minPrice: value[0] || undefined,
      maxPrice: value[1] || undefined,
    });
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)}Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)}L`;
    }
    return `₹${price.toLocaleString()}`;
  };

  const propertyTypes = [
    'Apartment',
    'Villa',
    'Plot',
    'Commercial',
    'Office',
    'Shop',
    'Warehouse'
  ];

  const statusOptions = [
    'Under Construction',
    'Ready to Move',
    'New Launch',
    'Completed'
  ];

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => 
    value !== undefined && key !== 'page' && key !== 'pageSize'
  ).length;

  return (
    <Card className="sticky top-20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="outline">{activeFiltersCount}</Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={onClearFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="md:hidden"
            >
              {isExpanded ? 'Collapse' : 'Expand'}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className={`space-y-6 ${!isExpanded ? 'hidden md:block' : ''}`}>
        {/* Area Filter */}
        <div className="space-y-2">
          <Label>Location</Label>
          <Select
            value={filters.areaId?.toString() || ''}
            onValueChange={(value) =>
              onFiltersChange({
                ...filters,
                areaId: value ? parseInt(value) : undefined,
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select area" />
            </SelectTrigger>
            <SelectContent>
              {areas.map((area) => (
                <SelectItem key={area.areaId} value={area.areaId.toString()}>
                  {area.name} {area.pinCode && `(${area.pinCode})`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Property Type Filter */}
        <div className="space-y-2">
          <Label>Property Type</Label>
          <Select
            value={filters.propertyType || ''}
            onValueChange={(value) =>
              onFiltersChange({
                ...filters,
                propertyType: value || undefined,
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {propertyTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="space-y-4">
          <Label>Price Range</Label>
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={handlePriceRangeChange}
              max={50000000}
              min={0}
              step={100000}
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs">Min Price</Label>
              <Input
                type="number"
                placeholder="Min"
                value={priceRange[0] || ''}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 0;
                  handlePriceRangeChange([value, priceRange[1]]);
                }}
                className="text-xs"
              />
            </div>
            <div>
              <Label className="text-xs">Max Price</Label>
              <Input
                type="number"
                placeholder="Max"
                value={priceRange[1] || ''}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 50000000;
                  handlePriceRangeChange([priceRange[0], value]);
                }}
                className="text-xs"
              />
            </div>
          </div>
        </div>

        {/* Status Filter */}
        <div className="space-y-2">
          <Label>Status</Label>
          <Select
            value={filters.status || ''}
            onValueChange={(value) =>
              onFiltersChange({
                ...filters,
                status: value || undefined,
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Apply Button for Mobile */}
        <div className="md:hidden pt-4">
          <Button className="w-full" onClick={() => setIsExpanded(false)}>
            <Search className="h-4 w-4 mr-2" />
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyFilters;