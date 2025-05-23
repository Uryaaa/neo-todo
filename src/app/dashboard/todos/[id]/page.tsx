import { TodoForm } from "@/components/todos/todo-form";
import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { Edit3 } from "lucide-react";

interface EditTodoPageProps {
  params: {
    id: string;
  };
}

export default async function EditTodoPage({ params }: EditTodoPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const todo = await prisma.todo.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!todo) {
    notFound();
  }

  if (todo.userId !== user.id) {
    redirect("/dashboard/todos");
  }

  return (
    <div className="space-y-8">
      <div className="neobrutal-filter-container mb-8">
        <div className="flex items-center">
          <Edit3 className="h-8 w-8 mr-3" />
          <h1 className="text-3xl font-black tracking-tight">Edit Todo</h1>
        </div>
        <p className="text-black font-bold mt-2 text-lg">
          Update your task details
        </p>
      </div>
      <TodoForm todo={todo} isEditing />
    </div>
  );
}
