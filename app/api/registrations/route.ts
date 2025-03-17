import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Registration from "@/models/Registration";

export async function GET() {
  try {
    await connectDB();
    const registrations = await Registration.find().sort({ createdAt: -1 });
    return NextResponse.json(registrations);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}