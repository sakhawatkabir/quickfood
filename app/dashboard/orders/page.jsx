"use client";
import { useState } from "react";
import { fetchUserOrders, updateOrderStatus } from "@/lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Clock,
  CheckCircle,
  TruckIcon,
  XCircle,
  RefreshCw,
  Package,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const statusOptions = [
  { value: "all", label: "All Orders" },
  { value: "pending", label: "Pending" },
  { value: "preparing", label: "Preparing" },
  { value: "out_for_delivery", label: "Out for Delivery" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

const statusConfig = {
  pending: {
    icon: Clock,
    variant: "outline",
    className: "border-yellow-300 text-yellow-700 bg-yellow-50",
  },
  preparing: {
    icon: RefreshCw,
    variant: "outline",
    className: "border-blue-300 text-blue-700 bg-blue-50",
  },
  out_for_delivery: {
    icon: TruckIcon,
    variant: "outline",
    className: "border-purple-300 text-purple-700 bg-purple-50",
  },
  delivered: {
    icon: CheckCircle,
    variant: "outline",
    className: "border-green-300 text-green-700 bg-green-50",
  },
  cancelled: {
    icon: XCircle,
    variant: "outline",
    className: "border-red-300 text-red-700 bg-red-50",
  },
};

const OrdersPage = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const queryClient = useQueryClient();

  const {
    data: orders = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user-orders"],
    queryFn: fetchUserOrders,
  });

  const { mutate: changeStatus } = useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-orders"] });
    },
  });

  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((o) => o.status === statusFilter);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-40 bg-muted rounded-lg animate-pulse" />
        <div className="flex gap-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-9 w-24 bg-muted rounded-lg animate-pulse"
            />
          ))}
        </div>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-48 bg-muted rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-destructive">{error.message}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage and track customer orders
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {statusOptions.map((option) => (
          <Button
            key={option.value}
            variant={statusFilter === option.value ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="w-12 h-12 text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground">No orders found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const status = statusConfig[order.status] || statusConfig.pending;
            const StatusIcon = status.icon;

            return (
              <Card key={order.id}>
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <CardTitle className="text-lg">
                        Order #{order.id}
                      </CardTitle>
                      {order.customer && (
                        <CardDescription>
                          Customer: {order.customer.username}
                        </CardDescription>
                      )}
                    </div>
                    <Badge variant="outline" className={status.className}>
                      <StatusIcon className="w-3.5 h-3.5 mr-1" />
                      {order.status.replace(/_/g, " ")}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Address */}
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>
                      {order.delivery_address || "No delivery address"}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center text-sm"
                      >
                        <span className="text-foreground">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-medium">
                          ${parseFloat(item.total_price).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-lg">
                      ${parseFloat(order.total_cost).toFixed(2)}
                    </span>
                  </div>

                  {/* Status actions */}
                  {order.status !== "delivered" &&
                    order.status !== "cancelled" && (
                      <div className="pt-2 border-t">
                        <p className="text-sm font-medium mb-2">
                          Update Status
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {order.status === "pending" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-blue-300 text-blue-700 hover:bg-blue-50"
                              onClick={() =>
                                changeStatus({
                                  id: order.id,
                                  status: "preparing",
                                })
                              }
                            >
                              <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                              Mark Preparing
                            </Button>
                          )}
                          {order.status === "preparing" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-purple-300 text-purple-700 hover:bg-purple-50"
                              onClick={() =>
                                changeStatus({
                                  id: order.id,
                                  status: "out_for_delivery",
                                })
                              }
                            >
                              <TruckIcon className="w-3.5 h-3.5 mr-1.5" />
                              Mark Out for Delivery
                            </Button>
                          )}
                          {order.status === "out_for_delivery" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-green-300 text-green-700 hover:bg-green-50"
                              onClick={() =>
                                changeStatus({
                                  id: order.id,
                                  status: "delivered",
                                })
                              }
                            >
                              <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                              Mark Delivered
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-300 text-red-700 hover:bg-red-50"
                            onClick={() =>
                              changeStatus({
                                id: order.id,
                                status: "cancelled",
                              })
                            }
                          >
                            <XCircle className="w-3.5 h-3.5 mr-1.5" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
