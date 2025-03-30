
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ServicePromotion from '@/components/dashboard/ServicePromotion';
import PaymentFlow from '@/components/PaymentFlow';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ServicePromotionPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [service, setService] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<string | null>(null);

  // Mock fetch service data
  useEffect(() => {
    const fetchService = async () => {
      try {
        // Simulating API call
        setTimeout(() => {
          setService({
            id: id,
            title: "Tradução de documentos para visto",
            description: "Tradução juramentada de documentos para processos de visto.",
            price: 120.00,
            providerId: "user1",
            category: "Tradução",
            featured: false,
          });
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching service:", error);
        setIsLoading(false);
      }
    };

    if (id) {
      fetchService();
    }
  }, [id]);

  const handlePromote = (serviceId: string, promotionId: string) => {
    console.log(`Promoting service ${serviceId} with promotion ${promotionId}`);
    setSelectedPromotion(promotionId);
    setShowPayment(true);
  };

  const handlePaymentComplete = (paymentId: string) => {
    console.log(`Payment completed: ${paymentId}`);
    toast({
      title: "Promoção ativada",
      description: "Seu serviço agora está em destaque e aparecerá no topo das buscas.",
    });
    setTimeout(() => {
      navigate(`/dashboard/services`);
    }, 2000);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!service) {
    return (
      <DashboardLayout>
        <div className="text-center">
          <h2 className="text-xl font-bold">Serviço não encontrado</h2>
          <p className="mt-2 text-muted-foreground">O serviço que você está procurando não existe ou foi removido.</p>
          <Button className="mt-4" onClick={() => navigate('/dashboard/services')}>
            Voltar para serviços
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1"
            onClick={() => navigate('/dashboard/services')}
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para serviços
          </Button>
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight">Destacar Serviço</h1>
          <p className="text-muted-foreground">
            Destaque seu serviço para obter mais visibilidade e atrair mais clientes.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Detalhes do Serviço</CardTitle>
              <CardDescription>
                Você está promovendo o seguinte serviço
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                </div>
                <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Info className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Benefícios do destaque</h4>
                    <ul className="mt-2 space-y-2 text-sm">
                      <li className="flex items-start">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          height="24"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>Seu serviço aparecerá no topo dos resultados de busca</span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          height="24"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>Destaque visual especial para atrair mais atenção</span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          height="24"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>Aumente suas chances de contratação em até 70%</span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          height="24"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>Inclui estatísticas avançadas sobre o desempenho do anúncio</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {!showPayment ? (
            <ServicePromotion
              serviceId={service.id}
              serviceName={service.title}
              onPromote={handlePromote}
            />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Finalizar Compra</CardTitle>
                <CardDescription>Complete o pagamento para destacar seu serviço</CardDescription>
              </CardHeader>
              <CardContent>
                <PaymentFlow
                  serviceId={service.id}
                  serviceTitle={`Destaque para: ${service.title}`}
                  servicePrice={selectedPromotion === 'promo-3-days' ? 19.90 : 
                    selectedPromotion === 'promo-7-days' ? 39.90 : 99.90}
                  serviceProvider={{
                    id: "platform",
                    name: "Intercambista"
                  }}
                  onComplete={handlePaymentComplete}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ServicePromotionPage;
