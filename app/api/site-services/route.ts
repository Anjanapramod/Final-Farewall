import { NextResponse, type NextRequest } from "next/server";
import { prismaClient } from "@/app/database/DatabaseClient";
import { StandardResponse } from "@/app/helpers/types/response.type";

// GET All Services
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const funeralParlorId = searchParams.get("funeralParlorId");

  try {
    let services;
    if (funeralParlorId) {
      const funeralParlor = await prismaClient.funeralParlor.findUnique({
        where: { id: parseInt(funeralParlorId, 10) },
      });

      if (!funeralParlor) {
        return NextResponse.json(
          { message: "Funeral parlor not found", code: 404 }
        );
      }

      services = await prismaClient.service.findMany({
        where: { funeralParlorId: parseInt(funeralParlorId, 10) },
      });
    } else {
      services = await prismaClient.service.findMany();
    }

    const response: StandardResponse = {
      message: "Services fetched successfully",
      data: services,
      code: 200,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching services:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch services";

    return NextResponse.json(
      { message: errorMessage, code: 500 },
      { status: 500 }
    );
  }
}

// CREATE Service
export async function POST(request: NextRequest) {
  try {
    // Extract data from request body
    const { name, description, rate, availability, funeralParlorId } =
      await request.json();

    // Validate request body
    if (!name || !funeralParlorId) {
      return NextResponse.json(
        { message: "Name and funeral parlor ID are required", code: 400 },
      );
    }

    // Check if the funeral parlor exists
    const funeralParlor = await prismaClient.funeralParlor.findUnique({
      where: { id: funeralParlorId },
    });

    if (!funeralParlor) {
      return NextResponse.json(
        { message: "Funeral parlor not found", code: 404 },

      );
    }

    // Check if the service already exists by name
    const existingService = await prismaClient.service.findUnique({
      where: { name },
    });

    if (existingService) {
      return NextResponse.json(
        { message: "Service with this name already exists", code: 409 },

      );
    }

    // Create the service
    const service = await prismaClient.service.create({
      data: {
        name,
        description,
        rate,
        availability: availability ?? false,
        funeralParlorId,
      },
    });

    // Prepare the response with the StandardResponse format
    const response: StandardResponse = {
      message: "Service created successfully",
      data: service, // Include the created service in the response
      code: 201,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error creating service:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create service";
    return NextResponse.json({ message: errorMessage, code: 500 });
  }
}
