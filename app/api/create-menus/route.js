import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";

// POST /api/create-menus
export async function POST(request) {
  const { payload, errorResponse } = await requireRole(
    request,
    "restaurant_owner",
  );
  if (errorResponse) return errorResponse;

  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");
    const imageFile = formData.get("image");

    if (!name || !description || !price) {
      return NextResponse.json(
        { error: "Name, description, and price are required." },
        { status: 400 },
      );
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      return NextResponse.json(
        { error: "Price must be a valid positive number." },
        { status: 400 },
      );
    }

    const restaurant = await prisma.restaurant.findFirst({
      where: { ownerId: payload.id },
      select: { id: true },
    });

    if (!restaurant) {
      return NextResponse.json(
        { error: "You must create a restaurant before adding menu items." },
        { status: 400 },
      );
    }

    // Upload image to Cloudinary if provided
    let imageUrl = null;
    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadImage(imageFile, "quickfood/menu-items");
    }

    const menuItem = await prisma.menuItem.create({
      data: {
        name,
        description,
        price: parsedPrice,
        image: imageUrl,
        restaurantId: restaurant.id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        image: true,
        restaurantId: true,
      },
    });

    return NextResponse.json(
      {
        id: menuItem.id,
        name: menuItem.name,
        description: menuItem.description,
        price: menuItem.price,
        image: menuItem.image,
        restaurant_id: menuItem.restaurantId,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
