
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChevronLeft, Save, Trash } from 'lucide-react';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { CurrencyCode } from '@/types/payment';

// Lista de países disponíveis
const availableCountries = [
  { id: 'irlanda', name: 'Irlanda' },
  { id: 'dubai', name: 'Dubai' },
  { id: 'australia', name: 'Austrália' },
  { id: 'malta', name: 'Malta' },
  { id: 'canada', name: 'Canadá' },
  { id: 'espanha', name: 'Espanha' },
];

// Categorias disponíveis
const categories = [
  { id: 'educacao', name: 'Educação' },
  { id: 'moradia', name: 'Moradia' },
  { id: 'emprego', name: 'Emprego e Carreira' },
  { id: 'documentacao', name: 'Documentação' },
  { id: 'transporte', name: 'Transporte' },
  { id: 'saude', name: 'Saúde' },
  { id: 'lazer', name: 'Lazer e Turismo' },
  { id: 'financeiro', name: 'Serviços Financeiros' },
  { id: 'traducao', name: 'Tradução e Idiomas' },
  { id: 'outros', name: 'Outros' },
];

const currencyMap: Record<string, CurrencyCode> = {
  'irlanda': 'EUR',
  'dubai': 'AED',
  'australia': 'AUD',
  'malta': 'EUR',
  'canada': 'CAD',
  'espanha': 'EUR',
};

// Validação do formulário
const serviceSchema = z.object({
  title: z.string().min(5, "O título deve ter pelo menos 5 caracteres").max(100, "O título não pode ter mais de 100 caracteres"),
  description: z.string().min(20, "A descrição deve ter pelo menos 20 caracteres"),
  price: z.coerce.number().positive("O preço deve ser maior que zero"),
  category: z.string().min(1, "Selecione uma categoria"),
  subcategory: z.string().optional(),
  countries: z.array(z.string()).min(1, "Selecione pelo menos um país"),
  status: z.enum(["active", "inactive"]),
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

const ServiceEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      category: "",
      subcategory: "",
      countries: [],
      status: "active",
    },
  });

  // Buscar dados do serviço para edição
  useEffect(() => {
    const fetchServiceData = async () => {
      if (!id) return;
      
      setIsLoading(true);
      
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) {
          toast({
            title: "Erro ao carregar serviço",
            description: error.message,
            variant: "destructive",
          });
          navigate('/user-services');
          return;
        }
        
        if (data) {
          form.reset({
            title: data.title,
            description: data.description,
            price: data.price,
            category: data.category,
            subcategory: data.subcategory || "",
            countries: data.countries || [],
            status: data.status,
          });
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os dados do serviço.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchServiceData();
  }, [id, navigate, toast, form]);

  const onSubmit = async (values: ServiceFormValues) => {
    if (!id) return;
    
    setIsSubmitting(true);
    
    try {
      // Obter a moeda com base no primeiro país selecionado
      const firstCountry = values.countries[0];
      const currency = currencyMap[firstCountry] || 'BRL';
      
      // Converter o preço para BRL (simplificado, deve usar API de conversão real)
      const convertToBRL = (amount: number, currencyCode: CurrencyCode): number => {
        const rates: Record<CurrencyCode, number> = {
          BRL: 1,
          EUR: 5.5,
          USD: 5.0,
          CAD: 3.7,
          AUD: 3.4,
          AED: 1.4,
          GBP: 6.5
        };
        
        return amount * rates[currencyCode];
      };
      
      const priceBRL = convertToBRL(values.price, currency);
      
      const { error } = await supabase
        .from('services')
        .update({
          title: values.title,
          description: values.description,
          price: values.price,
          price_brl: priceBRL,
          currency: currency,
          category: values.category,
          subcategory: values.subcategory,
          countries: values.countries,
          status: values.status,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      toast({
        title: "Serviço atualizado",
        description: "As alterações foram salvas com sucesso.",
      });
      
      navigate('/user-services');
    } catch (error: any) {
      toast({
        title: "Erro ao salvar",
        description: error.message || "Ocorreu um erro ao atualizar o serviço.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    
    setIsDeleting(true);
    
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      toast({
        title: "Serviço excluído",
        description: "O serviço foi removido com sucesso.",
      });
      
      navigate('/user-services');
    } catch (error: any) {
      toast({
        title: "Erro ao excluir",
        description: error.message || "Não foi possível excluir o serviço.",
        variant: "destructive",
      });
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center mb-6">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1"
              onClick={() => navigate('/user-services')}
            >
              <ChevronLeft className="h-4 w-4" />
              Voltar para Serviços
            </Button>
          </div>
          
          <div className="flex gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" disabled={isDeleting}>
                  {isDeleting ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2 h-4 w-4 border-2 border-b-0 border-r-0 rounded-full"></span>
                      Excluindo...
                    </span>
                  ) : (
                    <>
                      <Trash className="h-4 w-4 mr-2" />
                      Excluir Serviço
                    </>
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Excluir serviço?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta ação não pode ser desfeita. O serviço será permanentemente excluído do sistema.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Excluir
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight">Editar Serviço</h1>
          <p className="text-muted-foreground">
            Atualize as informações do seu serviço para atrair mais clientes.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome do seu serviço" {...field} />
                        </FormControl>
                        <FormDescription>
                          Um título claro e direto atrai mais clientes.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Descreva o seu serviço em detalhes..."
                            rows={6}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Inclua informações importantes sobre o que está oferecendo.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preço</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="0"
                              step="0.01"
                              placeholder="0.00"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Preço na moeda local do país principal.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Categoria</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione uma categoria" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Escolha a categoria que melhor descreve seu serviço.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="subcategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subcategoria (opcional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Subcategoria" {...field} />
                        </FormControl>
                        <FormDescription>
                          Adicione uma especificação mais detalhada do seu serviço.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="countries"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel>Países Disponíveis</FormLabel>
                          <FormDescription>
                            Selecione os países onde seu serviço estará disponível.
                          </FormDescription>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {availableCountries.map((country) => (
                            <FormField
                              key={country.id}
                              control={form.control}
                              name="countries"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={country.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(country.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, country.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== country.id
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {country.name}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Ativo</SelectItem>
                            <SelectItem value="inactive">Inativo</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Serviços inativos não aparecem nas pesquisas.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end">
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <span className="animate-spin mr-2 h-4 w-4 border-2 border-b-0 border-r-0 rounded-full"></span>
                          Salvando...
                        </span>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Salvar Alterações
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ServiceEdit;
