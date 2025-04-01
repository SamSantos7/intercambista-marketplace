
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await signOut();
    // No need to navigate - AuthContext will handle redirection
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 lg:px-10",
        isScrolled ? "py-3 glass" : "py-6 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 animate-fade-in">
          <span className="font-semibold text-xl tracking-tight">Intercambista</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 animate-fade-in">
          <NavLink to="/" label="Home" />
          <NavLink to="/services" label="Serviços" />
          <NavLink to="/about" label="Sobre" />
          <NavLink to="/contact" label="Contato" />
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4 animate-fade-in">
          {user ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Sair
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Entrar</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/register">Cadastrar</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 animate-fade-in" />
          ) : (
            <Menu className="h-6 w-6 animate-fade-in" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass py-4 animate-slide-down">
          <nav className="flex flex-col px-6 gap-4">
            <NavLink to="/" label="Home" mobile />
            <NavLink to="/services" label="Serviços" mobile />
            <NavLink to="/about" label="Sobre" mobile />
            <NavLink to="/contact" label="Contato" mobile />
            <div className="flex flex-col gap-2 pt-4 border-t">
              {user ? (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/dashboard" className="flex items-center gap-2">
                      <User size={16} /> Dashboard
                    </Link>
                  </Button>
                  <Button size="sm" onClick={handleLogout}>
                    Sair
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/login" className="flex items-center gap-2">
                      <User size={16} /> Entrar
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link to="/register">Cadastrar</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  mobile?: boolean;
}

const NavLink = ({ to, label, mobile }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        "transition-colors duration-200 text-link",
        mobile ? "py-2" : "",
        isActive 
          ? "text-primary font-medium" 
          : "text-foreground/80 hover:text-foreground"
      )}
    >
      {label}
    </Link>
  );
};

export default Navbar;
