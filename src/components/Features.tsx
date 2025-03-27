
import React from 'react';
import { 
  Users, Search, CreditCard, Award, Bell, ShieldCheck, PieChart, 
  Smartphone, Globe, ThumbsUp, Clock, DollarSign
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard = ({ icon, title, description, delay = 0 }: FeatureProps) => (
  <div 
    className="flex flex-col gap-4 p-6 bg-background rounded-xl border hover-lift animate-slide-up"
    style={{ animationDelay: `${delay}s` }}
  >
    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
      {icon}
    </div>
    <div className="space-y-2">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);

const Features = () => {
  const features: FeatureProps[] = [
    {
      icon: <Users className="h-5 w-5" />,
      title: "Perfis Personalizados",
      description: "Crie seu perfil com foto, descrição, experiência e receba avaliações dos seus clientes.",
      delay: 0.1
    },
    {
      icon: <Search className="h-5 w-5" />,
      title: "Busca Avançada",
      description: "Encontre facilmente serviços com filtros por categoria, preço e localização.",
      delay: 0.2
    },
    {
      icon: <CreditCard className="h-5 w-5" />,
      title: "Pagamentos Seguros",
      description: "Dinheiro retido até conclusão do serviço, garantindo segurança para ambas as partes.",
      delay: 0.3
    },
    {
      icon: <Award className="h-5 w-5" />,
      title: "Sistema de Avaliação",
      description: "Avalie serviços e construa sua reputação com base nas opiniões dos clientes.",
      delay: 0.1
    },
    {
      icon: <Bell className="h-5 w-5" />,
      title: "Notificações",
      description: "Receba alertas sobre novos pedidos, mensagens e pagamentos em tempo real.",
      delay: 0.2
    },
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: "Verificação Opcional",
      description: "Aumente sua credibilidade com verificação de identidade opcional.",
      delay: 0.3
    },
    {
      icon: <PieChart className="h-5 w-5" />,
      title: "Dashboards Detalhados",
      description: "Acompanhe seu desempenho, ganhos e histórico de serviços em painéis intuitivos.",
      delay: 0.1
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Internacional",
      description: "Disponível para intercambistas em Irlanda, Austrália, Malta, Espanha, Canadá e Dubai.",
      delay: 0.2
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      title: "100% Gratuito",
      description: "Sem taxas de comissão ou mensalidades para anunciantes e clientes.",
      delay: 0.3
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden" id="features">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container px-4 md:px-6">
        <div className="text-center max-w-[800px] mx-auto mb-16 animate-slide-up">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Tudo o que você precisa para prosperar no exterior
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Nossa plataforma foi desenvolvida pensando nas necessidades específicas de intercambistas que podem trabalhar legalmente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
