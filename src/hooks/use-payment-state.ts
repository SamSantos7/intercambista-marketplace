
import { useState } from 'react';
import { PaymentStatus } from '@/types/payment';

interface UsePaymentStateParams {
  initialStatus?: PaymentStatus;
  onStatusChange?: (status: PaymentStatus, reason?: string) => void;
}

export const usePaymentState = ({ initialStatus = 'pending', onStatusChange }: UsePaymentStateParams = {}) => {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(initialStatus);
  const [disputeReason, setDisputeReason] = useState<string | undefined>(undefined);

  const updatePaymentStatus = (newStatus: PaymentStatus, reason?: string) => {
    setPaymentStatus(newStatus);
    
    if (newStatus === 'disputed' && reason) {
      setDisputeReason(reason);
    }
    
    if (onStatusChange) {
      onStatusChange(newStatus, reason);
    }
  };

  return {
    paymentStatus,
    disputeReason,
    updatePaymentStatus,
  };
};
