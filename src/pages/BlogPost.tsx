
import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, User, Tag, Share2, Facebook, Twitter, Linkedin } from "lucide-react";

const blogPosts = {
  "1": {
    id: 1,
    title: "Dicas para intercambistas recém-chegados ao Brasil",
    content: `
      <p class="mb-4">O Brasil é um país conhecido por sua hospitalidade, cultura rica e paisagens deslumbrantes. Para os estudantes internacionais que chegam para um intercâmbio, a adaptação pode ser ao mesmo tempo empolgante e desafiadora. Neste artigo, compartilhamos dicas valiosas para ajudar os recém-chegados a se ambientarem rapidamente e aproveitarem ao máximo sua experiência.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">1. Aprenda o básico do português</h2>
      <p class="mb-4">Embora muitos brasileiros em ambientes acadêmicos falem inglês, aprender algumas frases básicas em português facilitará muito sua vida cotidiana. Aplicativos como Duolingo ou Babbel podem ajudar nos primeiros passos, e participar de intercâmbios linguísticos (language exchange) é uma ótima maneira de praticar com nativos enquanto faz amizades.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">2. Familiarize-se com o transporte público</h2>
      <p class="mb-4">Nas grandes cidades brasileiras, o transporte público pode ser complexo no início. Baixe aplicativos como Moovit ou Google Maps para planejar suas rotas. Muitas cidades oferecem cartões de transporte para estudantes com tarifas reduzidas - informe-se na sua instituição de ensino sobre como obtê-los.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">3. Fique atento à segurança</h2>
      <p class="mb-4">Como em qualquer grande cidade do mundo, é importante tomar precauções de segurança. Evite exibir objetos de valor em público, como celulares caros ou jóias. Procure andar em grupos, especialmente à noite, e esteja atento aos seus pertences em locais movimentados.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">4. Explore a gastronomia local</h2>
      <p class="mb-4">A culinária brasileira é diversa e deliciosa! Não deixe de experimentar pratos típicos como feijoada, moqueca, pão de queijo e açaí. Além dos restaurantes, os mercados municipais são ótimos lugares para conhecer frutas exóticas e especialidades regionais.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">5. Participe de eventos culturais</h2>
      <p class="mb-4">Festivais, shows e eventos culturais acontecem regularmente nas cidades brasileiras. Eles são excelentes oportunidades para vivenciar a cultura local e conhecer pessoas. Muitos museus e centros culturais oferecem entrada gratuita ou com desconto para estudantes.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">6. Organize seus documentos</h2>
      <p class="mb-4">Mantenha seus documentos importantes (passaporte, visto, documentos da universidade) organizados e seguros. Faça cópias digitais e físicas e deixe uma cópia com alguém de confiança no seu país de origem.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">7. Conecte-se com outros intercambistas</h2>
      <p class="mb-4">Busque grupos de estudantes internacionais na sua universidade ou nas redes sociais. Compartilhar experiências com pessoas que estão vivendo situações semelhantes pode ser reconfortante e enriquecedor.</p>

      <p class="mt-8">Lembre-se que cada experiência de intercâmbio é única. Esteja aberto a novas experiências, culturas e perspectivas. Os desafios iniciais de adaptação logo darão lugar a memórias inesquecíveis e aprendizados que você levará para toda a vida.</p>
    `,
    date: "15 de Junho, 2023",
    author: "Maria Santos",
    category: "Dicas",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22"
  },
  "2": {
    id: 2,
    title: "Como encontrar trabalho part-time durante o intercâmbio",
    content: `
      <p class="mb-4">Conciliar os estudos com um trabalho de meio período pode ser uma excelente estratégia para estudantes internacionais que desejam ganhar uma renda extra durante seu intercâmbio no Brasil. Além do benefício financeiro, trabalhar enquanto estuda oferece valiosas experiências profissionais e oportunidades de networking. Neste artigo, compartilhamos dicas práticas para encontrar oportunidades de trabalho compatíveis com sua vida acadêmica.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">1. Conheça as restrições do seu visto</h2>
      <p class="mb-4">Antes de procurar emprego, é fundamental entender o que seu visto de estudante permite. A legislação brasileira geralmente limita as horas que um estudante internacional pode trabalhar. Verifique as condições específicas do seu visto para evitar problemas legais.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">2. Utilize os recursos da sua instituição de ensino</h2>
      <p class="mb-4">Muitas universidades possuem departamentos de carreira ou portais de emprego exclusivos para seus alunos. Esses recursos geralmente oferecem vagas compatíveis com horários acadêmicos e podem incluir oportunidades de estágio ou trabalho no campus.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">3. Explore suas habilidades linguísticas</h2>
      <p class="mb-4">Ser fluente em outros idiomas é uma vantagem significativa. Considere dar aulas particulares do seu idioma nativo, trabalhar como tradutor freelancer ou buscar posições em empresas que precisam de profissionais bilíngues para atendimento ao cliente internacional.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">4. Trabalho remoto e freelancer</h2>
      <p class="mb-4">Plataformas como Workana, 99Freelas e Fiverr conectam freelancers a clientes que precisam de serviços específicos. Se você tem habilidades em design, programação, escrita, marketing digital ou outras áreas que permitem trabalho remoto, estas plataformas podem ser uma excelente fonte de renda.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">5. Redes sociais e networking</h2>
      <p class="mb-4">Mantenha seu perfil profissional atualizado em plataformas como LinkedIn e participe de grupos relacionados à sua área de estudo. Informe sua rede que está buscando oportunidades part-time compatíveis com seus estudos.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">6. Startups e pequenas empresas</h2>
      <p class="mb-4">Empresas em fase inicial frequentemente buscam talentos flexíveis e podem oferecer horários mais adaptáveis. Eventos de networking para startups e hubs de inovação são bons lugares para conhecer empreendedores que podem estar contratando.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">7. Plataformas específicas para estudantes</h2>
      <p class="mb-4">Sites como Nube, Catho Educação e Vagas.com possuem seções dedicadas a estágios e trabalhos temporários, frequentemente com filtros para vagas adequadas a estudantes.</p>

      <p class="mt-8">Lembre-se de equilibrar trabalho e estudos. A prioridade deve ser sempre sua formação acadêmica, e o trabalho part-time deve complementar, não prejudicar, sua experiência de intercâmbio. Com organização e as estratégias certas, é possível encontrar oportunidades que não apenas auxiliem financeiramente, mas também enriqueçam seu currículo e ampliem sua rede profissional no Brasil.</p>
    `,
    date: "28 de Maio, 2023",
    author: "Carlos Oliveira",
    category: "Trabalho",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
  }
};

