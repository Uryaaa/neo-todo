"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export function AddNewTodoButton() {
  return (
    <Link href="/dashboard/todos/new" className="block">
      <Button
        className="w-full sm:w-auto neobrutal-button-primary hover-pop font-bold"
        size="default"
      >
        <PlusCircle className="w-5 h-5 mr-2" />
        Add New Todo
      </Button>
    </Link>
  );
}
