import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";

export async function POST() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    await connectToDatabase();

    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      return NextResponse.json({ 
        message: "Admin user already exists",
        email: existingAdmin.email 
      });
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 12);
    const admin = await User.create({
      name: "Admin User",
      email: "admin@voicesofpalestine.com",
      password: hashedPassword,
      role: "admin",
    });

    return NextResponse.json({
      message: "Admin user created successfully",
      email: admin.email,
      password: "admin123"
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

