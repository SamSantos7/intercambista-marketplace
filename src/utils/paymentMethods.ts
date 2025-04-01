
import { PaymentMethod } from "@/types/payment";

export const paymentMethods: Record<PaymentMethod, { name: string; fee: number; icon: string }> = {
  credit_card: {
    name: "Cartão de Crédito",
    fee: 0.05,
    icon: "credit-card"
  },
  debit_card: {
    name: "Cartão de Débito",
    fee: 0.02,
    icon: "credit-card"
  },
  pix: {
    name: "PIX",
    fee: 0.01,
    icon: "zap"
  },
  bank_transfer: {
    name: "Transferência Bancária",
    fee: 0,
    icon: "landmark"
  },
  wallet: {
    name: "Carteira Digital",
    fee: 0.025,
    icon: "wallet"
  },
  paypal: {
    name: "PayPal",
    fee: 0.045,
    icon: "paypal"
  }
};

export const getPaymentMethodData = (method: string) => {
  return paymentMethods[method as PaymentMethod] || {
    name: "Outro",
    fee: 0,
    icon: "help-circle"
  };
};

export const calculateFee = (amount: number, method: string): number => {
  const paymentMethod = getPaymentMethodData(method);
  return amount * paymentMethod.fee;
};
