import Link from "next/link";
import { getSession } from "@/lib/session";
import { ArrowLeft, CheckSquare, Calendar, Image, Palette, Bell, User, Lock, Github, Info, Star, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function FeaturesPage() {
  const session = await getSession();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b-4 border-black bg-pink-100 shadow-[0px_4px_0px_0px_rgba(0,0,0)] neobrutal-header">
        <Link href="/" className="flex items-center justify-center">
          <span className="font-black text-2xl">TODO App</span>
        </Link>
        <div className="ml-auto flex items-center">
          <nav className="hidden md:flex items-center mr-6 space-x-6">
            <Link href="/about" className="flex items-center text-sm font-bold hover:scale-105 hover:translate-y-[-2px] transition-all duration-200 ease-in-out">
              <Info className="h-4 w-4 mr-1" />
              <span>About</span>
            </Link>
            <Link href="/features" className="flex items-center text-sm font-bold hover:scale-105 hover:translate-y-[-2px] transition-all duration-200 ease-in-out">
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
          </nav>
          <Link href={session ? "/dashboard" : "/"}>
            <Button className="neobrutal-button-primary hover-pop">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {session ? "Dashboard" : "Home"}
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="border-4 border-black p-8 bg-yellow-100 shadow-[8px_8px_0px_0px_rgba(0,0,0)] animate-pop mb-12">
            <h1 className="text-3xl font-black tracking-tighter sm:text-4xl md:text-5xl mb-6">
              Features
            </h1>
            <p className="text-black text-lg md:text-xl font-medium mb-4">
              Discover all the powerful features that make our TODO app stand out.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
              <div className="flex items-center mb-4">
                <CheckSquare className="h-8 w-8 mr-3 text-blue-500" />
                <h2 className="text-xl font-bold border-b-2 border-black pb-1">
                  Task Management
                </h2>
              </div>
              <p className="text-black text-base">
                Create, edit, and organize your tasks with ease. Mark tasks as complete and track your progress.
              </p>
            </div>

            <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
              <div className="flex items-center mb-4">
                <Calendar className="h-8 w-8 mr-3 text-green-500" />
                <h2 className="text-xl font-bold border-b-2 border-black pb-1">
                  Due Dates
                </h2>
              </div>
              <p className="text-black text-base">
                Set due dates for your tasks to stay on schedule. Never miss an important deadline again.
              </p>
            </div>

            <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
              <div className="flex items-center mb-4">
                <Image className="h-8 w-8 mr-3 text-purple-500" />
                <h2 className="text-xl font-bold border-b-2 border-black pb-1">
                  Image Attachments
                </h2>
              </div>
              <p className="text-black text-base">
                Attach images to your tasks for visual reference. Perfect for visual thinkers and project planning.
              </p>
            </div>

            <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
              <div className="flex items-center mb-4">
                <Palette className="h-8 w-8 mr-3 text-pink-500" />
                <h2 className="text-xl font-bold border-b-2 border-black pb-1">
                  Customizable Themes
                </h2>
              </div>
              <p className="text-black text-base">
                Personalize your experience with different color themes. Make the app truly yours.
              </p>
            </div>

            <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
              <div className="flex items-center mb-4">
                <Bell className="h-8 w-8 mr-3 text-yellow-500" />
                <h2 className="text-xl font-bold border-b-2 border-black pb-1">
                  Notifications
                </h2>
              </div>
              <p className="text-black text-base">
                Receive email notifications for important updates and approaching deadlines.
              </p>
            </div>

            <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
              <div className="flex items-center mb-4">
                <User className="h-8 w-8 mr-3 text-cyan-500" />
                <h2 className="text-xl font-bold border-b-2 border-black pb-1">
                  User Profiles
                </h2>
              </div>
              <p className="text-black text-base">
                Customize your profile with a personalized avatar and manage your account settings.
              </p>
            </div>
          </div>

          <div className="border-4 border-black p-6 bg-blue-100 shadow-[6px_6px_0px_0px_rgba(0,0,0)] mt-12">
            <div className="flex items-center mb-4">
              <Lock className="h-8 w-8 mr-3" />
              <h2 className="text-2xl font-bold border-b-2 border-black pb-1">
                Secure & Private
              </h2>
            </div>
            <p className="text-black text-lg mb-4">
              Your data is important to us. We use industry-standard security measures to protect your information.
            </p>
            <div className="flex justify-center mt-6">
              <Link href={session ? "/dashboard" : "/register"}>
                <Button className="neobrutal-button-primary hover-pop text-lg px-8 py-4">
                  {session ? "Go to Dashboard" : "Get Started Now"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="flex flex-col gap-4 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t-4 border-black bg-pink-200">
        <p className="text-sm font-bold text-black">
          © {new Date().getFullYear()} TODO App. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="flex items-center text-sm font-bold hover:scale-105 hover:translate-y-[-2px] transition-all duration-200 ease-in-out" href="/about">
            <Info className="h-3 w-3 mr-1" />
            About
          </Link>
          <Link className="flex items-center text-sm font-bold hover:scale-105 hover:translate-y-[-2px] transition-all duration-200 ease-in-out" href="/features">
            <Star className="h-3 w-3 mr-1" />
            Features
          </Link>
          <a
            className="flex items-center text-sm font-bold hover:scale-105 hover:translate-y-[-2px] transition-all duration-200 ease-in-out"
            href="https://github.com/yourusername/todo-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-3 w-3 mr-1" />
            GitHub
          </a>
          <Link className="flex items-center text-sm font-bold hover:scale-105 hover:translate-y-[-2px] transition-all duration-200 ease-in-out" href="/terms">
            <FileText className="h-3 w-3 mr-1" />
            Terms
          </Link>
          <Link className="flex items-center text-sm font-bold hover:scale-105 hover:translate-y-[-2px] transition-all duration-200 ease-in-out" href="/privacy">
            <Lock className="h-3 w-3 mr-1" />
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
