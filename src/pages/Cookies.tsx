
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const Cookies = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="shadow-lg max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h1 className="text-4xl font-bold mb-8">Política de Cookies</h1>
              
              <div className="space-y-6">
                <section>
                  <h2 className="text-2xl font-semibold mb-4">1. O que são Cookies?</h2>
                  <p className="mb-2">
                    Cookies são pequenos arquivos de texto que são armazenados em seu dispositivo (computador, tablet ou celular) 
                    quando você visita determinados websites. Os cookies permitem que o site lembre suas ações e preferências 
                    (como login, idioma, tamanho da fonte e outras preferências de exibição) por um período de tempo, para que 
                    você não precise inserir essas informações novamente sempre que voltar ao site ou navegar de uma página para outra.
                  </p>
                  <p>
                    Os cookies não contêm informações pessoais identificáveis e não podem executar códigos, entregar vírus ou extrair informações pessoais de seu dispositivo.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">2. Como Utilizamos os Cookies</h2>
                  <p className="mb-2">
                    A plataforma Intercambista utiliza cookies para os seguintes propósitos:
                  </p>
                  <ul className="list-disc pl-6">
                    <li>Cookies essenciais: necessários para o funcionamento do site, permitem que você use recursos básicos e navegue pelo site.</li>
                    <li>Cookies de preferências: permitem que o site lembre informações que mudam a forma como o site se comporta ou aparece, como seu idioma preferido ou a região em que você está.</li>
                    <li>Cookies estatísticos: ajudam a entender como os visitantes interagem com o site, coletando e relatando informações anonimamente.</li>
                    <li>Cookies de marketing: são usados para rastrear visitantes em websites com o objetivo de exibir anúncios relevantes e envolventes para o usuário individual.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">3. Tipos de Cookies que Utilizamos</h2>
                  
                  <h3 className="text-xl font-medium mt-4 mb-2">3.1 Cookies de Sessão</h3>
                  <p className="mb-4">
                    Cookies temporários que são apagados quando você fecha o navegador. Eles são usados para manter sua sessão enquanto você navega pelo site.
                  </p>
                  
                  <h3 className="text-xl font-medium mb-2">3.2 Cookies Persistentes</h3>
                  <p className="mb-4">
                    Permanecem no seu dispositivo por um período determinado ou até que você os exclua manualmente. Eles são usados para lembrar suas preferências e configurações quando você revisita o site.
                  </p>
                  
                  <h3 className="text-xl font-medium mb-2">3.3 Cookies de Terceiros</h3>
                  <p className="mb-4">
                    Cookies definidos por serviços de terceiros que aparecem em nossas páginas, como Google Analytics, redes sociais e serviços de publicidade. Esses terceiros podem processar suas informações de acordo com suas próprias políticas de privacidade.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">4. Controle de Cookies</h2>
                  <p className="mb-2">
                    Você pode controlar e/ou excluir cookies conforme desejar. Você pode excluir todos os cookies que já estão no seu dispositivo e pode configurar a maioria dos navegadores para impedir que sejam instalados.
                  </p>
                  <p className="mb-2">
                    A maioria dos navegadores permite que você:
                  </p>
                  <ul className="list-disc pl-6">
                    <li>Veja quais cookies você tem e os exclua individualmente</li>
                    <li>Bloqueie cookies de terceiros</li>
                    <li>Bloqueie cookies de sites específicos</li>
                    <li>Bloqueie todos os cookies</li>
                    <li>Exclua todos os cookies quando fechar o navegador</li>
                  </ul>
                  <p className="mt-4">
                    Se você optar por desativar os cookies, observe que algumas funcionalidades do nosso site podem não funcionar corretamente.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">5. Como Desativar Cookies em Diferentes Navegadores</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-medium mb-2">Google Chrome</h3>
                      <p>
                        Clique no menu do Chrome > Configurações > Mostrar configurações avançadas > Privacidade > Configurações de conteúdo > Cookies > selecione sua opção preferida.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-medium mb-2">Mozilla Firefox</h3>
                      <p>
                        Clique no menu do Firefox > Opções > Privacidade > Use configurações personalizadas para o histórico > selecione sua opção preferida.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-medium mb-2">Safari</h3>
                      <p>
                        Clique em Preferências > Privacidade > selecione sua opção preferida para Cookies e dados de websites.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-medium mb-2">Microsoft Edge</h3>
                      <p>
                        Clique em Configurações > Configurações avançadas > Cookies > selecione sua opção preferida.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">6. Cookies Específicos que Utilizamos</h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full mt-2 border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 px-4 text-left">Nome do Cookie</th>
                          <th className="py-2 px-4 text-left">Propósito</th>
                          <th className="py-2 px-4 text-left">Duração</th>
                          <th className="py-2 px-4 text-left">Tipo</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 px-4">session_id</td>
                          <td className="py-2 px-4">Gerencia a sessão do usuário</td>
                          <td className="py-2 px-4">Sessão</td>
                          <td className="py-2 px-4">Essencial</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">auth_token</td>
                          <td className="py-2 px-4">Mantém o usuário logado</td>
                          <td className="py-2 px-4">30 dias</td>
                          <td className="py-2 px-4">Essencial</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">language</td>
                          <td className="py-2 px-4">Armazena a preferência de idioma</td>
                          <td className="py-2 px-4">1 ano</td>
                          <td className="py-2 px-4">Preferência</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">_ga</td>
                          <td className="py-2 px-4">Google Analytics - Estatísticas de uso</td>
                          <td className="py-2 px-4">2 anos</td>
                          <td className="py-2 px-4">Estatístico</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">_fbp</td>
                          <td className="py-2 px-4">Facebook Pixel - Anúncios direcionados</td>
                          <td className="py-2 px-4">3 meses</td>
                          <td className="py-2 px-4">Marketing</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">7. Alterações na Política de Cookies</h2>
                  <p>
                    Esta Política de Cookies pode ser atualizada periodicamente para refletir mudanças em nossas práticas de cookies ou por outras razões operacionais, legais ou regulatórias. Recomendamos que você visite regularmente esta página para se manter informado sobre quaisquer alterações.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">8. Contato</h2>
                  <p>
                    Se você tiver dúvidas sobre nossa Política de Cookies, entre em contato conosco através do email: privacidade@intercambista.com
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

export default Cookies;
