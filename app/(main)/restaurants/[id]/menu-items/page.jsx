"use client";

import React from "react";
import Link from "next/link";
import { fetchRestaurant } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import MenuItem from "@/components/MenuItem";
import { ArrowLeft, UtensilsCrossed } from "lucide-react";

const RestaurantMenuItemsPage = () => {
  const params = useParams();

  const {
    data: restaurant,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["restaurant", params.id],
    queryFn: () => fetchRestaurant(params.id),
    enabled: !!params.id,
  });

  const menuItems = restaurant?.menus ?? [];

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen">
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-14">
          <div className="container mx-auto px-4">
            <div className="h-5 w-32 bg-gray-700 rounded animate-pulse mb-6" />
            <div className="h-8 w-64 bg-gray-700 rounded animate-pulse mb-3" />
            <div className="h-4 w-48 bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-36 bg-gray-100 rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="bg-white min-h-screen">
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-14">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-white">Menu</h1>
          </div>
        </div>
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-gray-500 text-lg mb-6">
            {error?.message || "Restaurant not found"}
          </p>
          <Link
            href="/restaurants"
            className="inline-flex items-center gap-2 bg-orange-500 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-orange-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-14">
        <div className="container mx-auto px-4">
          <Link
            href={`/restaurants/${params.id}`}
            className="inline-flex items-center gap-1.5 text-gray-400 hover:text-orange-400 text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Restaurant
          </Link>
          <div className="flex items-center gap-2 text-orange-400 mb-3">
            <UtensilsCrossed className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">
              Menu
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {restaurant.name}
          </h1>
          <p className="text-gray-400 text-sm">
            {menuItems.length} item{menuItems.length !== 1 && "s"} available
          </p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="container mx-auto px-4 py-10">
        {menuItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menuItems.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <UtensilsCrossed className="w-14 h-14 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-1">No menu items yet</p>
            <p className="text-sm text-gray-400">
              This restaurant hasn&apos;t added any dishes yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenuItemsPage;
