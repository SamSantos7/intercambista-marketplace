
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Star from "@/components/icons/Star";
import PaymentFlow from "@/components/PaymentFlow";
import PaymentStatus from "@/components/PaymentStatus";
import NegotiationFlow from "@/components/NegotiationFlow";
import { usePaymentState } from "@/hooks/use-payment-state";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

const ServiceDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { user } = useAuth();
  const [showPaymentFlow, setShowPaymentFlow] = useState(false);
  const [showNegotiation, setShowNegotiation] = useState(false);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const { paymentStatus, updatePaymentStatus } = usePaymentState({
    initialStatus: 'pending',
    onStatusChange: (status) => {
      console.log("Payment status changed:", status);
    }
  });
  
  useEffect(() => {
    const fetchServiceData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('services')
          .select(`
            *,
            provider:provider_id(
              id,
              full_name,
              profile_image,
              country
            )
          `)
          .eq('id', id)
          .single();
          
        if (error) throw error;
        
        if (data) {
          setServiceData(data);
        }
      } catch (error) {
        console.error('Error fetching service data:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar os dados do serviço.',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchServiceData();
  }, [id]);
  
  // Use the fetched data if available, otherwise use mock data
  const service = serviceData || {
    id: id,
    title: "Assistência com Documentação",
    category: "Documentação",
    price: 150,
    rating: 4.8,
    reviewCount: 24,
    provider: {
      name: "Ana Silva",
      image: "",
      location: "São Paulo, SP",
      languages: ["Português", "Inglês", "Espanhol"]
    },
    description: "Assistência completa para documentação de estudantes internacionais, incluindo regularização de vistos, CPF, RNE e outros documentos essenciais.",
    details: [
      "Acompanhamento em visitas à Polícia Federal",
      "Preenchimento de formulários",
      "Orientação sobre documentos necessários",
      "Tradução juramentada quando necessário",
      "Acompanhamento durante todo o processo"
    ],
    availability: {
      days: "Segunda a Sexta",
      hours: "9:00 às 18:00"
    },
    reviews: [
      {
        id: 1,
        user: "Carlos Martinez",
        country: "México",
        rating: 5,
        comment: "Serviço excelente! Ana foi muito paciente e me ajudou a resolver toda a minha documentação em tempo recorde.",
        date: "12/08/2023"
      },
      {
        id: 2,
        user: "Emma Wilson",
        country: "EUA",
        rating: 4,
        comment: "Muito profissional e conhecedora dos processos. Resolveu meus problemas com o visto rapidamente.",
        date: "25/07/2023"
      },
      {
        id: 3,
        user: "Liu Wei",
        country: "China",
        rating: 5,
        comment: "Ótimo atendimento, incluindo suporte em inglês. Recomendo fortemente para todos os estudantes internacionais.",
        date: "10/06/2023"
      }
    ]
  };

  const handlePaymentComplete = (newPaymentId: string) => {
    setPaymentId(newPaymentId);
    setShowPaymentFlow(false);
    updatePaymentStatus('held');
  };

  const handleStatusChange = (id: string, status: any, reason?: string) => {
    updatePaymentStatus(status, reason);
  };

  const handleHireService = () => {
    setShowPaymentFlow(true);
    setShowNegotiation(false);
  };
  
  const handleNegotiateService = () => {
    setShowNegotiation(true);
    setShowPaymentFlow(false);
  };

  const handleContact = () => {
    toast({
      title: "Mensagem enviada",
      description: "O prestador de serviços receberá sua mensagem e entrará em contato em breve.",
    });
  };

  const handleNegotiationComplete = () => {
    toast({
      title: "Negociação iniciada",
      description: "Sua oferta foi enviada ao anunciante. Acompanhe a negociação.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna principal */}
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold">{service.title}</h1>
                    <Badge variant="outline">{service.category}</Badge>
                  </div>
                  
                  <div className="flex items-center mb-6">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={i < Math.floor(service.rating) ? "fill-yellow-400" : "fill-gray-200"} 
                          width={20} 
                          height={20} 
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm">{service.rating} ({service.reviewCount} avaliações)</span>
                  </div>

                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Descrição</h2>
                    <p className="text-gray-700">{service.description}</p>
                  </div>

                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">O que está incluído</h2>
                    <ul className="list-disc pl-5 space-y-1">
                      {service.details.map((detail, index) => (
                        <li key={index} className="text-gray-700">{detail}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-2">Disponibilidade</h2>
                    <p className="text-gray-700">
                      {service.availability.days}, {service.availability.hours}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {showPaymentFlow ? (
                <PaymentFlow 
                  serviceId={service.id || ''}
                  serviceTitle={service.title}
                  servicePrice={service.price}
                  serviceProvider={{
                    id: serviceData?.provider_id || '1',
                    name: serviceData?.provider?.full_name || service.provider.name
                  }}
                  userLocation={serviceData?.provider?.country || service.provider.location}
                  onComplete={handlePaymentComplete}
                />
              ) : showNegotiation ? (
                <NegotiationFlow
                  serviceId={service.id || ''}
                  serviceTitle={service.title}
                  servicePrice={service.price}
                  providerId={serviceData?.provider_id || '1'}
                  providerName={serviceData?.provider?.full_name || service.provider.name}
                  onComplete={handleNegotiationComplete}
                />
              ) : paymentId ? (
                <PaymentStatus 
                  paymentId={paymentId}
                  status={paymentStatus}
                  amount={service.price}
                  currency="R$"
                  serviceTitle={service.title}
                  isProvider={false}
                  onStatusChange={handleStatusChange}
                />
              ) : (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">Avaliações</h2>
                    
                    <Tabs defaultValue="all">
                      <TabsList className="mb-4">
                        <TabsTrigger value="all">Todas</TabsTrigger>
                        <TabsTrigger value="5">5 Estrelas</TabsTrigger>
                        <TabsTrigger value="4">4 Estrelas</TabsTrigger>
                        <TabsTrigger value="3">3 Estrelas</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="all">
                        <div className="space-y-6">
                          {service.reviews.map((review) => (
                            <div key={review.id} className="border-b pb-4 last:border-0">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="font-semibold">{review.user}</h3>
                                  <p className="text-sm text-gray-500">{review.country}</p>
                                </div>
                                <div className="flex items-center">
                                  <div className="flex mr-2">
                                    {[...Array(5)].map((_, i) => (
                                      <Star 
                                        key={i} 
                                        className={i < review.rating ? "fill-yellow-400" : "fill-gray-200"} 
                                        width={16} 
                                        height={16} 
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xs text-gray-500">{review.date}</span>
                                </div>
                              </div>
                              <p className="text-gray-700">{review.comment}</p>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      
                      {/* Filtered tabs content */}
                      <TabsContent value="5">
                        <div className="space-y-6">
                          {service.reviews
                            .filter(review => review.rating === 5)
                            .map((review) => (
                              <div key={review.id} className="border-b pb-4 last:border-0">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <h3 className="font-semibold">{review.user}</h3>
                                    <p className="text-sm text-gray-500">{review.country}</p>
                                  </div>
                                  <div className="flex items-center">
                                    <div className="flex mr-2">
                                      {[...Array(5)].map((_, i) => (
                                        <Star 
                                          key={i} 
                                          className={i < review.rating ? "fill-yellow-400" : "fill-gray-200"} 
                                          width={16} 
                                          height={16} 
                                        />
                                      ))}
                                    </div>
                                    <span className="text-xs text-gray-500">{review.date}</span>
                                  </div>
                                </div>
                                <p className="text-gray-700">{review.comment}</p>
                              </div>
                            ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="4">
                        <div className="space-y-6">
                          {service.reviews
                            .filter(review => review.rating === 4)
                            .map((review) => (
                              <div key={review.id} className="border-b pb-4 last:border-0">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <h3 className="font-semibold">{review.user}</h3>
                                    <p className="text-sm text-gray-500">{review.country}</p>
                                  </div>
                                  <div className="flex items-center">
                                    <div className="flex mr-2">
                                      {[...Array(5)].map((_, i) => (
                                        <Star 
                                          key={i} 
                                          className={i < review.rating ? "fill-yellow-400" : "fill-gray-200"} 
                                          width={16} 
                                          height={16} 
                                        />
                                      ))}
                                    </div>
                                    <span className="text-xs text-gray-500">{review.date}</span>
                                  </div>
                                </div>
                                <p className="text-gray-700">{review.comment}</p>
                              </div>
                            ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="3">
                        <div className="space-y-6">
                          {service.reviews
                            .filter(review => review.rating === 3)
                            .map((review) => (
                              <div key={review.id} className="border-b pb-4 last:border-0">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <h3 className="font-semibold">{review.user}</h3>
                                    <p className="text-sm text-gray-500">{review.country}</p>
                                  </div>
                                  <div className="flex items-center">
                                    <div className="flex mr-2">
                                      {[...Array(5)].map((_, i) => (
                                        <Star 
                                          key={i} 
                                          className={i < review.rating ? "fill-yellow-400" : "fill-gray-200"} 
                                          width={16} 
                                          height={16} 
                                        />
                                      ))}
                                    </div>
                                    <span className="text-xs text-gray-500">{review.date}</span>
                                  </div>
                                </div>
                                <p className="text-gray-700">{review.comment}</p>
                              </div>
                            ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* Coluna lateral */}
            <div>
              <Card className="shadow-lg sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-2">R$ {service.price.toFixed(2)}</h2>
                  <p className="text-gray-600 mb-6">Preço pode variar conforme necessidades específicas</p>

                  {!paymentId && !showNegotiation && !showPaymentFlow && (
                    <>
                      <Button 
                        className="w-full mb-4" 
                        onClick={handleHireService}
                      >
                        Contratar Serviço
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="w-full mb-4"
                        onClick={handleNegotiateService}
                      >
                        Negociar Preço
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="w-full mb-6"
                        onClick={handleContact}
                      >
                        Entre em Contato
                      </Button>
                    </>
                  )}

                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Prestador de Serviço</h3>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gray-200 mr-3 overflow-hidden">
                        {serviceData?.provider?.profile_image && (
                          <img 
                            src={serviceData.provider.profile_image} 
                            alt={serviceData.provider.full_name} 
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{serviceData?.provider?.full_name || service.provider.name}</p>
                        <p className="text-sm text-gray-600">{serviceData?.provider?.country || service.provider.location}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Idiomas</h3>
                    <div className="flex flex-wrap gap-2">
                      {service.provider.languages.map((language, index) => (
                        <Badge key={index} variant="secondary">{language}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
