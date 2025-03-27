
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import ServiceCard from '@/components/ServiceCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Sample data for services
const servicesData = [
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
  {
    id: "5",
    title: "Acompanhamento Turístico",
    price: 80,
    rating: 4.8,
    reviewCount: 15,
    location: "Vancouver, Canadá",
    category: "Turismo",
    provider: {
      name: "Fernanda Lima",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg"
    },
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    delay: 0.5
  },
  {
    id: "6",
    title: "Fotografia Profissional",
    price: 150,
    rating: 4.6,
    reviewCount: 22,
    location: "Malta",
    category: "Fotografia",
    provider: {
      name: "Ricardo Gomes",
      avatar: "https://randomuser.me/api/portraits/men/6.jpg"
    },
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    delay: 0.6
  },
  {
    id: "7",
    title: "Tradução de Documentos",
    price: 45,
    rating: 4.9,
    reviewCount: 31,
    location: "Dublin, Irlanda",
    category: "Tradução",
    provider: {
      name: "Juliana Alves",
      avatar: "https://randomuser.me/api/portraits/women/7.jpg"
    },
    image: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    delay: 0.7
  },
  {
    id: "8",
    title: "Aulas de Violão",
    price: 60,
    rating: 4.7,
    reviewCount: 14,
    location: "Madrid, Espanha",
    category: "Música",
    provider: {
      name: "Gabriel Santos",
      avatar: "https://randomuser.me/api/portraits/men/8.jpg"
    },
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    delay: 0.8
  },
  {
    id: "9",
    title: "Transporte e Mudanças",
    price: 100,
    rating: 4.5,
    reviewCount: 19,
    location: "Sydney, Austrália",
    category: "Transporte",
    provider: {
      name: "Luciano Martins",
      avatar: "https://randomuser.me/api/portraits/men/9.jpg"
    },
    image: "https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    delay: 0.9
  },
];

// Categories data
const categories = [
  { id: "all", name: "Todas Categorias" },
  { id: "aulas", name: "Aulas" },
  { id: "limpeza", name: "Limpeza" },
  { id: "servicos", name: "Serviços Gerais" },
  { id: "design", name: "Design" },
  { id: "turismo", name: "Turismo" },
  { id: "fotografia", name: "Fotografia" },
  { id: "traducao", name: "Tradução" },
  { id: "musica", name: "Música" },
  { id: "transporte", name: "Transporte" },
];

// Locations data
const locations = [
  { id: "all", name: "Todas Localizações" },
  { id: "irlanda", name: "Irlanda" },
  { id: "australia", name: "Austrália" },
  { id: "canada", name: "Canadá" },
  { id: "espanha", name: "Espanha" },
  { id: "malta", name: "Malta" },
  { id: "dubai", name: "Dubai" },
];

