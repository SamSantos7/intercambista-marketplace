
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="shadow-lg max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h1 className="text-4xl font-bold mb-8">Perguntas Frequentes</h1>
              
              <p className="mb-8 text-lg text-muted-foreground">
                Encontre respostas para as dúvidas mais comuns sobre nossa plataforma e como ela funciona para estudantes internacionais.
              </p>
              
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1" className="border rounded-lg px-4">
                  <AccordionTrigger className="text-lg font-medium py-4">
                    O que é a plataforma Intercambista?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    A plataforma Intercambista é um marketplace que conecta estudantes internacionais a serviços 
                    essenciais durante seu período de intercâmbio no Brasil, além de permitir que intercambistas
                    ofereçam seus próprios serviços para gerar uma renda extra durante sua estadia.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border rounded-lg px-4">
                  <AccordionTrigger className="text-lg font-medium py-4">
                    Quem pode se cadastrar na plataforma?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    Nossa plataforma é aberta para estudantes internacionais que estão realizando intercâmbio 
                    no Brasil e brasileiros que estão em intercâmbio no exterior. Também aceitamos prestadores
                    de serviços locais que desejam oferecer serviços especializados para estudantes internacionais.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border rounded-lg px-4">
                  <AccordionTrigger className="text-lg font-medium py-4">
                    É gratuito utilizar a plataforma?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    Sim, o cadastro e a navegação na plataforma são totalmente gratuitos. Cobramos apenas uma 
                    pequena taxa sobre as transações realizadas através da plataforma para manter nossos serviços.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border rounded-lg px-4">
                  <AccordionTrigger className="text-lg font-medium py-4">
                    Como funciona o pagamento dos serviços?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    A plataforma funciona como intermediária para garantir segurança nas transações. O pagamento 
                    é feito através da nossa plataforma e só é liberado para o prestador de serviços quando o 
                    cliente confirma a conclusão satisfatória do serviço.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="border rounded-lg px-4">
                  <AccordionTrigger className="text-lg font-medium py-4">
                    Preciso de alguma permissão especial para oferecer serviços como intercambista?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    As regras variam de acordo com o tipo de visto e país de origem. Recomendamos que você verifique 
                    as leis de imigração e trabalho aplicáveis ao seu caso. Em geral, estudantes com visto de 
                    estudante podem realizar trabalhos part-time com algumas limitações.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6" className="border rounded-lg px-4">
                  <AccordionTrigger className="text-lg font-medium py-4">
                    Como a plataforma garante a segurança dos usuários?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    Implementamos um sistema de verificação de identidade, avaliações e comentários dos usuários,
                    além de monitoramento de transações e um canal de suporte para resolução de problemas. Também 
                    mantemos os pagamentos em custódia até a confirmação da conclusão do serviço.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7" className="border rounded-lg px-4">
                  <AccordionTrigger className="text-lg font-medium py-4">
                    Quais tipos de serviços posso encontrar na plataforma?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    Nossa plataforma oferece uma ampla variedade de serviços, incluindo aulas de idiomas, 
                    assistência com documentação, acomodação, serviços de limpeza, tradução, design, programação,
                    fotografia, entre outros. Os serviços são categorizados para facilitar a busca.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8" className="border rounded-lg px-4">
                  <AccordionTrigger className="text-lg font-medium py-4">
                    Como posso cancelar um serviço contratado?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    Você pode solicitar o cancelamento de um serviço através da plataforma. As condições de 
                    reembolso dependem da política de cancelamento definida pelo prestador de serviços e do 
                    tempo de antecedência com que o cancelamento foi solicitado. Todos os detalhes estão 
                    disponíveis na página do serviço antes da contratação.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-9" className="border rounded-lg px-4">
                  <AccordionTrigger className="text-lg font-medium py-4">
                    Posso usar a plataforma após retornar ao meu país de origem?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    Sim, você pode continuar utilizando a plataforma mesmo após retornar ao seu país de origem,
                    seja para oferecer serviços remotos ou para se preparar para uma futura viagem ao Brasil.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-10" className="border rounded-lg px-4">
                  <AccordionTrigger className="text-lg font-medium py-4">
                    Como entro em contato com o suporte da plataforma?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    Você pode entrar em contato com nosso suporte através do email suporte@intercambista.com ou 
                    pelo formulário de contato disponível na página "Contato". Nossa equipe está disponível para 
                    atendimento em português, inglês e espanhol.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <div className="mt-10 p-6 bg-secondary/30 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Ainda tem dúvidas?</h2>
                <p className="mb-4">
                  Se você não encontrou a resposta para sua pergunta, entre em contato conosco diretamente.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="/contact" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                    Contato
                  </a>
                  <a href="mailto:suporte@intercambista.com" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                    suporte@intercambista.com
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
