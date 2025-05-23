import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import * as z from "zod";

const profileSchema = z.object({
  name: z.string().min(2).optional(),
  image: z.string()
    .refine(val => {
      // Allow empty string
      if (!val) return true;
      // Allow relative paths starting with /uploads/
      if (val.startsWith('/uploads/')) return true;
      // Allow full URLs
      try {
        new URL(val);
        return true;
      } catch {
        return false;
      }
    }, { message: "Please enter a valid URL or upload an image" })
    .optional()
    .or(z.literal("")),
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
    const { name, image } = profileSchema.parse(body);

    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name,
        image,
      },
    });

    const { password, ...userWithoutPassword } = updatedUser;

    return NextResponse.json(userWithoutPassword);
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
