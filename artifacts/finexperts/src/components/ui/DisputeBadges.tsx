export default function DisputeBadges() {
  return (
    <div className="mt-10 pt-8 border-t border-[#E2E8F0]">
      <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-5">
        Soluționarea litigiilor
      </p>
      <div className="flex flex-col sm:flex-row flex-wrap gap-3">

        {/* ANPC SAL */}
        <div className="flex items-center gap-3 border border-[#E2E8F0] rounded-xl px-4 py-3 bg-white shadow-sm min-w-[260px] flex-1">
          <img
            src="/logos/anpc-sal.png"
            alt="ANPC SAL"
            className="h-12 w-auto object-contain shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-[#0B2E2E] uppercase tracking-wide leading-tight">
              Soluționarea Alternativă<br />a Litigiilor
            </p>
          </div>
          <a
            href="https://anpc.ro/ce-este-sal/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-[#003DA5] hover:bg-[#002d7a] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors"
          >
            DETALII
          </a>
        </div>

        {/* CSALB */}
        <div className="flex items-center gap-3 border border-[#E2E8F0] rounded-xl px-4 py-3 bg-white shadow-sm min-w-[260px] flex-1">
          <img
            src="/logos/csalb.png"
            alt="CSALB — Centrul de Soluționare Alternativă a Litigiilor în domeniul Bancar"
            className="h-12 w-auto object-contain shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-[#0B2E2E] uppercase tracking-wide leading-tight">
              Centrul de Soluționare<br />Alternativă — Domeniu Bancar
            </p>
          </div>
          <a
            href="https://www.csalb.ro/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-[#003DA5] hover:bg-[#002d7a] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors"
          >
            DETALII
          </a>
        </div>

        {/* SOL — Soluționarea Online a Litigiilor */}
        <div className="flex items-center gap-3 border border-[#E2E8F0] rounded-xl px-4 py-3 bg-white shadow-sm min-w-[260px] flex-1">
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold text-[#0B2E2E] uppercase tracking-wide leading-tight">
              Soluționarea Online<br />a Litigiilor
            </p>
            <p className="text-[9px] text-[#64748B] mt-0.5">Platforma europeană ec.europa.eu/consumers/odr</p>
          </div>
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-[#003DA5] hover:bg-[#002d7a] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors"
          >
            DETALII
          </a>
        </div>

      </div>
    </div>
  );
}
