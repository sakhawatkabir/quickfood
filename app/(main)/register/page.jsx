"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/lib/api";
import { UserPlus, User, Mail, Lock } from "lucide-react";

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

  const fields = [
    {
      id: "username",
      label: "Username",
      icon: User,
      type: "text",
      value: username,
      onChange: setUsername,
      placeholder: "Choose a username",
      errors: fieldErrors.username,
    },
    {
      id: "email",
      label: "Email Address",
      icon: Mail,
      type: "email",
      value: email,
      onChange: setEmail,
      placeholder: "Enter your email",
      errors: fieldErrors.email,
    },
    {
      id: "password",
      label: "Password",
      icon: Lock,
      type: "password",
      value: password,
      onChange: setPassword,
      placeholder: "Create a password",
      errors: null,
    },
    {
      id: "password2",
      label: "Confirm Password",
      icon: Lock,
      type: "password",
      value: password2,
      onChange: setPassword2,
      placeholder: "Confirm your password",
      errors: fieldErrors.password2,
    },
  ];

  return (
    <div className="bg-white min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="text-2xl font-semibold text-orange-500 inline-block mb-6"
          >
            QuickFood
          </Link>
          <h1 className="text-2xl font-semibold text-zinc-900">
            Create an account
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Join QuickFood and start ordering
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {fields.map((field) => (
              <div key={field.id}>
                <label
                  htmlFor={field.id}
                  className="flex items-center gap-1.5 text-sm font-medium text-zinc-700 mb-1.5"
                >
                  <field.icon className="size-4 text-zinc-400" />
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder={field.placeholder}
                  required
                />
                {field.errors?.map((err, i) => (
                  <p key={i} className="text-xs text-red-500 mt-1">
                    {err}
                  </p>
                ))}
              </div>
            ))}

            {globalError && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg">
                {globalError}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-60"
            >
              <UserPlus className="size-4" />
              {isPending ? "Creating account..." : "Create Account"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-zinc-500 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-orange-500 hover:text-orange-600"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
