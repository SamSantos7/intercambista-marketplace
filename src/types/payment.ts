
export type PaymentStatus = 
  | 'pending'
  | 'completed'
  | 'cancelled'
  | 'refunded'
  | 'failed'
  | 'held';

export type PaymentMethod = 
  | 'credit_card'
  | 'bank_transfer'
  | 'pix'
  | 'wallet';

export type CurrencyCode = 'BRL' | 'EUR' | 'USD' | 'CAD' | 'AUD' | 'AED' | 'GBP';

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  name: string;
}

export interface ServicePayment {
  id: string;
  serviceId: string;
  clientId: string;
  providerId: string;
  amount: number;
  currency?: CurrencyCode;
  status: PaymentStatus;
  paymentMethod: PaymentMethod;
  createdAt: Date;
  updatedAt: Date;
  scheduledDate?: Date;
}

export interface PaymentRequest {
  serviceId: string;
  clientId: string;
  providerId: string;
  amount: number;
  currency: CurrencyCode;
  paymentMethod: PaymentMethod;
  scheduledDate?: Date;
}
