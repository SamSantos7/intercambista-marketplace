
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CheckCircle, Clock, AlertCircle, RefreshCcw } from 'lucide-react';
import { PaymentStatus } from '@/types/payment';

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
  className?: string;
}

const PaymentStatusBadge: React.FC<PaymentStatusBadgeProps> = ({ status, className }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'completed':
        return {
          label: 'Concluído',
          className: 'bg-green-100 text-green-800',
          icon: <CheckCircle className="h-3.5 w-3.5" />
        };
      case 'held':
      case 'pending':
        return {
          label: 'Pendente',
          className: 'bg-yellow-100 text-yellow-800',
          icon: <Clock className="h-3.5 w-3.5" />
        };
      case 'refunded':
        return {
          label: 'Reembolsado',
          className: 'bg-purple-100 text-purple-800',
          icon: <RefreshCcw className="h-3.5 w-3.5" />
        };
      case 'cancelled':
        return {
          label: 'Cancelado',
          className: 'bg-red-100 text-red-800',
          icon: <AlertCircle className="h-3.5 w-3.5" />
        };
      case 'failed':
        return {
          label: 'Falha',
          className: 'bg-red-100 text-red-800',
          icon: <AlertCircle className="h-3.5 w-3.5" />
        };
      default:
        return {
          label: status,
          className: 'bg-gray-100 text-gray-800',
          icon: <Clock className="h-3.5 w-3.5" />
        };
    }
  };

  const { label, className: statusClassName, icon } = getStatusConfig();

  return (
    <Badge variant="outline" className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium gap-1",
      statusClassName,
      className
    )}>
      {icon}
      {label}
    </Badge>
  );
};

export default PaymentStatusBadge;
