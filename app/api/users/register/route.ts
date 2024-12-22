import { NextResponse, type NextRequest } from "next/server";
import { prismaClient } from "@/app/database/DatabaseClient";
import bcrypt from "bcryptjs";
import { StandardResponse } from "@/app/helpers/types/response.type";  // Assuming StandardResponse type is defined here

export async function POST(request: NextRequest) {
  try {
    console.log("Registering user...");
    const { email, password, name, role } = await request.json();
    console.log("User data:", { email, password, name, role });

    // Input validation
    if (!email || !password || !name) {
      console.log("Name, email, and password are required");

      const response: StandardResponse = {
        message: "Name, email, and password are required",
        code: 400,
      };

      return NextResponse.json(response);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      const response: StandardResponse = {
        message: "Invalid email format",
        code: 400,
      };
      return NextResponse.json(response);
    }

    // Validate password strength (optional, add more checks as needed)
    if (password.length < 6) {
      const response: StandardResponse = {
        message: "Password must be at least 6 characters long",
        code: 400,
      };
      return NextResponse.json(response);
    }

    // Check if the user already exists
    const existingUser = await prismaClient.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("User exists");

      const response: StandardResponse = {
        message: "User already exists",
        code: 400,
      };

      return NextResponse.json(response);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await prismaClient.user.create({
      data: {
        name,
        email,
        role: role || "USER", // Default to 'user' if no role is provided
        password: hashedPassword,
      },
    });

    // Success response
    const response: StandardResponse = {
      message: "User registered successfully",
      code: 201,
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error registering user:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Failed to register user";

    const response: StandardResponse = {
      message: errorMessage,
      code: 500,
    };

    return NextResponse.json(response, { status: 500 });
  }
}
