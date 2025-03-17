import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Registration from "@/models/Registration";
import { verifyToken } from "@/lib/auth";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const user = await verifyToken(token);
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { message: "Not authorized" },
        { status: 403 }
      );
    }

    const registration = await Registration.findByIdAndDelete(params.id);
    if (!registration) {
      return NextResponse.json(
        { message: "Registration not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Registration deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}