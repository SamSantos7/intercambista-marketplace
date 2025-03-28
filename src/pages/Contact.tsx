
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from "lucide-react";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui seria implementada a lógica para enviar o formulário
    console.log("Formulário enviado");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl font-bold mb-8 text-center">Entre em Contato</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Envie uma Mensagem</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium">
                      Nome Completo
                    </label>
                    <Input
                      id="name"
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu.email@exemplo.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block mb-2 text-sm font-medium">
                      Assunto
                    </label>
                    <Input
                      id="subject"
                      placeholder="Assunto da mensagem"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block mb-2 text-sm font-medium">
                      Mensagem
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Digite sua mensagem aqui..."
                      rows={4}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Enviar Mensagem
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Informações de Contato</h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 mt-1 mr-3 text-primary" />
                      <div>
                        <h3 className="font-semibold">Endereço</h3>
                        <p className="text-gray-600">
                          Av. Paulista, 1000, Bela Vista<br />
                          São Paulo - SP, 01310-000<br />
                          Brasil
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Phone className="w-5 h-5 mt-1 mr-3 text-primary" />
                      <div>
                        <h3 className="font-semibold">Telefone</h3>
                        <p className="text-gray-600">+55 (11) 1234-5678</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Mail className="w-5 h-5 mt-1 mr-3 text-primary" />
                      <div>
                        <h3 className="font-semibold">Email</h3>
                        <p className="text-gray-600">contato@intercambista.com</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Horário de Atendimento</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Segunda a Sexta</span>
                      <span>9:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sábado</span>
                      <span>10:00 - 14:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Domingo</span>
                      <span>Fechado</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="w-full h-80 bg-gray-200 rounded-lg shadow-lg">
            {/* Aqui seria inserido um mapa (Google Maps, etc.) */}
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Mapa será carregado aqui
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
