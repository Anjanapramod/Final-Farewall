import { NextResponse, type NextRequest } from "next/server";
import { prismaClient } from "@/app/database/DatabaseClient";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import type { User } from "@prisma/client";
import { StandardResponse } from "@/app/helpers/types/response.type"; // Assuming StandardResponse type is defined

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

export async function POST(request: NextRequest) {
  try {
    console.log("Logging in user...");
    const { email, password }: { email: string; password: string } =
      await request.json();
    console.log("User data:", { email, password });

    // Input validation
    if (!email || !password) {
      const response: StandardResponse = {
        message: "Email and password are required",
        code: 400,
      };
      return NextResponse.json(response);
    }

    const user: User | null = await prismaClient.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      const response: StandardResponse = {
        message: "Invalid email or password",
        code: 401,
      };
      return NextResponse.json(response);
    }

    // Compare hashed passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const response: StandardResponse = {
        message: "Invalid email or password",
        code: 401,
      };
      return NextResponse.json(response);
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);

    const response: StandardResponse = {
      message: "Login successful",
      code: 200,
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        token,
      },
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error logging in user:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Failed to login user";

    const response: StandardResponse = {
      message: errorMessage,
      code: 500,
    };

    return NextResponse.json(response, { status: 500 });
  }
}
