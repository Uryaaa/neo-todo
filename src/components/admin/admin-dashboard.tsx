"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, CheckSquare, TrendingUp, Activity, Shield, UserCheck } from "lucide-react";

interface AdminStats {
  users: {
    total: number;
    recent: number;
    byRole: Record<string, number>;
    top: Array<{
      id: string;
      name: string;
      email: string;
      role: string;
      _count: { todos: number };
    }>;
  };
  todos: {
    total: number;
    completed: number;
    pending: number;
    recent: number;
    byPriority: Record<string, number>;
  };
  system: {
    completionRate: number;
    averageTodosPerUser: number;
  };
}

export function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats");
      if (!response.ok) {
        throw new Error("Failed to fetch stats");
      }
      const data = await response.json();
      setStats(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="neobrutal-card animate-pulse">
            <CardHeader className="border-b-2 border-black">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="neobrutal-card card-red">
        <CardContent className="pt-6">
          <p className="text-red-600 font-bold">Error loading admin dashboard: {error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!stats) return null;

  const getRoleColor = (role: string) => {
    switch (role) {
      case "USER":
        return "bg-blue-100 text-blue-800";
      case "ADMIN":
        return "bg-yellow-100 text-yellow-800";
      case "SUPERUSER":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="neobrutal-card card-blue animate-pop">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b-2 border-black">
            <CardTitle className="text-sm font-bold">Total Users</CardTitle>
            <Users className="h-4 w-4" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-black">{stats.users.total}</div>
            <p className="text-xs text-black font-medium">
              +{stats.users.recent} this month
            </p>
          </CardContent>
        </Card>

        <Card className="neobrutal-card card-green animate-pop">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b-2 border-black">
            <CardTitle className="text-sm font-bold">Total Todos</CardTitle>
            <CheckSquare className="h-4 w-4" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-black">{stats.todos.total}</div>
            <p className="text-xs text-black font-medium">
              {stats.todos.completed} completed
            </p>
          </CardContent>
        </Card>

        <Card className="neobrutal-card card-yellow animate-pop">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b-2 border-black">
            <CardTitle className="text-sm font-bold">Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-black">{stats.system.completionRate}%</div>
            <p className="text-xs text-black font-medium">
              Overall completion
            </p>
          </CardContent>
        </Card>

        <Card className="neobrutal-card card-purple animate-pop">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b-2 border-black">
            <CardTitle className="text-sm font-bold">Avg Todos/User</CardTitle>
            <Activity className="h-4 w-4" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-black">{stats.system.averageTodosPerUser}</div>
            <p className="text-xs text-black font-medium">
              Per user average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Users by Role */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="neobrutal-card card-cyan">
          <CardHeader className="border-b-2 border-black">
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              <CardTitle className="text-xl font-bold">Users by Role</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {Object.entries(stats.users.byRole).map(([role, count]) => (
                <div key={role} className="flex items-center justify-between">
                  <Badge className={`${getRoleColor(role)} border-2 border-black font-bold`}>
                    {role}
                  </Badge>
                  <span className="font-black text-lg">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Users */}
        <Card className="neobrutal-card card-pink">
          <CardHeader className="border-b-2 border-black">
            <div className="flex items-center">
              <UserCheck className="h-5 w-5 mr-2" />
              <CardTitle className="text-xl font-bold">Most Active Users</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {stats.users.top.map((user, index) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-black text-sm">#{index + 1}</span>
                    <div>
                      <p className="font-bold text-sm">{user.name || "Unnamed"}</p>
                      <p className="text-xs text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-sm">{user._count.todos} todos</p>
                    <Badge className={`${getRoleColor(user.role)} text-xs border border-black`}>
                      {user.role}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Todo Statistics */}
      <Card className="neobrutal-card card-green">
        <CardHeader className="border-b-2 border-black">
          <div className="flex items-center">
            <CheckSquare className="h-5 w-5 mr-2" />
            <CardTitle className="text-xl font-bold">Todo Statistics</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <p className="text-2xl font-black">{stats.todos.total}</p>
              <p className="text-sm font-bold text-gray-600">Total Todos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-green-600">{stats.todos.completed}</p>
              <p className="text-sm font-bold text-gray-600">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-orange-600">{stats.todos.pending}</p>
              <p className="text-sm font-bold text-gray-600">Pending</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-bold mb-3">By Priority:</h4>
            <div className="grid gap-2 md:grid-cols-3">
              {Object.entries(stats.todos.byPriority).map(([priority, count]) => (
                <div key={priority} className="flex items-center justify-between p-2 border-2 border-black bg-white">
                  <span className="font-bold text-sm">{priority}</span>
                  <span className="font-black">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
