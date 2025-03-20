
import React from "react";
import TechNewsCard from "./TechNewsCard";
import { Section } from "@/components/ui/section";
import { Newspaper } from "lucide-react";

const EnhancedTechNewsSection = () => {
  const techNews = [
    {
      title: "Artificial Intelligence Revolutionizes Code Generation",
      summary:
        "New AI tools can now write complex applications with minimal human guidance, promising to transform how developers work.",
      date: "May 15, 2023",
      author: "Tech Insights",
      category: "AI",
      imageUrl: "https://images.unsplash.com/photo-1677442135123-1f577f316907?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
    {
      title: "The Rise of Web3 and Decentralized Applications",
      summary:
        "Blockchain technology continues to evolve, enabling new types of applications that operate without centralized control.",
      date: "May 12, 2023",
      author: "Blockchain Today",
      category: "Blockchain",
      imageUrl: "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
    {
      title: "Quantum Computing Reaches New Milestone",
      summary:
        "Researchers achieve quantum supremacy for practical problems, bringing quantum computing one step closer to mainstream use.",
      date: "May 10, 2023",
      author: "Quantum Review",
      category: "Computing",
      imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
  ];

  return (
    <Section className="py-16 px-4 bg-accent/30">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium inline-flex items-center">
            <Newspaper className="h-4 w-4 mr-1.5" />
            Latest in Tech
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">Stay Updated with Tech Trends</h2>
          <p className="text-foreground/70">
            Discover the latest news, updates, and breakthroughs in the world of technology and programming.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techNews.map((news, index) => (
            <div 
              key={index}
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 150 + 300}ms`, animationFillMode: 'forwards' }}
            >
              <TechNewsCard
                title={news.title}
                summary={news.summary}
                date={news.date}
                author={news.author}
                category={news.category}
                imageUrl={news.imageUrl}
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default EnhancedTechNewsSection;
