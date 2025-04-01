
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded' | 'cancelled' | 'disputed' | 'held';

export type PaymentMethod = 'credit_card' | 'debit_card' | 'pix' | 'bank_transfer' | 'wallet' | 'paypal';

export type Currency = 'BRL' | 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
export type CurrencyCode = Currency;
export type PaymentMethodType = PaymentMethod;

export interface ServicePayment {
  id: string;
  serviceId: string;
  clientId: string;
  providerId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
  scheduledDate?: Date;
  completedDate?: Date;
  refundedDate?: Date;
  disputeDate?: Date;
  disputeReason?: string;
  refundReason?: string;
  cancelReason?: string;
}
