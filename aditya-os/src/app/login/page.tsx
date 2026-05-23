"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { BrandLogo } from "@/components/BrandMark";
import { BRAND } from "@/lib/branding";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success(`Welcome to ${BRAND.appName}`);
      router.push("/dashboard");
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Login failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      toast.success(`Welcome to ${BRAND.appName}`);
      router.push("/dashboard");
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Google login failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090B] px-4 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.2),transparent_45%)]" />
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#111318]/95 p-8 shadow-2xl shadow-black/40 backdrop-blur-sm">
        <BrandLogo size="lg" className="text-center" />
        <h1 className="mt-8 text-center text-2xl font-bold tracking-tight">
          Sign in to your workspace
        </h1>
        <p className="mt-3 text-center text-sm leading-relaxed text-zinc-500">
          {BRAND.tagline}
        </p>

        <div className="mt-8 space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            onClick={login}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
          <Button
            variant="secondary"
            onClick={googleLogin}
            disabled={loading}
            className="w-full"
          >
            Continue with Google
          </Button>
        </div>

        <p className="mt-8 border-t border-white/[0.06] pt-6 text-center text-xs text-zinc-600">
          {BRAND.foundedBy}
        </p>
      </div>
    </div>
  );
}
