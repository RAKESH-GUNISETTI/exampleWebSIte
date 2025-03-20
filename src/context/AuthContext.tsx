
import React, { createContext, useContext, useState, useEffect } from "react";
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
}

interface AuthContextType {
  isLoggedIn: boolean;
  userData: UserData | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (formData: SignupFormData) => Promise<boolean>;
  logout: () => void;
}

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profession: string;
}

const defaultUserData: UserData = {
  firstName: "Demo",
  lastName: "User",
  email: "demo@example.com",
  profession: "student",
  coins: 150,
  progress: {
    coding: 45,
    algorithms: 30,
    frameworks: 65,
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  // Check for saved login state on mount
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      const storedUserData = localStorage.getItem("user");
      if (storedUserData) {
        try {
          const parsedData = JSON.parse(storedUserData);
          setUserData(parsedData);
        } catch (error) {
          console.error("Error parsing user data:", error);
          setUserData(defaultUserData);
        }
      } else {
        setUserData(defaultUserData);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // For demo, we accept any login with valid format
      if (email && password.length >= 6) {
        setIsLoggedIn(true);
        setUserData(defaultUserData);
        
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify({
          ...defaultUserData,
          email,
        }));
        
        toast.success("Logged in successfully!");
        return true;
      } else {
        toast.error("Invalid credentials");
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
      return false;
    }
  };

  const signup = async (formData: SignupFormData): Promise<boolean> => {
    // In a real app, this would be an API call
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const newUser: UserData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        profession: formData.profession,
        coins: 0,
        progress: {
          coding: 0,
          algorithms: 0,
          frameworks: 0,
        },
      };
      
      setIsLoggedIn(true);
      setUserData(newUser);
      
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(newUser));
      
      toast.success("Account created successfully!");
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup failed. Please try again.");
      return false;
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    toast.success("Logged out successfully!");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
