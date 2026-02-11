"use client";

import { Moon, Sun } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
}

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === "undefined") {
      return "light";
    }

    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  });

  const handleThemeChange = (nextTheme: Theme) => {
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <div className={cn("inline-flex items-center rounded-lg border border-border bg-card p-1 shadow-xs", className)}>
      <Button
        type="button"
        size="sm"
        variant={theme === "light" ? "default" : "ghost"}
        className="h-7 px-3"
        onClick={() => handleThemeChange("light")}
      >
        <Sun className="size-4" />
        Claro
      </Button>
      <Button
        type="button"
        size="sm"
        variant={theme === "dark" ? "default" : "ghost"}
        className="h-7 px-3"
        onClick={() => handleThemeChange("dark")}
      >
        <Moon className="size-4" />
        Escuro
      </Button>
    </div>
  );
}
