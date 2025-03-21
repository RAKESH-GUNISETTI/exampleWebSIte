
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Bookmark, Share, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

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

interface TechNewsCardProps {
  news: NewsItem;
  className?: string;
}

const TechNewsCard: React.FC<TechNewsCardProps> = ({ news, className }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <>
      <Card 
        className={cn(
          "overflow-hidden transition-all duration-300 hover:shadow-lg group cursor-pointer",
          className
        )}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="h-40 overflow-hidden relative">
          <img 
            src={news.imageUrl} 
            alt={news.title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded">
            {news.category}
          </div>
        </div>
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg line-clamp-2">{news.title}</CardTitle>
          <CardDescription className="flex items-center gap-1 text-xs">
            {news.source} • {news.date}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-sm text-foreground/70 line-clamp-2">
            {news.description}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <Button 
            variant="link" 
            className="p-0 h-auto text-primary text-xs flex items-center gap-1"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
          >
            Read more <ExternalLink className="h-3 w-3" />
          </Button>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                setIsBookmarked(!isBookmarked);
              }}
            >
              <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-primary text-primary")} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                // Share functionality would go here
                navigator.share?.({
                  title: news.title,
                  text: news.description,
                  url: news.url,
                }).catch(() => {
                  // Fallback for browsers that don't support navigator.share
                  navigator.clipboard?.writeText(news.url);
                });
              }}
            >
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden">
          <div className="h-64 overflow-hidden relative">
            <img 
              src={news.imageUrl} 
              alt={news.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-primary text-white text-sm px-3 py-1 rounded">
              {news.category}
            </div>
          </div>
          
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{news.title}</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                {news.source} • {news.date}
              </DialogDescription>
            </DialogHeader>
            
            <div className="mt-4 space-y-4">
              <p>{news.description}</p>
              <p>
                This is an expanded view of the news article. In a real application, this would contain
                the full content of the article, additional images, and related resources.
              </p>
            </div>
            
            <div className="flex justify-between mt-6">
              <Button variant="default">
                Read Full Article <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-primary text-primary")} />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => {
                    navigator.share?.({
                      title: news.title,
                      text: news.description,
                      url: news.url,
                    }).catch(() => {
                      navigator.clipboard?.writeText(news.url);
                    });
                  }}
                >
                  <Share className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TechNewsCard;
