import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireRole } from "@/lib/auth";

const VALID_STATUSES = [
  "pending",
  "preparing",
  "out_for_delivery",
  "delivered",
  "cancelled",
];

// PATCH /api/admin/orders
export async function PATCH(request) {
  const { payload, errorResponse } = await requireRole(request, "admin");
  if (errorResponse) return errorResponse;

  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: "Order ID and valid status required" },
        { status: 400 },
      );
    }

    const order = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { status },
      select: { id: true, status: true },
    });

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update order status" },
      { status: 500 },
    );
  }
}

// GET /api/admin/orders
export async function GET(request) {
  const { payload, errorResponse } = await requireRole(request, "admin");
  if (errorResponse) return errorResponse;

  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        customer: {
          select: { id: true, username: true, email: true },
        },
        restaurant: { select: { id: true, name: true } },
        items: {
          include: {
            menuItem: { select: { name: true } },
          },
        },
      },
    });

    return NextResponse.json(
      orders.map((order) => ({
        id: order.id,
        status: order.status,
        delivery_address: order.deliveryAddress,
        total_cost: order.totalCost,
        created_at: order.createdAt,
        customer: order.customer,
        restaurant: order.restaurant,
        items: order.items.map((item) => ({
          id: item.id,
          name: item.menuItem.name,
          quantity: item.quantity,
          price: item.price,
          total_price: item.totalPrice,
        })),
      })),
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
