
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, 
  Phone, MapPin, Heart
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/50 border-t">
      <div className="container px-4 md:px-6 py-16">
        <div className="grid gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-semibold text-xl tracking-tight">Intercambista</span>
            </Link>
            <p className="text-muted-foreground">
              Conectando intercambistas a oportunidades de renda extra, com segurança e simplicidade.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <SocialLink href="https://facebook.com" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </SocialLink>
              <SocialLink href="https://instagram.com" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </SocialLink>
              <SocialLink href="https://twitter.com" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </SocialLink>
              <SocialLink href="https://linkedin.com" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Navegação</h3>
            <nav className="flex flex-col gap-2">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/services">Serviços</FooterLink>
              <FooterLink to="/about">Sobre Nós</FooterLink>
              <FooterLink to="/contact">Contato</FooterLink>
              <FooterLink to="/blog">Blog</FooterLink>
            </nav>
          </div>

          {/* Links 2 */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Informações</h3>
            <nav className="flex flex-col gap-2">
              <FooterLink to="/terms">Termos de Uso</FooterLink>
              <FooterLink to="/privacy">Política de Privacidade</FooterLink>
              <FooterLink to="/faq">Perguntas Frequentes</FooterLink>
              <FooterLink to="/support">Suporte</FooterLink>
              <FooterLink to="/cookies">Política de Cookies</FooterLink>
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Contato</h3>
            <div className="space-y-3 text-muted-foreground">
              <ContactItem icon={<Mail className="h-4 w-4" />}>
                <a href="mailto:contato@intercambista.com" className="hover:text-foreground transition-colors">
                  contato@intercambista.com
                </a>
              </ContactItem>
              <ContactItem icon={<Phone className="h-4 w-4" />}>
                <a href="tel:+551199999999" className="hover:text-foreground transition-colors">
                  +55 (11) 9999-9999
                </a>
              </ContactItem>
              <ContactItem icon={<MapPin className="h-4 w-4" />}>
                São Paulo, Brasil
              </ContactItem>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t pt-6 flex flex-col md:flex-row gap-4 justify-between items-center">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {currentYear} Intercambista. Todos os direitos reservados.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Feito com <Heart className="h-3 w-3 text-red-500 fill-red-500" /> no Brasil
          </p>
        </div>
      </div>
    </footer>
  );
};

interface SocialLinkProps {
  href: string;
  children: React.ReactNode;
  'aria-label': string;
}

const SocialLink = ({ href, children, 'aria-label': ariaLabel }: SocialLinkProps) => (
  <a 
    href={href}
    className="h-8 w-8 rounded-full bg-background border flex items-center justify-center transition-colors hover:bg-primary hover:text-primary-foreground"
    target="_blank"
    rel="noopener noreferrer"
    aria-label={ariaLabel}
  >
    {children}
  </a>
);

interface FooterLinkProps {
  to: string;
  children: React.ReactNode;
}

const FooterLink = ({ to, children }: FooterLinkProps) => (
  <Link 
    to={to} 
    className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-link"
  >
    {children}
  </Link>
);

interface ContactItemProps {
  icon: React.ReactNode;
  children: React.ReactNode;
}

const ContactItem = ({ icon, children }: ContactItemProps) => (
  <div className="flex items-center gap-2">
    <span className="text-primary">{icon}</span>
    <span>{children}</span>
  </div>
);

export default Footer;
