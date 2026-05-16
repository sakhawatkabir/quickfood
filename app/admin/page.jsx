"use client";
import { fetchAdminStats } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import {
  Users,
  ShoppingBag,
  Store,
  UtensilsCrossed,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  TruckIcon,
  XCircle,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const statusConfig = {
  pending: {
    icon: Clock,
    className: "border-yellow-300 text-yellow-700 bg-yellow-50",
    color: "#eab308",
  },
  preparing: {
    icon: RefreshCw,
    className: "border-blue-300 text-blue-700 bg-blue-50",
    color: "#3b82f6",
  },
  out_for_delivery: {
    icon: TruckIcon,
    className: "border-purple-300 text-purple-700 bg-purple-50",
    color: "#a855f7",
  },
  delivered: {
    icon: CheckCircle,
    className: "border-green-300 text-green-700 bg-green-50",
    color: "#22c55e",
  },
  cancelled: {
    icon: XCircle,
    className: "border-red-300 text-red-700 bg-red-50",
    color: "#ef4444",
  },
};

const roleColors = {
  admin: "bg-red-50 text-red-700 border-red-200",
  restaurant_owner: "bg-blue-50 text-blue-700 border-blue-200",
  user: "bg-zinc-50 text-zinc-700 border-zinc-200",
};

function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border rounded-lg shadow-lg px-3 py-2 text-sm">
      <p className="font-medium mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.color }} className="text-xs">
          {entry.name}:{" "}
          {entry.name === "revenue" ? `$${entry.value}` : entry.value}
        </p>
      ))}
    </div>
  );
};

const AdminDashboard = () => {
  const {
    data: stats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: fetchAdminStats,
  });

  if (isLoading) {
    return (
      <div>
        <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-32 bg-muted rounded-xl animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
          <div className="h-80 bg-muted rounded-xl animate-pulse" />
          <div className="h-80 bg-muted rounded-xl animate-pulse" />
        </div>
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

  const statCards = [
    {
      title: "Total Users",
      value: stats?.total_users ?? 0,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Total Orders",
      value: stats?.total_orders ?? 0,
      icon: ShoppingBag,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Restaurants",
      value: stats?.total_restaurants ?? 0,
      icon: Store,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      title: "Menu Items",
      value: stats?.total_menu_items ?? 0,
      icon: UtensilsCrossed,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Revenue",
      value: `$${parseFloat(stats?.total_revenue ?? 0).toFixed(2)}`,
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Pending Orders",
      value: stats?.pending_orders ?? 0,
      icon: TrendingUp,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
  ];

  const chartData = stats?.chart_data || [];
  const statusBreakdown = (stats?.status_breakdown || []).map((s) => ({
    ...s,
    name: s.status?.replace("_", " "),
    color: statusConfig[s.status]?.color || "#94a3b8",
  }));

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`${stat.bg} p-2 rounded-lg`}>
                <stat.icon className={`size-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        {/* Orders Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Orders (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11 }}
                    className="text-muted-foreground"
                  />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    className="text-muted-foreground"
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="orders"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                    name="orders"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Status Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              {statusBreakdown.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="count"
                    >
                      {statusBreakdown.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [value, name]}
                      contentStyle={{ fontSize: 12 }}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      formatter={(value) => (
                        <span className="text-xs">{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                  No order data
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-base">Revenue (Last 7 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11 }}
                  className="text-muted-foreground"
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  tickFormatter={(v) => `$${v}`}
                  className="text-muted-foreground"
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  fill="url(#revenueGradient)"
                  strokeWidth={2}
                  name="revenue"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">Recent Orders</CardTitle>
            <Link
              href="/admin/orders"
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              View all <ArrowRight className="size-3" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {(stats?.recent_orders || []).map((order) => {
                const config =
                  statusConfig[order.status] || statusConfig.pending;
                const StatusIcon = config.icon;
                return (
                  <div
                    key={order.id}
                    className="flex items-center justify-between px-6 py-3"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">
                        #{order.id} — {order.customer?.username || "Unknown"}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {order.restaurant?.name || "—"} ·{" "}
                        {timeAgo(order.created_at)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium whitespace-nowrap">
                        ${parseFloat(order.total_cost || 0).toFixed(2)}
                      </span>
                      <Badge
                        variant="outline"
                        className={`${config.className} text-xs`}
                      >
                        <StatusIcon className="size-3 mr-1" />
                        {order.status?.replace("_", " ")}
                      </Badge>
                    </div>
                  </div>
                );
              })}
              {(!stats?.recent_orders || stats.recent_orders.length === 0) && (
                <p className="px-6 py-8 text-center text-sm text-muted-foreground">
                  No orders yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">Recent Users</CardTitle>
            <Link
              href="/admin/users"
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              View all <ArrowRight className="size-3" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {(stats?.recent_users || []).map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between px-6 py-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-medium flex-shrink-0">
                      {user.username?.[0]?.toUpperCase() || "?"}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">
                        {user.username}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="outline"
                      className={roleColors[user.role] || roleColors.user}
                    >
                      {user.role?.replace("_", " ") || "user"}
                    </Badge>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {timeAgo(user.created_at)}
                    </span>
                  </div>
                </div>
              ))}
              {(!stats?.recent_users || stats.recent_users.length === 0) && (
                <p className="px-6 py-8 text-center text-sm text-muted-foreground">
                  No users yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
