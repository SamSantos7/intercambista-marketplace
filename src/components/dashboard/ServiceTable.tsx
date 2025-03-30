
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MoreHorizontal,
  Edit,
  Trash2,
  ExternalLink,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

type ServiceStatus = 'pending' | 'active' | 'completed' | 'cancelled';

interface Service {
  id: string;
  title: string;
  price: number;
  status: ServiceStatus;
  featured: boolean;
  views: number;
  clicks: number;
  created: string;
}

interface ServiceTableProps {
  services: Service[];
  onDelete: (id: string) => void;
  onPromote: (id: string) => void;
}

const getStatusDetails = (status: ServiceStatus) => {
  switch (status) {
    case 'pending':
      return {
        label: 'Pendente',
        color: 'bg-yellow-100 text-yellow-800',
        icon: <Clock className="h-3 w-3" />
      };
    case 'active':
      return {
        label: 'Ativo',
        color: 'bg-green-100 text-green-800',
        icon: <CheckCircle className="h-3 w-3" />
      };
    case 'completed':
      return {
        label: 'Concluído',
        color: 'bg-blue-100 text-blue-800',
        icon: <CheckCircle className="h-3 w-3" />
      };
    case 'cancelled':
      return {
        label: 'Cancelado',
        color: 'bg-gray-100 text-gray-800',
        icon: <AlertTriangle className="h-3 w-3" />
      };
  }
};

const ServiceTable: React.FC<ServiceTableProps> = ({ services, onDelete, onPromote }) => {
  const { toast } = useToast();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setServiceToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (serviceToDelete) {
      onDelete(serviceToDelete);
      toast({
        title: "Serviço excluído",
        description: "O serviço foi excluído com sucesso.",
      });
    }
    setIsDeleteDialogOpen(false);
    setServiceToDelete(null);
  };

  const handlePromote = (id: string) => {
    onPromote(id);
    toast({
      title: "Serviço destacado",
      description: "Seu serviço agora aparecerá em destaque nas buscas.",
    });
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Serviço</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead className="text-center">Destaque</TableHead>
            <TableHead className="text-right">Visualizações</TableHead>
            <TableHead className="text-right">Cliques</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => {
            const status = getStatusDetails(service.status);
            
            return (
              <TableRow key={service.id}>
                <TableCell className="font-medium">
                  <div>
                    <Link 
                      to={`/services/${service.id}`} 
                      className="hover:underline font-medium"
                    >
                      {service.title}
                    </Link>
                    <div className="text-xs text-muted-foreground mt-1">
                      Criado em {service.created}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={`${status.color} flex w-fit gap-1 items-center`}
                  >
                    {status.icon}
                    {status.label}
                  </Badge>
                </TableCell>
                <TableCell>R$ {service.price.toFixed(2)}</TableCell>
                <TableCell className="text-center">
                  {service.featured ? (
                    <Badge className="bg-primary">Destacado</Badge>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handlePromote(service.id)}
                    >
                      Destacar
                    </Button>
                  )}
                </TableCell>
                <TableCell className="text-right">{service.views}</TableCell>
                <TableCell className="text-right">{service.clicks}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Abrir menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to={`/services/${service.id}`} className="flex items-center">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Ver anúncio
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to={`/dashboard/services/edit/${service.id}`} className="flex items-center">
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600"
                        onClick={() => handleDeleteClick(service.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O serviço será permanentemente excluído
              e não poderá mais ser acessado pelos usuários.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ServiceTable;
