
import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
    if (storedTheme) {
      setTheme(storedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      if (prevTheme === "light") return "dark";
      if (prevTheme === "dark") return "system";
      return "light";
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative h-9 w-9 rounded-full flex items-center justify-center transition-all duration-300",
        "hover:bg-accent focus-visible:ring-2 focus-visible:ring-primary",
        "text-foreground"
      )}
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      <Sun
        className={cn(
          "h-4 w-4 absolute transition-all duration-300",
          theme === "dark" ? "opacity-0 scale-50" : "opacity-100 scale-100"
        )}
      />
      <Moon
        className={cn(
          "h-4 w-4 absolute transition-all duration-300",
          theme === "light" ? "opacity-0 scale-50" : "opacity-100 scale-100"
        )}
      />
    </button>
  );
};

export default ThemeToggle;
