"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, userRole, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (userRole !== "restaurant_owner") {
        router.push("/profile");
      }
    }
  }, [isAuthenticated, userRole, loading, router]);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Mobile header */}
          <div className="lg:hidden flex items-center h-14 px-4 border-b bg-card">
            <SheetTrigger className="inline-flex items-center justify-center h-9 w-9 rounded-md hover:bg-accent transition-colors">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <span className="ml-3 font-semibold">Dashboard</span>
          </div>

          {/* Main content */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
        <SheetContent side="left" className="w-[280px] max-w-[85vw] p-0" showCloseButton={false}>
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default DashboardLayout;
