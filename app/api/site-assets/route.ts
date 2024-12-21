import { NextResponse, type NextRequest } from "next/server";
import { prismaClient } from "@/app/database/DatabaseClient";
import { StandardResponse } from "@/app/helpers/types/response";

// Create Asset
export async function POST(request: NextRequest) {
  try {
    console.log("Creating asset...");

    const { name, description, rate, quantity, funeralParlorId } =
      await request.json();

    if (!name || !funeralParlorId) {
      return NextResponse.json(
        {
          message: "Name and funeralParlorId are required",
        },
        { status: 400 }
      );
    }

    const funeralParlor = await prismaClient.funeralParlor.findUnique({
      where: { id: funeralParlorId },
    });

    if (!funeralParlor) {
      return NextResponse.json(
        { message: "Funeral parlor not found" },
        { status: 404 }
      );
    }

    const existingAsset = await prismaClient.asset.findUnique({
      where: { name },
    });

    if (existingAsset) {
      return NextResponse.json(
        { message: "Asset with this name already exists" },
        { status: 409 }
      );
    }

    // Create new asset
    const asset = await prismaClient.asset.create({
      data: {
        name,
        description,
        rate,
        quantity,
        funeralParlorId,
      },
    });

    const response: StandardResponse = {
      message: "Asset created successfully",
      data: asset,
    };
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Error creating asset:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create asset";
    return NextResponse.json({ message: errorMessage, status: 500 });
  }
}

// Get All Assets
export async function GET() {
  try {
    const assets = await prismaClient.asset.findMany({
      include: {
        funeralParlor: false,
      },
    });

    const response: StandardResponse = {
      message: "Assets fetched successfully",
      data: assets,
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching assets:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch assets";
    return NextResponse.json({ message: errorMessage, status: 500 });
  }
}
