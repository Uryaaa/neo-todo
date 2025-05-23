import Link from "next/link";
import { getSession } from "@/lib/session";
import { ArrowLeft, Github, Info, Star, Shield, Eye, Database, Cookie, FileText, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function PrivacyPage() {
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
          <div className="border-4 border-black p-8 bg-purple-100 shadow-[8px_8px_0px_0px_rgba(0,0,0)] animate-pop mb-12">
            <h1 className="text-3xl font-black tracking-tighter sm:text-4xl md:text-5xl mb-6">
              Privacy Policy
            </h1>
            <p className="text-black text-lg md:text-xl font-medium mb-4">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-black font-medium">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-8">
            <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
              <div className="flex items-center mb-4">
                <Database className="h-6 w-6 mr-3 text-blue-500" />
                <h2 className="text-2xl font-bold tracking-tighter border-b-2 border-black pb-1">
                  Information We Collect
                </h2>
              </div>
              <div className="space-y-4 text-black text-lg">
                <p><strong>Account Information:</strong> When you create an account, we collect your name, email address, and password (encrypted).</p>
                <p><strong>Task Data:</strong> We store the tasks, notes, and images you create within the application.</p>
                <p><strong>Usage Data:</strong> We may collect information about how you use our service to improve functionality.</p>
              </div>
            </div>

            <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
              <div className="flex items-center mb-4">
                <Eye className="h-6 w-6 mr-3 text-green-500" />
                <h2 className="text-2xl font-bold tracking-tighter border-b-2 border-black pb-1">
                  How We Use Your Information
                </h2>
              </div>
              <div className="space-y-4 text-black text-lg">
                <p><strong>Service Provision:</strong> To provide and maintain our TODO application services.</p>
                <p><strong>Communication:</strong> To send you important updates about your account and our service.</p>
                <p><strong>Improvement:</strong> To analyze usage patterns and improve our application.</p>
                <p><strong>Security:</strong> To protect against unauthorized access and maintain data security.</p>
              </div>
            </div>

            <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 mr-3 text-purple-500" />
                <h2 className="text-2xl font-bold tracking-tighter border-b-2 border-black pb-1">
                  Data Protection
                </h2>
              </div>
              <div className="space-y-4 text-black text-lg">
                <p><strong>Encryption:</strong> All sensitive data is encrypted both in transit and at rest.</p>
                <p><strong>Access Control:</strong> Only authorized personnel have access to user data.</p>
                <p><strong>Regular Audits:</strong> We regularly review our security practices and update them as needed.</p>
                <p><strong>No Selling:</strong> We never sell your personal information to third parties.</p>
              </div>
            </div>

            <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
              <div className="flex items-center mb-4">
                <Cookie className="h-6 w-6 mr-3 text-orange-500" />
                <h2 className="text-2xl font-bold tracking-tighter border-b-2 border-black pb-1">
                  Cookies and Tracking
                </h2>
              </div>
              <div className="space-y-4 text-black text-lg">
                <p><strong>Essential Cookies:</strong> We use cookies to maintain your login session and app preferences.</p>
                <p><strong>Analytics:</strong> We may use analytics tools to understand how our app is used.</p>
                <p><strong>No Third-Party Tracking:</strong> We don't use third-party tracking cookies for advertising.</p>
              </div>
            </div>
          </div>

          <div className="border-4 border-black p-6 bg-red-100 shadow-[6px_6px_0px_0px_rgba(0,0,0)] mt-8">
            <h2 className="text-2xl font-bold tracking-tighter md:text-3xl mb-4 border-b-2 border-black pb-2">
              Your Rights
            </h2>
            <div className="text-black text-lg space-y-2">
              <p>• <strong>Access:</strong> Request a copy of your personal data</p>
              <p>• <strong>Correction:</strong> Update or correct your information</p>
              <p>• <strong>Deletion:</strong> Request deletion of your account and data</p>
              <p>• <strong>Portability:</strong> Export your data in a standard format</p>
            </div>
            <p className="text-black text-lg mt-4">
              To exercise these rights, contact us at <a href="mailto:privacy@todoapp.example" className="font-bold border-b-2 border-black hover-wiggle">privacy@todoapp.example</a>
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
