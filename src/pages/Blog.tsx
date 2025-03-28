
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, User, Tag } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Dicas para intercambistas recém-chegados ao Brasil",
    excerpt: "Confira nossas principais recomendações para se adaptar rapidamente à vida brasileira e tirar o máximo proveito do seu intercâmbio.",
    date: "15 de Junho, 2023",
    author: "Maria Santos",
    category: "Dicas",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22"
  },
  {
    id: 2,
    title: "Como encontrar trabalho part-time durante o intercâmbio",
    excerpt: "Saiba como conciliar os estudos com um trabalho de meio período e garantir uma renda extra durante sua estadia.",
    date: "28 de Maio, 2023",
    author: "Carlos Oliveira",
    category: "Trabalho",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
  },
  {
    id: 3,
    title: "Os melhores eventos culturais para intercambistas em São Paulo",
    excerpt: "Conheça os eventos imperdíveis para vivenciar a cultura brasileira e expandir sua rede de contatos na cidade.",
    date: "10 de Abril, 2023",
    author: "Juliana Almeida",
    category: "Cultura",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
  },
  {
    id: 4,
    title: "Guia completo sobre documentação para estudantes internacionais",
    excerpt: "Tudo o que você precisa saber sobre vistos, CPF, carteira de estudante e outros documentos essenciais.",
    date: "5 de Março, 2023",
    author: "Pedro Costa",
    category: "Documentação",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  },
  {
    id: 5,
    title: "Viagens econômicas pelo Brasil: roteiros para intercambistas",
    excerpt: "Descubra como conhecer os principais destinos turísticos brasileiros sem gastar muito durante o seu intercâmbio.",
    date: "20 de Fevereiro, 2023",
    author: "Ana Luiza",
    category: "Viagens",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">Blog da Intercambista</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Dicas, histórias e informações úteis para estudantes internacionais
              no Brasil.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center space-x-2 mb-2">
                    <Button variant="secondary" size="sm" asChild>
                      <Link to={`/blog/category/${post.category.toLowerCase()}`} className="flex items-center gap-1">
                        <Tag className="h-3 w-3" /> {post.category}
                      </Link>
                    </Button>
                  </div>
                  <CardTitle className="text-xl line-clamp-2 hover:text-primary transition-colors">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" /> {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {post.date}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button variant="ghost" asChild>
                    <Link to={`/blog/${post.id}`}>Ler mais</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
