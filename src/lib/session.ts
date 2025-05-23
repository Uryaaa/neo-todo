import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions);
    return session?.user;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

export async function getSession() {
  try {
    return await getServerSession(authOptions);
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
}
