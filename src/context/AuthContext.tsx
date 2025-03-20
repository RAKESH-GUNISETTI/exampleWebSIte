
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";

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
  user: User | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (formData: SignupFormData) => Promise<boolean>;
  loginWithGoogle: () => Promise<void>;
  loginWithGithub: () => Promise<void>;
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
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  // Set up auth state listener
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log("Auth state change:", event);
        setSession(newSession);
        setUser(newSession?.user ?? null);
        setIsLoggedIn(!!newSession);

        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          // Load user data on login
          if (newSession?.user) {
            fetchUserData(newSession.user.id);
          }
        } else if (event === 'SIGNED_OUT') {
          setUserData(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsLoggedIn(!!currentSession);

      if (currentSession?.user) {
        fetchUserData(currentSession.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      // In a real app with a profiles table, we'd fetch user data here
      // For now, set default data
      setUserData({
        ...defaultUserData,
        email: user?.email || defaultUserData.email,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast.error(error.message);
        return false;
      }
      
      toast.success("Logged in successfully!");
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
      return false;
    }
  };

  const signup = async (formData: SignupFormData): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            profession: formData.profession,
          },
        },
      });
      
      if (error) {
        toast.error(error.message);
        return false;
      }
      
      toast.success("Account created successfully! Please check your email to verify your account.");
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup failed. Please try again.");
      return false;
    }
  };

  const loginWithGoogle = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
      
      if (error) {
        toast.error(error.message);
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed. Please try again.");
    }
  };

  const loginWithGithub = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: window.location.origin,
        },
      });
      
      if (error) {
        toast.error(error.message);
      }
    } catch (error) {
      console.error("GitHub login error:", error);
      toast.error("GitHub login failed. Please try again.");
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast.error(error.message);
        return;
      }
      
      setIsLoggedIn(false);
      setUserData(null);
      setUser(null);
      setSession(null);
      
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      userData, 
      user, 
      session,
      login, 
      signup, 
      loginWithGoogle, 
      loginWithGithub, 
      logout 
    }}>
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
