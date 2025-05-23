"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Todo } from "@prisma/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { SearchInput } from "./search-input";
import { Pagination } from "./pagination";
import {
  ImageIcon,
  CheckCircle,
  Circle,
  Calendar,
  Edit3,
  Trash2,
  Tag,
  Filter,
  ListFilter,
  CheckSquare,
  Clock,
  RotateCcw,
  Check,
  Loader2
} from "lucide-react";

interface TodoListProps {
  initialTodos: Todo[];
  initialPagination?: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export function TodoList({ initialTodos, initialPagination }: TodoListProps) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(initialPagination?.currentPage || 1);
  const [pagination, setPagination] = useState(initialPagination);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Fetch todos with search and pagination
  const fetchTodos = useCallback(async (page: number = 1, search: string = "", filterType: string = "all") => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "9",
        search,
        filter: filterType,
      });

      const response = await fetch(`/api/todos?${params}`);
      if (response.ok) {
        const data = await response.json();
        setTodos(data.todos);
        setPagination(data.pagination);
        setCurrentPage(data.pagination.currentPage);
      }
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    fetchTodos(1, query, filter);
  }, [filter, fetchTodos]);

  // Handle filter change
  const handleFilterChange = useCallback((newFilter: "all" | "completed" | "pending") => {
    setFilter(newFilter);
    setCurrentPage(1);
    fetchTodos(1, searchQuery, newFilter);
  }, [searchQuery, fetchTodos]);

  // Handle page change
  const handlePageChange = useCallback((page: number) => {
    fetchTodos(page, searchQuery, filter);
  }, [searchQuery, filter, fetchTodos]);

  const toggleTodoStatus = async (id: string, completed: boolean) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !completed }),
      });

      if (response.ok) {
        // Refresh current page to maintain pagination and search
        fetchTodos(currentPage, searchQuery, filter);
      }
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Check if we need to go to previous page after deletion
        const remainingTodos = todos.length - 1;
        if (remainingTodos === 0 && currentPage > 1) {
          fetchTodos(currentPage - 1, searchQuery, filter);
        } else {
          fetchTodos(currentPage, searchQuery, filter);
        }
      }
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  // Priority colors are now handled by CSS classes in neobrutalism.css

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="flex justify-center">
          <SearchInput
            onSearch={handleSearch}
            placeholder="Search todos by title, description, or tags..."
            initialValue={searchQuery}
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 neobrutal-filter-container">
          <Button
            variant="outline"
            onClick={() => handleFilterChange("all")}
            className={`flex-1 sm:flex-none neobrutal-button ${filter === "all" ? 'bg-[hsl(var(--accent-medium))]' : 'bg-white'} hover-wiggle`}
          >
            <ListFilter className="w-4 h-4 mr-2" />
            All
          </Button>
          <Button
            variant="outline"
            onClick={() => handleFilterChange("pending")}
            className={`flex-1 sm:flex-none neobrutal-button ${filter === "pending" ? 'bg-[hsl(var(--accent-medium))]' : 'bg-white'} hover-wiggle`}
          >
            <Clock className="w-4 h-4 mr-2" />
            Pending
          </Button>
          <Button
            variant="outline"
            onClick={() => handleFilterChange("completed")}
            className={`flex-1 sm:flex-none neobrutal-button ${filter === "completed" ? 'bg-[hsl(var(--accent-medium))]' : 'bg-white'} hover-wiggle`}
          >
            <CheckSquare className="w-4 h-4 mr-2" />
            Completed
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="text-lg font-bold">Loading todos...</span>
          </div>
        </div>
      )}

      {/* Results Info */}
      {!isLoading && pagination && (
        <div className="text-center text-sm text-gray-600 font-medium">
          Showing {todos.length} of {pagination.totalCount} todos
          {searchQuery && (
            <span className="ml-2">
              for "<span className="font-bold text-black">{searchQuery}</span>"
            </span>
          )}
        </div>
      )}

      {/* Todos Grid */}
      {!isLoading && todos.length === 0 ? (
        <Card className="neobrutal-card bg-[hsl(var(--accent-light)_/_0.3)] animate-pop">
          <CardContent className="py-12 text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-[hsl(var(--accent-medium))] border-2 border-black flex items-center justify-center mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0)]">
                <ListFilter className="w-10 h-10 text-black" />
              </div>
              <p className="text-black font-bold text-xl">
                {searchQuery ? "No todos found" : "No todos yet"}
              </p>
              <p className="text-black text-sm mt-2 border-b-2 border-black pb-2 inline-block">
                {searchQuery
                  ? "Try adjusting your search or filter criteria"
                  : "Try changing the filter or adding a new todo"
                }
              </p>
            </div>
          </CardContent>
        </Card>
      ) : !isLoading ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {todos.map((todo) => (
            <Card
              key={todo.id}
              className={`neobrutal-card ${todo.completed ? "completed" : "bg-[hsl(var(--accent-light)_/_0.3)]"} h-full flex flex-col animate-pop`}
            >
              <CardHeader className="pb-3 px-4 pt-4 border-b-2 border-black">
                <div className="flex justify-between items-start gap-2">
                  <CardTitle className={`text-lg font-bold ${todo.completed ? "line-through text-gray-500" : "text-black"}`}>
                    {todo.title}
                  </CardTitle>
                  <Badge className={`neobrutal-badge ${
                    todo.priority === "HIGH" ? "neobrutal-badge-high" :
                    todo.priority === "MEDIUM" ? "neobrutal-badge-medium" :
                    "neobrutal-badge-low"
                  }`}>
                    {todo.priority}
                  </Badge>
                </div>
                {todo.dueDate && (
                  <CardDescription className="mt-3 text-sm flex items-center font-medium text-black">
                    <Calendar className="w-4 h-4 mr-2 inline-block" />
                    Due: {format(new Date(todo.dueDate), "PPP")}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-4 flex-1 pt-4 px-4">
                {todo.image && (
                  <div className="relative w-full h-48 overflow-hidden border-2 border-black mb-3 shadow-[4px_4px_0px_0px_rgba(0,0,0)]">
                    <Image
                      src={todo.image}
                      alt={todo.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      onError={(e) => {
                        // Hide the image container if it fails to load
                        (e.target as HTMLImageElement).parentElement!.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <p className={`text-sm leading-relaxed ${todo.completed ? "line-through text-gray-500" : "text-black"}`}>
                  {todo.description || "No description"}
                </p>
                {todo.tags && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    <div className="flex items-center mr-1">
                      <Tag className="w-4 h-4 mr-1" />
                    </div>
                    {todo.tags.split(",").map((tag) => (
                      <Badge key={tag} className="neobrutal-badge bg-[hsl(var(--accent-light)_/_0.7)] hover-wiggle">
                        {tag.trim()}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col gap-3 pt-4 px-4 border-t-2 border-black mt-auto">
                <Button
                  className={`w-full ${todo.completed ? 'neobrutal-button-incomplete' : 'neobrutal-button-success'} hover-pop`}
                  onClick={() => toggleTodoStatus(todo.id, todo.completed)}
                >
                  {todo.completed ?
                    <><RotateCcw className="w-4 h-4 mr-2" /> Mark Incomplete</> :
                    <><Check className="w-4 h-4 mr-2" /> Mark Complete</>
                  }
                </Button>
                <div className="grid grid-cols-2 gap-3 w-full">
                  <Button
                    className="w-full neobrutal-button-edit hover-pop"
                    onClick={() => router.push(`/dashboard/todos/${todo.id}`)}
                  >
                    <Edit3 className="w-4 h-4 mr-2" /> Edit
                  </Button>
                  <Button
                    className="w-full neobrutal-button-danger hover-pop"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : null}

      {/* Pagination */}
      {!isLoading && pagination && pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
          hasNextPage={pagination.hasNextPage}
          hasPreviousPage={pagination.hasPreviousPage}
        />
      )}
    </div>
  );
}
