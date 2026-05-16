"use client";

import React from "react";

const OrderSummary = ({ item }) => {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-zinc-600">
        {item.name} <span className="text-zinc-400">x{item.quantity}</span>
      </span>
      <span className="font-medium text-zinc-900">
        ${(item.price * item.quantity).toFixed(2)}
      </span>
    </div>
  );
};

export default OrderSummary;
