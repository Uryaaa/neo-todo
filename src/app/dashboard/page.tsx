import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ViewTasksButton, AddTaskButton, ManageSettingsButton } from "@/components/dashboard/dashboard-buttons";
import { Home, CheckSquare, Clock, AlertTriangle, ListChecks, Settings } from "lucide-react";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const todoCount = await prisma.todo.count({
    where: {
      userId: user.id,
    },
  });

  const completedTodoCount = await prisma.todo.count({
    where: {
      userId: user.id,
      completed: true,
    },
  });

  const pendingTodoCount = todoCount - completedTodoCount;

  const highPriorityCount = await prisma.todo.count({
    where: {
      userId: user.id,
      priority: "HIGH",
      completed: false,
    },
  });

  return (
    <div className="space-y-6">
      <div className="neobrutal-filter-container mb-6">
        <div className="flex items-center">
          <Home className="h-8 w-8 mr-3" />
          <h1 className="text-3xl font-black tracking-tight">Dashboard</h1>
        </div>
        <p className="text-black font-medium mt-2">
          Welcome back, {user.name || user.email}!
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="card-accent animate-pop neobrutal-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b-[3px] border-black">
            <div className="flex items-center">
              <CheckSquare className="h-4 w-4 mr-2" />
              <CardTitle className="text-sm font-bold">Total Tasks</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-3xl font-black">{todoCount}</div>
            <p className="text-xs font-medium text-black border-b-[3px] border-black pb-1 inline-block">
              All your tasks
            </p>
          </CardContent>
        </Card>
        <Card className="card-accent-medium animate-pop neobrutal-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b-[3px] border-black">
            <div className="flex items-center">
              <CheckSquare className="h-4 w-4 mr-2" />
              <CardTitle className="text-sm font-bold">Completed</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-3xl font-black">{completedTodoCount}</div>
            <p className="text-xs font-medium text-black border-b-[3px] border-black pb-1 inline-block">
              Tasks you've completed
            </p>
          </CardContent>
        </Card>
        <Card className="card-accent animate-pop neobrutal-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b-[3px] border-black">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <CardTitle className="text-sm font-bold">Pending</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-3xl font-black">{pendingTodoCount}</div>
            <p className="text-xs font-medium text-black border-b-[3px] border-black pb-1 inline-block">
              Tasks still to do
            </p>
          </CardContent>
        </Card>
        <Card className="card-accent-dark animate-pop neobrutal-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b-[3px] border-black">
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <CardTitle className="text-sm font-bold">High Priority</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-3xl font-black">{highPriorityCount}</div>
            <p className="text-xs font-medium text-black border-b-[3px] border-black pb-1 inline-block">
              Tasks needing attention
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 card-accent-medium animate-pop neobrutal-card">
          <CardHeader className="border-b-[3px] border-black">
            <div className="flex items-center">
              <ListChecks className="h-5 w-5 mr-2" />
              <CardTitle className="text-xl font-bold">Recent Tasks</CardTitle>
            </div>
            <CardDescription className="text-black font-medium">
              Your most recent tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <ViewTasksButton />
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3 card-accent-dark animate-pop neobrutal-card">
          <CardHeader className="border-b-[3px] border-black">
            <div className="flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
            </div>
            <CardDescription className="text-black font-medium">
              Manage your tasks quickly
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <AddTaskButton />
            <ManageSettingsButton />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
