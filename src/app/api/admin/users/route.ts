import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireRole, Role } from "@/lib/roles";
import * as z from "zod";

const userUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  role: z.enum(["USER", "ADMIN", "SUPERUSER"]).optional(),
});

// GET /api/admin/users - Get all users (Admin+)
export async function GET() {
  try {
    const { authorized, user } = await requireRole(Role.ADMIN);

    if (!authorized) {
      return NextResponse.json(
        { message: "Unauthorized - Admin access required" },
        { status: 403 }
      );
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            todos: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/admin/users - Create user (Superuser only)
export async function POST(req: Request) {
  try {
    const { authorized, user } = await requireRole(Role.SUPERUSER);

    if (!authorized) {
      return NextResponse.json(
        { message: "Unauthorized - Superuser access required" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const createUserSchema = z.object({
      name: z.string().min(2),
      email: z.string().email(),
      password: z.string().min(6),
      role: z.enum(["USER", "ADMIN", "SUPERUSER"]).default("USER"),
    });

    const { name, email, password, role } = createUserSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const bcrypt = require("bcrypt");
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        settings: {
          create: {
            accentColor: "blue",
            emailNotifications: true,
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request data", errors: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
