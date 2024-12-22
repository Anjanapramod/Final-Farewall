import { NextResponse, type NextRequest } from "next/server";
import { prismaClient } from "@/app/database/DatabaseClient";
import { StandardResponse } from "@/app/helpers/types/response.type";

// READ Service by ID
async function getServiceById(id: string) {
  try {
    const service = await prismaClient.service.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        funeralParlor: true, // Include related funeral parlor data (optional)
      },
    });

    if (!service) {
      return NextResponse.json(
        { message: "Service not found" },
        { status: 404 }
      );
    }

    const response: StandardResponse = {
      message: "Service found",
      data: service,
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching service:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch service";
    return NextResponse.json({ message: errorMessage, status: 500 });
  }
}

// READ Service List
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const parlorId = searchParams.get("parlorId");

  try {
    if (id && !isNaN(Number(id))) {
      return getServiceById(id);
    }

    if (parlorId && !isNaN(Number(parlorId))) {
      const services = await prismaClient.service.findMany({
        where: { funeralParlorId: parseInt(parlorId, 10) },
        include: {
          funeralParlor: false, // Include related funeral parlor data (optional)
        },
      });

      const response: StandardResponse = {
        message: "Services fetched successfully",
        data: services,
      };
      return NextResponse.json(response, { status: 200 });
    }

    const services = await prismaClient.service.findMany();
    const response: StandardResponse = {
      message: "Services fetched successfully",
      data: services,
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching services:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch services";
    return NextResponse.json({ message: errorMessage, status: 500 });
  }
}

// UPDATE Service
export async function PUT(request: NextRequest) {
  try {
    const { id, name, description, rate, availability, funeralParlorId } =
      await request.json();

    // Validate input
    if (!id || !name || !funeralParlorId) {
      const response: StandardResponse = {
        message: "ID, name, and funeral parlor ID are required",
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Check if the funeral parlor exists
    const funeralParlor = await prismaClient.funeralParlor.findUnique({
      where: { id: funeralParlorId },
    });

    if (!funeralParlor) {
      const response: StandardResponse = {
        message: "Funeral parlor not found",
      };
      return NextResponse.json(response, { status: 404 });
    }

    // Find the service by ID
    const service = await prismaClient.service.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!service) {
      const response: StandardResponse = {
        message: "Service not found",
      };
      return NextResponse.json(response, { status: 404 });
    }

    // Update the service
    const updatedService = await prismaClient.service.update({
      where: { id },
      data: {
        name: name ? name : service.name,
        description: description ? description : service.description,
        rate: rate ? rate : service.rate,
        availability: availability ? availability : service.availability,
        funeralParlorId: funeralParlorId
          ? funeralParlorId
          : service.funeralParlorId,
      },
    });

    const response: StandardResponse = {
      message: "Service updated successfully",
      data: updatedService,
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error updating service:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to update service";

    const response: StandardResponse = {
      message: errorMessage,
    };
    return NextResponse.json(response);
  }
}

// DELETE Service
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ message: "Invalid ID", status: 400 });
    }

    // Check if service exists
    const service = await prismaClient.service.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!service) {
      return NextResponse.json({ message: "Service not found", status: 404 });
    }

    // Delete service
    await prismaClient.service.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json({
      message: "Service deleted successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting service:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to delete service";
    return NextResponse.json({ message: errorMessage, status: 500 });
  }
}
