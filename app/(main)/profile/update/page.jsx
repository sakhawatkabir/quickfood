"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchProfile, updateProfile } from "@/lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const UpdateProfile = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const { data: user, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name ?? "");
      setLastName(user.last_name ?? "");
      setPhoneNumber(user.phone_number ?? "");
      setAddress(user.address ?? "");
    }
  }, [user]);

  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setTimeout(() => router.push("/profile"), 1500);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ first_name: firstName, last_name: lastName, phone_number: phoneNumber, address });
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Update Profile</h2>
        </div>

        <div className="bg-white py-8 px-4 shadow-md rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                id="first_name"
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 outline-none w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                id="last_name"
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 outline-none w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                id="phone_number"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1 outline-none w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 outline-none w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error.message}</p>}
            {isSuccess && (
              <p className="text-green-500 text-sm">
                Profile updated! Redirecting...
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black disabled:opacity-60"
            >
              {isPending ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
