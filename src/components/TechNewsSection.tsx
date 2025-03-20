
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Bookmark, Share, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  source: string;
  date: string;
  url: string;
  imageUrl: string;
  category: string;
}

const dummyNews: NewsItem[] = [
  {
    id: 1,
    title: "Google Launches New AI Platform for Developers",
    description: "Google has released a new platform to help developers integrate AI capabilities into their applications more easily. The platform provides pre-trained models and tools for customization.",
    source: "TechCrunch",
    date: "2 hours ago",
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    category: "AI"
  },
  {
    id: 2,
    title: "TypeScript 5.5 Introduces New Features for Better Type Safety",
    description: "The latest version of TypeScript brings significant improvements including better type inference, faster compile times, and new utility types.",
    source: "Dev.to",
    date: "5 hours ago",
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "Programming"
  },
  {
    id: 3,
    title: "AWS Announces New Serverless Container Service",
    description: "Amazon Web Services has unveiled a new service that allows developers to run containers without managing servers or clusters, reducing operational overhead.",
    source: "AWS Blog",
    date: "1 day ago",
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "Cloud"
  },
  {
    id: 4,
    title: "Study Reveals Top Programming Languages for 2023",
    description: "A comprehensive survey of developers reveals the most in-demand programming languages for this year, with Python, JavaScript, and Rust topping the list.",
    source: "StackOverflow",
    date: "2 days ago",
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "Programming"
  }
];

const TechNewsSection = () => {
  const [news, setNews] = useState<NewsItem[]>(dummyNews);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Simulate news refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real app, you would fetch the latest news here
      // For demo purposes, we'll just shuffle the existing news
      setNews([...news].sort(() => Math.random() - 0.5));
    }, 30000);

    return () => clearInterval(interval);
  }, [news]);

  const openNewsModal = (item: NewsItem) => {
    setSelectedNews(item);
    setIsModalOpen(true);
  };

  const closeNewsModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedNews(null), 300); // Clear after animation
  };

  return (
    <section id="tech-news" className="py-16 px-4 bg-secondary/50">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Latest in Tech
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">Stay Updated with Tech News</h2>
          <p className="text-foreground/70 mb-8">
            Keep up with the rapidly evolving technology landscape with our curated tech news feed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.map((item) => (
            <Card 
              key={item.id}
              className="overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 group cursor-pointer"
              onClick={() => openNewsModal(item)}
            >
              <div className="h-40 overflow-hidden relative">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded">
                  {item.category}
                </div>
              </div>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                <CardDescription className="flex items-center gap-1 text-xs">
                  {item.source} • {item.date}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-foreground/70 line-clamp-2">
                  {item.description}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Button variant="link" className="p-0 h-auto text-primary text-xs flex items-center gap-1">
                  Read more <ExternalLink className="h-3 w-3" />
                </Button>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* News Modal */}
        <div 
          className={cn(
            "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4",
            "transition-opacity duration-300",
            isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <div 
            className={cn(
              "bg-card w-full max-w-2xl rounded-xl shadow-xl overflow-hidden",
              "transition-all duration-300",
              isModalOpen ? "scale-100" : "scale-95"
            )}
          >
            {selectedNews && (
              <>
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={selectedNews.imageUrl} 
                    alt={selectedNews.title} 
                    className="w-full h-full object-cover"
                  />
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="absolute top-4 right-4 h-8 w-8 bg-background/80 backdrop-blur-sm"
                    onClick={closeNewsModal}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="absolute bottom-4 left-4 bg-primary text-white text-sm px-3 py-1 rounded">
                    {selectedNews.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{selectedNews.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {selectedNews.source} • {selectedNews.date}
                  </p>
                  <p className="mb-6">
                    {selectedNews.description}
                  </p>
                  <p className="mb-6">
                    This is an expanded view of the news article. In a real application, this would contain
                    the full content of the article, additional images, and related resources.
                  </p>
                  <div className="flex justify-between">
                    <Button variant="default">
                      Read Full Article <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechNewsSection;
