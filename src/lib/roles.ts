import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { prisma } from "./db";

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPERUSER = "SUPERUSER",
}

export interface UserWithRole {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role: Role;
}

/**
 * Check if user has a specific role
 */
export function hasRole(userRole: string, requiredRole: Role): boolean {
  const roleHierarchy = {
    [Role.USER]: 1,
    [Role.ADMIN]: 2,
    [Role.SUPERUSER]: 3,
  };

  return roleHierarchy[userRole as Role] >= roleHierarchy[requiredRole];
}

/**
 * Check if user is admin or higher
 */
export function isAdmin(userRole: string): boolean {
  return hasRole(userRole, Role.ADMIN);
}

/**
 * Check if user is superuser
 */
export function isSuperuser(userRole: string): boolean {
  return userRole === Role.SUPERUSER;
}

/**
 * Get current user with role from session
 */
export async function getCurrentUserWithRole(): Promise<UserWithRole | null> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return null;

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
      },
    });

    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role as Role,
    };
  } catch (error) {
    console.error("Error getting current user with role:", error);
    return null;
  }
}

/**
 * Check if current user has required role
 */
export async function checkUserRole(requiredRole: Role): Promise<boolean> {
  const user = await getCurrentUserWithRole();
  if (!user) return false;
  return hasRole(user.role, requiredRole);
}

/**
 * Check if current user is admin or higher
 */
export async function checkIsAdmin(): Promise<boolean> {
  return checkUserRole(Role.ADMIN);
}

/**
 * Check if current user is superuser
 */
export async function checkIsSuperuser(): Promise<boolean> {
  return checkUserRole(Role.SUPERUSER);
}

/**
 * Middleware helper to check role authorization
 */
export async function requireRole(requiredRole: Role): Promise<{ authorized: boolean; user: UserWithRole | null }> {
  const user = await getCurrentUserWithRole();
  
  if (!user) {
    return { authorized: false, user: null };
  }

  const authorized = hasRole(user.role, requiredRole);
  return { authorized, user };
}

/**
 * Get role display name
 */
export function getRoleDisplayName(role: Role): string {
  switch (role) {
    case Role.USER:
      return "User";
    case Role.ADMIN:
      return "Administrator";
    case Role.SUPERUSER:
      return "Super Administrator";
    default:
      return "Unknown";
  }
}

/**
 * Get role color for UI
 */
export function getRoleColor(role: Role): string {
  switch (role) {
    case Role.USER:
      return "bg-blue-100 text-blue-800";
    case Role.ADMIN:
      return "bg-yellow-100 text-yellow-800";
    case Role.SUPERUSER:
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
