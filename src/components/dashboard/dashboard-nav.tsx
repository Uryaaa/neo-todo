"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { User, Settings, Palette, LogOut, Github, Info, Star, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MobileNav } from "@/components/dashboard/mobile-nav";

interface DashboardNavProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function DashboardNav({ user }: DashboardNavProps) {
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
    : user.email?.charAt(0) || "U";

  return (
    <header className="sticky top-0 z-40 border-b-[5px] border-black bg-[hsl(var(--accent-medium))] shadow-[0px_4px_0px_0px_rgba(0,0,0)] neobrutal-header">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <MobileNav />
          <Link href="/dashboard" className="flex items-center">
            <span className="text-xl font-black">TODO App</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6 mx-auto">
          <Link
            href="/"
            className="flex items-center text-sm font-bold hover:scale-105 hover:translate-y-[-2px] transition-all duration-200 ease-in-out"
          >
            <Home className="h-4 w-4 mr-1" />
            <span>Home</span>
          </Link>
          <Link
            href="/about"
            className="flex items-center text-sm font-bold hover:scale-105 hover:translate-y-[-2px] transition-all duration-200 ease-in-out"
          >
            <Info className="h-4 w-4 mr-1" />
            <span>About</span>
          </Link>
          <Link
            href="/features"
            className="flex items-center text-sm font-bold hover:scale-105 hover:translate-y-[-2px] transition-all duration-200 ease-in-out"
          >
            <Star className="h-4 w-4 mr-1" />
            <span>Features</span>
          </Link>
          <a
            href="https://github.com/yourusername/todo-app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm font-bold hover:scale-105 hover:translate-y-[-2px] transition-all duration-200 ease-in-out"
          >
            <Github className="h-4 w-4 mr-1" />
            <span>GitHub</span>
          </a>
        </div>

        <nav className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 p-0 rounded-full bg-transparent hover:bg-transparent">
                <Avatar className="h-full w-full border-2 border-black">
                  {user.image ? (
                    <AvatarImage
                      key={`avatar-${Date.now()}`}
                      src={user.image.startsWith('/uploads/')
                        ? `${user.image}?v=${Date.now()}`
                        : user.image}
                      alt={user.name || "User"}
                      onError={(e) => {
                        console.error("Failed to load image:", user.image);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <AvatarFallback className="bg-[hsl(var(--accent-medium))] text-black font-bold">
                      {initials}
                    </AvatarFallback>
                  )}
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 border-[3px] border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0)] bg-[hsl(var(--accent-light)_/_0.9)] p-0">
              <DropdownMenuLabel className="border-b-[3px] border-black p-3 bg-[hsl(var(--accent-medium))]">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-bold text-black">{user.name || "User"}</p>
                  <p className="text-xs font-medium text-black">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <div className="p-2">
                <DropdownMenuItem asChild className="rounded-none hover:bg-[hsl(var(--accent-medium)_/_0.5)] focus:bg-[hsl(var(--accent-medium)_/_0.5)] p-2 font-medium">
                  <Link href="/dashboard/profile" className="cursor-pointer w-full">
                    <User className="mr-2 h-5 w-5" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-none hover:bg-[hsl(var(--accent-medium)_/_0.5)] focus:bg-[hsl(var(--accent-medium)_/_0.5)] p-2 font-medium">
                  <Link href="/dashboard/settings" className="cursor-pointer w-full">
                    <Settings className="mr-2 h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="h-[3px] bg-black my-2" />
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="cursor-pointer bg-red-300 hover:bg-red-400 focus:bg-red-400 rounded-none p-2 font-medium text-black"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}
