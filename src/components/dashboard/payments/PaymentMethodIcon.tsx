
import React from 'react';
import { 
  CreditCard, 
  Landmark, 
  Smartphone, 
  Wallet, 
  DollarSign 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PaymentMethod } from '@/types/payment';

interface PaymentMethodIconProps {
  method: PaymentMethod;
  className?: string;
  showLabel?: boolean;
}

const PaymentMethodIcon: React.FC<PaymentMethodIconProps> = ({ 
  method, 
  className,
  showLabel = false 
}) => {
  const getMethodConfig = () => {
    switch (method) {
      case 'credit_card':
        return {
          icon: <CreditCard className="h-4 w-4" />,
          label: 'Cartão de Crédito',
          className: 'text-blue-500'
        };
      case 'bank_transfer':
        return {
          icon: <Landmark className="h-4 w-4" />,
          label: 'Transferência Bancária',
          className: 'text-green-500'
        };
      case 'pix':
        return {
          icon: <Smartphone className="h-4 w-4" />,
          label: 'PIX',
          className: 'text-purple-500'
        };
      case 'wallet':
        return {
          icon: <Wallet className="h-4 w-4" />,
          label: 'Carteira Digital',
          className: 'text-amber-500'
        };
      default:
        return {
          icon: <DollarSign className="h-4 w-4" />,
          label: 'Outro',
          className: 'text-gray-500'
        };
    }
  };

  const { icon, label, className: methodClassName } = getMethodConfig();

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className={cn("flex-shrink-0", methodClassName)}>{icon}</span>
      {showLabel && <span>{label}</span>}
    </div>
  );
};

export default PaymentMethodIcon;
