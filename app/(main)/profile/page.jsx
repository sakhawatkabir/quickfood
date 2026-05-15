"use client";

import React from "react";
import Link from "next/link";
import { fetchProfile } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import OrderHistory from "@/components/OrderHistory";

const ProfilePage = () => {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">{error.message}</div>
    );
  }

  return (
    <div className="container mx-auto px-4 space-y-3">
      <div className="max-w-3xl mx-auto py-8 px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-black">
            Profile Information
          </h2>
          <Link
            href="/profile/update"
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-700"
          >
            Update Profile
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">First Name</p>
            <p className="text-base text-gray-900">
              {user.first_name || "not provided"}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Last Name</p>
            <p className="text-base text-gray-900">
              {user.last_name || "not provided"}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Email Address</p>
            <p className="text-base text-gray-900">
              {user.email || "not provided"}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Phone Number</p>
            <p className="text-base text-gray-900">
              {user.phone_number || "not provided"}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Address</p>
            <p className="text-base text-gray-900">
              {user.address || "not provided"}
            </p>
          </div>
        </div>
      </div>

      <OrderHistory />
    </div>
  );
};

export default ProfilePage;
