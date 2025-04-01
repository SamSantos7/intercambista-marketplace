
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Negotiation } from '@/types/negotiation';
import { formatCurrency } from '@/utils/currency';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Check, X, AlertCircle, MessageSquare, DollarSign } from 'lucide-react';
import NegotiationChat from './NegotiationChat';
import { useToast } from '@/hooks/use-toast';

interface NegotiationFlowProps {
  serviceId: string;
  serviceTitle: string;
  servicePrice: number;
  currency?: string;
  providerId: string;
  providerName?: string;
  onComplete?: (negotiationId: string) => void;
}

const NegotiationFlow: React.FC<NegotiationFlowProps> = ({
  serviceId,
  serviceTitle,
  servicePrice,
  currency = 'BRL',
  providerId,
  providerName = 'Anunciante',
  onComplete
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [offeredPrice, setOfferedPrice] = useState<number>(servicePrice);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [negotiation, setNegotiation] = useState<Negotiation | null>(null);
  const [activeTab, setActiveTab] = useState<'offer' | 'chat'>('offer');
  
  // Check if there's an existing negotiation
  const checkExistingNegotiation = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('negotiations')
        .select('*')
        .eq('service_id', serviceId)
        .eq('client_id', user.id)
        .eq('provider_id', providerId)
        .not('status', 'eq', 'completed')
        .not('status', 'eq', 'canceled')
        .maybeSingle();
      
      if (error) throw error;
      
      if (data) {
        // Format the negotiation data
        setNegotiation({
          id: data.id,
          serviceId: data.service_id,
          serviceName: serviceTitle,
          originalPrice: data.original_price,
          offeredPrice: data.offered_price,
          currency: currency,
          clientId: data.client_id,
          providerId: data.provider_id,
          status: data.status,
          createdAt: new Date(data.created_at),
          updatedAt: new Date(data.updated_at)
        });
        
        // If there's an active negotiation, switch to chat
        if (['pending', 'countered'].includes(data.status)) {
          setActiveTab('chat');
        }
      }
    } catch (err) {
      console.error('Error checking existing negotiation:', err);
      setError('Erro ao verificar negociações existentes.');
    } finally {
      setIsLoading(false);
    }
  };
  
  React.useEffect(() => {
    checkExistingNegotiation();
  }, [user, serviceId]);
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setOfferedPrice(value);
    } else {
      setOfferedPrice(0);
    }
  };
  
  const handleSubmitOffer = async () => {
    if (!user) {
      setError('Você precisa estar logado para fazer uma oferta.');
      return;
    }
    
    if (offeredPrice <= 0) {
      setError('O valor oferecido deve ser maior que zero.');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      // If there's already a negotiation, update it
      if (negotiation) {
        const { error } = await supabase
          .from('negotiations')
          .update({
            offered_price: offeredPrice,
            status: 'countered'
          })
          .eq('id', negotiation.id);
        
        if (error) throw error;
        
        // Add a message about the counter-offer
        await supabase.from('messages').insert({
          negotiation_id: negotiation.id,
          sender_id: user.id,
          recipient_id: providerId,
          content: `Fiz uma nova oferta de ${formatCurrency(offeredPrice, currency)}${message ? '. ' + message : ''}`,
          is_read: false
        });
        
        // Update local state
        setNegotiation({
          ...negotiation,
          offeredPrice,
          status: 'countered',
          updatedAt: new Date()
        });
        
        toast({
          title: "Contraproposta enviada",
          description: "Sua contraproposta foi enviada ao anunciante."
        });
        
      } else {
        // Create a new negotiation
        const { data, error } = await supabase
          .from('negotiations')
          .insert({
            service_id: serviceId,
            client_id: user.id,
            provider_id: providerId,
            original_price: servicePrice,
            offered_price: offeredPrice,
            status: 'pending'
          })
          .select()
          .single();
        
        if (error) throw error;
        
        // Format and set the negotiation data
        setNegotiation({
          id: data.id,
          serviceId: data.service_id,
          serviceName: serviceTitle,
          originalPrice: data.original_price,
          offeredPrice: data.offered_price,
          currency: currency,
          clientId: data.client_id,
          providerId: data.provider_id,
          status: data.status,
          createdAt: new Date(data.created_at),
          updatedAt: new Date(data.updated_at)
        });
        
        // Add initial message if provided
        if (message) {
          await supabase.from('messages').insert({
            negotiation_id: data.id,
            sender_id: user.id,
            recipient_id: providerId,
            content: `Minha oferta: ${formatCurrency(offeredPrice, currency)}. ${message}`,
            is_read: false
          });
        } else {
          await supabase.from('messages').insert({
            negotiation_id: data.id,
            sender_id: user.id,
            recipient_id: providerId,
            content: `Minha oferta é de ${formatCurrency(offeredPrice, currency)} pelo serviço "${serviceTitle}".`,
            is_read: false
          });
        }
        
        toast({
          title: "Oferta enviada",
          description: "Sua oferta foi enviada ao anunciante."
        });
        
        // Notify completion if callback provided
        if (onComplete) {
          onComplete(data.id);
        }
      }
      
      // Switch to chat tab
      setActiveTab('chat');
      
    } catch (err) {
      console.error('Error submitting offer:', err);
      setError('Ocorreu um erro ao enviar sua oferta. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCancelNegotiation = async () => {
    if (!negotiation) return;
    
    try {
      setIsLoading(true);
      
      const { error } = await supabase
        .from('negotiations')
        .update({ status: 'canceled' })
        .eq('id', negotiation.id);
      
      if (error) throw error;
      
      // Add a message about cancellation
      await supabase.from('messages').insert({
        negotiation_id: negotiation.id,
        sender_id: user?.id || '',
        recipient_id: providerId,
        content: 'Cancelei esta negociação.',
        is_read: false
      });
      
      // Update local state
      setNegotiation({
        ...negotiation,
        status: 'canceled',
        updatedAt: new Date()
      });
      
      toast({
        title: "Negociação cancelada",
        description: "Você cancelou esta negociação."
      });
      
    } catch (err) {
      console.error('Error canceling negotiation:', err);
      setError('Ocorreu um erro ao cancelar a negociação.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Render based on authentication and negotiation state
  if (!user) {
    return (
      <Card>
        <CardContent className="py-4">
          <Alert variant="warning">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Você precisa estar logado para negociar este serviço.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Negociação</span>
          {negotiation && (
            <Badge variant={negotiation.status === 'pending' ? 'outline' : 
                           negotiation.status === 'accepted' ? 'success' : 
                           negotiation.status === 'rejected' ? 'destructive' : 
                           'secondary'}>
              {negotiation.status === 'pending' ? 'Pendente' : 
               negotiation.status === 'accepted' ? 'Aceita' : 
               negotiation.status === 'rejected' ? 'Recusada' : 
               negotiation.status === 'countered' ? 'Contraproposta' : 
               negotiation.status === 'completed' ? 'Concluída' : 'Cancelada'}
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          {negotiation ? 'Acompanhe sua negociação para este serviço' : 
                         'Faça uma oferta para o serviço'}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {negotiation && (
          <div className="flex mb-4 gap-2">
            <Button 
              variant={activeTab === 'offer' ? 'default' : 'outline'}
              onClick={() => setActiveTab('offer')}
              className="flex-1"
            >
              <DollarSign className="h-4 w-4 mr-1" />
              Oferta
            </Button>
            <Button 
              variant={activeTab === 'chat' ? 'default' : 'outline'}
              onClick={() => setActiveTab('chat')}
              className="flex-1"
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Conversa
            </Button>
          </div>
        )}
        
        {activeTab === 'chat' && negotiation ? (
          <NegotiationChat 
            negotiationId={negotiation.id} 
            recipientId={providerId}
            recipientName={providerName}
          />
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Preço original:</span>
              <span className="font-semibold">{formatCurrency(servicePrice, currency)}</span>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Sua oferta:</label>
              <div className="relative">
                <span className="absolute left-3 inset-y-0 flex items-center text-muted-foreground">
                  {currency === 'BRL' ? 'R$' : '$'}
                </span>
                <Input
                  type="number"
                  value={offeredPrice}
                  onChange={handlePriceChange}
                  className="pl-8"
                  placeholder="Valor da oferta"
                  min={1}
                  step={0.01}
                  disabled={isLoading || negotiation?.status === 'canceled' || negotiation?.status === 'rejected'}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Mensagem (opcional):</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escreva uma mensagem para o anunciante..."
                disabled={isLoading || negotiation?.status === 'canceled' || negotiation?.status === 'rejected'}
              />
            </div>
            
            {negotiation && ['rejected', 'canceled'].includes(negotiation.status) && (
              <Alert variant={negotiation.status === 'rejected' ? 'destructive' : 'warning'}>
                {negotiation.status === 'rejected' ? (
                  <X className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                <AlertDescription>
                  {negotiation.status === 'rejected' 
                    ? 'Sua oferta foi recusada pelo anunciante.' 
                    : 'Esta negociação foi cancelada.'}
                </AlertDescription>
              </Alert>
            )}
            
            {negotiation && negotiation.status === 'accepted' && (
              <Alert variant="success">
                <Check className="h-4 w-4" />
                <AlertDescription>
                  Sua oferta de {formatCurrency(negotiation.offeredPrice, currency)} foi aceita pelo anunciante!
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex flex-col gap-2">
        {activeTab !== 'chat' && (
          <>
            {!negotiation || ['pending', 'countered'].includes(negotiation.status) ? (
              <Button 
                onClick={handleSubmitOffer} 
                disabled={isLoading || offeredPrice <= 0}
                className="w-full"
              >
                {negotiation ? 'Atualizar Oferta' : 'Enviar Oferta'}
              </Button>
            ) : null}
            
            {negotiation && ['pending', 'countered'].includes(negotiation.status) && (
              <Button 
                variant="outline" 
                onClick={handleCancelNegotiation}
                disabled={isLoading}
                className="w-full"
              >
                Cancelar Negociação
              </Button>
            )}
          </>
        )}
        
        {negotiation && negotiation.status === 'accepted' && activeTab !== 'chat' && (
          <Button className="w-full" onClick={() => setActiveTab('chat')}>
            <MessageSquare className="h-4 w-4 mr-1" />
            Ir para Conversa
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default NegotiationFlow;
