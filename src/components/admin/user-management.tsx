"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Users,
  Search,
  Edit,
  Trash2,
  Plus,
  Shield,
  UserCheck,
  AlertTriangle,
  Calendar
} from "lucide-react";
import { format } from "date-fns";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    todos: number;
  };
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (userId: string, updates: Partial<User>) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update user");
      }

      await fetchUsers();
      setEditDialogOpen(false);
      setSelectedUser(null);

      toast({
        title: "Success",
        description: "User updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update user",
        variant: "destructive",
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete user");
      }

      await fetchUsers();
      setDeleteDialogOpen(false);
      setSelectedUser(null);

      toast({
        title: "Success",
        description: "User deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete user",
        variant: "destructive",
      });
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "USER":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "ADMIN":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "SUPERUSER":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <Card className="neobrutal-card">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="neobrutal-card card-blue">
        <CardHeader className="border-b-2 border-black">
          <CardTitle className="flex items-center">
            <Search className="h-5 w-5 mr-2" />
            Search & Filter Users
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="neobrutal-input"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-48 neobrutal-input">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="USER">Users</SelectItem>
                <SelectItem value="ADMIN">Admins</SelectItem>
                <SelectItem value="SUPERUSER">Superusers</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card className="neobrutal-card card-white">
        <CardHeader className="border-b-2 border-black">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Users ({filteredUsers.length})
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4 max-h-[60vh] overflow-y-auto scrollbar-thin">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-black flex items-center justify-center">
                    <UserCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{user.name || "Unnamed User"}</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={`${getRoleColor(user.role)} border-2 border-black font-bold text-xs`}>
                        {user.role}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {user._count.todos} todos
                      </span>
                      <span className="text-xs text-gray-500">
                        <Calendar className="h-3 w-3 inline mr-1" />
                        {format(new Date(user.createdAt), "MMM dd, yyyy")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedUser(user);
                      setEditDialogOpen(true);
                    }}
                    className="neobrutal-button-small"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedUser(user);
                      setDeleteDialogOpen(true);
                    }}
                    className="neobrutal-button-small text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            {filteredUsers.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500 font-medium">No users found matching your criteria</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="neobrutal-dialog bg-blue-100">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Edit className="h-5 w-5 mr-2" />
              Edit User
            </DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <EditUserForm
              user={selectedUser}
              onSave={(updates) => handleUpdateUser(selectedUser.id, updates)}
              onCancel={() => setEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="neobrutal-dialog bg-red-100">
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-600">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Delete User
            </DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <p className="text-black font-medium">
                Are you sure you want to delete <strong>{selectedUser.name || selectedUser.email}</strong>?
              </p>
              <p className="text-sm text-gray-600">
                This action cannot be undone. All user data including todos will be permanently deleted.
              </p>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setDeleteDialogOpen(false)}
                  className="neobrutal-button"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleDeleteUser(selectedUser.id)}
                  className="neobrutal-button bg-red-500 hover:bg-red-600 text-white"
                >
                  Delete User
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Edit User Form Component
function EditUserForm({
  user,
  onSave,
  onCancel
}: {
  user: User;
  onSave: (updates: Partial<User>) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, email, role });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-bold mb-2">Name</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="neobrutal-input"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-bold mb-2">Email</label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="neobrutal-input"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-bold mb-2">Role</label>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="neobrutal-input">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USER">User</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="SUPERUSER">Superuser</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="neobrutal-button"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="neobrutal-button-accent"
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
}
