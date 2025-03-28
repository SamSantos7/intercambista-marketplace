
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="shadow-lg max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h1 className="text-4xl font-bold mb-8">Termos de Uso</h1>
              
              <div className="space-y-6">
                <section>
                  <h2 className="text-2xl font-semibold mb-4">1. Aceitação dos Termos</h2>
                  <p className="mb-2">
                    Ao acessar e utilizar a plataforma Intercambista, você aceita e concorda em cumprir os termos e condições estabelecidos neste documento. Se não concordar com qualquer parte destes termos, solicitamos que não utilize nossos serviços.
                  </p>
                  <p>
                    Estes termos podem ser atualizados periodicamente sem aviso prévio. É responsabilidade do usuário verificar regularmente se houve alterações.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">2. Descrição do Serviço</h2>
                  <p className="mb-2">
                    A plataforma Intercambista é um marketplace que conecta estudantes internacionais a prestadores de serviços. Nosso objetivo é facilitar o acesso a serviços essenciais durante o período de intercâmbio no Brasil.
                  </p>
                  <p>
                    Atuamos como intermediários e não somos responsáveis diretamente pela execução dos serviços oferecidos na plataforma.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">3. Elegibilidade</h2>
                  <p className="mb-2">
                    Para utilizar nossos serviços, você deve ter pelo menos 18 anos de idade ou a maioridade legal em seu país de residência, o que for maior.
                  </p>
                  <p>
                    Ao criar uma conta em nossa plataforma, você afirma que todas as informações fornecidas são verdadeiras, precisas e completas.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">4. Cadastro e Conta</h2>
                  <p className="mb-2">
                    Você é responsável por manter a confidencialidade de suas credenciais de acesso e por todas as atividades realizadas em sua conta.
                  </p>
                  <p className="mb-2">
                    Reservamo-nos o direito de suspender ou encerrar contas que violem nossos termos ou que apresentem atividades suspeitas.
                  </p>
                  <p>
                    As informações fornecidas durante o cadastro serão tratadas conforme nossa Política de Privacidade.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">5. Responsabilidades dos Usuários</h2>
                  <h3 className="text-xl font-medium mb-2">5.1 Estudantes (Contratantes)</h3>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Fornecer informações precisas sobre os serviços desejados</li>
                    <li>Cumprir com os compromissos agendados</li>
                    <li>Realizar o pagamento conforme acordado</li>
                    <li>Avaliar os prestadores de serviço de forma justa e honesta</li>
                  </ul>

                  <h3 className="text-xl font-medium mb-2">5.2 Prestadores de Serviço</h3>
                  <ul className="list-disc pl-6">
                    <li>Oferecer serviços de qualidade conforme anunciado</li>
                    <li>Manter as informações de perfil atualizadas</li>
                    <li>Cumprir com os compromissos agendados</li>
                    <li>Respeitar as políticas de cancelamento</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">6. Pagamentos e Taxas</h2>
                  <p className="mb-2">
                    A plataforma Intercambista cobra uma taxa de serviço sobre cada transação realizada através da plataforma.
                  </p>
                  <p className="mb-2">
                    Os valores dos serviços são definidos pelos prestadores, e os pagamentos são processados através de nosso sistema seguro.
                  </p>
                  <p>
                    Reembolsos serão processados de acordo com nossa política de cancelamento e as circunstâncias específicas de cada caso.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">7. Propriedade Intelectual</h2>
                  <p className="mb-2">
                    Todo o conteúdo disponível na plataforma Intercambista, incluindo mas não se limitando a textos, gráficos, logotipos, imagens e software, é propriedade da Intercambista ou de seus licenciadores e está protegido por leis de propriedade intelectual.
                  </p>
                  <p>
                    É proibida a reprodução, modificação, distribuição ou uso de qualquer conteúdo da plataforma sem autorização prévia.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">8. Limitação de Responsabilidade</h2>
                  <p className="mb-2">
                    A plataforma Intercambista não se responsabiliza pela qualidade dos serviços prestados pelos usuários cadastrados como prestadores de serviço.
                  </p>
                  <p className="mb-2">
                    Não nos responsabilizamos por quaisquer danos diretos, indiretos, incidentais ou consequentes resultantes do uso ou incapacidade de uso de nossos serviços.
                  </p>
                  <p>
                    Em caso de disputa entre usuários, faremos o possível para mediar e encontrar uma solução satisfatória, mas não garantimos resultados específicos.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">9. Modificações do Serviço</h2>
                  <p>
                    Reservamo-nos o direito de modificar, suspender ou interromper qualquer parte de nossos serviços a qualquer momento, com ou sem aviso prévio, sem incorrer em qualquer responsabilidade perante os usuários ou terceiros.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">10. Legislação Aplicável</h2>
                  <p>
                    Estes termos são regidos e interpretados de acordo com as leis do Brasil. Qualquer disputa relacionada a estes termos será submetida à jurisdição exclusiva dos tribunais brasileiros.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">11. Contato</h2>
                  <p>
                    Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco através do email: termos@intercambista.com
                  </p>
                </section>

                <p className="text-sm text-gray-500 mt-8">
                  Última atualização: 10 de Junho de 2023
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
