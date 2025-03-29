
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="shadow-lg max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h1 className="text-4xl font-bold mb-8">Política de Privacidade</h1>
              
              <div className="space-y-6">
                <section>
                  <h2 className="text-2xl font-semibold mb-4">1. Introdução</h2>
                  <p className="mb-2">
                    A Intercambista está comprometida em proteger a sua privacidade. Esta política explica como coletamos, usamos e protegemos quaisquer informações pessoais que você forneça ao utilizar nossa plataforma.
                  </p>
                  <p>
                    Ao utilizar nossa plataforma, você concorda com a coleta e uso de informações de acordo com esta política. As informações pessoais que coletamos são usadas apenas para fornecer e melhorar o serviço. Não usaremos ou compartilharemos suas informações com ninguém, exceto conforme descrito nesta Política de Privacidade.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">2. Coleta de Informações</h2>
                  <p className="mb-2">
                    Para proporcionar uma melhor experiência ao usar nosso serviço, podemos solicitar que você nos forneça certas informações pessoalmente identificáveis, incluindo, mas não se limitando a:
                  </p>
                  <ul className="list-disc pl-6 mb-2">
                    <li>Nome completo</li>
                    <li>Endereço de e-mail</li>
                    <li>Número de telefone</li>
                    <li>Endereço</li>
                    <li>Dados do passaporte ou visto</li>
                    <li>Informações acadêmicas</li>
                    <li>Informações de pagamento</li>
                  </ul>
                  <p>
                    As informações que solicitamos serão retidas por nós e usadas conforme descrito nesta política de privacidade.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">3. Uso das Informações</h2>
                  <p className="mb-2">
                    As informações que coletamos são utilizadas para os seguintes propósitos:
                  </p>
                  <ul className="list-disc pl-6">
                    <li>Fornecer e manter nosso serviço</li>
                    <li>Notificá-lo sobre mudanças em nosso serviço</li>
                    <li>Permitir sua participação em recursos interativos do nosso serviço</li>
                    <li>Fornecer suporte ao cliente</li>
                    <li>Coletar análises ou informações valiosas para melhorar nosso serviço</li>
                    <li>Monitorar o uso do nosso serviço</li>
                    <li>Detectar, prevenir e resolver problemas técnicos</li>
                    <li>Cumprir qualquer outra finalidade para a qual você a forneceu</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">4. Compartilhamento de Informações</h2>
                  <p className="mb-2">
                    Não vendemos, trocamos ou transferimos suas informações pessoalmente identificáveis para terceiros, exceto nas seguintes circunstâncias:
                  </p>
                  <ul className="list-disc pl-6">
                    <li>Com prestadores de serviços que nos ajudam a operar nosso site, conduzir nossos negócios ou atender você, desde que essas partes concordem em manter essas informações confidenciais</li>
                    <li>Quando acreditamos que a divulgação é apropriada para cumprir a lei, fazer cumprir as políticas do nosso site ou proteger nossos ou outros direitos, propriedade ou segurança</li>
                    <li>Com sua expressa autorização</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">5. Segurança de Dados</h2>
                  <p className="mb-2">
                    A segurança dos seus dados é importante para nós, mas lembre-se que nenhum método de transmissão pela Internet ou método de armazenamento eletrônico é 100% seguro. Embora nos esforcemos para usar meios comercialmente aceitáveis para proteger suas informações pessoais, não podemos garantir sua segurança absoluta.
                  </p>
                  <p>
                    Implementamos medidas técnicas e organizacionais apropriadas para proteger os dados pessoais contra processamento não autorizado ou ilegal e contra perda acidental, destruição ou danos.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
                  <p className="mb-2">
                    Cookies são arquivos com pequena quantidade de dados que podem incluir um identificador único anônimo. Os cookies são enviados para o seu navegador a partir de um site e armazenados no seu dispositivo.
                  </p>
                  <p>
                    Utilizamos cookies para coletar informações. Você pode instruir seu navegador a recusar todos os cookies ou indicar quando um cookie está sendo enviado. No entanto, se você não aceitar cookies, pode não conseguir usar algumas partes de nosso serviço. Para mais informações sobre como utilizamos cookies, consulte nossa <a href="/cookies" className="text-primary hover:underline">Política de Cookies</a>.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">7. Direitos do Usuário</h2>
                  <p className="mb-2">
                    De acordo com as leis de proteção de dados aplicáveis, você tem os seguintes direitos:
                  </p>
                  <ul className="list-disc pl-6">
                    <li>Direito de acesso às suas informações pessoais</li>
                    <li>Direito de retificação de dados imprecisos</li>
                    <li>Direito de exclusão de seus dados pessoais</li>
                    <li>Direito de restringir o processamento de seus dados</li>
                    <li>Direito à portabilidade de dados</li>
                    <li>Direito de se opor ao processamento de seus dados</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">8. Alterações nesta Política de Privacidade</h2>
                  <p>
                    Podemos atualizar nossa Política de Privacidade periodicamente. Recomendamos que você revise esta página periodicamente para quaisquer alterações. Notificaremos você sobre quaisquer alterações publicando a nova Política de Privacidade nesta página. Tais alterações entrarão em vigor imediatamente após serem publicadas.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">9. Contato</h2>
                  <p>
                    Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco através do email: privacidade@intercambista.com
                  </p>
                </section>

                <p className="text-sm text-gray-500 mt-8">
                  Última atualização: 15 de Junho de 2023
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

export default Privacy;
