"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { auth } from "../lib/firebase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Login Success");

      router.push("/dashboard");
    } catch (error: any) {
      console.log(error);

      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();

      await signInWithPopup(auth, provider);

      alert("Google Login Success");

      router.push("/dashboard");
    } catch (error: any) {
      console.log(error);

      alert(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-zinc-900 p-8">

        <h1 className="mb-2 text-4xl font-bold">
          Chavda OS
        </h1>

        <p className="mb-8 text-zinc-400">
          Login to continue
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="mb-4 h-14 w-full rounded-xl bg-black px-4 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="mb-6 h-14 w-full rounded-xl bg-black px-4 outline-none"
        />

        <button
          onClick={login}
          disabled={loading}
          className="mb-4 h-14 w-full rounded-xl bg-blue-500"
        >
          {loading ? "Loading..." : "Login"}
        </button>

        <button
          onClick={googleLogin}
          className="h-14 w-full rounded-xl border border-white/10"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}