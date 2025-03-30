
import React, { useState, useEffect } from 'react';
import { ServiceReview } from '@/types/service';
import ServiceRatingStats from '@/components/ServiceRatingStats';
import ServiceReviewList from '@/components/ServiceReviewList';

const ServiceDetailWithReviews: React.FC = () => {
  const [reviews, setReviews] = useState<ServiceReview[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<ServiceReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulating fetching reviews
  useEffect(() => {
    // In a real app, fetch from API
    setTimeout(() => {
      const mockReviews: ServiceReview[] = [
        {
          id: '1',
          serviceId: 'service1',
          clientId: 'client1',
          clientName: 'João Silva',
          clientImage: 'https://i.pravatar.cc/150?img=1',
          rating: 5,
          comment: 'Excelente serviço! Superou minhas expectativas.',
          createdAt: new Date(2023, 6, 15)
        },
        {
          id: '2',
          serviceId: 'service1',
          clientId: 'client2',
          clientName: 'Maria Souza',
          rating: 4,
          comment: 'Muito bom, apenas algumas pequenas coisas poderiam melhorar.',
          createdAt: new Date(2023, 5, 28)
        },
        {
          id: '3',
          serviceId: 'service1',
          clientId: 'client3',
          clientName: 'Carlos Oliveira',
          clientImage: 'https://i.pravatar.cc/150?img=3',
          rating: 5,
          comment: 'Profissionalismo e qualidade exemplar!',
          createdAt: new Date(2023, 7, 2)
        },
        {
          id: '4',
          serviceId: 'service1',
          clientId: 'client4',
          clientName: 'Ana Ferreira',
          rating: 3,
          comment: 'Serviço OK, mas demorou mais do que o esperado.',
          createdAt: new Date(2023, 6, 10)
        },
        {
          id: '5',
          serviceId: 'service1',
          clientId: 'client5',
          clientName: 'Pedro Santos',
          clientImage: 'https://i.pravatar.cc/150?img=5',
          rating: 4,
          comment: 'Gostei bastante do resultado final. Recomendo!',
          createdAt: new Date(2023, 5, 15)
        },
        {
          id: '6',
          serviceId: 'service1',
          clientId: 'client6',
          clientName: 'Lucia Mendes',
          rating: 2,
          comment: 'Não ficou como eu esperava.',
          createdAt: new Date(2023, 4, 20)
        },
        {
          id: '7',
          serviceId: 'service1',
          clientId: 'client7',
          clientName: 'Roberto Alves',
          clientImage: 'https://i.pravatar.cc/150?img=7',
          rating: 5,
          comment: 'Trabalho impecável e entrega antes do prazo!',
          createdAt: new Date(2023, 7, 5)
        },
      ];

      setReviews(mockReviews);
      setFilteredReviews(mockReviews);
      setIsLoading(false);
    }, 800);
  }, []);

  const handleFilterByRating = (rating: number | null) => {
    if (rating === null) {
      // Reset filters
      setFilteredReviews(reviews);
    } else {
      // Filter by selected rating
      const filtered = reviews.filter(review => review.rating === rating);
      setFilteredReviews(filtered);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Avaliações e Comentários</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <ServiceRatingStats 
            reviews={reviews}
            onFilterByRating={handleFilterByRating}
          />
        </div>

        <div className="md:col-span-2">
          <ServiceReviewList 
            reviews={filteredReviews} 
            reviewsPerPage={5}
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailWithReviews;
