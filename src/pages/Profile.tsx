
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import {
  BarChart3, Trophy, Star, Settings, Github, Twitter, Linkedin,
  Code, Server, Database, PieChart, Calendar, CheckCircle, TrendingUp
} from "lucide-react";
import { toast } from "sonner";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  profession: string;
  coins: number;
  progress: {
    coding: number;
    algorithms: number;
    frameworks: number;
  };
  achievements?: string[];
  bio?: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
}

const defaultUserData: UserData = {
  firstName: "Guest",
  lastName: "User",
  email: "guest@example.com",
  profession: "student",
  coins: 0,
  progress: {
    coding: 0,
    algorithms: 0,
    frameworks: 0,
  },
};

const Profile = () => {
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<Partial<UserData>>({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load user data from localStorage
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      const storedUserData = localStorage.getItem("user");
      if (storedUserData) {
        try {
          const parsedData = JSON.parse(storedUserData);
          setUserData({
            ...defaultUserData,
            ...parsedData,
            // Ensure these properties exist with defaults
            progress: {
              coding: parsedData.progress?.coding || 0,
              algorithms: parsedData.progress?.algorithms || 0,
              frameworks: parsedData.progress?.frameworks || 0,
            },
          });
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    }
  }, []);

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      const updatedUserData = { ...userData, ...editedData };
      setUserData(updatedUserData);
      localStorage.setItem("user", JSON.stringify(updatedUserData));
      toast.success("Profile updated successfully");
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  // Mock achievements and recent activity data
  const achievements = [
    "Completed 10 daily challenges",
    "Earned 150 points in one week",
    "Solved 5 hard algorithms",
    "3-day streak of completing quizzes",
  ];

  const recentActivity = [
    {
      type: "challenge",
      title: "Reverse a String Challenge",
      date: "2 days ago",
      points: 10,
    },
    {
      type: "quiz",
      title: "Data Structures Quiz",
      date: "3 days ago",
      points: 15,
    },
    {
      type: "daily",
      title: "JavaScript Basics",
      date: "5 days ago",
      points: 5,
    },
  ];

  // Skills data for visualization
  const skills = [
    { name: "JavaScript", level: 75 },
    { name: "Python", level: 60 },
    { name: "React", level: 80 },
    { name: "Node.js", level: 65 },
    { name: "Data Structures", level: 50 },
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 px-4 container mx-auto max-w-4xl">
          <div className="glass-card rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
            <p className="text-foreground/70 mb-6">
              You need to be logged in to view your profile.
            </p>
            <button
              onClick={() => {}}
              className="px-6 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Log In
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 px-4 pb-12">
        <div className="container mx-auto max-w-6xl">
          {/* Profile Header */}
          <div className="glass-card rounded-xl overflow-hidden mb-8">
            <div className="h-48 bg-gradient-to-r from-primary/20 to-accent/20"></div>
            <div className="p-6 relative">
              <div className="absolute -top-16 left-6 h-32 w-32 rounded-full border-4 border-card bg-accent flex items-center justify-center text-2xl font-bold">
                {userData.firstName.charAt(0)}{userData.lastName.charAt(0)}
              </div>
              
              <div className="ml-40">
                <div className="flex justify-between items-start">
                  <div>
                    {isEditing ? (
                      <div className="flex gap-2 mb-3">
                        <input
                          type="text"
                          name="firstName"
                          value={editedData.firstName || userData.firstName}
                          onChange={handleInputChange}
                          className="glass-input text-xl font-bold"
                        />
                        <input
                          type="text"
                          name="lastName"
                          value={editedData.lastName || userData.lastName}
                          onChange={handleInputChange}
                          className="glass-input text-xl font-bold"
                        />
                      </div>
                    ) : (
                      <h1 className="text-2xl font-bold mb-1">
                        {userData.firstName} {userData.lastName}
                      </h1>
                    )}
                    
                    {isEditing ? (
                      <select
                        name="profession"
                        value={editedData.profession || userData.profession}
                        onChange={handleInputChange}
                        className="glass-input mb-3"
                      >
                        <option value="student">Student</option>
                        <option value="employee">Employee</option>
                        <option value="freelancer">Freelancer</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-foreground/70 capitalize mb-3">
                        {userData.profession}
                      </p>
                    )}
                    
                    {isEditing ? (
                      <textarea
                        name="bio"
                        value={editedData.bio || userData.bio || ""}
                        onChange={handleInputChange}
                        placeholder="Write a short bio..."
                        className="glass-input w-full h-20"
                      />
                    ) : (
                      <p className="text-foreground/70">
                        {userData.bio || "No bio provided."}
                      </p>
                    )}
                  </div>
                  
                  <button
                    onClick={handleEditToggle}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm flex items-center gap-2",
                      isEditing
                        ? "bg-primary text-primary-foreground"
                        : "border border-input hover:bg-accent/80"
                    )}
                  >
                    <Settings className="h-4 w-4" />
                    {isEditing ? "Save Changes" : "Edit Profile"}
                  </button>
                </div>
                
                {isEditing && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">GitHub</label>
                      <input
                        type="text"
                        name="github"
                        value={editedData.github || userData.github || ""}
                        onChange={handleInputChange}
                        placeholder="GitHub username"
                        className="glass-input w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Twitter</label>
                      <input
                        type="text"
                        name="twitter"
                        value={editedData.twitter || userData.twitter || ""}
                        onChange={handleInputChange}
                        placeholder="Twitter handle"
                        className="glass-input w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">LinkedIn</label>
                      <input
                        type="text"
                        name="linkedin"
                        value={editedData.linkedin || userData.linkedin || ""}
                        onChange={handleInputChange}
                        placeholder="LinkedIn username"
                        className="glass-input w-full"
                      />
                    </div>
                  </div>
                )}
                
                {!isEditing && (
                  <div className="flex gap-4 mt-4">
                    {userData.github && (
                      <a
                        href={`https://github.com/${userData.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/70 hover:text-primary transition-colors"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                    {userData.twitter && (
                      <a
                        href={`https://twitter.com/${userData.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/70 hover:text-primary transition-colors"
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                    )}
                    {userData.linkedin && (
                      <a
                        href={`https://linkedin.com/in/${userData.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/70 hover:text-primary transition-colors"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="glass-card rounded-xl p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <p className="text-foreground/70 text-sm">Total Points</p>
                <p className="text-2xl font-bold">{userData.coins}</p>
              </div>
            </div>
            
            <div className="glass-card rounded-xl p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-foreground/70 text-sm">Completed Challenges</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
            
            <div className="glass-card rounded-xl p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <p className="text-foreground/70 text-sm">Current Rank</p>
                <p className="text-2xl font-bold">Advanced</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Skills Progress */}
            <div className="lg:col-span-2">
              <div className="glass-card rounded-xl overflow-hidden h-full">
                <div className="bg-accent/50 p-4 border-b border-border">
                  <h2 className="font-medium flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Skills & Progress
                  </h2>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Technical Areas */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Technical Areas</h3>
                      
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="flex items-center gap-2">
                              <Code className="h-4 w-4" /> Coding
                            </span>
                            <span>{userData.progress.coding}%</span>
                          </div>
                          <div className="h-2 w-full bg-accent/50 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${userData.progress.coding}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="flex items-center gap-2">
                              <Server className="h-4 w-4" /> Algorithms
                            </span>
                            <span>{userData.progress.algorithms}%</span>
                          </div>
                          <div className="h-2 w-full bg-accent/50 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${userData.progress.algorithms}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="flex items-center gap-2">
                              <Database className="h-4 w-4" /> Frameworks
                            </span>
                            <span>{userData.progress.frameworks}%</span>
                          </div>
                          <div className="h-2 w-full bg-accent/50 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${userData.progress.frameworks}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Programming Skills */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Programming Skills</h3>
                      
                      <div className="space-y-6">
                        {skills.map((skill) => (
                          <div key={skill.name}>
                            <div className="flex justify-between text-sm mb-1">
                              <span>{skill.name}</span>
                              <span>{skill.level}%</span>
                            </div>
                            <div className="h-2 w-full bg-accent/50 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${skill.level}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Overall Stats */}
                  <div className="mt-8 pt-6 border-t border-border">
                    <h3 className="text-lg font-medium mb-4">Overall Statistics</h3>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="glass-card p-4 rounded-lg text-center">
                        <div className="text-3xl font-bold text-primary">21</div>
                        <div className="text-sm text-foreground/70">Challenges</div>
                      </div>
                      <div className="glass-card p-4 rounded-lg text-center">
                        <div className="text-3xl font-bold text-primary">87%</div>
                        <div className="text-sm text-foreground/70">Success Rate</div>
                      </div>
                      <div className="glass-card p-4 rounded-lg text-center">
                        <div className="text-3xl font-bold text-primary">5</div>
                        <div className="text-sm text-foreground/70">Days Streak</div>
                      </div>
                      <div className="glass-card p-4 rounded-lg text-center">
                        <div className="text-3xl font-bold text-primary">8</div>
                        <div className="text-sm text-foreground/70">Achievements</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Achievements & Activity */}
            <div className="space-y-8">
              {/* Achievements */}
              <div className="glass-card rounded-xl overflow-hidden">
                <div className="bg-accent/50 p-4 border-b border-border">
                  <h2 className="font-medium flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Achievements
                  </h2>
                </div>
                
                <div className="p-4 max-h-60 overflow-y-auto">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="py-3 border-b border-border last:border-0 flex items-start gap-3"
                    >
                      <div className="p-1.5 rounded-full bg-primary/10 text-primary">
                        <Trophy className="h-4 w-4" />
                      </div>
                      <div className="text-sm">{achievement}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Recent Activity */}
              <div className="glass-card rounded-xl overflow-hidden">
                <div className="bg-accent/50 p-4 border-b border-border">
                  <h2 className="font-medium flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Recent Activity
                  </h2>
                </div>
                
                <div className="p-4 max-h-60 overflow-y-auto">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="py-3 border-b border-border last:border-0"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <div className="font-medium text-sm">{activity.title}</div>
                        <div className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                          +{activity.points} pts
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-foreground/70">
                        <div className="capitalize">{activity.type}</div>
                        <div>{activity.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
