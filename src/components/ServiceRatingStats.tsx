
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Star } from 'lucide-react';
import { ServiceReview } from '@/types/service';

interface ServiceRatingStatsProps {
  reviews: ServiceReview[];
}

const ServiceRatingStats: React.FC<ServiceRatingStatsProps> = ({ reviews }) => {
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

  return (
    <Card>
      <CardContent className="pt-6">
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
          </div>
          
          <div className="md:w-2/3 space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2">
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
