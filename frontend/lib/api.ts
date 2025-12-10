import axios, { AxiosResponse } from 'axios';

// Types based on backend interfaces
export interface Customer {
  id: number;
  fullName: string;
  primaryPhone: string;
  email: string;
}

export interface LineItem {
  id: number;
  description: string;
  sku: string;
  itemType: 'service' | 'product';
  currentPrice: number;
}

export interface WorkOrderDetail {
  id: number;
  quantity: number;
  cachedPrice: number;
  lineItem: LineItem;
}

export interface WorkOrder {
  id: number;
  dateCreated: string;
  lastUpdated: string;
  customer: Customer;
  details: WorkOrderDetail[];
  totalAmount: number;
}

// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // Handle CORS if needed
  withCredentials: false,
});

// Error types
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Retry logic with exponential backoff
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function retryRequest<T>(
  requestFn: () => Promise<AxiosResponse<T>>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<AxiosResponse<T>> {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === maxRetries) {
        break;
      }

      // Calculate delay with exponential backoff
      const delayMs = baseDelay * Math.pow(2, attempt);
      await delay(delayMs);
    }
  }

  throw lastError!;
}

// API service functions
export const workOrderApi = {
  /**
   * Fetch all work orders from the backend
   * @returns Promise<WorkOrder[]>
   */
  async getAllWorkOrders(): Promise<WorkOrder[]> {
    try {
      const response = await retryRequest(() => 
        apiClient.get<WorkOrder[]>('/work-orders')
      );

      // Validate response data structure
      if (!Array.isArray(response.data)) {
        throw new ApiError('Invalid response format: expected array', response.status, response.data);
      }

      // Basic validation of work order structure
      response.data.forEach((workOrder, index) => {
        if (!workOrder.id || !workOrder.customer || !Array.isArray(workOrder.details)) {
          throw new ApiError(
            `Invalid work order structure at index ${index}`,
            response.status,
            workOrder
          );
        }
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message || error.message;
        
        throw new ApiError(
          `Failed to fetch work orders: ${message}`,
          status,
          error.response?.data
        );
      }
      
      throw error;
    }
  },
};