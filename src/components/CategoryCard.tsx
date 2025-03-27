
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  title: string;
  icon: React.ReactNode;
  color: string;
  count?: number;
  slug: string;
  delay?: number;
}

const CategoryCard = ({ title, icon, color, count = 0, slug, delay = 0 }: CategoryCardProps) => {
  return (
    <Link 
      to={`/services/category/${slug}`}
      className="group relative overflow-hidden rounded-xl border bg-background p-6 transition-all duration-300 hover-lift animate-scale-in"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="absolute top-0 right-0 h-20 w-20 -translate-y-1/2 translate-x-1/2 rounded-full opacity-20 transition-transform duration-500 group-hover:scale-125" style={{ backgroundColor: color }} />
      
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <div className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg",
            `bg-${color}/10 text-${color}-600`
          )}>
            {icon}
          </div>
          <h3 className="mt-4 font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">
            {count} {count === 1 ? 'serviço' : 'serviços'} disponíveis
          </p>
        </div>
        <span className="text-muted-foreground transition-transform duration-300 group-hover:translate-x-1">
          <ChevronRight className="h-5 w-5" />
        </span>
      </div>
    </Link>
  );
};

export default CategoryCard;
