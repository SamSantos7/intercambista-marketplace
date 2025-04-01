
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Printer, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PaymentDetails from '@/components/dashboard/payments/PaymentDetails';
import { ServicePayment, PaymentStatus } from '@/types/payment';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const PaymentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [payment, setPayment] = useState<ServicePayment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [serviceName, setServiceName] = useState("Carregando...");

  // Mock data fetch
  useEffect(() => {
    const fetchPayment = async () => {
      try {
        // Simulating API call
        setTimeout(() => {
          setPayment({
            id: id || 'INV-001',
            serviceId: 'srv-001',
            clientId: 'client-001',
            providerId: 'provider-001',
            amount: 150.00,
            currency: 'BRL',
            status: 'held',
            paymentMethod: 'credit_card',
            createdAt: new Date('2023-07-15'),
            updatedAt: new Date('2023-07-15'),
            scheduledDate: new Date('2023-07-20'),
          });
          setServiceName("Aulas de Português");
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching payment:", error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os detalhes do pagamento.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };

    fetchPayment();
  }, [id, toast]);

  const handleStatusChange = (paymentId: string, newStatus: PaymentStatus, reason?: string) => {
    console.log(`Changing payment ${paymentId} status to ${newStatus}`, reason);
    
    // In a real app, you would call an API here
    setPayment(prev => prev ? { ...prev, status: newStatus } : null);
    
    toast({
      title: "Status atualizado",
      description: `O status do pagamento foi alterado para ${newStatus}`,
    });
  };

  const handlePrintReceipt = () => {
    // In a real app, this would open a print dialog or generate PDF
    toast({
      title: "Impressão",
      description: "Preparando recibo para impressão...",
    });
    setTimeout(() => {
      window.print();
    }, 500);
  };
  
  const handleDownloadPdf = () => {
    // In a real app, this would download a PDF
    toast({
      title: "Download iniciado",
      description: "O seu PDF está sendo gerado e baixado.",
    });
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!payment) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">Pagamento não encontrado</h2>
          <p className="mt-2 text-muted-foreground">O pagamento que você está procurando não existe ou foi removido.</p>
          <Button className="mt-4" onClick={() => navigate('/dashboard/payments')}>
            Voltar para Pagamentos
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1"
              onClick={() => navigate('/dashboard/payments')}
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para Pagamentos
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrintReceipt}>
              <Printer className="h-4 w-4 mr-2" />
              Imprimir Recibo
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownloadPdf}>
              <Download className="h-4 w-4 mr-2" />
              Baixar PDF
            </Button>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight">Detalhes do Pagamento</h1>
          <p className="text-muted-foreground">
            Pagamento para {serviceName}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <PaymentDetails 
              payment={payment}
              serviceName={serviceName}
              isProvider={false}
              onStatusChange={handleStatusChange}
            />
          </div>
          
          <div>
            <div className="sticky top-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Ações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={handlePrintReceipt}
                  >
                    <Printer className="mr-2 h-4 w-4" />
                    Imprimir Comprovante
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={handleDownloadPdf}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Baixar Recibo
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PaymentDetail;
