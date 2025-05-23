import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireRole, Role, isSuperuser } from "@/lib/roles";
import * as z from "zod";

const userUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  role: z.enum(["USER", "ADMIN", "SUPERUSER"]).optional(),
});

// GET /api/admin/users/[id] - Get specific user (Admin+)
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { authorized } = await requireRole(Role.ADMIN);

    if (!authorized) {
      return NextResponse.json(
        { message: "Unauthorized - Admin access required" },
        { status: 403 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: params.id },
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
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/users/[id] - Update user (Admin+ with restrictions)
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { authorized, user: currentUser } = await requireRole(Role.ADMIN);

    if (!authorized || !currentUser) {
      return NextResponse.json(
        { message: "Unauthorized - Admin access required" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { name, email, role } = userUpdateSchema.parse(body);

    // Get target user
    const targetUser = await prisma.user.findUnique({
      where: { id: params.id },
      select: { id: true, role: true, email: true },
    });

    if (!targetUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Role change restrictions
    if (role && role !== targetUser.role) {
      // Only superusers can change roles
      if (!isSuperuser(currentUser.role)) {
        return NextResponse.json(
          { message: "Unauthorized - Only superusers can change user roles" },
          { status: 403 }
        );
      }

      // Prevent changing superuser role unless you're a superuser
      if (targetUser.role === "SUPERUSER" && !isSuperuser(currentUser.role)) {
        return NextResponse.json(
          { message: "Unauthorized - Cannot modify superuser accounts" },
          { status: 403 }
        );
      }

      // Prevent creating superusers unless you're a superuser
      if (role === "SUPERUSER" && !isSuperuser(currentUser.role)) {
        return NextResponse.json(
          { message: "Unauthorized - Only superusers can create superuser accounts" },
          { status: 403 }
        );
      }
    }

    // Prevent self-demotion for superusers
    if (currentUser.id === params.id && role && role !== currentUser.role && isSuperuser(currentUser.role)) {
      return NextResponse.json(
        { message: "Cannot change your own role" },
        { status: 400 }
      );
    }

    // Check email uniqueness if changing email
    if (email && email !== targetUser.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return NextResponse.json(
          { message: "Email already in use" },
          { status: 409 }
        );
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(role && { role }),
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

    return NextResponse.json(updatedUser);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request data", errors: error.errors },
        { status: 400 }
      );
    }

    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/users/[id] - Delete user (Superuser only with restrictions)
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { authorized, user: currentUser } = await requireRole(Role.SUPERUSER);

    if (!authorized || !currentUser) {
      return NextResponse.json(
        { message: "Unauthorized - Superuser access required" },
        { status: 403 }
      );
    }

    // Prevent self-deletion
    if (currentUser.id === params.id) {
      return NextResponse.json(
        { message: "Cannot delete your own account" },
        { status: 400 }
      );
    }

    // Get target user
    const targetUser = await prisma.user.findUnique({
      where: { id: params.id },
      select: { id: true, role: true, email: true },
    });

    if (!targetUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Delete user (cascade will handle todos and settings)
    await prisma.user.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ 
      message: "User deleted successfully",
      deletedUser: {
        id: targetUser.id,
        email: targetUser.email,
        role: targetUser.role,
      }
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
