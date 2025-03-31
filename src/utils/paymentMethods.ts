
import { PaymentMethodType, CurrencyCode } from "@/types/payment";
import { CreditCard, Receipt, QrCode, Banknote } from "lucide-react";

export const paymentMethods: PaymentMethodType[] = [
  {
    id: 'credit-card',
    name: 'Cartão de Crédito',
    icon: 'CreditCard',
    availableFor: ['BRL', 'EUR', 'USD', 'CAD', 'AUD', 'AED', 'GBP']
  },
  {
    id: 'boleto',
    name: 'Boleto Bancário',
    icon: 'Receipt',
    availableFor: ['BRL']
  },
  {
    id: 'pix',
    name: 'Pix',
    icon: 'QrCode',
    availableFor: ['BRL']
  },
  {
    id: 'wire-transfer',
    name: 'Transferência Bancária',
    icon: 'Banknote',
    availableFor: ['BRL', 'EUR', 'USD', 'CAD', 'AUD', 'AED', 'GBP']
  }
];

export const getPaymentMethodIcon = (methodId: string) => {
  switch (methodId) {
    case 'credit-card': return CreditCard;
    case 'boleto': return Receipt;
    case 'pix': return QrCode;
    case 'wire-transfer': return Banknote;
    default: return CreditCard;
  }
};

export const getAvailablePaymentMethods = (currencyCode: CurrencyCode): PaymentMethodType[] => {
  return paymentMethods.filter(method => 
    method.availableFor.includes(currencyCode)
  );
};
