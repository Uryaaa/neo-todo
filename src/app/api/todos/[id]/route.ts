import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import * as z from "zod";

const todoUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  dueDate: z.string().nullable().optional(),
  tags: z.string().optional(),
  image: z.string().nullable().optional(),
  completed: z.boolean().optional(),
});

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const todo = await prisma.todo.findUnique({
      where: {
        id: id,
      },
    });

    if (!todo) {
      return NextResponse.json(
        { message: "Todo not found" },
        { status: 404 }
      );
    }

    if (todo.userId !== session.user.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 403 }
      );
    }

    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const todo = await prisma.todo.findUnique({
      where: {
        id: id,
      },
    });

    if (!todo) {
      return NextResponse.json(
        { message: "Todo not found" },
        { status: 404 }
      );
    }

    if (todo.userId !== session.user.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { title, description, priority, dueDate, tags, image, completed } = todoUpdateSchema.parse(body);

    const updatedTodo = await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        title,
        description,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
        tags,
        image,
        completed,
      },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request data", errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const todo = await prisma.todo.findUnique({
      where: {
        id: id,
      },
    });

    if (!todo) {
      return NextResponse.json(
        { message: "Todo not found" },
        { status: 404 }
      );
    }

    if (todo.userId !== session.user.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 403 }
      );
    }

    await prisma.todo.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ message: "Todo deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
