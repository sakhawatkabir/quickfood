import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireRole } from "@/lib/auth";

// GET /api/admin/restaurants
export async function GET(request) {
  const { payload, errorResponse } = await requireRole(request, "admin");
  if (errorResponse) return errorResponse;

  try {
    const restaurants = await prisma.restaurant.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        owner: { select: { id: true, username: true } },
      },
    });

    return NextResponse.json(
      restaurants.map((r) => ({
        id: r.id,
        name: r.name,
        description: r.description,
        location: r.location,
        image: r.image,
        owner: r.owner,
        created_at: r.createdAt,
      }))
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
