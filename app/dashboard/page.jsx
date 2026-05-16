"use client";
import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  fetchOwnerRestaurants,
  fetchOwnerMenuItems,
  fetchUserOrders,
} from "@/lib/api";
import {
  Store,
  UtensilsCrossed,
  ShoppingBag,
  ArrowRight,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const statusColors = {
  pending: "border-yellow-300 text-yellow-700 bg-yellow-50",
  preparing: "border-blue-300 text-blue-700 bg-blue-50",
  out_for_delivery: "border-purple-300 text-purple-700 bg-purple-50",
  delivered: "border-green-300 text-green-700 bg-green-50",
  cancelled: "border-red-300 text-red-700 bg-red-50",
};

const DashboardPage = () => {
  const { data: restaurants = [] } = useQuery({
    queryKey: ["owner-restaurants"],
    queryFn: fetchOwnerRestaurants,
  });

  const { data: menuItems = [] } = useQuery({
    queryKey: ["owner-menu-items"],
    queryFn: fetchOwnerMenuItems,
  });

  const { data: orders = [] } = useQuery({
    queryKey: ["user-orders"],
    queryFn: fetchUserOrders,
  });

  const pendingOrders = orders.filter((o) => o.status === "pending");

  const stats = [
    {
      label: "Restaurants",
      value: restaurants.length,
      icon: Store,
      href: "/dashboard/restaurants",
    },
    {
      label: "Menu Items",
      value: menuItems.length,
      icon: UtensilsCrossed,
      href: "/dashboard/menu-items",
    },
    {
      label: "Total Orders",
      value: orders.length,
      icon: ShoppingBag,
      href: "/dashboard/orders",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Overview of your restaurant business
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Pending Orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-lg">Pending Orders</CardTitle>
          <Link
            href="/dashboard/orders"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "text-muted-foreground",
            )}
          >
            View all
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </CardHeader>
        <CardContent>
          {pendingOrders.length === 0 ? (
            <div className="text-center py-6">
              <Clock className="w-10 h-10 text-muted-foreground/50 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No pending orders</p>
            </div>
          ) : (
            <div className="divide-y">
              {pendingOrders.slice(0, 5).map((order) => (
                <div
                  key={order.id}
                  className="py-3 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-sm">Order #{order.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.restaurant?.name} &mdash; {order.delivery_address}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-sm">
                      ${parseFloat(order.total_cost).toFixed(2)}
                    </span>
                    <Badge
                      variant="outline"
                      className={statusColors[order.status]}
                    >
                      {order.status.replace(/_/g, " ")}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
