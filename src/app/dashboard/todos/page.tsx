import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/db";
import { TodoList } from "@/components/todos/todo-list";
import { AddNewTodoButton } from "@/components/todos/todo-buttons";
import { ListChecks } from "lucide-react";

export default async function TodosPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; filter?: string }>;
}) {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  // Await searchParams before accessing its properties
  const params = await searchParams;

  // Get initial data with pagination
  const page = parseInt(params.page || "1");
  const search = params.search || "";
  const filter = params.filter || "all";
  const limit = 9;
  const skip = (page - 1) * limit;

  // Build where clause
  const where: any = {
    userId: user.id,
  };

  // Add search filter (SQLite doesn't support mode: "insensitive")
  if (search) {
    where.OR = [
      { title: { contains: search } },
      { description: { contains: search } },
      { tags: { contains: search } },
    ];
  }

  // Add completion filter
  if (filter === "completed") {
    where.completed = true;
  } else if (filter === "pending") {
    where.completed = false;
  }

  // Get total count and todos
  const [totalCount, todos] = await Promise.all([
    prisma.todo.count({ where }),
    prisma.todo.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
  ]);

  const totalPages = Math.ceil(totalCount / limit);
  const pagination = {
    currentPage: page,
    totalPages,
    totalCount,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 neobrutal-filter-container mb-8">
        <div className="flex items-center">
          <ListChecks className="h-8 w-8 mr-3" />
          <h1 className="text-3xl font-black tracking-tight">My Todos</h1>
        </div>
        <div className="w-full sm:w-auto">
          <AddNewTodoButton />
        </div>
      </div>
      <TodoList
        initialTodos={todos}
        initialPagination={pagination}
      />
    </div>
  );
}
