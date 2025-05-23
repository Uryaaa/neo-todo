import Link from "next/link";
import { getSession } from "@/lib/session";
import { ArrowLeft, Github, Info, Star, FileText, Users, AlertTriangle, Scale, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function TermsPage() {
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
          <div className="border-4 border-black p-8 bg-orange-100 shadow-[8px_8px_0px_0px_rgba(0,0,0)] animate-pop mb-12">
            <h1 className="text-3xl font-black tracking-tighter sm:text-4xl md:text-5xl mb-6">
              Terms of Service
            </h1>
            <p className="text-black text-lg md:text-xl font-medium mb-4">
              Please read these terms carefully before using our TODO application.
            </p>
            <p className="text-sm text-black font-medium">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-8">
            <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
              <div className="flex items-center mb-4">
                <FileText className="h-6 w-6 mr-3 text-blue-500" />
                <h2 className="text-2xl font-bold tracking-tighter border-b-2 border-black pb-1">
                  Acceptance of Terms
                </h2>
              </div>
              <div className="space-y-4 text-black text-lg">
                <p>By accessing and using the TODO App, you accept and agree to be bound by the terms and provision of this agreement.</p>
                <p>If you do not agree to abide by the above, please do not use this service.</p>
              </div>
            </div>

            <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 mr-3 text-green-500" />
                <h2 className="text-2xl font-bold tracking-tighter border-b-2 border-black pb-1">
                  User Accounts
                </h2>
              </div>
              <div className="space-y-4 text-black text-lg">
                <p><strong>Account Creation:</strong> You must provide accurate and complete information when creating an account.</p>
                <p><strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials.</p>
                <p><strong>Account Usage:</strong> You are responsible for all activities that occur under your account.</p>
                <p><strong>Age Requirement:</strong> You must be at least 13 years old to use this service.</p>
              </div>
            </div>

            <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 mr-3 text-yellow-500" />
                <h2 className="text-2xl font-bold tracking-tighter border-b-2 border-black pb-1">
                  Acceptable Use
                </h2>
              </div>
              <div className="space-y-4 text-black text-lg">
                <p>You agree not to use the service to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Upload or share illegal, harmful, or offensive content</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Interfere with or disrupt the service or servers</li>
                  <li>Attempt to gain unauthorized access to other accounts</li>
                  <li>Use the service for commercial purposes without permission</li>
                </ul>
              </div>
            </div>

            <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
              <div className="flex items-center mb-4">
                <Scale className="h-6 w-6 mr-3 text-purple-500" />
                <h2 className="text-2xl font-bold tracking-tighter border-b-2 border-black pb-1">
                  Intellectual Property
                </h2>
              </div>
              <div className="space-y-4 text-black text-lg">
                <p><strong>Our Content:</strong> The TODO App and its original content, features, and functionality are owned by us and are protected by copyright and other laws.</p>
                <p><strong>Your Content:</strong> You retain ownership of the content you create and upload to the service.</p>
                <p><strong>License:</strong> By using our service, you grant us a license to use, store, and display your content as necessary to provide the service.</p>
              </div>
            </div>
          </div>

          <div className="border-4 border-black p-6 bg-red-100 shadow-[6px_6px_0px_0px_rgba(0,0,0)] mt-8">
            <h2 className="text-2xl font-bold tracking-tighter md:text-3xl mb-4 border-b-2 border-black pb-2">
              Limitation of Liability
            </h2>
            <div className="text-black text-lg space-y-4">
              <p>The service is provided "as is" without any warranties, expressed or implied.</p>
              <p>We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.</p>
              <p>Our total liability shall not exceed the amount you paid for the service in the past 12 months.</p>
            </div>
          </div>

          <div className="border-4 border-black p-6 bg-blue-100 shadow-[6px_6px_0px_0px_rgba(0,0,0)] mt-8">
            <h2 className="text-2xl font-bold tracking-tighter md:text-3xl mb-4 border-b-2 border-black pb-2">
              Contact Information
            </h2>
            <p className="text-black text-lg">
              If you have any questions about these Terms of Service, please contact us at <a href="mailto:legal@todoapp.example" className="font-bold border-b-2 border-black hover-wiggle">legal@todoapp.example</a>
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
