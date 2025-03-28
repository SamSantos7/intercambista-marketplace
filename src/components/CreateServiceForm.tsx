
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

// Define the interface for form data
interface ServiceFormValues {
  title: string;
  description: string;
  price: number;
  category: string;
  subcategory: string;
  status: 'active' | 'inactive' | 'pending';
  image: string;
  highlights: boolean;
}

// Define the prop types for the component
interface CreateServiceFormProps {
  onSubmit: (data: Omit<ServiceFormValues, 'id' | 'bookings' | 'rating' | 'createdAt'>) => void;
  onCancel: () => void;
}

const categoryOptions = [
  { label: 'Educação', value: 'Educação', subcategories: ['Aulas de Idiomas', 'Reforço Escolar', 'Preparação para Exames'] },
  { label: 'Serviços Profissionais', value: 'Serviços Profissionais', subcategories: ['Tradução', 'Revisão', 'Assistente Virtual'] },
  { label: 'Tecnologia', value: 'Tecnologia', subcategories: ['Web Design', 'Programação', 'Suporte Técnico'] },
  { label: 'Arte e Mídia', value: 'Arte e Mídia', subcategories: ['Fotografia', 'Vídeo', 'Design Gráfico'] },
  { label: 'Bem-estar', value: 'Bem-estar', subcategories: ['Personal Trainer', 'Nutrição', 'Yoga'] },
  { label: 'Serviços Domésticos', value: 'Serviços Domésticos', subcategories: ['Limpeza', 'Cozinha', 'Babysitting'] },
];

// Create a schema for form validation
const formSchema = z.object({
  title: z.string().min(5, "Título deve ter pelo menos 5 caracteres").max(100, "Título muito longo"),
  description: z.string().min(20, "Descrição deve ter pelo menos 20 caracteres").max(500, "Descrição muito longa"),
  price: z.coerce.number().positive("Preço deve ser positivo"),
  category: z.string().min(1, "Selecione uma categoria"),
  subcategory: z.string().min(1, "Selecione uma subcategoria"),
  status: z.enum(['active', 'inactive', 'pending']).default('pending'),
  image: z.string().url("URL inválida").or(z.string().length(0)),
  highlights: z.boolean().default(false),
});

const CreateServiceForm: React.FC<CreateServiceFormProps> = ({ onSubmit, onCancel }) => {
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      category: '',
      subcategory: '',
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1557318041-1ce374d55ebf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      highlights: false,
    },
  });

  const watchCategory = form.watch("category");
  const subcategories = categoryOptions.find(cat => cat.value === watchCategory)?.subcategories || [];

  const handleSubmit = (values: ServiceFormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título do serviço</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ex: Aulas de Inglês para Iniciantes" />
              </FormControl>
              <FormDescription>
                Escolha um título claro e atrativo para seu serviço.
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
                  {...field} 
                  placeholder="Descreva em detalhes o serviço que você oferece..." 
                  className="min-h-32"
                />
              </FormControl>
              <FormDescription>
                Seja detalhado para que os clientes entendam exatamente o que você oferece.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço (R$)</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="0.01" {...field} />
                </FormControl>
                <FormDescription>
                  Valor por hora ou por serviço completo.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL da imagem</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="https://exemplo.com/imagem.jpg" />
                </FormControl>
                <FormDescription>
                  URL de uma imagem para ilustrar seu serviço.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categorias</SelectLabel>
                      {categoryOptions.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="subcategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subcategoria</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!watchCategory}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma subcategoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Subcategorias</SelectLabel>
                      {subcategories.map((subcat) => (
                        <SelectItem key={subcat} value={subcat}>
                          {subcat}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="highlights"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Destaque</FormLabel>
                <FormDescription>
                  Solicitar destaque para este serviço (sujeito a taxa adicional).
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-4 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">
            Publicar Serviço
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateServiceForm;
