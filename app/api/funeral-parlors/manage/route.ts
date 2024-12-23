import { NextResponse } from "next/server";
import { prismaClient } from "@/app/database/DatabaseClient";
import { StandardResponse } from "@/app/helpers/types/response.type";

// Find by user id or FuneralParlor id
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const userId = searchParams.get("userId");
  try {
    if (userId) {
      const funeralParlorByUserId = await prismaClient.funeralParlor.findUnique(
        {
          where: { userId: parseInt(userId, 10) },
        }
      );

      const response: StandardResponse = {
        message: "Funeral parlor found",
        data: funeralParlorByUserId,
        code: 200,
      };
      return NextResponse.json(response);
    }

    // Validate ID parameter
    if (!id || typeof id !== "string" || isNaN(Number(id))) {
      const response: StandardResponse = {
        message: "Invalid or missing funeral parlor ID",
        code: 400,
      };
      return NextResponse.json(response);
    }

    // Fetch the funeral parlor by ID
    const funeralParlor = await prismaClient.funeralParlor.findUnique({
      where: { id: parseInt(id, 10) },
    });

    // If no funeral parlor is found, return 404
    if (!funeralParlor) {
      const response: StandardResponse = {
        message: "Funeral parlor not found",
        code: 404,
      };
      return NextResponse.json(response);
    }

    // Return the found funeral parlor data
    const response: StandardResponse = {
      message: "Funeral parlor found",
      data: funeralParlor,
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching funeral parlor:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch funeral parlor";
    const response: StandardResponse = {
      message: errorMessage,
    };
    return NextResponse.json(response, { status: 500 });
  }
}

// Delete FuneralParlor by ID
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    // Validate ID parameter
    const parsedId = parseInt(id as string, 10);
    if (isNaN(parsedId)) {
      const response: StandardResponse = {
        message: "Invalid funeral parlor ID",
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Check if the funeral parlor exists
    const funeralParlor = await prismaClient.funeralParlor.findUnique({
      where: { id: parsedId },
    });

    if (!funeralParlor) {
      const response: StandardResponse = {
        message: "Funeral parlor not found",
      };
      return NextResponse.json(response, { status: 404 });
    }

    // Delete the funeral parlor
    await prismaClient.funeralParlor.delete({
      where: { id: parsedId },
    });

    // Return success message
    const response: StandardResponse = {
      message: "Funeral parlor deleted successfully",
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error deleting funeral parlor:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to delete funeral parlor";
    const response: StandardResponse = {
      message: errorMessage,
    };
    return NextResponse.json(response, { status: 500 });
  }
}

// Update FuneralParlor by ID
export async function PUT(req: Request) {
  const { id, name, description, contact, location } = await req.json();

  try {
    // Check if the funeral parlor exists
    const existingFuneralParlor = await prismaClient.funeralParlor.findUnique({
      where: { id: id },
    });

    if (!existingFuneralParlor) {
      const response: StandardResponse = {
        message: "Funeral parlor not found",
      };
      return NextResponse.json(response, { status: 404 });
    }

    // Update the funeral parlor
    const updatedFuneralParlor = await prismaClient.funeralParlor.update({
      where: { id: id },
      data: {
        name: name ?? existingFuneralParlor.name,
        description: description ?? existingFuneralParlor.description,
        contact: contact ?? existingFuneralParlor.contact,
        location: location ?? existingFuneralParlor.location,
      },
    });

    // Return success message
    const response: StandardResponse = {
      message: "Funeral parlor updated successfully",
      data: updatedFuneralParlor,
      code: 200,
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error updating funeral parlor:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to update funeral parlor";
    const response: StandardResponse = {
      message: errorMessage,
    };
    return NextResponse.json(response, { status: 500 });
  }
}
