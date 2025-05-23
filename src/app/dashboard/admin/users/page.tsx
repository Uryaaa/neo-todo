import { redirect } from "next/navigation";
import { checkIsAdmin } from "@/lib/roles";
import { UserManagement } from "@/components/admin/user-management";
import { Users } from "lucide-react";

export default async function AdminUsersPage() {
  const isAdmin = await checkIsAdmin();

  if (!isAdmin) {
    redirect("/dashboard?error=unauthorized");
  }

  return (
    <div className="space-y-6">
      <div className="neobrutal-filter-container mb-6">
        <div className="flex items-center">
          <Users className="h-8 w-8 mr-3" />
          <h1 className="text-3xl font-black tracking-tight">User Management</h1>
        </div>
        <p className="text-black font-medium mt-2">
          View, edit, and manage user accounts
        </p>
      </div>
      
      <UserManagement />
    </div>
  );
}
