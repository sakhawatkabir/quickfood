import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireRole } from "@/lib/auth";

export const dynamic = "force-dynamic";

// PATCH /api/admin/menu-items
export async function PATCH(request) {
  const { payload, errorResponse } = await requireRole(request, "admin");
  if (errorResponse) return errorResponse;

  try {
    const body = await request.json();
    const { id, is_available } = body;

    if (!id || typeof is_available !== "boolean") {
      return NextResponse.json(
        { error: "Menu item ID and is_available (boolean) required" },
        { status: 400 },
      );
    }

    const item = await prisma.menuItem.update({
      where: { id: parseInt(id) },
      data: { isAvailable: is_available },
      select: { id: true, name: true, isAvailable: true },
    });

    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update menu item" },
      { status: 500 },
    );
  }
}

// GET /api/admin/menu-items
export async function GET(request) {
  const { payload, errorResponse } = await requireRole(request, "admin");
  if (errorResponse) return errorResponse;

  try {
    const menuItems = await prisma.menuItem.findMany({
      orderBy: { createdAt: "desc" },
      include: {
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
        restaurant: item.restaurant,
        created_at: item.createdAt,
      })),
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
