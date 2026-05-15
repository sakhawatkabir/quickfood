"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/lib/api";

const RegisterPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const { mutate, isPending, error } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      router.push("/login?message=Login to your account");
    },
  });


  const fieldErrors = error && !(error instanceof Error) ? error : {};
  const globalError = error instanceof Error ? error.message : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ username, email, password, password2 });
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-black">Create a new account</h2>
          <p className="mt-2 text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-black hover:text-gray-700">
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-8 bg-white py-8 px-4 shadow-md rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="outline-none w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm"
                  placeholder="Enter your username"
                  required
                />
                {fieldErrors.username?.map((err, i) => (
                  <p key={i} className="text-sm text-red-500">{err}</p>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="outline-none w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm"
                  placeholder="Enter your email"
                  required
                />
                {fieldErrors.email?.map((err, i) => (
                  <p key={i} className="text-sm text-red-500">{err}</p>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="outline-none w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm"
                  placeholder="Create a password"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password2" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="password2"
                  type="password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  className="outline-none w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm"
                  placeholder="Confirm your password"
                  required
                />
                {fieldErrors.password2?.map((err, i) => (
                  <p key={i} className="text-sm text-red-500">{err}</p>
                ))}
              </div>
            </div>

            {globalError && <p className="text-sm text-red-500">{globalError}</p>}

            <div>
              <button
                type="submit"
                disabled={isPending}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black disabled:opacity-60"
              >
                {isPending ? "Creating..." : "Create Account"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
