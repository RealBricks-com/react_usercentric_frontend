import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ChevronLeft, ChevronRight, Grid, List, AlertCircle, Home } from 'lucide-react';
import PropertyCard from '@/components/Properties/PropertyCard';
import PropertyFilters from '@/components/Properties/PropertyFilters';
import EnquiryModal from '@/components/Properties/EnquiryModal';
import { api, ApiError } from '@/lib/api';
import { ProjectFilters } from '@/types/api';

const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [enquiryModal, setEnquiryModal] = useState<{
    isOpen: boolean;
    projectId?: number;
    projectName?: string;
    developerId?: number;
  }>({
    isOpen: false,
  });

  // Parse filters from URL
  const filters: ProjectFilters = {
    areaId: searchParams.get('areaId') ? parseInt(searchParams.get('areaId')!) : undefined,
    propertyType: searchParams.get('propertyType') || undefined,
    minPrice: searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined,
    maxPrice: searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined,
    status: searchParams.get('status') || undefined,
    page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
    pageSize: 12,
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['projects', filters],
    queryFn: () => api.getProjectCards(filters),
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleFiltersChange = (newFilters: ProjectFilters) => {
    const params = new URLSearchParams();
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && key !== 'pageSize') {
        params.set(key, value.toString());
      }
    });

    // Reset to first page when filters change
    if (newFilters !== filters) {
      params.set('page', '1');
    }

    setSearchParams(params);
  };

  const handleClearFilters = () => {
    setSearchParams(new URLSearchParams({ page: '1' }));
  };

  const handlePageChange = (page: number) => {
    handleFiltersChange({ ...filters, page });
  };

  const handleEnquireClick = (projectId: number) => {
    const project = data?.items?.find(p => p.projectId === projectId);
    setEnquiryModal({
      isOpen: true,
      projectId,
      projectName: project?.name || undefined,
      developerId: project?.developerCard?.developerId,
    });
  };

  const renderPagination = () => {
    if (!data || data.totalPages <= 1) return null;

    const currentPage = filters.page || 1;
    const totalPages = data.totalPages;
    
    return (
      <div className="flex items-center justify-center gap-2 mt-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage <= 1}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage > totalPages - 3) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <Button
                key={pageNum}
                variant={pageNum === currentPage ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(pageNum)}
                className="w-8 h-8 p-0"
              >
                {pageNum}
              </Button>
            );
          })}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage >= totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
              Find Your Dream Property
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover premium real estate properties from trusted developers across prime locations
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <PropertyFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold">
                  {isLoading ? 'Loading...' : `${data?.totalItems || 0} Properties Found`}
                </h2>
                {data?.totalItems && (
                  <Badge variant="outline" className="hidden sm:inline-flex">
                    Page {filters.page || 1} of {data.totalPages}
                  </Badge>
                )}
              </div>
            </div>

            {/* Error State */}
            {error && (
              <Alert className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="flex items-center justify-between">
                  <span>
                    {error instanceof ApiError 
                      ? error.message 
                      : 'Failed to load properties. Please check your connection.'}
                  </span>
                  <Button variant="outline" size="sm" onClick={() => refetch()}>
                    Retry
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-4 space-y-3">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                      <Skeleton className="h-3 w-full" />
                      <div className="flex space-x-2">
                        <Skeleton className="h-8 flex-1" />
                        <Skeleton className="h-8 flex-1" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* No Results */}
            {!isLoading && !error && (!data?.items || data.items.length === 0) && (
              <div className="text-center py-12">
                <Home className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Properties Found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search criteria
                </p>
                <Button variant="outline" onClick={handleClearFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}

            {/* Properties Grid */}
            {!isLoading && !error && data?.items && data.items.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {data.items.map((project) => (
                    <PropertyCard
                      key={project.projectId}
                      project={project}
                      onEnquireClick={handleEnquireClick}
                    />
                  ))}
                </div>

                {renderPagination()}
              </>
            )}
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

export default Properties;