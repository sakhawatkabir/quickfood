"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useCart } from "@/app/context/CartContext";
import { createOrder } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { MapPin, ShoppingBag } from "lucide-react";
import React, { useState } from "react";

const OrderForm = () => {
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { cartItems, clearCart } = useCart();
  const queryClient = useQueryClient();

  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      clearCart();
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
      router.push("/profile");
    },
  });

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    mutate({
      restaurant_id: cartItems[0].restaurant_id,
      items: cartItems.map((item) => ({
        menu_item_id: item.menu_item_id,
        quantity: item.quantity,
      })),
      delivery_address: deliveryAddress,
    });
  };

  return (
    <form className="space-y-3" onSubmit={handlePlaceOrder}>
      <label
        htmlFor="delivery-address"
        className="flex items-center gap-1.5 text-sm font-medium text-zinc-700"
      >
        <MapPin className="size-4 text-zinc-400" />
        Delivery Address
      </label>
      <textarea
        id="delivery-address"
        value={deliveryAddress}
        onChange={(e) => setDeliveryAddress(e.target.value)}
        className="w-full px-3 py-2.5 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
        placeholder="Enter your delivery address"
        rows={3}
        required
      />

      {error && (
        <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">
          {error.message}
        </p>
      )}
      {isSuccess && (
        <p className="text-green-600 text-sm bg-green-50 px-3 py-2 rounded-lg">
          Order placed! Redirecting...
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-60"
      >
        <ShoppingBag className="size-4" />
        {isPending ? "Placing order..." : "Place Order"}
      </button>
    </form>
  );
};

export default OrderForm;
