import { NextResponse } from "next/server";
import { prismaClient } from "@/app/database/DatabaseClient";
// import { Prisma } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { status, userId, bookingDetails } = body;

    if (!status || !userId || !Array.isArray(bookingDetails)) {
      return NextResponse.json({
        success: false,
        message: "Invalid input: status, userId, and bookingDetails are required"
      }, { status: 400 });
    }

    const result = await prismaClient.$transaction(async (tx) => {
      // First, get or create default service and asset

      const defaultService = await tx.service.findFirst();
      const defaultAsset = await tx.asset.findFirst();

      if (!defaultService || !defaultAsset) {
        throw new Error("Default service and asset must exist in the database");
      }

      // Check if user exists
      const user = await tx.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }

      // Create initial booking
      const booking = await prismaClient.booking.create({
        data: {
          status,
          userId,
          price: 0,
          date: new Date(),
        },
      });

      console.log("Booking created:", booking);

      let totalPrice = 0;

      // Process services and assets
      for (const detail of bookingDetails) {
        if (detail.serviceId) {
          const service = await tx.service.findUnique({
            where: { id: detail.serviceId }
          });

          if (!service) {
            throw new Error(`Service with ID ${detail.serviceId} not found`);
          }
          if (!service.availability) {
            throw new Error(`Service with ID ${detail.serviceId} is not available`);
          }

          totalPrice += service.rate ?? 0;
          await tx.bookingDetail.create({
            data: {
              bookingId: booking.id,
              serviceId: service.id,
              assetId: undefined,
              unit: 1,
              // booking: Prisma.skip
            }
          });
        }

        if (detail.assetId) {
          const asset = await tx.asset.findUnique({
            where: { id: detail.assetId }
          });

          if (!asset) {
            throw new Error(`Asset with ID ${detail.assetId} not found`);
          }
          if (!asset.quantity || asset.quantity < (detail.unit ?? 0)) {
            throw new Error(`Insufficient quantity for asset ID ${detail.assetId}`);
          }
          if (!detail.unit || detail.unit <= 0) {
            throw new Error(`Invalid unit quantity for asset ID ${detail.assetId}`);
          }

          await tx.asset.update({
            where: { id: asset.id },
            data: { quantity: asset.quantity - detail.unit }
          });

          totalPrice += (asset.rate ?? 0) * detail.unit;
          await tx.bookingDetail.create({
            data: {
              bookingId: booking.id,
              assetId: asset.id,
              serviceId: undefined,  // Set serviceId to null if it's not provided
              unit: detail.unit,

            }
          });

        }
      }

      // Update booking with final price
      return await tx.booking.update({
        where: { id: booking.id },
        data: { price: totalPrice },
        include: {
          bookingDetail: {

            // include: {
            //   service: true,
            //   asset: true
            // }
          }
        }
      });
    });

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Booking created successfully",
      data: result
    });

  } catch (error) {
    // Ensure we always return an object
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log(String(error));
    }
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to create booking",
      error: error instanceof Error ? error.stack : 'Unknown error'
    }, { status: 500 });
  }
}