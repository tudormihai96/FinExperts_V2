import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function RegisterPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [form, setForm] = useState({ nume: "", email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Cont creat! Bine ai venit.", description: "Contul tău FinExperts a fost creat cu succes." });
    setLocation("/cont");
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
          <h1 className="text-2xl font-bold text-[#0A1A2E]">Creează cont FinExperts</h1>
          <p className="text-[#5A6478] mt-2">Urmărește aplicările și ofertele tale</p>
        </div>

        <div className="bg-white border border-[#E5E3D9] rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label className="text-sm font-semibold text-[#0A1A2E] mb-2 block">Nume complet</Label>
              <Input
                data-testid="input-nume"
                value={form.nume}
                onChange={(e) => setForm(p => ({ ...p, nume: e.target.value }))}
                placeholder="Ion Popescu"
                className="border-[#E5E3D9]"
                required
              />
            </div>
            <div>
              <Label className="text-sm font-semibold text-[#0A1A2E] mb-2 block">Email</Label>
              <Input
                data-testid="input-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
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
                value={form.password}
                onChange={(e) => setForm(p => ({ ...p, password: e.target.value }))}
                placeholder="Minim 8 caractere"
                className="border-[#E5E3D9]"
                required
                minLength={8}
              />
            </div>
            <Button type="submit" data-testid="btn-register" className="w-full bg-[#0A1A2E] hover:bg-[#132846] text-white font-bold h-12">
              Creează cont
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-[#5A6478]">
            Ai deja cont?{" "}
            <Link href="/login" className="text-[#0A1A2E] font-semibold hover:text-[#C6A667]">
              Intră în cont
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
