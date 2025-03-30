
import React, { useState } from 'react';
import { CheckCircle2, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface PromotionOption {
  id: string;
  name: string;
  duration: number; // em dias
  price: number;
  description: string;
  popular?: boolean;
}

interface ServicePromotionProps {
  serviceId: string;
  serviceName: string;
  onPromote: (serviceId: string, promotionId: string) => void;
}

const promotionOptions: PromotionOption[] = [
  {
    id: 'promo-3-days',
    name: 'Destaque Básico',
    duration: 3,
    price: 19.90,
    description: 'Seu serviço em destaque por 3 dias.'
  },
  {
    id: 'promo-7-days',
    name: 'Destaque Semanal',
    duration: 7,
    price: 39.90,
    description: 'Seu serviço em destaque por 7 dias.',
    popular: true
  },
  {
    id: 'promo-30-days',
    name: 'Destaque Mensal',
    duration: 30,
    price: 99.90,
    description: 'Seu serviço em destaque por 30 dias. Melhor custo-benefício!'
  }
];

const ServicePromotion: React.FC<ServicePromotionProps> = ({
  serviceId,
  serviceName,
  onPromote
}) => {
  const [selectedPromotion, setSelectedPromotion] = useState<string>(promotionOptions[1].id);
  const { toast } = useToast();

  const handlePromote = () => {
    const option = promotionOptions.find(opt => opt.id === selectedPromotion);
    
    if (option) {
      onPromote(serviceId, option.id);
      
      toast({
        title: 'Destaque Ativado',
        description: `${serviceName} agora está em destaque por ${option.duration} dias.`,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>Destacar Serviço</span>
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 ml-2">
            Recomendado
          </Badge>
        </CardTitle>
        <CardDescription>
          Destaque seu serviço para alcançar mais clientes. Serviços em destaque aparecem no topo das buscas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/50 p-4 rounded-lg mb-6 flex items-start">
          <Info className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" size={18} />
          <p className="text-sm text-muted-foreground">
            De acordo com nossas estatísticas, serviços em destaque recebem até 5x mais visualizações
            e aumentam suas chances de contratação em até 70%.
          </p>
        </div>
        
        <RadioGroup value={selectedPromotion} onValueChange={setSelectedPromotion} className="gap-4">
          {promotionOptions.map((option) => (
            <div
              key={option.id}
              className={`flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-accent/50 ${
                selectedPromotion === option.id ? 'border-primary bg-accent/50' : ''
              } ${option.popular ? 'ring-1 ring-primary' : ''}`}
              onClick={() => setSelectedPromotion(option.id)}
            >
              <RadioGroupItem value={option.id} id={option.id} />
              <div className="flex-1">
                <Label
                  htmlFor={option.id}
                  className="flex items-center text-base font-medium cursor-pointer"
                >
                  {option.name}
                  {option.popular && (
                    <Badge className="ml-2 bg-primary text-primary-foreground">
                      Mais Popular
                    </Badge>
                  )}
                </Label>
                <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-medium">
                    <span className="font-bold text-base">R$ {option.price.toFixed(2)}</span>
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center">
                    <CheckCircle2 className="mr-1 h-3 w-3 text-green-500" />
                    Visibilidade garantida
                  </span>
                </div>
              </div>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handlePromote}>
          Destacar agora
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServicePromotion;
