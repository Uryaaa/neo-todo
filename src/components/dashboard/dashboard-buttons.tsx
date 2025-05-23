"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ListFilter, PlusCircle, Settings, Home } from "lucide-react";

export function ViewTasksButton() {
  return (
    <Link href="/dashboard/todos" className="block w-full">
      <Button className="w-full neobrutal-button-accent hover-pop">
        <ListFilter className="w-4 h-4 mr-2" />
        View All Tasks
      </Button>
    </Link>
  );
}

export function AddTaskButton() {
  return (
    <Link href="/dashboard/todos/new" className="block w-full">
      <Button className="w-full neobrutal-button-primary hover-pop">
        <PlusCircle className="w-4 h-4 mr-2" />
        Add New Task
      </Button>
    </Link>
  );
}

export function ManageSettingsButton() {
  return (
    <Link href="/dashboard/settings" className="block w-full">
      <Button className="w-full neobrutal-button-accent hover-pop">
        <Settings className="w-4 h-4 mr-2" />
        Manage Settings
      </Button>
    </Link>
  );
}

export function DashboardButton() {
  return (
    <Link href="/dashboard">
      <Button className="neobrutal-button-accent hover-pop">
        <Home className="w-4 h-4 mr-2" />
        Go to Dashboard
      </Button>
    </Link>
  );
}
