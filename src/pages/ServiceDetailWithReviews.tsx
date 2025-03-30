
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Star, MessageCircle, Share2, Heart, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Service, ServiceReview } from '@/types/service';
import ServiceReviewList from '@/components/ServiceReviewList';
import ServiceRatingStats from '@/components/ServiceRatingStats';
import ServiceReviewForm from '@/components/ServiceReviewForm';

// Mock service data
const mockService: Service = {
  id: '123',
  title: 'Aulas de Português para Estrangeiros',
  description: 'Aulas particulares de português para estrangeiros, com foco em conversação e gramática. Metodologia personalizada de acordo com suas necessidades.',
  price: 120.00,
  providerId: 'provider-123',
  providerName: 'Ana Oliveira',
  providerImage: 'https://randomuser.me/api/portraits/women/12.jpg',
  providerRating: 4.8,
  category: 'Educação',
  subcategory: 'Idiomas',
  images: [
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1122&q=80',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
  ],
  featured: true,
  featuredUntil: new Date('2024-12-31'),
  location: 'São Paulo, SP',
  createdAt: new Date('2023-01-15'),
  updatedAt: new Date('2023-06-10'),
  status: 'active',
};

// Mock reviews
const mockReviews: ServiceReview[] = [
  {
    id: 'rev1',
    serviceId: '123',
    clientId: 'client1',
    clientName: 'João Silva',
    clientImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    comment: 'Excelentes aulas! A professora Ana é muito paciente e adaptou as aulas conforme minhas necessidades. Recomendo muito!',
    createdAt: new Date('2023-05-10')
  },
  {
    id: 'rev2',
    serviceId: '123',
    clientId: 'client2',
    clientName: 'Maria Santos',
    clientImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 4,
    comment: 'Estou muito satisfeita com as aulas. A Ana tem uma metodologia ótima e muito material didático. Só acho que poderia ter mais exercícios para praticar em casa.',
    createdAt: new Date('2023-04-15')
  },
  {
    id: 'rev3',
    serviceId: '123',
    clientId: 'client3',
    clientName: 'Carlos Ferreira',
    rating: 5,
    comment: 'Aulas incríveis! Já consigo me comunicar muito melhor após apenas 2 meses de aulas.',
    createdAt: new Date('2023-03-22')
  }
];

const ServiceDetailWithReviews = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [service, setService] = useState<Service | null>(null);
  const [reviews, setReviews] = useState<ServiceReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Simulando autenticação

  useEffect(() => {
    // Simulating API call with mock data
    const fetchData = async () => {
      try {
        // In a real app, these would be API calls
        setTimeout(() => {
          setService(mockService);
          setReviews(mockReviews);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching service:', error);
        toast({
          title: "Erro ao carregar",
          description: "Não foi possível carregar os detalhes do serviço.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, toast]);

  const handleAddToFavorites = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removido dos favoritos" : "Adicionado aos favoritos",
      description: isFavorite 
        ? "O serviço foi removido da sua lista de favoritos." 
        : "O serviço foi adicionado à sua lista de favoritos.",
    });
  };

  const handleShare = () => {
    // In a real app, this would implement sharing functionality
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copiado",
      description: "O link foi copiado para a área de transferência.",
    });
  };

  const handleHireService = () => {
    // In a real app, this would navigate to a checkout or booking page
    navigate(`/services/${id}/hire`);
  };

  const handleSubmitReview = (rating: number, comment: string) => {
    const newReview: ServiceReview = {
      id: `rev${reviews.length + 1}`,
      serviceId: id || '',
      clientId: 'current-user-id',
      clientName: 'Você',
      clientImage: '',
      rating,
      comment,
      createdAt: new Date()
    };

    setReviews([newReview, ...reviews]);
    
    toast({
      title: "Avaliação enviada",
      description: "Obrigado por compartilhar sua experiência!",
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Serviço não encontrado</h1>
        <p className="mb-6">O serviço que você está procurando não existe ou foi removido.</p>
        <Button onClick={() => navigate('/services')}>Voltar para Serviços</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button
        variant="ghost"
        className="mb-4 flex items-center gap-1"
        onClick={() => navigate('/services')}
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para serviços
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
              <h1 className="text-3xl font-bold">{service.title}</h1>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleAddToFavorites}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button variant="outline" size="icon" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="flex items-center flex-wrap gap-3 mb-6 text-sm">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(service.createdAt).toLocaleDateString('pt-BR')}
              </Badge>
              {service.location && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {service.location}
                </Badge>
              )}
              <Badge variant="secondary" className="flex items-center gap-1">
                {service.category}
              </Badge>
              {service.featured && (
                <Badge variant="default" className="bg-yellow-500">
                  Destaque
                </Badge>
              )}
            </div>

            <div className="aspect-[16/9] overflow-hidden rounded-lg mb-6">
              <img
                src={service.images[0]}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>

            <Tabs defaultValue="description" className="mt-6">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="description">Descrição</TabsTrigger>
                <TabsTrigger value="reviews">Avaliações</TabsTrigger>
                <TabsTrigger value="info">Informações</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="space-y-4">
                <div className="prose max-w-none">
                  <p className="text-lg">{service.description}</p>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium">O que está incluso:</h3>
                    <ul className="list-disc pl-5 mt-2">
                      <li>Material didático digital</li>
                      <li>Aulas de 60 minutos</li>
                      <li>Exercícios personalizados</li>
                      <li>Suporte por WhatsApp</li>
                      <li>Certificado de conclusão</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <ServiceRatingStats reviews={reviews} />
                
                {isAuthenticated && (
                  <ServiceReviewForm 
                    serviceId={service.id} 
                    onSubmit={handleSubmitReview} 
                  />
                )}
                
                <ServiceReviewList reviews={reviews} />
              </TabsContent>

              <TabsContent value="info">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium">Categoria</h3>
                        <p className="text-muted-foreground">{service.category} {service.subcategory ? `/ ${service.subcategory}` : ''}</p>
                      </div>
                      {service.location && (
                        <div>
                          <h3 className="font-medium">Localização</h3>
                          <p className="text-muted-foreground">{service.location}</p>
                        </div>
                      )}
                      <div>
                        <h3 className="font-medium">Disponível desde</h3>
                        <p className="text-muted-foreground">{new Date(service.createdAt).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sobre o prestador</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={service.providerImage} alt={service.providerName} />
                  <AvatarFallback>{service.providerName.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{service.providerName}</h3>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span>{service.providerRating}</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                Enviar mensagem
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium">Valor</span>
                  <span className="text-2xl font-bold">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(service.price)}
                  </span>
                </div>
                <Button onClick={handleHireService} className="w-full">
                  Contratar serviço
                </Button>
              </div>
            </CardContent>
          </Card>

          {service.featured && (
            <Card className="bg-yellow-50 border-yellow-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-yellow-800">Serviço em Destaque</CardTitle>
                <CardDescription className="text-yellow-700">
                  Este é um serviço em destaque até {new Date(service.featuredUntil!).toLocaleDateString('pt-BR')}
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailWithReviews;
