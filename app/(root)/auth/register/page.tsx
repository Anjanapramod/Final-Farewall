"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { postRegister } from "@/app/store/slices/userSlice";
import { UserRegistrationRequestType } from "@/app/helpers/types/request/userRegistrationRequest.type";
import { useRouter } from "next/navigation";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.user);

  const [formData, setFormData] = useState<UserRegistrationRequestType>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  });


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    dispatch(postRegister(formData)).then(() => {
      clearFormData();
      if (user) {
        alert("Registration successful. Please login.")
        router.push("/auth/login");
      }
    })
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Clear form data after successful registration
  const clearFormData = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "USER",
    });
  };

  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] lg:w-[450px] border border-gray-200 rounded-md shadow-lg p-6">
        <div className="flex flex-col space-y-2 text-left">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an Account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your details to create a new account
          </p>
        </div>

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="input"
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="input"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="input"
            />
          </div>

          {/* Confirm Password Input */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="input"
            />
          </div>

          {/* Role Selection Dropdown */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="role" className="text-sm font-medium">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="input"
            >
              <option value="USER">Family</option>
              <option value="ADMIN">Funeral Home</option>
            </select>
          </div>

          {/* Submit Button */}
          <button type="submit" className="button">
            {"Sign Up"}
          </button>
        </form>

        {/* Link to login page */}
        <p className="px-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="hover:text-brand underline underline-offset-4"
          >
            Sign In
          </Link>
        </p>


      </div>
    </div>
  );
};

export default Page;
