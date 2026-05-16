"use client";
import React from "react";
import { useCart } from "../../context/CartContext";
import Link from "next/link";
import Cart from "@/components/Cart";
import OrderSummary from "@/components/OrderSummary";
import OrderForm from "@/components/OrderForm";
import { ShoppingBag, ArrowLeft } from "lucide-react";

const CartPage = () => {
  const { cartItems, calculateTotal } = useCart();

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 py-14">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-orange-400 mb-3">
            <ShoppingBag className="size-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">
              Your Order
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-white">
            Shopping Cart
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-10">
        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="size-16 text-zinc-300 mx-auto mb-4" />
            <p className="text-xl text-zinc-500 mb-2">Your cart is empty</p>
            <p className="text-zinc-400 mb-6">
              Add some delicious items to get started
            </p>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
            >
              <ArrowLeft className="size-4" />
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-zinc-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-zinc-100">
                  <h2 className="font-semibold text-zinc-900">
                    Cart Items ({cartItems.length})
                  </h2>
                </div>
                <div className="divide-y divide-zinc-100">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-5">
                      <Cart item={item} />
                    </div>
                  ))}
                </div>
              </div>
              <Link
                href="/menu"
                className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-orange-500 mt-4 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Continue Shopping
              </Link>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-zinc-100 shadow-sm overflow-hidden sticky top-24">
                <div className="p-5 border-b border-zinc-100">
                  <h2 className="font-semibold text-zinc-900">Order Summary</h2>
                </div>
                <div className="p-5 space-y-3">
                  {cartItems.map((item) => (
                    <OrderSummary item={item} key={item.id} />
                  ))}
                  <div className="border-t border-zinc-100 pt-4 mt-4">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span className="text-orange-500">
                        ${calculateTotal()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-5 border-t border-zinc-100 bg-zinc-50">
                  <OrderForm />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
