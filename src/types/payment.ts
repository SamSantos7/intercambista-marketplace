
export type PaymentStatus = 'pending' | 'processing' | 'held' | 'completed' | 'disputed' | 'refunded' | 'cancelled';

export type CurrencyCode = 'BRL' | 'EUR' | 'USD' | 'CAD' | 'AUD' | 'AED' | 'GBP';

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  name: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  availableFor: CurrencyCode[];
}

export interface ServicePayment {
  id: string;
  serviceId: string;
  clientId: string;
  providerId: string;
  amount: number;
  currency: CurrencyCode;
  status: PaymentStatus;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
  scheduledDate?: Date;
  completedDate?: Date;
  disputeReason?: string;
}
