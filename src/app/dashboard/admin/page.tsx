import { redirect } from "next/navigation";
import { checkIsAdmin } from "@/lib/roles";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { Shield } from "lucide-react";

export default async function AdminPage() {
  const isAdmin = await checkIsAdmin();

  if (!isAdmin) {
    redirect("/dashboard?error=unauthorized");
  }

  return (
    <div className="space-y-6">
      <div className="neobrutal-filter-container mb-6">
        <div className="flex items-center">
          <Shield className="h-8 w-8 mr-3" />
          <h1 className="text-3xl font-black tracking-tight">Admin Dashboard</h1>
        </div>
        <p className="text-black font-medium mt-2">
          Manage users, view statistics, and oversee the application
        </p>
      </div>
      
      <AdminDashboard />
    </div>
  );
}
