
import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const Cookies = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="py-10 bg-primary/5">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">Política de Cookies</h1>
          <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
            Entenda como usamos cookies e outras tecnologias para melhorar sua experiência na plataforma Intercambista.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">O que são cookies?</h2>
            <p className="text-muted-foreground">
              Cookies são pequenos arquivos de texto que são armazenados no seu dispositivo quando você visita um site. Eles são amplamente utilizados para fazer com que os sites funcionem de maneira mais eficiente, bem como para fornecer informações aos proprietários do site.
            </p>
          </section>
          
          <Separator />
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Como usamos cookies</h2>
            <p className="text-muted-foreground mb-4">
              Utilizamos cookies por várias razões, detalhadas abaixo. Infelizmente, na maioria dos casos, não existem opções padrão do setor para desativar cookies sem desativar completamente a funcionalidade e os recursos que eles adicionam a este site.
            </p>
            
            <h3 className="text-xl font-medium mt-6 mb-2">Cookies relacionados à conta</h3>
            <p className="text-muted-foreground">
              Se você criar uma conta conosco, usaremos cookies para gerenciar o processo de inscrição e administração geral. Esses cookies geralmente serão excluídos quando você sair do sistema, porém, em alguns casos, eles poderão permanecer posteriormente para lembrar as preferências do seu site quando sair.
            </p>
            
            <h3 className="text-xl font-medium mt-6 mb-2">Cookies relacionados a login</h3>
            <p className="text-muted-foreground">
              Utilizamos cookies quando você está logado, para que possamos lembrar dessa ação. Isso evita que você precise fazer login sempre que visitar uma nova página. Esses cookies são normalmente removidos ou limpos quando você sai para garantir que você só possa acessar recursos e áreas restritas quando estiver logado.
            </p>
            
            <h3 className="text-xl font-medium mt-6 mb-2">Cookies relacionados a preferências do site</h3>
            <p className="text-muted-foreground">
              Para proporcionar uma ótima experiência neste site, fornecemos a funcionalidade para definir suas preferências de como esse site é executado quando você o usa. Para lembrar suas preferências, precisamos definir cookies para que essas informações possam ser chamadas sempre que você interagir com uma página.
            </p>
          </section>
          
          <Separator />
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Cookies de terceiros</h2>
            <p className="text-muted-foreground mb-4">
              Em alguns casos especiais, também usamos cookies fornecidos por terceiros confiáveis. A seção a seguir detalha quais cookies de terceiros você pode encontrar através deste site.
            </p>
            
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Este site utiliza o Google Analytics, que é uma das soluções de análise mais difundidas e confiáveis da Web, para nos ajudar a entender como você usa o site e como podemos melhorar sua experiência.</li>
              <li>De tempos em tempos, testamos novos recursos e fazemos alterações sutis na maneira como o site se apresenta. Quando ainda estamos testando novos recursos, esses cookies podem ser usados para garantir que você receba uma experiência consistente enquanto estiver no site.</li>
              <li>À medida que vendemos produtos, é importante entendermos as estatísticas sobre quantos visitantes de nosso site realmente compram e, portanto, esse é o tipo de dados que esses cookies rastrearão.</li>
            </ul>
          </section>
          
          <Separator />
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Mais informações</h2>
            <p className="text-muted-foreground mb-4">
              Esperamos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.
            </p>
            
            <p className="text-muted-foreground mb-4">
              Se você tiver alguma dúvida sobre nossa política de cookies, sinta-se à vontade para entrar em contato conosco.
            </p>
            
            <div className="flex gap-4 mt-8">
              <Link to="/privacy" className="text-primary hover:underline">Política de Privacidade</Link>
              <Link to="/terms" className="text-primary hover:underline">Termos de Uso</Link>
              <Link to="/contact" className="text-primary hover:underline">Contato</Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Cookies;
