import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check if settings exist
    const existingSettings = await prisma.settings.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (!existingSettings) {
      // Create default settings if they don't exist
      const defaultSettings = await prisma.settings.create({
        data: {
          userId: session.user.id,
          accentColor: "pink",
          emailNotifications: true,
        },
      });

      console.log("Created default settings:", defaultSettings);
      return NextResponse.json(defaultSettings);
    }

    console.log("Returning existing settings:", existingSettings);
    return NextResponse.json(existingSettings);
  } catch (error) {
    console.error("Error fetching user preferences:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
