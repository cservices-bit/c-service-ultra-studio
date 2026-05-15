import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useLocation } from "wouter";
import { toast } from "sonner";

export default function LoginPage() {
  const [, navigate] = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Connexion réussie");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="cinema-card p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg mb-4 text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-lg mb-4 text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-cyan-500 py-3 rounded-lg font-bold"
        >
          Login
        </button>
      </div>
    </div>
  );
}
