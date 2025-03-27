
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Globe, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Hero Content */}
          <div className="flex flex-col gap-6 animate-slide-in-from-left">
            <div>
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-accent text-accent-foreground mb-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <span className="flex items-center gap-1">
                  <Globe className="h-3.5 w-3.5" />
                  <span>Plataforma para intercambistas</span>
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                Ganhe dinheiro enquanto vive sua experiência no exterior
              </h1>
              <p className="text-lg text-muted-foreground max-w-[600px] animate-slide-up" style={{ animationDelay: '0.5s' }}>
                Conectamos intercambistas que podem trabalhar legalmente com pessoas que precisam de serviços. 
                Tudo 100% gratuito, simples e transparente.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <Button size="lg" asChild>
                <Link to="/register" className="group">
                  Comece a ganhar 
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/services">Explorar serviços</Link>
              </Button>
            </div>

            {/* Featured Locations */}
            <div className="mt-6 animate-slide-up" style={{ animationDelay: '0.7s' }}>
              <p className="text-sm font-medium text-muted-foreground mb-3">Disponível para intercambistas em:</p>
              <div className="flex flex-wrap gap-3">
                {['Irlanda', 'Austrália', 'Malta', 'Espanha', 'Canadá', 'Dubai'].map((location) => (
                  <div key={location} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                    <MapPin className="h-3 w-3" />
                    {location}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="lg:flex relative animate-slide-in-from-right" style={{ animationDelay: '0.4s' }}>
            <div className="relative w-full aspect-square md:aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Intercambistas trabalhando juntos"
                className="absolute inset-0 w-full h-full object-cover lazy-image transition-all duration-1000"
                loading="lazy"
              />

              {/* Stats Cards */}
              <div className="absolute -bottom-6 -left-6 md:bottom-6 md:left-6 p-4 rounded-xl glass animate-slide-up shadow-lg" style={{ animationDelay: '0.7s' }}>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Ganhos extras</p>
                    <p className="text-2xl font-bold">Sem taxas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
