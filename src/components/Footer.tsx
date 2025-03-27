
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
              <SocialLink href="#" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </SocialLink>
              <SocialLink href="#" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </SocialLink>
              <SocialLink href="#" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </SocialLink>
              <SocialLink href="#" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Navegação</h3>
            <nav className="flex flex-col gap-2">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/services">Serviços</FooterLink>
              <FooterLink href="/about">Sobre Nós</FooterLink>
              <FooterLink href="/contact">Contato</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
            </nav>
          </div>

          {/* Links 2 */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Informações</h3>
            <nav className="flex flex-col gap-2">
              <FooterLink href="/terms">Termos de Uso</FooterLink>
              <FooterLink href="/privacy">Política de Privacidade</FooterLink>
              <FooterLink href="/faq">Perguntas Frequentes</FooterLink>
              <FooterLink href="/support">Suporte</FooterLink>
              <FooterLink href="/cookies">Política de Cookies</FooterLink>
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Contato</h3>
            <div className="space-y-3 text-muted-foreground">
              <ContactItem icon={<Mail className="h-4 w-4" />}>
                contato@intercambista.com
              </ContactItem>
              <ContactItem icon={<Phone className="h-4 w-4" />}>
                +55 (11) 9999-9999
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
  href: string;
  children: React.ReactNode;
}

const FooterLink = ({ href, children }: FooterLinkProps) => (
  <Link 
    to={href} 
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
