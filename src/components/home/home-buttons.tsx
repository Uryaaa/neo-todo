"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus, ArrowRight, Home } from "lucide-react";

export function LoginButton() {
  return (
    <Link href="/login">
      <Button className="neobrutal-button-primary hover-pop">
        <LogIn className="w-4 h-4 mr-2" />
        Login
      </Button>
    </Link>
  );
}

export function SignUpButton() {
  return (
    <Link href="/register">
      <Button className="neobrutal-button-primary hover-pop">
        <UserPlus className="w-4 h-4 mr-2" />
        Sign Up
      </Button>
    </Link>
  );
}

export function GetStartedButton() {
  return (
    <Link href="/register">
      <Button className="neobrutal-button-primary hover-pop text-lg px-8 py-6">
        <ArrowRight className="w-5 h-5 mr-2" />
        Get Started
      </Button>
    </Link>
  );
}

export function DashboardButton() {
  return (
    <Link href="/dashboard">
      <Button className="neobrutal-button-primary hover-pop">
        <Home className="w-4 h-4 mr-2" />
        Dashboard
      </Button>
    </Link>
  );
}

export function DashboardLargeButton() {
  return (
    <Link href="/dashboard">
      <Button className="neobrutal-button-primary hover-pop text-lg px-8 py-6">
        <Home className="w-5 h-5 mr-2" />
        Go to Dashboard
      </Button>
    </Link>
  );
}

export function HomeButton() {
  return (
    <Link href="/">
      <Button className="neobrutal-button hover-pop">
        <Home className="w-4 h-4 mr-2" />
        Home
      </Button>
    </Link>
  );
}

export function HomeLargeButton() {
  return (
    <Link href="/">
      <Button className="neobrutal-button-primary hover-pop text-lg px-8 py-6">
        <Home className="w-5 h-5 mr-2" />
        Back to Home
      </Button>
    </Link>
  );
}
