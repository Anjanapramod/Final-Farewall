import { NextResponse, type NextRequest } from "next/server";
import { prismaClient } from "@/app/database/DatabaseClient";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import type { User } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

export async function POST(request: NextRequest) {
    try {
        console.log("Logging in user...");
        const { email, password }: { email: string; password: string } =
            await request.json();
        console.log("User data:", { email, password });

        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required" },
                { status: 400 }
            );
        }

        const user: User | null = await prismaClient.user.findUnique({
            where: { email },
        });

        if (!user || !user.password) {
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Compare hashed passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 401 }
            );
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);

        return NextResponse.json({
            message: "Login successful",
            token,
        }, { status: 200 });
    } catch (error) {
        console.error("Error logging in user:", error);

        const errorMessage =
            error instanceof Error ? error.message : "Failed to login user";
        return NextResponse.json({ message: errorMessage }, { status: 500 });
    }
}
