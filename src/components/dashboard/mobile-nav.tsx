"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Home, ListChecks, User, Settings, Github, Info, Star, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when mobile nav is open
  useBodyScrollLock(isOpen);

  // Close mobile nav when switching to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setIsOpen(false);
        // Force cleanup of body styles when switching to desktop
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.classList.remove("modal-open");
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile nav on route change (when clicking links)
  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
    };

    // Listen for popstate events (back/forward navigation)
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden mobile-nav-container">
      {/* Hamburger button */}
      <Button
        onClick={toggleMenu}
        variant="ghost"
        className={cn(
          "neobrutal-button p-2 h-10 w-10 flex items-center justify-center transition-all duration-300",
          isOpen ? "bg-red-200 rotate-90" : "bg-white hover:bg-[hsl(var(--accent-light))]"
        )}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Mobile navigation menu */}
      <div
        className={cn(
          "fixed inset-0 top-16 z-50 bg-[hsl(var(--accent-light))] border-r-[5px] border-black transform transition-all duration-300 ease-in-out mobile-nav-height",
          isOpen ? "translate-x-0 shadow-[8px_8px_0px_0px_rgba(0,0,0)]" : "-translate-x-full shadow-none"
        )}
      >
        {/* Scrollable navigation container */}
        <div className="mobile-nav-scrollable scrollbar-invisible">
          <nav className="flex flex-col space-y-4 p-6 pb-20">
          <Link
            href="/"
            className={cn(
              "flex items-center px-4 py-3 text-base font-bold border-[3px] border-black bg-blue-100 shadow-[4px_4px_0px_0px_rgba(0,0,0)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 neobrutal-button",
              isOpen ? "animate-slide-in" : "",
              "animation-delay-50"
            )}
            onClick={closeMenu}
            style={{ animationDelay: "0.05s" }}
          >
            <Home className="mr-3 h-5 w-5" />
            Home
          </Link>
          <Link
            href="/dashboard"
            className={cn(
              "flex items-center px-4 py-3 text-base font-bold border-[3px] border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 neobrutal-button",
              isOpen ? "animate-slide-in" : "",
              "animation-delay-100"
            )}
            onClick={closeMenu}
            style={{ animationDelay: "0.1s" }}
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/dashboard/todos"
            className={cn(
              "flex items-center px-4 py-3 text-base font-bold border-[3px] border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 neobrutal-button",
              isOpen ? "animate-slide-in" : ""
            )}
            onClick={closeMenu}
            style={{ animationDelay: "0.15s" }}
          >
            <ListChecks className="mr-3 h-5 w-5" />
            Todos
          </Link>
          <Link
            href="/dashboard/profile"
            className={cn(
              "flex items-center px-4 py-3 text-base font-bold border-[3px] border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 neobrutal-button",
              isOpen ? "animate-slide-in" : ""
            )}
            onClick={closeMenu}
            style={{ animationDelay: "0.2s" }}
          >
            <User className="mr-3 h-5 w-5" />
            Profile
          </Link>
          <Link
            href="/dashboard/settings"
            className={cn(
              "flex items-center px-4 py-3 text-base font-bold border-[3px] border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 neobrutal-button",
              isOpen ? "animate-slide-in" : ""
            )}
            onClick={closeMenu}
            style={{ animationDelay: "0.25s" }}
          >
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </Link>

          {/* Divider */}
          <div className="border-t-[3px] border-black my-2"></div>

          {/* Additional Links */}
          <Link
            href="/about"
            className={cn(
              "flex items-center px-4 py-3 text-base font-bold border-[3px] border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 neobrutal-button",
              isOpen ? "animate-slide-in" : ""
            )}
            onClick={closeMenu}
            style={{ animationDelay: "0.35s" }}
          >
            <Info className="mr-3 h-5 w-5" />
            About
          </Link>

          <Link
            href="/features"
            className={cn(
              "flex items-center px-4 py-3 text-base font-bold border-[3px] border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 neobrutal-button",
              isOpen ? "animate-slide-in" : ""
            )}
            onClick={closeMenu}
            style={{ animationDelay: "0.4s" }}
          >
            <Star className="mr-3 h-5 w-5" />
            Features
          </Link>

          <a
            href="https://github.com/yourusername/todo-app"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center px-4 py-3 text-base font-bold border-[3px] border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 neobrutal-button",
              isOpen ? "animate-slide-in" : ""
            )}
            onClick={closeMenu}
            style={{ animationDelay: "0.45s" }}
          >
            <Github className="mr-3 h-5 w-5" />
            GitHub
          </a>
          </nav>
        </div>
      </div>

      {/* Overlay to close the menu when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 top-16 z-40 bg-black/50"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
