
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, Briefcase, Coffee, Home, Laptop, Brush, 
  Music, Book, Camera, Car, Heart, Star, MapPin 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import CategoryCard from '@/components/CategoryCard';
import ServiceCard from '@/components/ServiceCard';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

// Mock data
const categories = [
  { title: "Limpeza", icon: <Home className="h-5 w-5" />, color: "blue-600", count: 48, slug: "limpeza", delay: 0.1 },
  { title: "Aulas", icon: <Book className="h-5 w-5" />, color: "purple-600", count: 36, slug: "aulas", delay: 0.2 },
  { title: "Tecnologia", icon: <Laptop className="h-5 w-5" />, color: "green-600", count: 27, slug: "tecnologia", delay: 0.3 },
  { title: "Design", icon: <Brush className="h-5 w-5" />, color: "pink-600", count: 21, slug: "design", delay: 0.4 },
  { title: "Música", icon: <Music className="h-5 w-5" />, color: "amber-600", count: 15, slug: "musica", delay: 0.5 },
  { title: "Eventos", icon: <Camera className="h-5 w-5" />, color: "red-600", count: 14, slug: "eventos", delay: 0.6 },
  { title: "Transporte", icon: <Car className="h-5 w-5" />, color: "indigo-600", count: 12, slug: "transporte", delay: 0.7 },
  { title: "Serviços", icon: <Briefcase className="h-5 w-5" />, color: "teal-600", count: 34, slug: "servicos", delay: 0.8 },
];

const services = [
  {
    id: "1",
    title: "Aulas de Português para Estrangeiros",
    price: 50,
    rating: 4.9,
    reviewCount: 27,
    location: "Dublin, Irlanda",
    category: "Aulas",
    provider: {
      name: "Ana Silva",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    delay: 0.1
  },
  {
    id: "2",
    title: "Serviço de Limpeza Residencial",
    price: 90,
    rating: 4.8,
    reviewCount: 18,
    location: "Sydney, Austrália",
    category: "Limpeza",
    provider: {
      name: "Carlos Mendes",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    delay: 0.2
  },
  {
    id: "3",
    title: "Montagem de Móveis",
    price: 70,
    rating: 4.7,
    reviewCount: 12,
    location: "Toronto, Canadá",
    category: "Serviços",
    provider: {
      name: "Paulo Rocha",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    image: "https://images.unsplash.com/photo-1616627547584-bf28cee262db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    delay: 0.3
  },
  {
    id: "4",
    title: "Design de Sites",
    price: 120,
    rating: 4.9,
    reviewCount: 32,
    location: "Barcelona, Espanha",
    category: "Design",
    provider: {
      name: "Marina Costa",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg"
    },
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    delay: 0.4
  },
];

const testimonials = [
  {
    id: "1",
    content: "Consegui pagar minhas despesas dando aulas de português para estrangeiros. A plataforma é incrivelmente fácil de usar e os pagamentos são seguros.",
    author: {
      name: "Pedro Almeida",
      role: "Estudante em Dublin",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg"
    },
    rating: 5,
    delay: 0.1
  },
  {
    id: "2",
    content: "Como intercambista na Austrália, precisava de uma renda extra. Através da plataforma, comecei a oferecer serviços de design e agora tenho uma clientela fiel.",
    author: {
      name: "Camila Santos",
      role: "Designer em Sydney",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg"
    },
    rating: 5,
    delay: 0.2
  },
  {
    id: "3",
    content: "Graças a essa plataforma, encontrei rapidamente trabalhos como fotógrafo enquanto estudo em Barcelona. O processo é transparente e nunca tive problemas com pagamentos.",
    author: {
      name: "Rafael Lima",
      role: "Fotógrafo em Barcelona",
      avatar: "https://randomuser.me/api/portraits/men/56.jpg"
    },
    rating: 4,
    delay: 0.3
  },
];

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={cn("min-h-screen flex flex-col", isLoaded ? "animate-fade-in" : "opacity-0")}>
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Categories Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-[800px] mx-auto mb-12 animate-slide-up">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Explore por Categorias
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Encontre exatamente o que você precisa ou ofereça seus serviços em diversas áreas
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <CategoryCard key={index} {...category} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button variant="outline" size="lg" asChild>
                <Link to="/services" className="group">
                  Ver todas as categorias
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <Features />

        {/* Popular Services Section */}
        <section className="py-20 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
              <div className="max-w-[600px] animate-slide-up">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Serviços em Destaque
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Confira os serviços mais populares oferecidos por intercambistas no momento
                </p>
              </div>
              <Button variant="outline" size="lg" asChild className="md:self-end animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <Link to="/services" className="group">
                  Ver todos os serviços
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => (
                <ServiceCard key={service.id} {...service} />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-secondary/30 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          </div>

          <div className="container px-4 md:px-6">
            <div className="text-center max-w-[800px] mx-auto mb-12 animate-slide-up">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                O Que Nossos Usuários Dizem
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Histórias reais de intercambistas que estão usando nossa plataforma para ganhar dinheiro extra
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="flex flex-col gap-4 p-6 bg-background rounded-xl border hover-lift animate-scale-in"
                  style={{ animationDelay: `${testimonial.delay}s` }}
                >
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={cn(
                          "h-4 w-4", 
                          i < testimonial.rating 
                            ? "fill-amber-400 text-amber-400" 
                            : "fill-muted text-muted"
                        )} 
                      />
                    ))}
                  </div>
                  <p className="italic text-muted-foreground">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t">
                    <img 
                      src={testimonial.author.avatar} 
                      alt={testimonial.author.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{testimonial.author.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.author.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-background">
          <div className="container px-4 md:px-6">
            <div className="relative overflow-hidden rounded-2xl bg-primary p-8 md:p-12 lg:p-16 animate-scale-in">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
                  <rect width="100%" height="100%" fill="none" />
                  <path d="M0,0 L800,800 M0,800 L800,0" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4,12" />
                  <path d="M0,400 L800,400 M400,0 L400,800" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4,12" />
                </svg>
              </div>

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-[600px] text-primary-foreground">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Comece a ganhar dinheiro hoje mesmo
                  </h2>
                  <p className="mt-4 text-lg text-primary-foreground/90">
                    Cadastre-se gratuitamente e ofereça seus serviços para milhares de potenciais clientes.
                    Nossa plataforma é 100% gratuita e segura.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" variant="secondary" asChild>
                    <Link to="/services">Explorar serviços</Link>
                  </Button>
                  <Button size="lg" variant="default" className="bg-white text-primary hover:bg-white/90" asChild>
                    <Link to="/register" className="group">
                      Cadastrar agora
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
