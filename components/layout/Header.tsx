"use client";

import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="h-16 border-b bg-card px-6 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <h1 className="text-sm font-medium text-muted-foreground">
          Academic Year: <span className="text-foreground font-semibold">2025-2026</span>
        </h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
        </Button>
        
        <div className="flex items-center space-x-2 border-l pl-4">
          <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
            <User className="h-4 w-4" />
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium leading-none">Admin User</p>
            <p className="text-xs text-muted-foreground mt-1">Super Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}