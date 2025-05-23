import { TodoForm } from "@/components/todos/todo-form";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { PlusCircle } from "lucide-react";

export default async function NewTodoPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="space-y-8">
      <div className="neobrutal-filter-container mb-8">
        <div className="flex items-center">
          <PlusCircle className="h-8 w-8 mr-3" />
          <h1 className="text-3xl font-black tracking-tight">Create New Todo</h1>
        </div>
        <p className="text-black font-bold mt-2 text-lg">
          Add a new task to your list
        </p>
      </div>
      <TodoForm />
    </div>
  );
}
