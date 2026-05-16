"use client";

import Link from "next/link";
import { fetchMenuItems } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Flame } from "lucide-react";
import MenuItem from "./MenuItem";

const PopularItems = () => {
  const { data: menuItems = [], isLoading } = useQuery({
    queryKey: ["menu-items"],
    queryFn: fetchMenuItems,
  });

  const items = menuItems.slice(0, 4);

  if (isLoading) {
    return (
      <section className="py-20 bg-zinc-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-zinc-100 rounded-xl h-36 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) return null;

  return (
    <section className="py-20 bg-zinc-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-orange-500 mb-3">
              <Flame className="size-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Trending
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-zinc-900">
              Popular Items
            </h2>
            <p className="text-zinc-500 mt-2 max-w-lg">
              Most ordered dishes from our top restaurants — freshly prepared
              and delivered fast.
            </p>
          </div>
          <Link
            href="/menu"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-orange-500 font-semibold hover:text-orange-600 transition-colors"
          >
            View all
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularItems;
