import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { Home, ListChecks, User, Settings, Shield, LayoutDashboard } from "lucide-react";
import { isAdmin } from "@/lib/roles";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // The middleware will handle redirecting if there's no session
  // This is just a fallback
  if (!session) {
    return null;
  }

  // Check if user is admin for conditional navigation
  const userIsAdmin = session.user.role ? isAdmin(session.user.role) : false;

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNav user={session.user} />
      <div className="flex-1 flex">
        <aside className="fixed top-16 z-30 hidden h-[calc(100vh-4rem)] w-[240px] shrink-0 overflow-y-auto scrollbar-thin border-r-[5px] border-black md:sticky md:block neobrutal-sidebar">
          <nav className="flex h-full flex-col space-y-2 p-4">
            <Link
              href="/"
              className="flex items-center px-3 py-2 text-sm font-bold border-[3px] border-black bg-blue-100 shadow-[2px_2px_0px_0px_rgba(0,0,0)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center px-3 py-2 text-sm font-bold border-[3px] border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
            >
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/todos"
              className="flex items-center px-3 py-2 text-sm font-bold border-[3px] border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
            >
              <ListChecks className="w-4 h-4 mr-2" />
              Todos
            </Link>
            <Link
              href="/dashboard/profile"
              className="flex items-center px-3 py-2 text-sm font-bold border-[3px] border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center px-3 py-2 text-sm font-bold border-[3px] border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Link>

            {/* Admin Navigation - Only show for admins */}
            {userIsAdmin && (
              <>
                <div className="border-t-2 border-black my-2"></div>
                <Link
                  href="/dashboard/admin"
                  className="flex items-center px-3 py-2 text-sm font-bold border-[3px] border-black bg-red-100 shadow-[2px_2px_0px_0px_rgba(0,0,0)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Admin Panel
                </Link>
                <Link
                  href="/dashboard/admin/users"
                  className="flex items-center px-3 py-2 text-sm font-bold border-[3px] border-black bg-red-50 shadow-[2px_2px_0px_0px_rgba(0,0,0)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
                >
                  <User className="w-4 h-4 mr-2" />
                  Manage Users
                </Link>
              </>
            )}
          </nav>
        </aside>
        <main className="flex-1 flex-col overflow-hidden p-6 neobrutal-main container mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
