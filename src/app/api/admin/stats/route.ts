import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireRole, Role } from "@/lib/roles";

// GET /api/admin/stats - Get admin dashboard statistics
export async function GET() {
  try {
    const { authorized } = await requireRole(Role.ADMIN);

    if (!authorized) {
      return NextResponse.json(
        { message: "Unauthorized - Admin access required" },
        { status: 403 }
      );
    }

    // Get user statistics
    const totalUsers = await prisma.user.count();
    const usersByRole = await prisma.user.groupBy({
      by: ['role'],
      _count: {
        role: true,
      },
    });

    // Get todo statistics
    const totalTodos = await prisma.todo.count();
    const completedTodos = await prisma.todo.count({
      where: { completed: true },
    });
    const todosByPriority = await prisma.todo.groupBy({
      by: ['priority'],
      _count: {
        priority: true,
      },
    });

    // Get recent activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentUsers = await prisma.user.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
    });

    const recentTodos = await prisma.todo.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
    });

    // Get top users by todo count
    const topUsers = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        _count: {
          select: {
            todos: true,
          },
        },
      },
      orderBy: {
        todos: {
          _count: 'desc',
        },
      },
      take: 5,
    });

    // Get daily user registrations for the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const dailyRegistrations = await prisma.user.findMany({
      where: {
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
      select: {
        createdAt: true,
      },
    });

    // Group by day
    const registrationsByDay = dailyRegistrations.reduce((acc, user) => {
      const day = user.createdAt.toISOString().split('T')[0];
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Get daily todo creation for the last 7 days
    const dailyTodos = await prisma.todo.findMany({
      where: {
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
      select: {
        createdAt: true,
      },
    });

    const todosByDay = dailyTodos.reduce((acc, todo) => {
      const day = todo.createdAt.toISOString().split('T')[0];
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const stats = {
      users: {
        total: totalUsers,
        recent: recentUsers,
        byRole: usersByRole.reduce((acc, item) => {
          acc[item.role] = item._count.role;
          return acc;
        }, {} as Record<string, number>),
        top: topUsers,
        dailyRegistrations: registrationsByDay,
      },
      todos: {
        total: totalTodos,
        completed: completedTodos,
        pending: totalTodos - completedTodos,
        recent: recentTodos,
        byPriority: todosByPriority.reduce((acc, item) => {
          acc[item.priority] = item._count.priority;
          return acc;
        }, {} as Record<string, number>),
        dailyCreation: todosByDay,
      },
      system: {
        completionRate: totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0,
        averageTodosPerUser: totalUsers > 0 ? Math.round(totalTodos / totalUsers) : 0,
      },
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
