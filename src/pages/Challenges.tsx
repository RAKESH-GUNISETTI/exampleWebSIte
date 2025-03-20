
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Search, Calendar, Trophy, Send, Brain } from "lucide-react";

type ChallengeType = "daily" | "challenge" | "quiz";

interface Challenge {
  id: number;
  title: string;
  category: string;
  difficulty: string;
  points: number;
  completedBy: number;
  description: string;
  deadline: string;
  type: ChallengeType;
}

const Challenges = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    }
  };

  const getIconForType = (type: ChallengeType) => {
    switch (type) {
      case "daily":
        return <Calendar className="h-5 w-5" />;
      case "challenge":
        return <Trophy className="h-5 w-5" />;
      case "quiz":
        return <Brain className="h-5 w-5" />;
      default:
        return <Send className="h-5 w-5" />;
    }
  };

  const challenges: Challenge[] = [
    {
      id: 1,
      title: "Create a Responsive Footer",
      category: "CSS",
      difficulty: "Easy",
      points: 20,
      completedBy: 324,
      description:
        "Design a responsive footer that adjusts its layout from horizontal on desktop to vertical on mobile devices.",
      deadline: "24h remaining",
      type: "daily",
    },
    {
      id: 2,
      title: "Optimize Database Query",
      category: "SQL",
      difficulty: "Hard",
      points: 50,
      completedBy: 87,
      description:
        "Optimize a complex SQL query to reduce execution time by at least 50%.",
      deadline: "3 days remaining",
      type: "challenge",
    },
    {
      id: 3,
      title: "JavaScript Fundamentals",
      category: "JavaScript",
      difficulty: "Medium",
      points: 30,
      completedBy: 156,
      description:
        "Test your knowledge of JavaScript fundamentals including closures, prototypes, and async patterns.",
      deadline: "Open",
      type: "quiz",
    },
    {
      id: 4,
      title: "Build a State Management System",
      category: "React",
      difficulty: "Hard",
      points: 60,
      completedBy: 43,
      description:
        "Create a lightweight state management system for React applications without using Redux.",
      deadline: "5 days remaining",
      type: "challenge",
    },
    {
      id: 5,
      title: "Daily Algorithm Challenge",
      category: "Algorithms",
      difficulty: "Medium",
      points: 25,
      completedBy: 211,
      description:
        "Solve today's algorithm challenge: implement an efficient solution for finding the longest palindromic substring.",
      deadline: "24h remaining",
      type: "daily",
    },
  ];

  const filteredChallenges = challenges.filter((challenge) => {
    const matchesFilter =
      filter === "all" || challenge.type.toLowerCase() === filter;
    const matchesSearch =
      searchQuery === "" ||
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Technical Challenges</h1>
          <p className="text-muted-foreground">
            Solve problems, earn points, and improve your technical skills
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search challenges..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Tabs
            defaultValue="all"
            className="w-auto"
            onValueChange={(value) => setFilter(value)}
          >
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="challenge">Challenges</TabsTrigger>
              <TabsTrigger value="quiz">Quizzes</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <ScrollArea className="h-[calc(100vh-250px)]">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredChallenges.map((challenge) => (
              <Card key={challenge.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge
                      className={`${getDifficultyColor(
                        challenge.difficulty
                      )} capitalize`}
                    >
                      {challenge.difficulty}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {challenge.category}
                    </Badge>
                  </div>
                  <CardTitle className="mt-2 text-xl">{challenge.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1 text-sm">
                    {getIconForType(challenge.type)}
                    <span className="capitalize">{challenge.type}</span> •{" "}
                    {challenge.deadline}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {challenge.description}
                  </p>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t bg-muted/50 p-3">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {challenge.points}
                    </span>{" "}
                    points • Completed by {challenge.completedBy} users
                  </div>
                  <Button size="sm">Start</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Challenges;
