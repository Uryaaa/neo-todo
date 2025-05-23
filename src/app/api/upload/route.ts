import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { writeFile, mkdir, access, constants } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file provided" },
        { status: 400 }
      );
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { message: "File size must be less than 5MB" },
        { status: 400 }
      );
    }

    // Check file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { message: "Only JPEG, PNG and WebP images are allowed" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique filename
    const fileName = `${uuidv4()}-${file.name.replace(/\s/g, "_")}`;

    // Define the path to save the file
    const publicDir = join(process.cwd(), "public");
    const uploadsDir = join(publicDir, "uploads");

    // Ensure the uploads directory exists
    try {
      await access(uploadsDir, constants.F_OK);
    } catch (error) {
      // Directory doesn't exist, create it
      await mkdir(uploadsDir, { recursive: true });
    }

    // Write the file
    await writeFile(join(uploadsDir, fileName), buffer);

    // Return the URL to the uploaded file
    const fileUrl = `/uploads/${fileName}`;

    return NextResponse.json({ url: fileUrl }, { status: 201 });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
