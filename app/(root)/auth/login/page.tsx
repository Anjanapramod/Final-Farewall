"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { postLogin } from "@/app/store/slices/userSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import Link from "next/link";

export default function Page() {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { user, error } = useSelector((state: RootState) => state.user);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(postLogin({ email, password }));
  };

  useEffect(() => {
    if (error) {
      alert(error);
    } else if (user && user.token) {
      if (user.role === "ADMIN") {
        router.push("/dashboard/admin/manage-funeral-parlors");
        return;
      } else if (user.role === "USER") {
        router.push("/dashboard/user");
        return;
      }
    }
  }, [user, error, router]);

  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] border border-gray-200 rounded-md shadow-lg p-6">
        <div className="flex flex-col space-y-2 text-left">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and password to sign in to your account
          </p>
        </div>

        {error && <div className="text-red-500 text-center">{error}</div>}

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="button">
            Sign In
          </button>
        </form>

        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/auth/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
