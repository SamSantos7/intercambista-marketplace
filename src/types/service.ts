
export type ServiceStatus = 'pending' | 'active' | 'in_progress' | 'completed' | 'cancelled';

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  providerId: string;
  providerName: string;
  providerImage?: string;
  providerRating: number;
  category: string;
  subcategory?: string;
  images: string[];
  featured: boolean;
  featuredUntil?: Date;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
  status: ServiceStatus;
}

export interface ServiceRequest {
  id: string;
  serviceId: string;
  serviceName: string;
  clientId: string;
  clientName: string;
  status: ServiceStatus;
  requestDate: Date;
  scheduledDate?: Date;
  completedDate?: Date;
  price: number;
  paymentId?: string;
  notes?: string;
}

export interface ServiceReview {
  id: string;
  serviceId: string;
  clientId: string;
  clientName: string;
  clientImage?: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface PromotionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  durationDays: number;
  popular?: boolean;
}

export interface ServicePromotion {
  id: string;
  serviceId: string;
  planId: string;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'expired' | 'cancelled';
  paymentId?: string;
}
