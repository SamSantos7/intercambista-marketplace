
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  id: string;
  title: string;
  price: number;
  rating: number;
  reviewCount: number;
  location: string;
  category: string;
  provider: {
    name: string;
    avatar: string;
  };
  image: string;
  delay?: number;
}

const ServiceCard = ({ 
  id, 
  title, 
  price, 
  rating, 
  reviewCount, 
  location, 
  category, 
  provider, 
  image,
  delay = 0
}: ServiceCardProps) => {
  return (
    <Link 
      to={`/services/${id}`}
      className="group flex flex-col overflow-hidden rounded-xl border bg-background transition-all hover-lift animate-scale-in"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <img 
          src={image} 
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
          loading="lazy"
        />
        <div className="absolute top-3 left-3 z-20">
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/90 text-primary-foreground">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="font-semibold text-right whitespace-nowrap">
            R$ {price.toFixed(2)}
          </p>
        </div>

        <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span className="line-clamp-1">{location}</span>
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between border-t mt-3">
          <div className="flex items-center gap-2">
            <img
              src={provider.avatar}
              alt={provider.name}
              className="h-6 w-6 rounded-full object-cover"
            />
            <span className="text-sm">{provider.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">({reviewCount})</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
