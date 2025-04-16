export interface Ads {
    id: number;
    title: string;
    name: string;
    description: string;
    image: string;
    startDate: string; // or Date if you'll handle date objects
    endDate: string;   // or Date if you'll handle date objects
    // You might want to add these optional fields based on your API
    status?: 'active' | 'inactive' | 'pending';
    userId?: number;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface CreateAdsData {
    name: string;
    description: string;
    image: string;
    startDate: string;
    endDate: string;
    // Include any other required fields for creation
  }
  
  export interface UpdateAdsData {
    name?: string;
    description?: string;
    image?: string;
    startDate?: string;
    endDate?: string;
    status?: 'active' | 'inactive' | 'pending';
  }