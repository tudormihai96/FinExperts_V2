import { useState } from "react";
import { Link, useLocation } from "wouter";
import { LogIn, Menu, X, Phone, Mail, Clock, Facebook, Instagram, User, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user, isLoggedIn, isAdmin, logout } = useAuth();

  const navLinks = [
    { href: "/", label: "Acasă" },
    { href: "/calculator", label: "Calculator" },
    { href: "/banci", label: "Bănci" },
    { href: "/asigurari", label: "Asigurări" },
    { href: "/ghiduri", label: "Ghiduri" },
    { href: "/despre", label: "Despre noi" },
    { href: "/aplica", label: "Aplică" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  const initials = user?.name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top info bar */}
      <div className="bg-[#0D1F3C] text-white text-xs px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5">
            <a href="tel:0799715101" className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors">
              <Phone className="h-3 w-3" />
              <span>0799 715 101</span>
            </a>
            <a href="mailto:kbaa@kiwifinance.ro" className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors hidden sm:flex">
              <Mail className="h-3 w-3" />
              <span>kbaa@kiwifinance.ro</span>
            </a>
            <span className="flex items-center gap-1.5 text-gray-400 hidden md:flex">
              <Clock className="h-3 w-3" />
              <span>L-V 09:00 — 18:00</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Facebook className="h-3.5 w-3.5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Instagram className="h-3.5 w-3.5" />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.57a8.16 8.16 0 004.77 1.52V6.65a4.85 4.85 0 01-1-.04z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="bg-white border-b border-[#E2DDD6] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-[108px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center no-underline shrink-0">
            <img
              src="https://customer-assets.emergentagent.com/job_kiwi-credit-calc/artifacts/79s0uoxb_logo2_corectr.png"
              alt="FinExperts"
              className="h-[100px] w-auto"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.display = "none";
                img.nextElementSibling?.classList.remove("hidden");
              }}
            />
            <div className="hidden flex-col">
              <span className="text-[22px] font-bold text-[#0A1A2E] leading-tight">FinExperts</span>
              <span className="text-[9px] text-[#5A6478] tracking-wider uppercase">partener KIWI Finance</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 text-[15px] font-medium rounded-md transition-colors ${
                  isActive(link.href)
                    ? "text-[#0D1F3C] font-semibold border-b-2 border-[#B8944F]"
                    : "text-[#64748B] hover:text-[#0D1F3C]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 border border-[#E2DDD6] hover:border-[#0D1F3C] px-3 py-2 rounded-lg transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-[#0D1F3C] flex items-center justify-center text-white text-[9px] font-bold">
                    {initials}
                  </div>
                  <span className="text-sm font-medium text-[#0D1F3C]">{user?.name?.split(" ")[0]}</span>
                  {isAdmin && <span className="text-[9px] font-bold text-[#B8944F] uppercase bg-[#B8944F]/15 px-1.5 py-0.5 rounded">Admin</span>}
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-[#E2DDD6] rounded-xl shadow-lg py-1 z-50">
                    {isAdmin && (
                      <Link href="/admin" onClick={() => setUserMenuOpen(false)}>
                        <div className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#0D1F3C] hover:bg-[#F8F7F4] cursor-pointer">
                          <Settings className="h-4 w-4 text-[#B8944F]" /> Panou admin
                        </div>
                      </Link>
                    )}
                    <Link href="/cont" onClick={() => setUserMenuOpen(false)}>
                      <div className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#0D1F3C] hover:bg-[#F8F7F4] cursor-pointer">
                        <User className="h-4 w-4" /> Contul meu
                      </div>
                    </Link>
                    <div className="border-t border-[#E2DDD6] my-1" />
                    <button onClick={() => { logout(); setUserMenuOpen(false); }} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 cursor-pointer">
                      <LogOut className="h-4 w-4" /> Deconectare
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 text-sm font-medium text-[#0D1F3C] border border-[#E2DDD6] hover:border-[#0D1F3C] px-4 py-2 rounded-lg transition-colors"
              >
                <LogIn className="h-4 w-4" />
                Conectare
              </Link>
            )}
            <Link
              href="/aplica"
              className="flex items-center text-sm font-semibold text-white bg-[#0D1F3C] hover:bg-[#162847] px-5 py-2 rounded-lg transition-colors shadow-sm"
            >
              Aplică acum
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-[#0D1F3C]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-[#E2DDD6] bg-[#F8F7F4] px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  isActive(link.href)
                    ? "bg-[#0D1F3C] text-white"
                    : "text-[#0D1F3C] hover:bg-[#E2DDD6]"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 flex gap-3">
              {isLoggedIn ? (
                <>
                  {isAdmin && (
                    <Link href="/admin" className="flex-1 text-center text-sm font-medium text-[#B8944F] border border-[#B8944F] px-4 py-2 rounded-lg" onClick={() => setMobileOpen(false)}>
                      Admin
                    </Link>
                  )}
                  <Link href="/cont" className="flex-1 text-center text-sm font-medium text-[#0D1F3C] border border-[#E2DDD6] px-4 py-2 rounded-lg" onClick={() => setMobileOpen(false)}>
                    Contul meu
                  </Link>
                </>
              ) : (
                <Link href="/login" className="flex-1 text-center text-sm font-medium text-[#0D1F3C] border border-[#E2DDD6] px-4 py-2 rounded-lg" onClick={() => setMobileOpen(false)}>
                  Conectare
                </Link>
              )}
              <Link href="/aplica" className="flex-1 text-center text-sm font-semibold text-white bg-[#0D1F3C] px-4 py-2 rounded-lg" onClick={() => setMobileOpen(false)}>
                Aplică acum
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
