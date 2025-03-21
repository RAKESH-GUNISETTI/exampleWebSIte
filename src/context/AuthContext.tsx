
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

interface ProfileData {
  id: string;
  first_name: string;
  last_name: string;
  profession: string;
  coins: number;
  created_at: string;
  updated_at: string;
}

interface ProgressData {
  id: string;
  user_id: string;
  coding: number;
  algorithms: number;
  frameworks: number;
  updated_at: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Set up auth state listener
  useEffect(() => {
    console.log("Setting up auth state listener...");
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log("Auth state change:", event);
        setSession(newSession);
        setUser(newSession?.user ?? null);
        setIsLoggedIn(!!newSession);

        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          // Load user data on login
          if (newSession?.user) {
            await fetchUserData(newSession.user.id);
          }
        } else if (event === 'SIGNED_OUT') {
          setUserData(null);
        }
      }
    );

    // THEN check for existing session
    const initializeAuth = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        console.log("Current session:", currentSession ? "Found" : "None");
        
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setIsLoggedIn(!!currentSession);

        if (currentSession?.user) {
          await fetchUserData(currentSession.user.id);
        }
        
        setIsInitialized(true);
      } catch (error) {
        console.error("Error initializing auth:", error);
        setIsInitialized(true);
      }
    };

    initializeAuth();

    return () => {
      console.log("Cleaning up auth subscription");
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      console.log("Fetching user data for:", userId);
      
      // Fetch profile data
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) {
        console.error("Error fetching profile:", profileError);
        throw profileError;
      }

      // Fetch progress data
      const { data: progressData, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .single();
        
      if (progressError) {
        console.error("Error fetching progress:", progressError);
        throw progressError;
      }

      // Combine the data
      const profile = profileData as ProfileData;
      const progress = progressData as ProgressData;

      const newUserData = {
        firstName: profile.first_name || "",
        lastName: profile.last_name || "",
        email: user?.email || "",
        profession: profile.profession || "",
        coins: profile.coins || 0,
        progress: {
          coding: progress.coding || 0,
          algorithms: progress.algorithms || 0,
          frameworks: progress.frameworks || 0,
        },
      };
      
      console.log("User data fetched successfully:", newUserData);
      setUserData(newUserData);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // If there's an error, set default data
      setUserData({
        firstName: user?.user_metadata?.first_name || "User",
        lastName: user?.user_metadata?.last_name || "",
        email: user?.email || "",
        profession: user?.user_metadata?.profession || "Student",
        coins: 0,
        progress: {
          coding: 0,
          algorithms: 0,
          frameworks: 0,
        },
      });
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log("Attempting login with email:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("Login error:", error.message);
        toast.error(error.message);
        return false;
      }
      
      console.log("Login successful:", data.user?.id);
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
      console.log("Attempting signup with email:", formData.email);
      const { data, error } = await supabase.auth.signUp({
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
        console.error("Signup error:", error.message);
        toast.error(error.message);
        return false;
      }
      
      console.log("Signup successful:", data.user?.id);
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
      console.log("Attempting Google login");
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}`,
        },
      });
      
      if (error) {
        console.error("Google login error:", error.message);
        toast.error(error.message);
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed. Please try again.");
    }
  };

  const loginWithGithub = async (): Promise<void> => {
    try {
      console.log("Attempting GitHub login");
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}`,
        },
      });
      
      if (error) {
        console.error("GitHub login error:", error.message);
        toast.error(error.message);
      }
    } catch (error) {
      console.error("GitHub login error:", error);
      toast.error("GitHub login failed. Please try again.");
    }
  };

  const logout = async () => {
    try {
      console.log("Attempting logout");
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Logout error:", error.message);
        toast.error(error.message);
        return;
      }
      
      setIsLoggedIn(false);
      setUserData(null);
      setUser(null);
      setSession(null);
      
      console.log("Logout successful");
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