const BlogPost = () => {
  const { id } = useParams();
  
  // Simulate fetching blog post by ID
  const post = blogPosts[id as keyof typeof blogPosts];

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 pt-28 pb-16 text-center">
          <h1 className="text-4xl font-bold mb-6">Post não encontrado</h1>
          <p className="mb-8">O artigo que você está procurando não está disponível ou foi removido.</p>
          <Button asChild>
            <Link to="/blog">Voltar para o Blog</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-6">
            <Button variant="ghost" size="sm" asChild className="mb-4">
              <Link to="/blog" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" /> Voltar para o Blog
              </Link>
            </Button>

            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <Button variant="secondary" size="sm" asChild>
                  <Link to={`/blog/category/${post.category.toLowerCase()}`} className="flex items-center gap-1">
                    <Tag className="h-3 w-3" /> {post.category}
                  </Link>
                </Button>
              </div>
              
              <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" /> {post.author}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" /> {post.date}
                </span>
              </div>

              <div className="mb-8">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>

              <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
              
              <Card className="mt-12">
                <CardContent className="flex flex-wrap items-center justify-between gap-4 p-6">
                  <div>
                    <h3 className="font-medium mb-1">Compartilhar este artigo</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" aria-label="Compartilhar no Facebook">
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" aria-label="Compartilhar no Twitter">
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" aria-label="Compartilhar no LinkedIn">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" aria-label="Mais opções de compartilhamento">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
