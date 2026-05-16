import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireRole } from "@/lib/auth";

// GET /api/admin/stats
export async function GET(request) {
  const { payload, errorResponse } = await requireRole(request, "admin");
  if (errorResponse) return errorResponse;

  try {
    const [totalUsers, totalRestaurants, totalMenuItems, totalOrders, pendingOrders, revenueResult, recentOrders, recentUsers] =
      await Promise.all([
        prisma.user.count(),
        prisma.restaurant.count(),
        prisma.menuItem.count(),
        prisma.order.count(),
        prisma.order.count({ where: { status: "pending" } }),
        prisma.order.aggregate({
          _sum: { totalCost: true },
          where: { status: { not: "cancelled" } },
        }),
        prisma.order.findMany({
          take: 5,
          orderBy: { createdAt: "desc" },
          include: {
            customer: { select: { username: true } },
            restaurant: { select: { name: true } },
          },
        }),
        prisma.user.findMany({
          take: 5,
          orderBy: { createdAt: "desc" },
          select: { id: true, username: true, email: true, role: true, createdAt: true },
        }),
      ]);

    // Chart data: last 7 days of orders and revenue
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const recentOrdersForChart = await prisma.order.findMany({
      where: { createdAt: { gte: sevenDaysAgo } },
      select: { createdAt: true, totalCost: true, status: true },
    });

    const chartData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayStr = date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
      const dayStart = new Date(date);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(date);
      dayEnd.setHours(23, 59, 59, 999);

      const dayOrders = recentOrdersForChart.filter(
        (o) => o.createdAt >= dayStart && o.createdAt <= dayEnd,
      );

      chartData.push({
        date: dayStr,
        orders: dayOrders.length,
        revenue: parseFloat(
          dayOrders
            .filter((o) => o.status !== "cancelled")
            .reduce((sum, o) => sum + (parseFloat(o.totalCost) || 0), 0)
            .toFixed(2),
        ),
      });
    }

    // Status breakdown for pie chart
    const statusBreakdown = await prisma.order.groupBy({
      by: ["status"],
      _count: { id: true },
    });

    return NextResponse.json({
      total_users: totalUsers,
      total_restaurants: totalRestaurants,
      total_menu_items: totalMenuItems,
      total_orders: totalOrders,
      pending_orders: pendingOrders,
      total_revenue: revenueResult._sum.totalCost || 0,
      chart_data: chartData,
      status_breakdown: statusBreakdown.map((s) => ({
        status: s.status,
        count: s._count.id,
      })),
      recent_orders: recentOrders.map((o) => ({
        id: o.id,
        status: o.status,
        total_cost: o.totalCost,
        customer: o.customer,
        restaurant: o.restaurant,
        created_at: o.createdAt,
      })),
      recent_users: recentUsers.map((u) => ({
        id: u.id,
        username: u.username,
        email: u.email,
        role: u.role,
        created_at: u.createdAt,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
