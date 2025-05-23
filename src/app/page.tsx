import Link from "next/link";
import { getSession } from "@/lib/session";
import { LoginButton, SignUpButton, GetStartedButton, DashboardButton, DashboardLargeButton } from "@/components/home/home-buttons";
import { Github, Info, Star, FileText, Lock } from "lucide-react";

export default async function Home() {
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
          <nav className="flex gap-4 sm:gap-6">
            {session ? (
              <DashboardButton />
            ) : (
              <>
                <LoginButton />
                <SignUpButton />
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4 max-w-4xl mx-auto border-4 border-black p-8 bg-blue-100 shadow-[8px_8px_0px_0px_rgba(0,0,0)] animate-pop">
                <h1 className="text-3xl font-black tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Manage Your Tasks Efficiently
                </h1>
                <p className="mx-auto max-w-[700px] text-black text-lg md:text-xl font-medium">
                  Stay organized, focused, and in control with our powerful TODO app.
                </p>
              </div>
              <div className="mt-8">
                {session ? (
                  <DashboardLargeButton />
                ) : (
                  <GetStartedButton />
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-black tracking-tighter md:text-4xl text-center mb-12 border-4 border-black p-4 bg-yellow-200 shadow-[6px_6px_0px_0px_rgba(0,0,0)] inline-block mx-auto">
              Amazing Features
            </h2>
            <div className="grid gap-8 lg:grid-cols-3 items-stretch">
              <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 hover-pop">
                <h3 className="text-2xl font-bold tracking-tighter md:text-3xl mb-4 border-b-2 border-black pb-2">
                  Organize Tasks
                </h3>
                <p className="text-black text-lg">
                  Create, categorize, and prioritize your tasks with ease.
                </p>
              </div>
              <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 hover-pop">
                <h3 className="text-2xl font-bold tracking-tighter md:text-3xl mb-4 border-b-2 border-black pb-2">
                  Track Progress
                </h3>
                <p className="text-black text-lg">
                  Monitor your progress and stay on top of your deadlines.
                </p>
              </div>
              <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 hover-pop">
                <h3 className="text-2xl font-bold tracking-tighter md:text-3xl mb-4 border-b-2 border-black pb-2">
                  Customize Settings
                </h3>
                <p className="text-black text-lg">
                  Personalize your experience with custom themes and notifications.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-4 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t-4 border-black bg-pink-200 neobrutal-footer">
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
