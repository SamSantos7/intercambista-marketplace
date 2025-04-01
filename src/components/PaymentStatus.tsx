
import React from 'react';
import { CheckCircle2, XCircle, Clock, AlertCircle, RotateCw, MoveLeft, ArrowLeftRight, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PaymentStatus as PaymentStatusType } from '@/types/payment';

interface PaymentStatusProps {
  status: PaymentStatusType;
  className?: string;
  showLabel?: boolean;
  children?: React.ReactNode;
  reason?: string;
  hasActions?: boolean;
  onDispute?: () => void;
  onRefund?: () => void;
  onCancel?: () => void;
  showActions?: boolean;
}

const StatusIcon = ({ status, className }: { status: PaymentStatusType; className?: string }) => {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className={cn('text-success', className)} />;
    case 'failed':
      return <XCircle className={cn('text-destructive', className)} />;
    case 'pending':
      return <Clock className={cn('text-warning', className)} />;
    case 'processing':
      return <RotateCw className={cn('text-primary', className)} />;
    case 'refunded':
      return <MoveLeft className={cn('text-info', className)} />;
    case 'cancelled':
      return <XCircle className={cn('text-muted-foreground', className)} />;
    case 'disputed':
      return <ArrowLeftRight className={cn('text-warning', className)} />;
    case 'held':
      return <AlertCircle className={cn('text-warning', className)} />;
    default:
      return <MoreHorizontal className={cn('text-muted-foreground', className)} />;
  }
};

const StatusLabel = ({ status }: { status: PaymentStatusType }) => {
  switch (status) {
    case 'completed':
      return <span>Concluído</span>;
    case 'failed':
      return <span>Falhou</span>;
    case 'pending':
      return <span>Pendente</span>;
    case 'processing':
      return <span>Processando</span>;
    case 'refunded':
      return <span>Reembolsado</span>;
    case 'cancelled':
      return <span>Cancelado</span>;
    case 'disputed':
      return <span>Em disputa</span>;
    case 'held':
      return <span>Retido</span>;
    default:
      return <span>{status}</span>;
  }
};

const StatusColor = (status: PaymentStatusType) => {
  switch (status) {
    case 'completed':
      return 'bg-success/10 text-success border-success/20';
    case 'failed':
      return 'bg-destructive/10 text-destructive border-destructive/20';
    case 'pending':
      return 'bg-warning/10 text-warning border-warning/20';
    case 'processing':
      return 'bg-primary/10 text-primary border-primary/20';
    case 'refunded':
      return 'bg-info/10 text-info border-info/20';
    case 'cancelled':
      return 'bg-muted text-muted-foreground border-muted-foreground/20';
    case 'disputed':
      return 'bg-warning/10 text-warning border-warning/20';
    case 'held':
      return 'bg-warning/10 text-warning border-warning/20';
    default:
      return 'bg-muted text-muted-foreground border-muted-foreground/20';
  }
};

const PaymentStatus = ({
  status,
  className,
  showLabel = true,
  children,
  reason,
  hasActions = false,
  onDispute,
  onRefund,
  onCancel,
  showActions = false
}: PaymentStatusProps) => {
  const canDispute = status !== 'disputed' && status !== 'refunded' && status !== 'cancelled';
  const canRefund = status === 'completed';
  const canCancel = status === 'pending' || status === 'processing';
  
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium',
        StatusColor(status)
      )}>
        <StatusIcon status={status} className="h-3.5 w-3.5" />
        {showLabel && (
          <span className="relative">
            <StatusLabel status={status} />
          </span>
        )}
      </div>
      
      {reason && (
        <div className="text-xs text-muted-foreground mt-1">
          Motivo: {reason}
        </div>
      )}
      
      {children}
      
      {hasActions && showActions && (
        <div className="flex flex-wrap gap-2 mt-2">
          {canDispute && onDispute && (
            <button
              onClick={onDispute}
              className="text-xs text-warning hover:underline"
            >
              Abrir disputa
            </button>
          )}
          {canRefund && onRefund && (
            <button
              onClick={onRefund}
              className="text-xs text-info hover:underline"
            >
              Solicitar reembolso
            </button>
          )}
          {canCancel && onCancel && (
            <button
              onClick={onCancel}
              className="text-xs text-destructive hover:underline"
            >
              Cancelar
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentStatus;
