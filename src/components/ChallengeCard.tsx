
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Clock, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChallengeCardProps {
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard" | "expert";
  type: "quiz" | "puzzle" | "assignment" | "exam";
  timeEstimate: string;
  rewards: number;
  progress?: number;
  onClick?: () => void;
  className?: string;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  title,
  description,
  difficulty,
  type,
  timeEstimate,
  rewards,
  progress = 0,
  onClick,
  className,
}) => {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500 hover:bg-green-600";
      case "medium":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "hard":
        return "bg-orange-500 hover:bg-orange-600";
      case "expert":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-blue-500 hover:bg-blue-600";
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case "quiz":
        return <Zap className="h-4 w-4 mr-1" />;
      case "puzzle":
        return <Star className="h-4 w-4 mr-1" />;
      case "assignment":
        return <Clock className="h-4 w-4 mr-1" />;
      case "exam":
        return <Trophy className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <Card className={cn("shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Badge variant="outline" className={cn("text-white", getDifficultyColor())}>
            {difficulty}
          </Badge>
        </div>
        <CardDescription className="text-sm text-muted-foreground mt-1">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-3">
          <span className="flex items-center">
            {getTypeIcon()}
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {timeEstimate}
          </span>
        </div>
        {progress > 0 && (
          <div className="space-y-1 mt-2">
            <div className="flex justify-between text-xs">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">
            <Trophy className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-sm font-medium">{rewards} coins</span>
          </div>
          <Button size="sm" onClick={onClick} className="px-3 py-1 h-8">
            {progress > 0 ? "Continue" : "Start Challenge"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChallengeCard;
