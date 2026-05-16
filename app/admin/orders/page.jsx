"use client";
import { useState, Fragment } from "react";
import { fetchAdminOrders, updateAdminOrderStatus } from "@/lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Clock,
  CheckCircle,
  TruckIcon,
  XCircle,
  RefreshCw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ITEMS_PER_PAGE = 10;

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
    className: "border-yellow-300 text-yellow-700 bg-yellow-50",
  },
  preparing: {
    icon: RefreshCw,
    className: "border-blue-300 text-blue-700 bg-blue-50",
  },
  out_for_delivery: {
    icon: TruckIcon,
    className: "border-purple-300 text-purple-700 bg-purple-50",
  },
  delivered: {
    icon: CheckCircle,
    className: "border-green-300 text-green-700 bg-green-50",
  },
  cancelled: {
    icon: XCircle,
    className: "border-red-300 text-red-700 bg-red-50",
  },
};

const AdminOrdersPage = () => {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [page, setPage] = useState(1);

  const {
    data: orders = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: fetchAdminOrders,
  });

  const { mutate: changeStatus } = useMutation({
    mutationFn: updateAdminOrderStatus,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] }),
  });

  const filtered =
    statusFilter === "all"
      ? orders
      : orders.filter((o) => o.status === statusFilter);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (isLoading) {
    return (
      <div>
        <h1 className="text-2xl font-semibold mb-6">Orders</h1>
        <div className="h-96 bg-muted rounded-xl animate-pulse" />
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Orders</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {orders.length} total orders
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {statusOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setStatusFilter(opt.value);
                setPage(1);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                statusFilter === opt.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground w-8" />
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Order
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Customer
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Restaurant
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Address
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Total
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">
                    Update
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((order) => {
                  const config =
                    statusConfig[order.status] || statusConfig.pending;
                  const StatusIcon = config.icon;
                  const isExpanded = expandedOrder === order.id;
                  const hasItems = order.items && order.items.length > 0;

                  return (
                    <Fragment key={order.id}>
                      <tr
                        className="border-b last:border-0 hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => hasItems && toggleExpand(order.id)}
                      >
                        <td className="py-3 px-4">
                          {hasItems && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-6"
                            >
                              {isExpanded ? (
                                <ChevronUp className="size-4" />
                              ) : (
                                <ChevronDown className="size-4" />
                              )}
                            </Button>
                          )}
                        </td>
                        <td className="py-3 px-4 font-medium">#{order.id}</td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {order.user?.username ||
                            order.customer?.username ||
                            "—"}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {order.restaurant?.name || "—"}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground max-w-40 truncate">
                          {order.delivery_address || "—"}
                        </td>
                        <td className="py-3 px-4 font-medium">
                          ${parseFloat(order.total_cost || 0).toFixed(2)}
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className={config.className}>
                            <StatusIcon className="size-3 mr-1" />
                            {order.status?.replace("_", " ")}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <select
                            value={order.status}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) =>
                              changeStatus({
                                id: order.id,
                                status: e.target.value,
                              })
                            }
                            className="text-xs border rounded-md px-2 py-1 bg-background"
                          >
                            {statusOptions
                              .filter((s) => s.value !== "all")
                              .map((s) => (
                                <option key={s.value} value={s.value}>
                                  {s.label}
                                </option>
                              ))}
                          </select>
                        </td>
                      </tr>
                      {isExpanded && hasItems && (
                        <tr key={`${order.id}-details`} className="bg-muted/30">
                          <td colSpan={8} className="px-8 py-3">
                            <div className="text-xs">
                              <p className="font-medium text-muted-foreground mb-2">
                                Order Items
                              </p>
                              <div className="space-y-1">
                                {order.items.map((item) => (
                                  <div
                                    key={item.id}
                                    className="flex items-center justify-between py-1"
                                  >
                                    <span>
                                      {item.name} x{item.quantity}
                                    </span>
                                    <span className="font-medium">
                                      $
                                      {parseFloat(
                                        item.total_price || 0,
                                      ).toFixed(2)}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
                {paginated.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="py-10 text-center text-muted-foreground"
                    >
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t">
              <p className="text-sm text-muted-foreground">
                Showing {(page - 1) * ITEMS_PER_PAGE + 1}–
                {Math.min(page * ITEMS_PER_PAGE, filtered.length)} of{" "}
                {filtered.length}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  <span className="sr-only">Previous</span>←
                </Button>
                <span className="text-sm font-medium px-2">
                  {page} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  <span className="sr-only">Next</span>→
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOrdersPage;
