
import React, { useState } from 'react';
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Ban,
  RefreshCw,
  Shield,
  CreditCard,
  HelpCircle
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { PaymentStatus as PaymentStatusType } from '@/types/payment';

interface PaymentStatusProps {
  paymentId: string;
  status: PaymentStatusType;
  amount: number;
  currency: string;
  serviceTitle: string;
  serviceDateStr?: string;
  isProvider: boolean;
  onStatusChange: (paymentId: string, newStatus: PaymentStatusType, reason?: string) => void;
}

const PaymentStatus: React.FC<PaymentStatusProps> = ({
  paymentId,
  status,
  amount,
  currency,
  serviceTitle,
  serviceDateStr,
  isProvider,
  onStatusChange
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<PaymentStatusType | null>(null);
  const [reason, setReason] = useState('');

  const handleAction = (action: PaymentStatusType) => {
    if (action === 'dispute' || action === 'refund' || action === 'cancel') {
      setDialogAction(action);
      setDialogOpen(true);
    } else {
      onStatusChange(paymentId, action);
    }
  };

  const confirmAction = () => {
    if (dialogAction) {
      onStatusChange(paymentId, dialogAction, reason);
      setDialogOpen(false);
      setReason('');
      setDialogAction(null);
    }
  };

  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          title: 'Pagamento Pendente',
          description: 'O pagamento está aguardando processamento.',
          icon: <Clock className="h-5 w-5 text-amber-500" />,
          color: 'border-amber-200 bg-amber-50',
          clientActions: [
            { label: 'Cancelar Pagamento', action: 'cancel', color: 'text-red-500 border-red-200 hover:bg-red-50' }
          ],
          providerActions: []
        };
      case 'processing':
        return {
          title: 'Processando Pagamento',
          description: 'O pagamento está sendo processado.',
          icon: <RefreshCw className="h-5 w-5 text-blue-500" />,
          color: 'border-blue-200 bg-blue-50',
          clientActions: [
            { label: 'Cancelar Pagamento', action: 'cancel', color: 'text-red-500 border-red-200 hover:bg-red-50' }
          ],
          providerActions: []
        };
      case 'completed':
        return {
          title: 'Pagamento Concluído',
          description: 'O pagamento foi processado com sucesso.',
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
          color: 'border-green-200 bg-green-50',
          clientActions: [
            { label: 'Solicitar Reembolso', action: 'refund', color: 'text-red-500 border-red-200 hover:bg-red-50' },
            { label: 'Abrir Disputa', action: 'dispute', color: 'text-amber-500 border-amber-200 hover:bg-amber-50' }
          ],
          providerActions: []
        };
      case 'failed':
        return {
          title: 'Pagamento Falhou',
          description: 'Ocorreu um erro durante o processamento do pagamento.',
          icon: <AlertCircle className="h-5 w-5 text-red-500" />,
          color: 'border-red-200 bg-red-50',
          clientActions: [
            { label: 'Tentar Novamente', action: 'pending', color: 'text-blue-500 border-blue-200 hover:bg-blue-50' }
          ],
          providerActions: []
        };
      case 'refunded':
        return {
          title: 'Pagamento Reembolsado',
          description: 'O valor foi devolvido ao cliente.',
          icon: <RefreshCw className="h-5 w-5 text-purple-500" />,
          color: 'border-purple-200 bg-purple-50',
          clientActions: [],
          providerActions: []
        };
      case 'cancelled':
        return {
          title: 'Pagamento Cancelado',
          description: 'O pagamento foi cancelado.',
          icon: <Ban className="h-5 w-5 text-gray-500" />,
          color: 'border-gray-200 bg-gray-50',
          clientActions: [],
          providerActions: []
        };
      case 'disputed':
        return {
          title: 'Pagamento em Disputa',
          description: 'Uma disputa foi aberta para este pagamento.',
          icon: <Shield className="h-5 w-5 text-amber-500" />,
          color: 'border-amber-200 bg-amber-50',
          clientActions: [],
          providerActions: []
        };
      case 'held':
        return {
          title: 'Pagamento Retido',
          description: 'O pagamento está retido até a conclusão do serviço.',
          icon: <CreditCard className="h-5 w-5 text-indigo-500" />,
          color: 'border-indigo-200 bg-indigo-50',
          clientActions: [
            { label: 'Liberar Pagamento', action: 'completed', color: 'text-green-500 border-green-200 hover:bg-green-50' },
            { label: 'Abrir Disputa', action: 'dispute', color: 'text-amber-500 border-amber-200 hover:bg-amber-50' }
          ],
          providerActions: []
        };
      default:
        return {
          title: 'Status Desconhecido',
          description: 'O status do pagamento é desconhecido.',
          icon: <HelpCircle className="h-5 w-5 text-gray-500" />,
          color: 'border-gray-200 bg-gray-50',
          clientActions: [],
          providerActions: []
        };
    }
  };

  const statusConfig = getStatusConfig();
  const actions = isProvider ? statusConfig.providerActions : statusConfig.clientActions;

  const getDialogTitle = () => {
    switch (dialogAction) {
      case 'dispute':
        return 'Abrir Disputa';
      case 'refund':
        return 'Solicitar Reembolso';
      case 'cancel':
        return 'Cancelar Pagamento';
      default:
        return 'Confirmar Ação';
    }
  };

  const getDialogDescription = () => {
    switch (dialogAction) {
      case 'dispute':
        return 'Por favor, descreva o motivo da disputa com o máximo de detalhes possível.';
      case 'refund':
        return 'Por favor, explique o motivo pelo qual você está solicitando um reembolso.';
      case 'cancel':
        return 'Por favor, indique o motivo para o cancelamento deste pagamento.';
      default:
        return 'Confirme a ação que deseja realizar.';
    }
  };

  return (
    <>
      <Card className={`${statusConfig.color} border-2`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            {statusConfig.icon}
            {statusConfig.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium">Serviço</p>
              <p className="text-gray-700">{serviceTitle}</p>
            </div>
            
            {serviceDateStr && (
              <div>
                <p className="text-sm font-medium">Data do Serviço</p>
                <p className="text-gray-700">{serviceDateStr}</p>
              </div>
            )}
            
            <div>
              <p className="text-sm font-medium">Valor</p>
              <p className="text-lg font-bold">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: currency
                }).format(amount)}
              </p>
            </div>
            
            <p className="text-sm text-gray-600">{statusConfig.description}</p>
          </div>
        </CardContent>
        
        {actions.length > 0 && (
          <CardFooter className="pt-0 flex flex-wrap gap-2">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className={action.color}
                onClick={() => handleAction(action.action as PaymentStatusType)}
              >
                {action.label}
              </Button>
            ))}
          </CardFooter>
        )}
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{getDialogTitle()}</DialogTitle>
            <DialogDescription>{getDialogDescription()}</DialogDescription>
          </DialogHeader>
          
          <Textarea
            placeholder="Descreva o motivo..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="min-h-[100px]"
          />
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button onClick={confirmAction} disabled={!reason.trim()}>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PaymentStatus;
