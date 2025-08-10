// API Types based on OpenAPI specification

export interface AmenityReadDto {
  amenityId: number;
  name: string | null;
  description: string | null;
}

export interface AreaReadDto {
  areaId: number;
  subDistrictId: string | null;
  name: string | null;
  pinCode: string | null;
}

export interface DeveloperCardReadDto {
  developerId: number;
  reraId: string | null;
  name: string | null;
}

export interface DeveloperCoreReadDto {
  developerId: number;
  reraId: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
}

export interface ProjectMediumDto {
  mediaId: number;
  projectId: number;
  fileUrl: string | null;
  mediaType: string | null;
}

export interface ProjectCoreCardDto {
  projectId: number;
  reraId: string | null;
  name: string | null;
  slug: string | null;
  description: string | null;
  developerCard: DeveloperCardReadDto;
  areaId: number;
  propertyType: string | null;
  minPrice: number;
  area: AreaReadDto;
  projectMedium: ProjectMediumDto[] | null;
}

export interface ProjectCoreCardDtoPageResult {
  items: ProjectCoreCardDto[] | null;
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface ProjectAmenityReadDto {
  projectId: number;
  amenity: AmenityReadDto;
}

export interface ProjectLegalDocumentReadDto {
  documentId: number;
  projectId: number;
  documentType: string | null;
  documentUrl: string | null;
  verificationStatus: string | null;
  remarks: string | null;
}

export interface ProjectSpecificationReadDto {
  specificationId: number;
  projectId: number;
  title: string | null;
  description: string | null;
  brandName: string | null;
  specCategory: string | null;
}

export interface ProjectUnitReadDto {
  unitId: number;
  projectId: number;
  unitType: string | null;
  carpetAreaSqft: number;
  priceStarting: number;
  priceEnding: number;
  unitsAvailable: number;
  floors: number;
}

export interface ProjectNearbyLocationReadDto {
  locationId: number;
  projectId: number;
  locationType: string | null;
  name: string | null;
  distanceKm: number;
  address: string | null;
  latitude: number;
  longitude: number;
}

export interface ProjectFullDto {
  projectId: number;
  reraId: string | null;
  name: string | null;
  slug: string | null;
  description: string | null;
  propertyType: string | null;
  minPrice: number;
  area: AreaReadDto;
  developer: DeveloperCardReadDto;
  projectMedia: ProjectMediumDto[] | null;
  projectAmenities: ProjectAmenityReadDto[] | null;
  projectLegalDocuments: ProjectLegalDocumentReadDto[] | null;
  projectSpecifications: ProjectSpecificationReadDto[] | null;
  projectUnits: ProjectUnitReadDto[] | null;
  projectNearbyLocations: ProjectNearbyLocationReadDto[] | null;
}

export interface LeadResponseDto {
  message: string | null;
  leadId: number;
  status: boolean;
}

export interface ProjectFilters {
  areaId?: number;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: string;
  page?: number;
  pageSize?: number;
}

export interface LeadCreateDto {
  projectId?: number;
  developerId?: number;
  userId?: number;
  name?: string;
  email?: string;
  phone?: string;
  budgetMin?: number;
  budgetMax?: number;
}