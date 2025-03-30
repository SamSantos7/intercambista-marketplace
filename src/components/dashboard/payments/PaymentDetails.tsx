
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ServicePayment } from '@/types/payment';
import PaymentStatus from '@/components/PaymentStatus';

interface PaymentDetailsProps {
  payment: ServicePayment;
  isProvider: boolean;
  onStatusChange: (paymentId: string, newStatus: any, reason?: string) => void;
  serviceName: string;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  payment,
  isProvider,
  onStatusChange,
  serviceName
}) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Detalhes do Pagamento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Número do Pagamento</p>
              <p className="font-medium">{payment.id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Data de Criação</p>
              <p className="font-medium">{formatDate(payment.createdAt)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Forma de Pagamento</p>
              <p className="font-medium">{payment.paymentMethod.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Valor</p>
              <p className="font-medium text-lg">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: payment.currency
                }).format(payment.amount)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <PaymentStatus
        paymentId={payment.id}
        status={payment.status}
        amount={payment.amount}
        currency={payment.currency}
        serviceTitle={serviceName}
        serviceDateStr={payment.scheduledDate ? formatDate(payment.scheduledDate) : undefined}
        isProvider={isProvider}
        onStatusChange={onStatusChange}
      />
    </div>
  );
};

export default PaymentDetails;