const Services = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [minRating, setMinRating] = useState(0);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [services, setServices] = useState(servicesData);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    // Filter services based on applied filters
    let filteredServices = servicesData;

    // Search term filter
    if (searchTerm) {
      filteredServices = filteredServices.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.provider.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filteredServices = filteredServices.filter(service =>
        service.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Location filter
    if (selectedLocation !== 'all') {
      filteredServices = filteredServices.filter(service =>
        service.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    // Price range filter
    filteredServices = filteredServices.filter(service =>
      service.price >= priceRange[0] && service.price <= priceRange[1]
    );

    // Rating filter
    if (minRating > 0) {
      filteredServices = filteredServices.filter(service =>
        service.rating >= minRating
      );
    }

    setServices(filteredServices);

    // Build active filters array for display
    const activeFilters = [];
    
    if (selectedCategory !== 'all') {
      const category = categories.find(c => c.id === selectedCategory);
      if (category) activeFilters.push({ id: 'category', name: category.name, value: selectedCategory });
    }
    
    if (selectedLocation !== 'all') {
      const location = locations.find(l => l.id === selectedLocation);
      if (location) activeFilters.push({ id: 'location', name: location.name, value: selectedLocation });
    }
    
    if (priceRange[0] > 0 || priceRange[1] < 300) {
      activeFilters.push({ id: 'price', name: `R$ ${priceRange[0]} - R$ ${priceRange[1]}`, value: priceRange });
    }
    
    if (minRating > 0) {
      activeFilters.push({ id: 'rating', name: `${minRating}+ estrelas`, value: minRating });
    }
    
    setFilters(activeFilters);
  }, [searchTerm, selectedCategory, selectedLocation, priceRange, minRating]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedLocation('all');
    setPriceRange([0, 300]);
    setMinRating(0);
  };

  const removeFilter = (filterId) => {
    if (filterId === 'category') setSelectedCategory('all');
    if (filterId === 'location') setSelectedLocation('all');
    if (filterId === 'price') setPriceRange([0, 300]);
    if (filterId === 'rating') setMinRating(0);
  };

  return (
    <div className={cn("min-h-screen flex flex-col bg-muted/20", isLoaded ? "animate-fade-in" : "opacity-0")}>
      <Navbar />

      <main className="flex-1 container px-4 md:px-6 py-24">
        <div className="max-w-[800px] mx-auto mb-12 text-center animate-slide-up">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            Encontre os melhores serviços
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-[600px] mx-auto">
            Explore serviços oferecidos por intercambistas qualificados e selecione o que melhor atende às suas necessidades
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar serviços, categorias ou prestadores..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Localização" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                size="icon" 
                className="lg:hidden"
                onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          {filters.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {filters.map((filter) => (
                <Badge 
                  key={filter.id} 
                  variant="secondary"
                  className="flex items-center gap-1 py-1.5 px-3"
                >
                  {filter.name}
                  <button 
                    onClick={() => removeFilter(filter.id)}
                    className="ml-1 rounded-full hover:bg-muted p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <button 
                onClick={resetFilters}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0 animate-slide-in-from-left" style={{ animationDelay: "0.2s" }}>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4 flex items-center justify-between">
                      <span>Filtros</span>
                      <button 
                        onClick={resetFilters}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Resetar
                      </button>
                    </h3>
                  </div>

                  {/* Price Range */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Faixa de Preço</h4>
                    <div className="pt-4">
                      <Slider
                        value={priceRange}
                        min={0}
                        max={300}
                        step={10}
                        onValueChange={setPriceRange}
                      />
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm">R$ {priceRange[0]}</span>
                        <span className="text-sm">R$ {priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Minimum Rating */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Avaliação Mínima</h4>
                    <div className="space-y-2">
                      {[0, 3, 3.5, 4, 4.5].map((rating) => (
                        <div key={rating} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`rating-${rating}`} 
                            checked={minRating === rating}
                            onCheckedChange={() => setMinRating(rating)}
                          />
                          <label
                            htmlFor={`rating-${rating}`}
                            className="text-sm flex items-center cursor-pointer"
                          >
                            {rating === 0 ? (
                              "Qualquer avaliação"
                            ) : (
                              <div className="flex items-center">
                                <span>{rating}+</span>
                                <svg
                                  className="h-4 w-4 fill-amber-400 text-amber-400 ml-1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                              </div>
                            )}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Locations */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Localização</h4>
                    <div className="space-y-2">
                      {locations.map((location) => (
                        <div key={location.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`location-${location.id}`} 
                            checked={selectedLocation === location.id}
                            onCheckedChange={() => setSelectedLocation(location.id)}
                          />
                          <label
                            htmlFor={`location-${location.id}`}
                            className="text-sm cursor-pointer"
                          >
                            {location.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mobile Filters */}
          {isMobileFiltersOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm animate-in fade-in-0">
              <div className="fixed bottom-0 left-0 right-0 h-4/5 border-t rounded-t-2xl bg-background p-6 shadow-lg animate-in slide-in-from-bottom">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-medium">Filtros</h3>
                  <button onClick={() => setIsMobileFiltersOpen(false)}>
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="overflow-y-auto h-[calc(100%-6rem)] pr-2 space-y-6">
                  {/* Price Range */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Faixa de Preço</h4>
                    <div className="pt-4">
                      <Slider
                        value={priceRange}
                        min={0}
                        max={300}
                        step={10}
                        onValueChange={setPriceRange}
                      />
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm">R$ {priceRange[0]}</span>
                        <span className="text-sm">R$ {priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Categoria</h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`mobile-category-${category.id}`} 
                            checked={selectedCategory === category.id}
                            onCheckedChange={() => setSelectedCategory(category.id)}
                          />
                          <label
                            htmlFor={`mobile-category-${category.id}`}
                            className="text-sm cursor-pointer"
                          >
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Minimum Rating */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Avaliação Mínima</h4>
                    <div className="space-y-2">
                      {[0, 3, 3.5, 4, 4.5].map((rating) => (
                        <div key={rating} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`mobile-rating-${rating}`} 
                            checked={minRating === rating}
                            onCheckedChange={() => setMinRating(rating)}
                          />
                          <label
                            htmlFor={`mobile-rating-${rating}`}
                            className="text-sm flex items-center cursor-pointer"
                          >
                            {rating === 0 ? (
                              "Qualquer avaliação"
                            ) : (
                              <div className="flex items-center">
                                <span>{rating}+</span>
                                <svg
                                  className="h-4 w-4 fill-amber-400 text-amber-400 ml-1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                              </div>
                            )}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Locations */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Localização</h4>
                    <div className="space-y-2">
                      {locations.map((location) => (
                        <div key={location.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`mobile-location-${location.id}`} 
                            checked={selectedLocation === location.id}
                            onCheckedChange={() => setSelectedLocation(location.id)}
                          />
                          <label
                            htmlFor={`mobile-location-${location.id}`}
                            className="text-sm cursor-pointer"
                          >
                            {location.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="fixed bottom-0 left-0 right-0 p-6 border-t bg-background">
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className="w-1/2"
                      onClick={resetFilters}
                    >
                      Limpar
                    </Button>
                    <Button 
                      className="w-1/2"
                      onClick={() => setIsMobileFiltersOpen(false)}
                    >
                      Aplicar Filtros
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Services Grid */}
          <div className="flex-1 animate-slide-in-from-right" style={{ animationDelay: "0.2s" }}>
            {services.length > 0 ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm text-muted-foreground">
                    Mostrando {services.length} {services.length === 1 ? 'serviço' : 'serviços'}
                  </span>
                  <Select defaultValue="relevance">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevância</SelectItem>
                      <SelectItem value="price_asc">Preço: Menor para Maior</SelectItem>
                      <SelectItem value="price_desc">Preço: Maior para Menor</SelectItem>
                      <SelectItem value="rating">Avaliações</SelectItem>
                      <SelectItem value="newest">Mais Recentes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service) => (
                    <ServiceCard key={service.id} {...service} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <div className="rounded-full bg-muted w-16 h-16 flex items-center justify-center mb-6">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">Nenhum serviço encontrado</h3>
                <p className="text-muted-foreground mb-6">
                  Nenhum serviço corresponde aos seus filtros de busca. Tente ajustar os filtros ou limpar a pesquisa.
                </p>
                <Button variant="outline" onClick={resetFilters}>
                  Limpar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
