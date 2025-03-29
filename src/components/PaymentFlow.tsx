
import React, { useState, useEffect } from 'react';
import { CurrencyCode, PaymentStatus } from '@/types/payment';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { formatCurrency, getUserCurrency, convertCurrency } from '@/utils/currency';
import { getPaymentMethodIcon, getAvailablePaymentMethods } from '@/utils/paymentMethods';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, Shield, AlertTriangle } from 'lucide-react';

interface PaymentFlowProps {
  serviceId: string;
  serviceTitle: string;
  servicePrice: number;
  serviceProvider: {
    id: string;
    name: string;
  };
  userLocation?: string;
  onComplete: (paymentId: string) => void;
}

const PaymentFlow: React.FC<PaymentFlowProps> = ({
  serviceId,
  serviceTitle,
  servicePrice,
  serviceProvider,
  userLocation,
  onComplete,
}) => {
  const { toast } = useToast();
  const [step, setStep] = useState<'method' | 'details' | 'confirm' | 'processing' | 'complete'>('method');
  const [selectedMethodId, setSelectedMethodId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDateRequired, setIsDateRequired] = useState<boolean>(true);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('pending');
  const [paymentId, setPaymentId] = useState<string>('');
  
  // Get user's currency based on location
  const userCurrency = getUserCurrency(userLocation);
  const [displayPrice, setDisplayPrice] = useState<number>(servicePrice);
  
  // Available payment methods for the user's currency
  const availablePaymentMethods = getAvailablePaymentMethods(userCurrency.code);

  useEffect(() => {
    // Convert service price to user's currency
    const updatePrice = async () => {
      // This is a mock implementation. In a real app, you'd use an API call
      try {
        const convertedPrice = await convertCurrency(servicePrice, 'BRL', userCurrency.code);
        setDisplayPrice(convertedPrice);
      } catch (error) {
        console.error("Error converting currency:", error);
        setDisplayPrice(servicePrice);
      }
    };
    
    updatePrice();
  }, [servicePrice, userCurrency]);

  const handleSelectMethod = (methodId: string) => {
    setSelectedMethodId(methodId);
  };

  const handleNextStep = () => {
    if (step === 'method') {
      if (!selectedMethodId) {
        toast({
          title: "Selecione um método de pagamento",
          description: "Por favor, selecione um método de pagamento para continuar.",
          variant: "destructive",
        });
        return;
      }
      setStep('details');
    } else if (step === 'details') {
      if (isDateRequired && !selectedDate) {
        toast({
          title: "Selecione uma data",
          description: "Por favor, selecione uma data para o serviço.",
          variant: "destructive",
        });
        return;
      }
      setStep('confirm');
    } else if (step === 'confirm') {
      setIsDialogOpen(true);
    }
  };

  const handlePreviousStep = () => {
    if (step === 'details') setStep('method');
    if (step === 'confirm') setStep('details');
  };

  const handleProcessPayment = () => {
    setIsDialogOpen(false);
    setStep('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      const mockPaymentId = `pay_${Math.random().toString(36).substr(2, 9)}`;
      setPaymentId(mockPaymentId);
      setPaymentStatus('held');
      setStep('complete');
      onComplete(mockPaymentId);
      
      // Show success toast
      toast({
        title: "Pagamento processado com sucesso",
        description: "O valor será mantido em garantia até a conclusão do serviço.",
      });
    }, 2000);
  };

  // Render payment method icon
  const PaymentIcon = ({ methodId }: { methodId: string }) => {
    const IconComponent = getPaymentMethodIcon(methodId);
    return <IconComponent className="h-5 w-5" />;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Processo de Pagamento</CardTitle>
        <CardDescription>Contrate o serviço de forma segura e protegida</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="mb-4 flex space-x-2">
          <div className={`flex-1 p-2 text-center rounded-md ${step === 'method' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
            1. Método
          </div>
          <div className={`flex-1 p-2 text-center rounded-md ${step === 'details' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
            2. Detalhes
          </div>
          <div className={`flex-1 p-2 text-center rounded-md ${step === 'confirm' || step === 'processing' || step === 'complete' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
            3. Confirmação
          </div>
        </div>
        
        {step === 'method' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
              <div>
                <h3 className="font-medium">Total a pagar</h3>
                <p className="text-sm text-muted-foreground">Serviço: {serviceTitle}</p>
              </div>
              <div className="text-xl font-bold">
                {formatCurrency(displayPrice, userCurrency.code)}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Selecione o método de pagamento</h3>
              <RadioGroup value={selectedMethodId} onValueChange={handleSelectMethod} className="space-y-2">
                {availablePaymentMethods.map((method) => (
                  <div key={method.id} className={`flex items-center space-x-2 p-3 border rounded-lg ${selectedMethodId === method.id ? 'border-primary' : 'border-input'}`}>
                    <RadioGroupItem value={method.id} id={method.id} />
                    <Label htmlFor={method.id} className="flex items-center gap-2 cursor-pointer flex-1">
                      <PaymentIcon methodId={method.id} />
                      {method.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertTitle>Pagamento Seguro</AlertTitle>
              <AlertDescription>
                Seu dinheiro fica retido conosco até que você confirme que o serviço foi concluído satisfatoriamente.
              </AlertDescription>
            </Alert>
          </div>
        )}
        
        {step === 'details' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Detalhes do pagamento</h3>
              
              {selectedMethodId === 'credit-card' && (
                <div className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="card-number">Número do Cartão</Label>
                    <Input id="card-number" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="expiry">Validade</Label>
                      <Input id="expiry" placeholder="MM/AA" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="name">Nome no Cartão</Label>
                    <Input id="name" placeholder="Nome como aparece no cartão" />
                  </div>
                </div>
              )}
              
              {selectedMethodId === 'pix' && (
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p>Após confirmar, você receberá um QR code para pagamento via Pix.</p>
                </div>
              )}
              
              {selectedMethodId === 'boleto' && (
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p>Após confirmar, você receberá um boleto para pagamento.</p>
                </div>
              )}
              
              {selectedMethodId === 'wire-transfer' && (
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p>Após confirmar, você receberá as informações bancárias para transferência.</p>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Agendar serviço (opcional)</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsDateRequired(!isDateRequired)}
                  className="text-xs"
                >
                  {isDateRequired ? 'Tornar opcional' : 'Tornar obrigatório'}
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="date">Data desejada</Label>
                  <Input 
                    id="date" 
                    type="date" 
                    onChange={(e) => setSelectedDate(e.target.value ? new Date(e.target.value) : null)} 
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="time">Horário preferencial</Label>
                  <Input id="time" type="time" />
                </div>
              </div>
            </div>
            
            <Alert>
              <Clock className="h-4 w-4" />
              <AlertTitle>Agendamento Flexível</AlertTitle>
              <AlertDescription>
                O prestador de serviços entrará em contato para confirmar disponibilidade.
              </AlertDescription>
            </Alert>
          </div>
        )}
        
        {step === 'confirm' && (
          <div className="space-y-4">
            <h3 className="font-medium">Resumo do pagamento</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between p-2 border-b">
                <span>Serviço:</span>
                <span className="font-medium">{serviceTitle}</span>
              </div>
              <div className="flex justify-between p-2 border-b">
                <span>Prestador:</span>
                <span className="font-medium">{serviceProvider.name}</span>
              </div>
              <div className="flex justify-between p-2 border-b">
                <span>Método de pagamento:</span>
                <span className="font-medium flex items-center gap-2">
                  <PaymentIcon methodId={selectedMethodId} />
                  {availablePaymentMethods.find(m => m.id === selectedMethodId)?.name}
                </span>
              </div>
              {selectedDate && (
                <div className="flex justify-between p-2 border-b">
                  <span>Data agendada:</span>
                  <span className="font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {selectedDate.toLocaleDateString()}
                  </span>
                </div>
              )}
              <div className="flex justify-between p-2 border-b text-lg font-bold">
                <span>Total:</span>
                <span>{formatCurrency(displayPrice, userCurrency.code)}</span>
              </div>
            </div>
            
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Importante</AlertTitle>
              <AlertDescription>
                Ao confirmar, você autoriza o pagamento de {formatCurrency(displayPrice, userCurrency.code)} que ficará retido até a conclusão do serviço.
              </AlertDescription>
            </Alert>
          </div>
        )}
        
        {step === 'processing' && (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p className="text-lg">Processando seu pagamento...</p>
            <p className="text-sm text-muted-foreground">Por favor, não feche esta janela</p>
          </div>
        )}
        
        {step === 'complete' && (
          <div className="flex flex-col items-center justify-center py-4">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Pagamento Processado!</h3>
            <p className="text-center text-muted-foreground mb-4">
              O valor de {formatCurrency(displayPrice, userCurrency.code)} está retido em garantia até que o serviço seja concluído.
            </p>
            <div className="bg-muted p-4 rounded-md w-full">
              <p className="text-sm mb-1">ID do Pagamento:</p>
              <p className="font-mono text-xs">{paymentId}</p>
            </div>
            <Alert className="mt-4">
              <Shield className="h-4 w-4" />
              <AlertTitle>Próximos passos</AlertTitle>
              <AlertDescription>
                Você receberá um email com detalhes e o prestador de serviço entrará em contato para combinar os detalhes.
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        {(step === 'details' || step === 'confirm') && (
          <Button variant="outline" onClick={handlePreviousStep}>
            Voltar
          </Button>
        )}
        {(step === 'method' || step === 'details' || step === 'confirm') && (
          <Button 
            onClick={handleNextStep} 
            className={step === 'method' || step === 'details' ? 'ml-auto' : ''}
          >
            {step === 'confirm' ? 'Finalizar Pagamento' : 'Continuar'}
          </Button>
        )}
        
        {step === 'complete' && (
          <Button className="w-full" variant="outline">
            Ver Detalhes do Pedido
          </Button>
        )}
      </CardFooter>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Pagamento</DialogTitle>
            <DialogDescription>
              Você está prestes a autorizar o pagamento de {formatCurrency(displayPrice, userCurrency.code)} para o serviço "{serviceTitle}". Este valor ficará retido até que você confirme a conclusão do serviço.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Atenção</AlertTitle>
              <AlertDescription>
                Para sua segurança, confirme que está ciente que o valor só será liberado ao prestador após sua confirmação.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleProcessPayment}>Confirmar e Pagar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PaymentFlow;
