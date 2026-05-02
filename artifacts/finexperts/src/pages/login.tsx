import { useState } from "react";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-[#F7F4EC] flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <svg width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="50" cy="50" rx="45" ry="35" fill="#2E7D5B"/>
              <ellipse cx="50" cy="50" rx="35" ry="25" fill="#CDE29D"/>
              <circle cx="50" cy="50" r="10" fill="#E8F1D2"/>
              <circle cx="35" cy="45" r="2" fill="#4A3B32"/>
              <circle cx="45" cy="35" r="2" fill="#4A3B32"/>
              <circle cx="55" cy="35" r="2" fill="#4A3B32"/>
              <circle cx="65" cy="45" r="2" fill="#4A3B32"/>
              <circle cx="65" cy="55" r="2" fill="#4A3B32"/>
              <circle cx="55" cy="65" r="2" fill="#4A3B32"/>
              <circle cx="45" cy="65" r="2" fill="#4A3B32"/>
              <circle cx="35" cy="55" r="2" fill="#4A3B32"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#0A1A2E]">Intră în contul FinExperts</h1>
          <p className="text-[#5A6478] mt-2">Accesează aplicările și ofertele tale</p>
        </div>

        <div className="bg-white border border-[#E5E3D9] rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label className="text-sm font-semibold text-[#0A1A2E] mb-2 block">Email</Label>
              <Input
                data-testid="input-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ion@exemplu.ro"
                className="border-[#E5E3D9]"
                required
              />
            </div>
            <div>
              <Label className="text-sm font-semibold text-[#0A1A2E] mb-2 block">Parolă</Label>
              <Input
                data-testid="input-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="border-[#E5E3D9]"
                required
              />
            </div>
            <Button type="submit" data-testid="btn-login" className="w-full bg-[#0A1A2E] hover:bg-[#132846] text-white font-bold h-12">
              Intră în cont
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-[#5A6478]">
            Nu ai cont?{" "}
            <Link href="/register" className="text-[#0A1A2E] font-semibold hover:text-[#C6A667]">
              Creează cont
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
