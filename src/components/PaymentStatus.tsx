
import React, { useState } from 'react';
import { PaymentStatus as PaymentStatusType } from '@/types/payment';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2, Clock, AlertCircle, Ban, HelpCircle } from 'lucide-react';

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
  onStatusChange,
}) => {
  const { toast } = useToast();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isDisputeDialogOpen, setIsDisputeDialogOpen] = useState(false);
  const [disputeReason, setDisputeReason] = useState('');

  const getStatusDetails = () => {
    switch (status) {
      case 'pending':
        return {
          color: 'bg-yellow-100 text-yellow-800',
          icon: <Clock className="h-5 w-5" />,
          label: 'Pendente',
          description: 'O pagamento está pendente de processamento.'
        };
      case 'processing':
        return {
          color: 'bg-blue-100 text-blue-800',
          icon: <Clock className="h-5 w-5" />,
          label: 'Processando',
          description: 'O pagamento está sendo processado.'
        };
      case 'held':
        return {
          color: 'bg-purple-100 text-purple-800',
          icon: <Clock className="h-5 w-5" />,
          label: 'Retido',
          description: isProvider 
            ? 'O valor está retido até que o cliente confirme a conclusão do serviço.' 
            : 'O valor está retido e será liberado quando você confirmar a conclusão do serviço.'
        };
      case 'completed':
        return {
          color: 'bg-green-100 text-green-800',
          icon: <CheckCircle2 className="h-5 w-5" />,
          label: 'Concluído',
          description: 'O serviço foi concluído e o pagamento liberado.'
        };
      case 'disputed':
        return {
          color: 'bg-red-100 text-red-800',
          icon: <AlertCircle className="h-5 w-5" />,
          label: 'Em Disputa',
          description: 'Existe uma disputa em andamento para este pagamento.'
        };
      case 'refunded':
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: <Ban className="h-5 w-5" />,
          label: 'Reembolsado',
          description: 'O valor foi reembolsado ao cliente.'
        };
      case 'cancelled':
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: <Ban className="h-5 w-5" />,
          label: 'Cancelado',
          description: 'O pagamento foi cancelado.'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: <HelpCircle className="h-5 w-5" />,
          label: 'Desconhecido',
          description: 'Status desconhecido.'
        };
    }
  };

  const statusDetails = getStatusDetails();

  const handleCompleteService = () => {
    setIsConfirmDialogOpen(false);
    onStatusChange(paymentId, 'completed');
    toast({
      title: "Serviço concluído",
      description: "O pagamento foi liberado para o prestador de serviço.",
    });
  };

  const handleDispute = () => {
    if (!disputeReason.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, descreva o motivo da disputa.",
        variant: "destructive",
      });
      return;
    }
    
    setIsDisputeDialogOpen(false);
    onStatusChange(paymentId, 'disputed', disputeReason);
    toast({
      title: "Disputa iniciada",
      description: "Nossa equipe analisará seu caso e entrará em contato.",
    });
  };

  const renderClientActions = () => {
    if (status === 'held') {
      return (
        <div className="space-x-2">
          <Button onClick={() => setIsConfirmDialogOpen(true)} variant="default">
            Confirmar Conclusão
          </Button>
          <Button onClick={() => setIsDisputeDialogOpen(true)} variant="outline">
            Abrir Disputa
          </Button>
        </div>
      );
    }
    return null;
  };

  const renderProviderActions = () => {
    if (status === 'held') {
      return (
        <div>
          <p className="text-sm text-muted-foreground">Aguardando confirmação do cliente</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Status do Pagamento</CardTitle>
          <Badge 
            className={`${statusDetails.color} flex gap-1 items-center`} 
            variant="outline"
          >
            {statusDetails.icon}
            {statusDetails.label}
          </Badge>
        </div>
        <CardDescription>{serviceTitle}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center pb-2 border-b">
          <span className="text-sm">ID do Pagamento</span>
          <span className="font-mono text-xs">{paymentId}</span>
        </div>
        
        <div className="flex justify-between items-center pb-2 border-b">
          <span className="text-sm">Valor</span>
          <span className="font-semibold">{currency} {amount.toFixed(2)}</span>
        </div>
        
        {serviceDateStr && (
          <div className="flex justify-between items-center pb-2 border-b">
            <span className="text-sm">Data do Serviço</span>
            <span>{serviceDateStr}</span>
          </div>
        )}
        
        <div className="bg-muted p-4 rounded-md">
          <p className="text-sm">{statusDetails.description}</p>
        </div>
      </CardContent>
      <CardFooter>
        {isProvider ? renderProviderActions() : renderClientActions()}
      </CardFooter>

      {/* Confirm Completion Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Conclusão do Serviço</DialogTitle>
            <DialogDescription>
              Ao confirmar a conclusão do serviço, o pagamento será liberado para o prestador. Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleCompleteService}>Confirmar e Liberar Pagamento</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dispute Dialog */}
      <Dialog open={isDisputeDialogOpen} onOpenChange={setIsDisputeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Abrir Disputa</DialogTitle>
            <DialogDescription>
              Por favor, descreva detalhadamente o problema com o serviço prestado. Nossa equipe analisará seu caso.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea 
              placeholder="Descreva o problema com detalhes..." 
              className="min-h-[120px]"
              value={disputeReason}
              onChange={(e) => setDisputeReason(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDisputeDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleDispute} variant="destructive">Abrir Disputa</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PaymentStatus;
