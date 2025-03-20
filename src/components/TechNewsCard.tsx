
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface TechNewsProps {
  title: string;
  description: string;
  source: string;
  date: string;
  url: string;
  imageUrl?: string;
  content?: string;
}

const TechNewsCard: React.FC<TechNewsProps> = ({
  title,
  description,
  source,
  date,
  url,
  imageUrl,
  content,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-gray-200 dark:border-gray-800">
        {imageUrl && (
          <div className="w-full h-48 overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        )}
        <CardHeader className="p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
              {source}
            </span>
            <span className="text-xs text-gray-500">{formattedDate}</span>
          </div>
          <CardTitle className="text-lg line-clamp-2">{title}</CardTitle>
          <CardDescription className="line-clamp-3 mt-2">
            {description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDetails(true)}
            className="text-sm"
          >
            Read More
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.open(url, "_blank")}
            className="text-sm"
          >
            View Source
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">{title}</DialogTitle>
            <DialogDescription className="flex justify-between items-center">
              <span>{source}</span>
              <span>{formattedDate}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {imageUrl && (
              <div className="w-full h-48 overflow-hidden rounded-md">
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <p className="leading-relaxed text-gray-800 dark:text-gray-200">
              {content || description}
            </p>
            <Button
              className="w-full"
              onClick={() => window.open(url, "_blank")}
            >
              Read Full Article
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TechNewsCard;
