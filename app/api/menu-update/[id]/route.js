import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";

// PUT /api/menu-update/[id]
export async function PUT(request, { params }) {
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

    // Verify ownership
    const existing = await prisma.menuItem.findUnique({
      where: { id },
      include: { restaurant: { select: { ownerId: true } } },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Menu item not found." },
        { status: 404 }
      );
    }

    if (existing.restaurant.ownerId !== payload.id) {
      return NextResponse.json(
        { error: "Forbidden: you do not own this menu item." },
        { status: 403 }
      );
    }

    const formData = await request.formData();
    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");
    const imageFile = formData.get("image");

    let parsedPrice = undefined;
    if (price !== null) {
      parsedPrice = parseFloat(price);
      if (isNaN(parsedPrice) || parsedPrice < 0) {
        return NextResponse.json(
          { error: "Price must be a valid positive number." },
          { status: 400 }
        );
      }
    }

    // Upload new image to Cloudinary if provided
    let imageUrl = existing.image;
    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadImage(imageFile, "quickfood/menu-items");
    }

    const updated = await prisma.menuItem.update({
      where: { id },
      data: {
        name: name ?? undefined,
        description: description ?? undefined,
        price: parsedPrice,
        image: imageUrl,
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        image: true,
        isAvailable: true,
        restaurantId: true,
      },
    });

    return NextResponse.json({
      id: updated.id,
      name: updated.name,
      description: updated.description,
      price: updated.price,
      image: updated.image,
      is_available: updated.isAvailable,
      restaurant_id: updated.restaurantId,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
