
export type NegotiationStatus = 'pending' | 'accepted' | 'rejected' | 'countered' | 'canceled' | 'completed';

export interface Negotiation {
  id: string;
  serviceId: string;
  serviceName: string;
  originalPrice: number;
  offeredPrice: number;
  currency: string;
  clientId: string;
  clientName?: string;
  clientImage?: string;
  providerId: string;
  providerName?: string;
  providerImage?: string;
  status: NegotiationStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface NegotiationMessage {
  id: string;
  negotiationId: string;
  senderId: string;
  senderName?: string;
  senderImage?: string;
  content: string;
  createdAt: Date;
  isRead: boolean;
}

export interface NegotiationOffer {
  negotiationId: string;
  offeredPrice: number;
  status: 'pending' | 'accepted' | 'rejected';
  offerDate: Date;
  offerBy: 'client' | 'provider';
  message?: string;
}
