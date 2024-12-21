import { NextResponse, type NextRequest } from "next/server";
import { prismaClient } from "@/app/database/DatabaseClient";
import { StandardResponse } from "@/app/helpers/types/response";

// Get Asset by ID
async function getAssetById(id: string) {
  try {
    const asset = await prismaClient.asset.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        funeralParlor: true, // Include related funeral parlor data (optional)
      },
    });

    if (!asset) {
      return NextResponse.json({ message: "Asset not found" }, { status: 404 });
    }

    const response: StandardResponse = {
      message: "Asset found",
      data: asset,
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching asset:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch asset";
    return NextResponse.json({ message: errorMessage, status: 500 });
  }
}

// Main GET handler function
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const parlorId = searchParams.get("parlorId");

  try {
    // If 'id' is provided and is valid, fetch the asset by ID
    if (id && !isNaN(Number(id))) {
      return getAssetById(id);
    }

    // If 'parlorId' is provided and is valid, fetch assets for a specific funeral parlor
    if (parlorId && !isNaN(Number(parlorId))) {
      const assets = await prismaClient.asset.findMany({
        where: { funeralParlorId: parseInt(parlorId, 10) },
        include: {
          funeralParlor: false,
        },
      });

      const response: StandardResponse = {
        message: "Assets fetched successfully",
        data: assets,
      };
      return NextResponse.json(response, { status: 200 });
    }

    return NextResponse.json(
      { message: "Missing or invalid query parameters" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error fetching asset:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch asset";
    return NextResponse.json({ message: errorMessage, status: 500 });
  }
}

// Update Asset
export async function PUT(request: NextRequest) {
  const { id, name, description, rate, quantity, funeralParlorId } =
    await request.json();

  try {
    if (!id || !name || !funeralParlorId) {
      return NextResponse.json(
        { message: "ID, name, and funeralParlorId are required" },
        { status: 400 }
      );
    }

    // Check if asset exists
    const asset = await prismaClient.asset.findUnique({
      where: { id },
    });

    if (!asset) {
      return NextResponse.json(
        { message: "Asset not found" },
        {
          status: 404,
        }
      );
    }

    // Check if funeral parlor exists
    const funeralParlor = await prismaClient.funeralParlor.findUnique({
      where: { id: funeralParlorId },
    });

    if (!funeralParlor) {
      return NextResponse.json(
        { message: "Funeral parlor not found" },
        { status: 404 }
      );
    }

    // Update asset
    const updatedAsset = await prismaClient.asset.update({
      where: { id },
      data: {
        name: name ? name : asset.name,
        description: description ? description : asset.description,
        rate: rate ? rate : asset.rate,
        quantity: quantity ? quantity : asset.quantity,
        funeralParlorId: funeralParlorId
          ? funeralParlorId
          : asset.funeralParlorId,
      },
    });

    const response: StandardResponse = {
      message: "Asset updated successfully",
      data: updatedAsset,
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error updating asset:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to update asset";
    return NextResponse.json({ message: errorMessage, status: 500 });
  }
}

// Delete Asset
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { message: "Invalid or missing asset ID", status: 400 },
        { status: 400 }
      );
    }

    const asset = await prismaClient.asset.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!asset) {
      return NextResponse.json(
        { message: "Asset not found", status: 404 },
        { status: 404 }
      );
    }

    await prismaClient.asset.delete({
      where: { id: parseInt(id, 10) },
    });

    const response: StandardResponse = {
      message: "Asset deleted successfully",
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error deleting asset:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to delete asset";
    return NextResponse.json({ message: errorMessage, status: 500 });
  }
}
