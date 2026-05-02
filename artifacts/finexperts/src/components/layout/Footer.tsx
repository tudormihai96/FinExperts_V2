import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-[#0A1A2E] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex flex-col mb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[26px] font-bold text-white">FinExperts</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-semibold text-[#C6A667] uppercase tracking-wider">partener</span>
                <img src="https://www.kiwifinance.ro/wp-content/uploads/2022/02/Kiwi-Finance-Logo.png" alt="KIWI Finance" className="h-[14px] brightness-0 invert opacity-80" />
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              FinExperts — compară independent de credite, broker autorizat, partener oficial KIWI Finance. CUI înregistrat conform legii.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-[#C6A667]">Calculatoare</h4>
            <ul className="space-y-3">
              <li><Link href="/calculator" className="text-sm text-gray-300 hover:text-white transition-colors">Calculator credit de nevoi personale</Link></li>
              <li><Link href="/calculator" className="text-sm text-gray-300 hover:text-white transition-colors">Calculator credit ipotecar</Link></li>
              <li><Link href="/calculator/suma-maxima" className="text-sm text-gray-300 hover:text-white transition-colors">Calculator sumă maximă</Link></li>
              <li><Link href="/calculator/refinantare" className="text-sm text-gray-300 hover:text-white transition-colors">Calculator refinanțare</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-[#C6A667]">Bănci</h4>
            <ul className="space-y-3">
              <li><Link href="/banci/bcr" className="text-sm text-gray-300 hover:text-white transition-colors">Credit BCR</Link></li>
              <li><Link href="/banci/brd" className="text-sm text-gray-300 hover:text-white transition-colors">Credit BRD</Link></li>
              <li><Link href="/banci/ing" className="text-sm text-gray-300 hover:text-white transition-colors">Credit ING</Link></li>
              <li><Link href="/banci" className="text-sm text-gray-300 hover:text-white transition-colors">Toate băncile</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-[#C6A667]">Contact</h4>
            <ul className="space-y-3">
              <li className="text-sm text-gray-300">Email: contact@finexperts.ro</li>
              <li className="text-sm text-gray-300">Telefon: 031 000 0000</li>
              <li className="text-sm text-gray-300">Adresă: București, România</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} FinExperts. Toate drepturile rezervate.
        </div>
      </div>
    </footer>
  );
}
