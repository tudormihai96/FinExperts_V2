import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E5E3D9] bg-[#F7F4EC]">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 no-underline">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="50" cy="50" rx="45" ry="35" fill="#2E7D5B"/>
                <ellipse cx="50" cy="50" rx="35" ry="25" fill="#CDE29D"/>
                <circle cx="50" cy="50" r="10" fill="#E8F1D2"/>
                {/* Seeds */}
                <circle cx="35" cy="45" r="2" fill="#4A3B32"/>
                <circle cx="45" cy="35" r="2" fill="#4A3B32"/>
                <circle cx="55" cy="35" r="2" fill="#4A3B32"/>
                <circle cx="65" cy="45" r="2" fill="#4A3B32"/>
                <circle cx="65" cy="55" r="2" fill="#4A3B32"/>
                <circle cx="55" cy="65" r="2" fill="#4A3B32"/>
                <circle cx="45" cy="65" r="2" fill="#4A3B32"/>
                <circle cx="35" cy="55" r="2" fill="#4A3B32"/>
              </svg>
              <span className="text-[26px] font-bold text-[#0A1A2E]">FinExperts</span>
            </div>
            <div className="flex items-center gap-1 pl-12 mt-[-4px]">
              <span className="text-[10px] font-semibold text-[#C6A667] uppercase tracking-wider">partener</span>
              <img src="https://www.kiwifinance.ro/wp-content/uploads/2022/02/Kiwi-Finance-Logo.png" alt="KIWI Finance" className="h-[14px]" />
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/calculator" className="text-sm font-medium text-[#0A1A2E] hover:text-[#C6A667] transition-colors">Calculator</Link>
          <Link href="/banci" className="text-sm font-medium text-[#0A1A2E] hover:text-[#C6A667] transition-colors">Comparator bănci</Link>
          <Link href="/asigurari" className="text-sm font-medium text-[#0A1A2E] hover:text-[#C6A667] transition-colors">Asigurări</Link>
          <Link href="/articole" className="text-sm font-medium text-[#0A1A2E] hover:text-[#C6A667] transition-colors">Articole</Link>
          <Link href="/despre" className="text-sm font-medium text-[#0A1A2E] hover:text-[#C6A667] transition-colors">Despre</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-[#0A1A2E] hover:text-[#C6A667] transition-colors px-4 py-2 border border-[#E5E3D9] rounded-md">Intră în cont</Link>
          <Link href="/aplicare-credit" className="text-sm font-medium text-white bg-[#0A1A2E] hover:bg-[#132846] transition-colors px-4 py-2 rounded-md">Aplică credit</Link>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </header>
  );
}
