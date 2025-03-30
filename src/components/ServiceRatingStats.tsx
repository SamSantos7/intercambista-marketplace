
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Star } from 'lucide-react';
import { ServiceReview } from '@/types/service';
import { Button } from '@/components/ui/button';

interface ServiceRatingStatsProps {
  reviews: ServiceReview[];
  onFilterByRating?: (rating: number | null) => void;
}

const ServiceRatingStats: React.FC<ServiceRatingStatsProps> = ({ 
  reviews, 
  onFilterByRating 
}) => {
  const [activeFilter, setActiveFilter] = useState<number | null>(null);

  if (reviews.length === 0) {
    return null;
  }

  // Calculate average rating
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  const averageRating = totalRating / reviews.length;

  // Count ratings by star
  const ratingCounts = [0, 0, 0, 0, 0]; // For 5 stars, 4 stars, etc.
  reviews.forEach(review => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingCounts[5 - review.rating]++;
    }
  });

  const handleRatingClick = (rating: number) => {
    // Toggle filter if clicking the same rating twice
    const newFilter = activeFilter === rating ? null : rating;
    setActiveFilter(newFilter);
    
    if (onFilterByRating) {
      onFilterByRating(newFilter);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Classificações</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center justify-center md:w-1/3">
            <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
            <div className="flex text-yellow-500 my-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-5 w-5 ${i < Math.round(averageRating) ? 'fill-current' : ''}`} 
                />
              ))}
            </div>
            <div className="text-sm text-muted-foreground">{reviews.length} avaliações</div>
            
            {activeFilter !== null && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-2 text-xs" 
                onClick={() => handleRatingClick(activeFilter)}
              >
                Limpar filtro
              </Button>
            )}
          </div>
          
          <div className="md:w-2/3 space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div 
                key={star} 
                className={`flex items-center gap-2 p-1 rounded-md transition-colors ${activeFilter === star ? 'bg-muted/50' : 'hover:bg-muted/30'}`}
                onClick={() => handleRatingClick(star)}
                style={{ cursor: 'pointer' }}
              >
                <div className="w-8 text-sm">{star} <Star className="h-3 w-3 inline fill-current text-yellow-500" /></div>
                <Progress 
                  value={(ratingCounts[5 - star] / reviews.length) * 100} 
                  className="h-2 flex-1" 
                />
                <div className="w-8 text-sm text-right">{ratingCounts[5 - star]}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceRatingStats;
