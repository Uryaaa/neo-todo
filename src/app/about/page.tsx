import Link from "next/link";
import { getSession } from "@/lib/session";
import { ArrowLeft, Github, Info, Star, FileText, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AboutPage() {
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
          <div className="border-4 border-black p-8 bg-blue-100 shadow-[8px_8px_0px_0px_rgba(0,0,0)] animate-pop mb-12">
            <h1 className="text-3xl font-black tracking-tighter sm:text-4xl md:text-5xl mb-6">
              About TODO App
            </h1>
            <p className="text-black text-lg md:text-xl font-medium mb-4">
              A powerful task management application built with modern web technologies.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl mb-4 border-b-2 border-black pb-2">
                Our Mission
              </h2>
              <p className="text-black text-lg mb-4">
                We believe in creating tools that help people stay organized and productive. Our mission is to provide a simple yet powerful task management solution that adapts to your workflow.
              </p>
              <p className="text-black text-lg">
                With a focus on user experience and modern design, we've built a TODO app that's both functional and enjoyable to use.
              </p>
            </div>

            <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl mb-4 border-b-2 border-black pb-2">
                Technology Stack
              </h2>
              <p className="text-black text-lg mb-4">
                Built with cutting-edge technologies:
              </p>
              <ul className="list-disc list-inside text-black text-lg space-y-2 mb-4">
                <li>Next.js for server-side rendering and routing</li>
                <li>React for interactive UI components</li>
                <li>Tailwind CSS for styling with a neobrutalism design approach</li>
                <li>Prisma for database management</li>
                <li>NextAuth for authentication</li>
              </ul>
              <a
                href="https://github.com/yourusername/todo-app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-lg font-bold border-b-2 border-black hover-wiggle"
              >
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </a>
            </div>
          </div>

          <div className="border-4 border-black p-6 bg-green-100 shadow-[6px_6px_0px_0px_rgba(0,0,0)] mt-8">
            <h2 className="text-2xl font-bold tracking-tighter md:text-3xl mb-4 border-b-2 border-black pb-2">
              Get in Touch
            </h2>
            <p className="text-black text-lg mb-4">
              Have questions or suggestions? We'd love to hear from you!
            </p>
            <p className="text-black text-lg">
              Contact us at <a href="mailto:contact@todoapp.example" className="font-bold border-b-2 border-black hover-wiggle">contact@todoapp.example</a>
            </p>
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
