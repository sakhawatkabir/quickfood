import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireRole } from "@/lib/auth";

export const dynamic = "force-dynamic";

// GET /api/restaurant-menu-items 
export async function GET(request) {
  const { payload, errorResponse } = await requireRole(
    request,
    "restaurant_owner"
  );
  if (errorResponse) return errorResponse;

  try {
    const menuItems = await prisma.menuItem.findMany({
      where: {
        restaurant: { ownerId: payload.id },
      },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        image: true,
        isAvailable: true,
        restaurantId: true,
        restaurant: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json(
      menuItems.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
        is_available: item.isAvailable,
        restaurant_id: item.restaurantId,
        restaurant: item.restaurant,
      }))
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
