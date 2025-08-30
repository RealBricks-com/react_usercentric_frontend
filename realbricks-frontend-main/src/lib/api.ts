import { 
  ProjectCoreCardDtoPageResult, 
  ProjectFullDto, 
  AreaReadDto, 
  DeveloperCoreReadDto, 
  AmenityReadDto,
  ProjectFilters,
  LeadCreateDto,
  LeadResponseDto
} from '@/types/api';

// You should replace this with your actual API base URL
// For development, you can set VITE_API_BASE_URL in your .env file
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ' http://localhost:5099';

class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new ApiError(`HTTP error! status: ${response.status}`, response.status);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Network error occurred', 0);
  }
}

export const api = {
  // Projects
  async getProjectCards(filters: ProjectFilters = {}): Promise<ProjectCoreCardDtoPageResult> {
    const searchParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    const query = searchParams.toString();
    return fetchApi<ProjectCoreCardDtoPageResult>(
      `/api/ProjectCore/cards${query ? `?${query}` : ''}`
    );
  },

  async getProjectDetails(projectId: number): Promise<ProjectFullDto> {
    return fetchApi<ProjectFullDto>(`/api/ProjectCore/full/${projectId}`);
  },

  // Areas
  async getAreas(): Promise<AreaReadDto[]> {
    return fetchApi<AreaReadDto[]>('/api/Area');
  },

  // Developers
  async getDevelopers(): Promise<DeveloperCoreReadDto[]> {
    return fetchApi<DeveloperCoreReadDto[]>('/api/DeveloperCore');
  },

  async getDeveloperById(id: number): Promise<DeveloperCoreReadDto> {
    return fetchApi<DeveloperCoreReadDto>(`/id/${id}`);
  },

  // Amenities
  async getAmenities(): Promise<AmenityReadDto[]> {
    return fetchApi<AmenityReadDto[]>('/api/amenities');
  },

  // Lead/Enquiry
  async sendEnquiry(data: LeadCreateDto): Promise<LeadResponseDto> {
    const searchParams = new URLSearchParams();
    
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    return fetchApi<LeadResponseDto>(`/api/Lead/sendenquiry?${searchParams.toString()}`, {
      method: 'POST',
    });
  },
};

// Error handling utility
export { ApiError };