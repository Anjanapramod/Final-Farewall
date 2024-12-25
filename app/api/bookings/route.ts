import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/app/database/DatabaseClient";
import { StandardResponse } from "@/app/helpers/types/response.type";
import { BookingStatus } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    console.log("Saving booking...");
    // Parse request body
    const {
      price,
      userId,
      serviceId,
      assertId,
      assetQty,
      bookedDate,
      name,
      status,
      parlorId,
    } = await request.json();

    // Validate required fields
    if (!price || !userId) {
      const response: StandardResponse = {
        message: "Missing required fields: price or userId",
        code: 400,
      };
      return NextResponse.json(response);
    }

    // If `assertId` and `assetQty` are provided
    if (assertId !== 0 && assetQty !== 0) {
      // Validate asset availability
      const asset = await prismaClient.asset.findUnique({
        where: { id: assertId },
      });
      if (!asset || asset.quantity === null || asset.quantity < assetQty) {
        const response: StandardResponse = {
          message: "Asset not available or insufficient quantity",
          code: 404,
        };
        return NextResponse.json(response);
      }
      // Update asset quantity
      const updatedQty = asset.quantity - assetQty;
      await prismaClient.asset.update({
        where: { id: assertId },
        data: { quantity: updatedQty },
      });
      // Save booking with asset details
      const savedBooking = await prismaClient.booking.create({
        data: {
          price: price,
          userId: userId,
          serviceId: 0,
          bookedDate: new Date(bookedDate),
          assertId: assertId,
          assetQty: assetQty,
          createdAt: new Date(),
          status: status === undefined ? "PENDING" : status,
          type: "ASSET",
          name: name,
          parlorId: parlorId,
        },
      });
      console.log("Saved booking data :", savedBooking);
    } else {
      if (!serviceId) {
        const response: StandardResponse = {
          message: "Missing required field: serviceId",
          code: 400,
        };
        return NextResponse.json(response);
      }

      // Save booking with service details
      const savedBooking = await prismaClient.booking.create({
        data: {
          price: price,
          userId: userId,
          serviceId: serviceId,
          bookedDate: new Date(bookedDate),
          createdAt: new Date(),
          assertId: 0,
          assetQty: 0,
          status: status === undefined ? "PENDING" : status,
          type: "SERVICE",
          name: name,
          parlorId: parlorId,
        },
      });
      console.log("Saved booking data :", savedBooking);
    }

    const response: StandardResponse = {
      code: 201,
      message: "Booking saved successfully!",
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error saving booking: ", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unexpected error occurred";
    const response: StandardResponse = {
      message: errorMessage,
      code: 500,
    };

    return NextResponse.json(response);
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    console.log(`UserID: ${userId}`);

    // Fetch bookings by user ID if provided
    if (userId) {
      // Fetch bookings by user ID
      console.log("Fetching bookings by user ID...");
      const bookings = await prismaClient.booking.findMany({
        where: { userId: parseInt(userId, 10) },
      });
      const response: StandardResponse = {
        code: 200,
        data: bookings,
        message: "Bookings fetched successfully",
      };

      return NextResponse.json(response);
    }

    // by parlour id
    const parlorId = searchParams.get("parlorId");
    if (parlorId) {
      // Fetch bookings by user ID
      console.log("Fetching bookings by parlor ID...");

      const bookings = await prismaClient.booking.findMany({
        where: { parlorId: parseInt(parlorId, 10) },
        include: { user: { select: { name: true, id: true } } },
        orderBy: {
          id: "desc",
        },
      });
      const response: StandardResponse = {
        code: 200,
        data: bookings,
        message: "Bookings fetched successfully",
      };

      return NextResponse.json(response);
    }

    const bookings = await prismaClient.booking.findMany();
    const response: StandardResponse = {
      code: 200,
      data: bookings,
      message: "Bookings fetched successfully",
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching bookings: ", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unexpected error occurred";
    const response: StandardResponse = {
      message: errorMessage,
      code: 500,
    };

    return NextResponse.json(response);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      const response: StandardResponse = {
        code: 400,
        message: "Missing required parameters: bookingId and/or status",
      };
      return NextResponse.json(response);
    }

    await prismaClient.booking.update({
      where: { id: Number.parseInt(id) },
      data: { status: status as BookingStatus },
    });

    const response: StandardResponse = {
      code: 200,
      message: "Booking status updated successfully",
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error updating booking status:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unexpected error occurred";
    const response: StandardResponse = {
      message: errorMessage,
      code: 500,
    };

    return NextResponse.json(response);
  }
}
