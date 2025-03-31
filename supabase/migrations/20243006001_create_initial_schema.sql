
-- Criação das tabelas principais do sistema

-- Tabela de usuários
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT,
  user_type TEXT NOT NULL CHECK (user_type IN ('client', 'advertiser', 'admin')),
  profile_image TEXT,
  description TEXT,
  country TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Tabela de serviços
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  advertiser_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  price_brl DECIMAL(10, 2) NOT NULL,
  currency TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT,
  countries TEXT[] NOT NULL, -- Array de países onde o serviço está disponível
  status TEXT NOT NULL CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Tabela de negociações
CREATE TABLE public.negotiations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  advertiser_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  offered_amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'accepted', 'rejected', 'counter_offer')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Tabela de transações
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  advertiser_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('credit_card', 'bank_transfer', 'pix', 'boleto')),
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'refunded', 'cancelled', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Tabela de avaliações
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  advertiser_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Tabela de mensagens
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  negotiation_id UUID REFERENCES public.negotiations(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  read_at TIMESTAMP WITH TIME ZONE
);

-- Função para atualizar o timestamp de updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para atualizar o updated_at
CREATE TRIGGER set_users_updated_at
BEFORE UPDATE ON public.users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_services_updated_at
BEFORE UPDATE ON public.services
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_negotiations_updated_at
BEFORE UPDATE ON public.negotiations
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_transactions_updated_at
BEFORE UPDATE ON public.transactions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Políticas de segurança (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.negotiations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Permitir que administradores acessem todas as tabelas
CREATE POLICY admin_all_users ON public.users FOR ALL TO authenticated USING (auth.uid() IN (SELECT id FROM public.users WHERE user_type = 'admin'));
CREATE POLICY admin_all_services ON public.services FOR ALL TO authenticated USING (auth.uid() IN (SELECT id FROM public.users WHERE user_type = 'admin'));
CREATE POLICY admin_all_negotiations ON public.negotiations FOR ALL TO authenticated USING (auth.uid() IN (SELECT id FROM public.users WHERE user_type = 'admin'));
CREATE POLICY admin_all_transactions ON public.transactions FOR ALL TO authenticated USING (auth.uid() IN (SELECT id FROM public.users WHERE user_type = 'admin'));
CREATE POLICY admin_all_reviews ON public.reviews FOR ALL TO authenticated USING (auth.uid() IN (SELECT id FROM public.users WHERE user_type = 'admin'));
CREATE POLICY admin_all_messages ON public.messages FOR ALL TO authenticated USING (auth.uid() IN (SELECT id FROM public.users WHERE user_type = 'admin'));

-- Políticas para usuários regulares
-- Services: anunciantes podem gerenciar seus próprios serviços
CREATE POLICY advertiser_manage_own_services ON public.services 
  FOR ALL TO authenticated 
  USING (advertiser_id = auth.uid());

-- Services: todos podem ver serviços ativos
CREATE POLICY everyone_view_active_services ON public.services 
  FOR SELECT TO authenticated 
  USING (status = 'active');

-- Negotiations: clientes e anunciantes podem ver suas próprias negociações
CREATE POLICY client_view_own_negotiations ON public.negotiations 
  FOR SELECT TO authenticated 
  USING (client_id = auth.uid() OR advertiser_id = auth.uid());

-- Negotiations: clientes podem criar negociações
CREATE POLICY client_create_negotiations ON public.negotiations 
  FOR INSERT TO authenticated 
  WITH CHECK (client_id = auth.uid());

-- Negotiations: ambas as partes podem atualizar negociações
CREATE POLICY update_own_negotiations ON public.negotiations 
  FOR UPDATE TO authenticated 
  USING (client_id = auth.uid() OR advertiser_id = auth.uid());

-- Messages: usuários podem ver mensagens enviadas para eles ou por eles
CREATE POLICY view_own_messages ON public.messages 
  FOR SELECT TO authenticated 
  USING (sender_id = auth.uid() OR recipient_id = auth.uid());

-- Messages: usuários podem enviar mensagens
CREATE POLICY send_messages ON public.messages 
  FOR INSERT TO authenticated 
  WITH CHECK (sender_id = auth.uid());

-- Reviews: todos podem ver avaliações
CREATE POLICY everyone_view_reviews ON public.reviews 
  FOR SELECT TO authenticated 
  USING (true);

-- Reviews: clientes podem criar avaliações
CREATE POLICY client_create_reviews ON public.reviews 
  FOR INSERT TO authenticated 
  WITH CHECK (client_id = auth.uid());

-- Transactions: usuários podem ver suas próprias transações
CREATE POLICY view_own_transactions ON public.transactions 
  FOR SELECT TO authenticated 
  USING (client_id = auth.uid() OR advertiser_id = auth.uid());
