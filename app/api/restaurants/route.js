import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/restaurants
export async function GET() {
  try {
    const restaurants = await prisma.restaurant.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        description: true,
        location: true,
        image: true,
        hours: true,
        contact: true,
      },
    });

    return NextResponse.json(restaurants);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
