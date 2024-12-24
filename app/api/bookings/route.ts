import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/app/database/DatabaseClient";
import { StandardResponse } from "@/app/helpers/types/response.type";

export async function POST(request: NextRequest) {
  try {
    console.log("Saving booking...");

    // Parse request body
    const { price, userId, serviceId, assertId, assetQty, bookedDate } =
      await request.json();

    console.log(price, userId, serviceId, assertId, assetQty, bookedDate);

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
      await prismaClient.booking.create({
        data: {
          price: price,
          userId: userId,
          serviceId: 0,
          bookedDate: new Date(bookedDate),
          assertId: assertId,
          assetQty: assetQty,
          createdAt: new Date(),
        },
      });
    } else {
      // Validate `serviceId` when not using assets
      if (!serviceId) {
        const response: StandardResponse = {
          message: "Missing required field: serviceId",
          code: 400,
        };
        return NextResponse.json(response);
      }

      console.log("Saving booking...");

      const r = await prismaClient.booking.create({
        data: {
          price: price,
          userId: userId,
          serviceId: serviceId,
          bookedDate: new Date(bookedDate),
          createdAt: new Date(),
          assertId: 0,
          assetQty: 0,
        },
      });
      console.log("--->", r);
    }

    // Successful response
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

// filter by user id
export async function GET() {
  try {
    console.log("Fetching bookings...");
    const bookings = await prismaClient.booking.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Successful response
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
