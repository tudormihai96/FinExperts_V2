import { Users } from "lucide-react";

interface FinExpertsLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "light" | "dark";
}

export function FinExpertsLogo({ size = "md", variant = "light" }: FinExpertsLogoProps) {
  const dark = variant === "dark";

  const cfg = {
    sm: { circle: "w-7 h-7", icon: "h-3.5 w-3.5", title: "text-[15px]", sub: "text-[7px]" },
    md: { circle: "w-9 h-9",  icon: "h-4 w-4",     title: "text-[18px]", sub: "text-[8px]" },
    lg: { circle: "w-11 h-11", icon: "h-5 w-5",    title: "text-[22px]", sub: "text-[9px]" },
    xl: { circle: "w-14 h-14", icon: "h-6 w-6",    title: "text-[28px]", sub: "text-[10px]" },
  }[size];

  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`${cfg.circle} rounded-full flex items-center justify-center shrink-0 shadow-sm ${
          dark ? "bg-white/15" : "bg-[#0B2E2E]"
        }`}
      >
        <Users className={`${cfg.icon} text-[#C49A20]`} />
      </div>
      <div className="flex flex-col leading-tight">
        <div>
          <span className={`${cfg.title} font-extrabold tracking-tight ${dark ? "text-white" : "text-[#0B2E2E]"}`}>
            Fin
          </span>
          <span className={`${cfg.title} font-extrabold tracking-tight text-[#C49A20]`}>Experts</span>
        </div>
        <span className={`${cfg.sub} uppercase tracking-widest font-semibold ${dark ? "text-gray-400" : "text-[#64748B]"}`}>
          Experți în credite
        </span>
      </div>
    </div>
  );
}
