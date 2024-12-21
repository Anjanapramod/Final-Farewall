import { NextResponse, type NextRequest } from "next/server";
import { prismaClient } from "@/app/database/DatabaseClient";
import { StandardResponse } from "@/app/helpers/types/response";

// Save FuneralParlor
export async function POST(request: NextRequest) {
  try {
    console.log("Saving funeral parlor...");

    const { name, description, contact, location, userId } =
      await request.json();

    // Validate request body
    if (!name || !description || !contact || !location || !userId) {
      const response: StandardResponse = {
        message:
          "Name, description, contact, location, and userId are required"
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Check if user exists
    const user = await prismaClient.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      const response: StandardResponse = {
        message: "User with this ID does not exist",
      };
      return NextResponse.json(response, { status: 404 });
    }

    // Check if funeral parlor with the same name exists
    const existingFuneralParlor = await prismaClient.funeralParlor.findUnique({
      where: { name },
    });

    if (existingFuneralParlor) {
      const response: StandardResponse = {
        message:
          "Funeral parlor with this name already exists, Try a different name."
      };
      return NextResponse.json(response, { status: 409 });
    }

    // Create new funeral parlor
    const funeralParlor = await prismaClient.funeralParlor.create({
      data: {
        name,
        description,
        contact,
        location,
        userId,
      },
    });

    const response: StandardResponse = {
      message: "Funeral parlor saved successfully",
      data: funeralParlor,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Error saving funeral parlor:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to save funeral parlor";
    const response: StandardResponse = {
      message: errorMessage
    };
    return NextResponse.json(response, { status: 500 });
  }
}

// Get all FuneralParlors
export async function GET() {
  try {
    const funeralParlors = await prismaClient.funeralParlor.findMany();

    const response: StandardResponse = {
      message: "Funeral parlors fetched successfully",
      data: funeralParlors,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching funeral parlors:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to fetch funeral parlors";
    const response: StandardResponse = {
      message: errorMessage
    };
    return NextResponse.json(response, { status: 500 });
  }
}
