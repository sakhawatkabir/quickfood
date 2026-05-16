import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireRole } from "@/lib/auth";

export const dynamic = "force-dynamic";

// GET /api/menu-item/[id]
export async function GET(request, { params }) {
  const { payload, errorResponse } = await requireRole(
    request,
    "restaurant_owner"
  );
  if (errorResponse) return errorResponse;

  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid menu item ID." },
        { status: 400 }
      );
    }

    const item = await prisma.menuItem.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        image: true,
        isAvailable: true,
        restaurantId: true,
        restaurant: { select: { ownerId: true } },
      },
    });

    if (!item) {
      return NextResponse.json(
        { error: "Menu item not found." },
        { status: 404 }
      );
    }

    if (item.restaurant.ownerId !== payload.id) {
      return NextResponse.json(
        { error: "Forbidden: you do not own this menu item." },
        { status: 403 }
      );
    }

    return NextResponse.json({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      is_available: item.isAvailable,
      restaurant_id: item.restaurantId,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
