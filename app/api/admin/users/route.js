import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireRole } from "@/lib/auth";

// GET /api/admin/users
export async function GET(request) {
  const { payload, errorResponse } = await requireRole(request, "admin");
  if (errorResponse) return errorResponse;

  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      users.map((u) => ({
        id: u.id,
        username: u.username,
        email: u.email,
        role: u.role,
        created_at: u.createdAt,
      })),
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// PATCH /api/admin/users
export async function PATCH(request) {
  const { payload, errorResponse } = await requireRole(request, "admin");
  if (errorResponse) return errorResponse;

  try {
    const body = await request.json();
    const { id, role } = body;

    if (!id || !role) {
      return NextResponse.json(
        { error: "User ID and role required" },
        { status: 400 },
      );
    }

    const validRoles = ["user", "restaurant_owner", "admin"];
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { error: "Invalid role. Must be: user, restaurant_owner, or admin" },
        { status: 400 },
      );
    }

    // Prevent admin from demoting themselves
    if (parseInt(id) === payload.userId && role !== "admin") {
      return NextResponse.json(
        { error: "Cannot change your own admin role" },
        { status: 400 },
      );
    }

    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { role },
      select: { id: true, username: true, email: true, role: true },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update user role" },
      { status: 500 },
    );
  }
}

// DELETE /api/admin/users?id=X
export async function DELETE(request) {
  const { payload, errorResponse } = await requireRole(request, "admin");
  if (errorResponse) return errorResponse;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "User ID required" }, { status: 400 });
  }

  try {
    await prisma.user.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 },
    );
  }
}
