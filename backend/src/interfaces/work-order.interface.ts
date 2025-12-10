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

export interface WorkOrderResponse {
  id: number;
  dateCreated: string;
  lastUpdated: string;
  customer: {
    id: number;
    fullName: string;
    primaryPhone: string;
    email: string;
  };
  details: WorkOrderDetail[];
  totalAmount: number;
}