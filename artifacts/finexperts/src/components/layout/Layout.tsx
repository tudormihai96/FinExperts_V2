import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CookieConsent from "../ui/CookieConsent";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground font-sans">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
