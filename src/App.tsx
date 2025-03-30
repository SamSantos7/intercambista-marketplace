
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DashboardAlt from "./pages/DashboardAlt";
import Services from "./pages/Services";
import UserServices from "./pages/UserServices";
import ClientServices from "./pages/ClientServices";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ServiceDetail from "./pages/ServiceDetail";
import ServiceDetailWithReviews from "./pages/ServiceDetailWithReviews";
import Blog from "./pages/Blog";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import FAQ from "./pages/FAQ";
import Cookies from "./pages/Cookies";
import Customers from "./pages/dashboard/Customers";
import Messages from "./pages/dashboard/Messages";
import Payments from "./pages/dashboard/Payments";
import PaymentDetail from "./pages/dashboard/PaymentDetail";
import Analytics from "./pages/dashboard/Analytics";
import Settings from "./pages/dashboard/Settings";
import ServicePromotion from "./pages/dashboard/ServicePromotion";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Páginas públicas */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/services/:id/reviews" element={<ServiceDetailWithReviews />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/cookies" element={<Cookies />} />
          
          {/* Páginas do dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard-alt" element={<DashboardAlt />} />
          
          {/* Páginas de perfil e serviços do usuário */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/user-services" element={<UserServices />} />
          <Route path="/client-services" element={<ClientServices />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/messages" element={<Messages />} />
          
          {/* Páginas de pagamentos */}
          <Route path="/payments" element={<Payments />} />
          <Route path="/payments/:id" element={<PaymentDetail />} />
          
          {/* Outras páginas */}
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/services/promote/:id" element={<ServicePromotion />} />
          <Route path="/admin" element={<AdminDashboard />} />
          
          {/* Rotas do Dashboard (mantidas para compatibilidade) */}
          <Route path="/dashboard/services" element={<UserServices />} />
          <Route path="/dashboard/client-services" element={<ClientServices />} />
          <Route path="/dashboard/customers" element={<Customers />} />
          <Route path="/dashboard/messages" element={<Messages />} />
          <Route path="/dashboard/payments" element={<Payments />} />
          <Route path="/dashboard/payments/:id" element={<PaymentDetail />} />
          <Route path="/dashboard/analytics" element={<Analytics />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/services/promote/:id" element={<ServicePromotion />} />
          
          {/* Rota 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
