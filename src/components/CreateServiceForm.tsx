
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Plus, X, Upload, Check } from 'lucide-react';

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
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Validação do formulário
const serviceSchema = z.object({
  title: z.string().min(5, "Título deve ter pelo menos 5 caracteres").max(100, "Título deve ter no máximo 100 caracteres"),
  description: z.string().min(30, "Descrição deve ter pelo menos 30 caracteres"),
  category: z.string().min(1, "Selecione uma categoria"),
  subcategory: z.string().min(1, "Selecione uma subcategoria"),
  price: z.string().refine(val => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0;
  }, "Preço deve ser um número positivo"),
  availability: z.string().min(1, "Informe sua disponibilidade"),
});

// Categorias e subcategorias disponíveis
const categories = {
  "education": {
    name: "Educação",
    subcategories: ["Aulas de Idiomas", "Tutoria Acadêmica", "Revisão de Textos", "Orientação Acadêmica", "Aulas de Música"]
  },
  "professional": {
    name: "Serviços Profissionais",
    subcategories: ["Tradução", "Revisão de Currículo", "Consultoria", "Design Gráfico", "Redação"]
  },
  "technology": {
    name: "Tecnologia",
    subcategories: ["Web Design", "Desenvolvimento de Aplicativos", "Suporte Técnico", "Social Media", "SEO"]
  },
  "art": {
    name: "Arte e Mídia",
    subcategories: ["Fotografia", "Vídeo", "Ilustração", "Artesanato", "Música"]
  },
  "tourism": {
    name: "Turismo e Experiências",
    subcategories: ["Guia Turístico", "Experiências Culturais", "City Tour", "Passeios Temáticos", "Gastronomia"]
  }
};

interface CreateServiceFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
  isEdit?: boolean;
}

const CreateServiceForm = ({ onSubmit, onCancel, initialData, isEdit = false }: CreateServiceFormProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialData?.category || "");
  const [images, setImages] = useState<File[]>([]);
  const [imagesPreviews, setImagesPreviews] = useState<string[]>(initialData?.images || []);
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [currentTag, setCurrentTag] = useState("");

  const form = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      category: initialData?.category || "",
      subcategory: initialData?.subcategory || "",
      price: initialData?.price ? initialData.price.toString() : "",
      availability: initialData?.availability || "",
    },
  });

  // Lidar com mudança de categoria
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    form.setValue("category", value);
    form.setValue("subcategory", ""); // Reset subcategoria
  };

  // Lidar com upload de imagens
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      
      // Validar que não há muitas imagens
      if (images.length + newFiles.length > 5) {
        form.setError("root", {
          type: "manual",
          message: "Você pode adicionar no máximo 5 imagens"
        });
        return;
      }
      
      const newImages = [...images, ...newFiles];
      setImages(newImages);
      
      // Criar previews
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setImagesPreviews([...imagesPreviews, ...newPreviews]);
    }
  };

  // Remover uma imagem
  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    
    const newPreviews = [...imagesPreviews];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setImagesPreviews(newPreviews);
  };

  // Adicionar tag
  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      if (tags.length >= 10) {
        form.setError("root", {
          type: "manual",
          message: "Você pode adicionar no máximo 10 tags"
        });
        return;
      }
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  // Remover tag
  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  // Processar envio do formulário
  const processSubmit = (values: z.infer<typeof serviceSchema>) => {
    const serviceData = {
      ...values,
      price: parseFloat(values.price),
      images: imagesPreviews,
      tags,
      status: isEdit ? initialData?.status : 'pending',
      highlights: isEdit ? initialData?.highlights : false,
    };
    
    onSubmit(serviceData);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(processSubmit)} className="space-y-6">
          {/* Título */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título do serviço</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Aulas de Português para Estrangeiros" {...field} />
                </FormControl>
                <FormDescription>
                  Um título claro e objetivo para seu serviço
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Categoria */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select 
                    onValueChange={(value) => handleCategoryChange(value)} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(categories).map(([key, category]) => (
                        <SelectItem key={key} value={key}>{category.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Subcategoria */}
            <FormField
              control={form.control}
              name="subcategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subcategoria</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    disabled={!selectedCategory}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={selectedCategory ? "Selecione uma subcategoria" : "Selecione uma categoria primeiro"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {selectedCategory && categories[selectedCategory as keyof typeof categories].subcategories.map((subcat) => (
                        <SelectItem key={subcat} value={subcat}>{subcat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {/* Descrição */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Descreva detalhadamente o serviço que você oferece..." 
                    className="min-h-32"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Seja detalhado, explique o que está incluído, requisitos e benefícios do seu serviço
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Upload de imagens */}
          <div>
            <FormLabel>Imagens</FormLabel>
            <div className="mt-2 grid grid-cols-5 gap-4">
              {imagesPreviews.map((preview, index) => (
                <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                  <img 
                    src={preview} 
                    alt={`Preview ${index}`} 
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-background/70 rounded-full p-1 hover:bg-background/90"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              
              {imagesPreviews.length < 5 && (
                <label className="border border-dashed rounded-md flex items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors aspect-square">
                  <div className="flex flex-col items-center p-4">
                    <Upload size={20} className="text-muted-foreground mb-1" />
                    <span className="text-xs text-center text-muted-foreground">
                      Adicionar imagem
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
            <FormDescription className="mt-2">
              Adicione até 5 imagens com boa resolução (máx. 5MB cada)
            </FormDescription>
          </div>
          
          <Separator />
          
          {/* Preço */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço (R$)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      R$
                    </span>
                    <Input placeholder="0.00" className="pl-8" {...field} />
                  </div>
                </FormControl>
                <FormDescription>
                  Valor cobrado por este serviço
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Disponibilidade */}
          <FormField
            control={form.control}
            name="availability"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Disponibilidade</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Segunda a sexta, das 14h às 18h" {...field} />
                </FormControl>
                <FormDescription>
                  Informe sua disponibilidade para prestar este serviço
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Tags */}
          <div>
            <FormLabel>Tags (opcional)</FormLabel>
            <div className="flex gap-2 mt-1.5 mb-3">
              <Input 
                placeholder="Adicione tags relacionadas" 
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <Button type="button" onClick={addTag} size="icon">
                <Plus size={16} />
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1 pl-2">
                  {tag}
                  <button 
                    type="button" 
                    onClick={() => removeTag(tag)}
                    className="hover:bg-muted rounded-full"
                  >
                    <X size={14} />
                  </button>
                </Badge>
              ))}
            </div>
            
            <FormDescription className="mt-2">
              Adicione tags para ajudar os clientes a encontrar seu serviço
            </FormDescription>
          </div>
          
          {form.formState.errors.root && (
            <p className="text-sm text-destructive">{form.formState.errors.root.message}</p>
          )}
          
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit">
              {isEdit ? 'Salvar alterações' : 'Publicar serviço'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateServiceForm;
