import { NextResponse, type NextRequest } from "next/server";
import { prismaClient } from "@/app/database/DatabaseClient";
import { StandardResponse } from "@/app/helpers/types/response.type";

// GET All Services
export async function GET() {
  try {
    // Fetch all services from the database
    const services = await prismaClient.service.findMany({
      include: {
        funeralParlor: false, // Optionally include related funeral parlor data
      },
    });

    // Check if any services exist
    if (services.length === 0) {
      return NextResponse.json(
        { message: "No services found", status: 404 },
        { status: 404 }
      );
    }

    const response: StandardResponse = {
      message: "Services fetched successfully",
      data: services, // Include the list of services in the response
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching services:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch services";
    return NextResponse.json({ message: errorMessage, status: 500 });
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
        { message: "Name and funeral parlor ID are required", status: 400 },
        { status: 400 }
      );
    }

    // Check if the funeral parlor exists
    const funeralParlor = await prismaClient.funeralParlor.findUnique({
      where: { id: funeralParlorId },
    });

    if (!funeralParlor) {
      return NextResponse.json(
        { message: "Funeral parlor not found", status: 404 },
        { status: 404 }
      );
    }

    // Check if the service already exists by name
    const existingService = await prismaClient.service.findUnique({
      where: { name },
    });

    if (existingService) {
      return NextResponse.json(
        { message: "Service with this name already exists", status: 409 },
        { status: 409 }
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
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Error creating service:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create service";
    return NextResponse.json({ message: errorMessage, status: 500 });
  }
}
