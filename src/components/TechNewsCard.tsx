
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface TechNewsCardProps {
  title: string;
  summary: string;
  date: string;
  author: string;
  category: string;
  imageUrl: string;
}

const TechNewsCard: React.FC<TechNewsCardProps> = ({
  title,
  summary,
  date,
  author,
  category,
  imageUrl,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getCategoryColorClass = (category: string) => {
    const categories: Record<string, string> = {
      AI: "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300",
      Blockchain: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
      Computing: "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300",
      Web: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
      Mobile: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
      Security: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
      Data: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
    };

    for (const key in categories) {
      if (category.includes(key)) {
        return categories[key];
      }
    }

    return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  };

  return (
    <>
      <div 
        className="glass-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="aspect-video overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColorClass(category)}`}>
              {category}
            </span>
            <span className="text-xs text-foreground/70">{date}</span>
          </div>
          <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-foreground/70 line-clamp-2 mb-3">
            {summary}
          </p>
          <div className="text-xs text-foreground/60">
            By {author}
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl">{title}</DialogTitle>
            <DialogDescription>
              <div className="flex items-center justify-between mb-2 mt-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColorClass(category)}`}>
                  {category}
                </span>
                <span className="text-xs text-foreground/70">{date}</span>
              </div>
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="aspect-video overflow-hidden rounded-md">
              <img
                src={imageUrl}
                alt={title}
                className="object-cover w-full h-full"
              />
            </div>
            
            <p className="text-foreground/80">
              {summary}
            </p>
            
            <p className="text-foreground/80">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. 
              Donec euismod, nisl eget ultricies ultricies, nisl nunc
              tincidunt nunc, eget lacinia nisl nunc eget nisl. Donec euismod, nisl eget
              ultricies ultricies, nisl nunc tincidunt nunc, eget lacinia nisl nunc eget nisl.
            </p>
            
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm text-foreground/60">
                Written by <span className="font-medium text-foreground/80">{author}</span>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TechNewsCard;
