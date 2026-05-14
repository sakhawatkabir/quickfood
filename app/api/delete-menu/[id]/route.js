import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireRole } from "@/lib/auth";

// DELETE /api/delete-menu/[id]
export async function DELETE(request, { params }) {
  const { payload, errorResponse } = await requireRole(
    request,
    "restaurant_owner",
  );
  if (errorResponse) return errorResponse;

  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid menu item ID." },
        { status: 400 },
      );
    }

    // Verify ownership
    const existing = await prisma.menuItem.findUnique({
      where: { id },
      include: { restaurant: { select: { ownerId: true } } },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Menu item not found." },
        { status: 404 },
      );
    }

    if (existing.restaurant.ownerId !== payload.id) {
      return NextResponse.json(
        { error: "Forbidden: you do not own this menu item." },
        { status: 403 },
      );
    }

    await prisma.menuItem.delete({ where: { id } });

    return NextResponse.json({ message: "Menu item deleted successfully." });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
