import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/app/database/DatabaseClient";
import { StandardResponse } from "@/app/helpers/types/response.type";

export async function POST(request: NextRequest) {
  try {
    console.log("Saving booking...");

    // Parse request body
    const { price, userId, serviceId, assertId, assetQty, bookedDate } =
      await request.json();

    console.log("Request body: ", {
      price,
      userId,
      serviceId,
      assertId,
      assetQty,
      bookedDate,
    });

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
          price,
          userId,
          assertId,
          assetQty,

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
      console.log("---------------------------------");
      // Save booking without asset details
      const k = {
        data: {
          price: 100,
          userId: 1,
          bookedDate: new Date(),
          assetQty: 0,
          serviceId: 1,
          assertId: 0, // Default `assertId` when not applicable
          createdAt: new Date(),
        },
      };
      const r = await prismaClient.booking.create(k);
      console.log(r)
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