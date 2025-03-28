
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl font-bold mb-8 text-center">Sobre a Intercambista</h1>
          
          <div className="grid grid-cols-1 gap-8 mb-12">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Nossa Missão</h2>
                <p className="text-lg mb-4">
                  A Intercambista nasceu com a missão de conectar estudantes internacionais 
                  a serviços essenciais e de qualidade durante sua jornada acadêmica no Brasil. 
                  Facilitamos o acesso a profissionais confiáveis que entendem as necessidades 
                  específicas de quem está estudando longe de casa.
                </p>
                <p className="text-lg">
                  Acreditamos que a experiência de intercâmbio deve ser transformadora e 
                  enriquecedora, sem os obstáculos que podem surgir quando se está em um novo país.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Nossa História</h2>
                <p className="text-lg mb-4">
                  Fundada em 2023, a Intercambista surgiu da experiência pessoal de nossos 
                  fundadores, que vivenciaram os desafios de ser estudante internacional.
                </p>
                <p className="text-lg">
                  Após enfrentar dificuldades para encontrar serviços adequados às suas necessidades, 
                  eles decidiram criar uma plataforma que reunisse prestadores de serviços 
                  qualificados e sensíveis às particularidades dos estudantes internacionais.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Nossos Valores</h2>
                <ul className="list-disc pl-6 space-y-2 text-lg">
                  <li>
                    <span className="font-semibold">Confiança:</span> Todos os prestadores de serviços são verificados e avaliados.
                  </li>
                  <li>
                    <span className="font-semibold">Acessibilidade:</span> Facilitamos o acesso a serviços essenciais em idiomas diversos.
                  </li>
                  <li>
                    <span className="font-semibold">Empatia:</span> Entendemos os desafios de se adaptar a uma nova cultura.
                  </li>
                  <li>
                    <span className="font-semibold">Qualidade:</span> Priorizamos a excelência em todos os serviços oferecidos.
                  </li>
                  <li>
                    <span className="font-semibold">Comunidade:</span> Fomentamos uma rede de apoio entre estudantes internacionais.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold mb-6">Nossa Equipe</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full bg-gray-200 mb-4"></div>
                  <h3 className="font-semibold text-xl">Nome do Membro {index}</h3>
                  <p className="text-gray-600">Cargo / Função</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
