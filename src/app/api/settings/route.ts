import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import * as z from "zod";

const settingsSchema = z.object({
  accentColor: z.enum(["blue", "pink", "green", "yellow", "orange", "purple", "cyan"]),
  emailNotifications: z.boolean(),
});

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { accentColor, emailNotifications } = settingsSchema.parse(body);

    // Check if settings exist
    const existingSettings = await prisma.settings.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    let settings;

    if (existingSettings) {
      // Update existing settings
      settings = await prisma.settings.update({
        where: {
          userId: session.user.id,
        },
        data: {
          accentColor,
          emailNotifications,
        },
      });
    } else {
      // Create new settings
      settings = await prisma.settings.create({
        data: {
          userId: session.user.id,
          accentColor,
          emailNotifications,
        },
      });
    }

    return NextResponse.json(settings);
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
