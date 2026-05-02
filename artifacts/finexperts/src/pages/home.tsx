import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Landmark, Coins, ArrowRightLeft, ShieldCheck, Briefcase, FileCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#0A1A2E] via-[#132846] to-[#0A1A2E] text-white pt-24 pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Calculează rata,<br />compară<br />toate băncile
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
            >
              Compară instant rata lunară pentru credit personal și ipotecar la 11 bănci din România. Date oficiale 2026.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Link href="/calculator" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-[#C6A667] hover:bg-[#b09255] text-[#0A1A2E] font-bold text-lg h-14 px-8">
                  Compară băncile
                </Button>
              </Link>
              <Link href="/articole" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-[#0A1A2E] font-medium text-lg h-14 px-8">
                  Ghiduri & articole
                </Button>
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm md:text-base font-medium text-gray-400"
            >
              <div className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-[#C6A667]" /> 100% independent</div>
              <div className="flex items-center gap-2"><FileCheck className="h-5 w-5 text-[#C6A667]" /> Brokeraj autorizat</div>
              <div className="flex items-center gap-2"><Landmark className="h-5 w-5 text-[#C6A667]" /> 11 bănci partenere</div>
              <div className="flex items-center gap-2"><Briefcase className="h-5 w-5 text-[#C6A667]" /> 30+ ani experiență</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="py-20 bg-[#F7F4EC]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-36">
            <Link href="/calculator">
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full border-none shadow-md">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-[#0A1A2E]/10 flex items-center justify-center mb-4 text-[#0A1A2E]">
                    <Calculator className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Calculator credit</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#5A6478]">Calculator personal și ipotecar</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/banci">
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full border-none shadow-md">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-[#0A1A2E]/10 flex items-center justify-center mb-4 text-[#0A1A2E]">
                    <Landmark className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Comparator bănci</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#5A6478]">11 bănci din România</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/calculator/suma-maxima">
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full border-none shadow-md">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-[#0A1A2E]/10 flex items-center justify-center mb-4 text-[#0A1A2E]">
                    <Coins className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Sumă maximă</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#5A6478]">Cât poți împrumuta</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/calculator/refinantare">
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full border-none shadow-md">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-[#0A1A2E]/10 flex items-center justify-center mb-4 text-[#0A1A2E]">
                    <ArrowRightLeft className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Refinanțare</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#5A6478]">Economisește la creditul actual</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* De ce FinExperts */}
      <section className="py-20 bg-white border-y border-[#E5E3D9]">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-center text-[#0A1A2E] mb-12">De ce FinExperts?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center px-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-[#C6A667]/20 flex items-center justify-center mb-6">
                <Briefcase className="h-8 w-8 text-[#C6A667]" />
              </div>
              <h3 className="text-xl font-bold text-[#0A1A2E] mb-3">Experiență reală în bănci</h3>
              <p className="text-[#5A6478]">Echipa FinExperts cumulează peste 30 de ani de experiență directă în BCR, BRD, ING, Raiffeisen.</p>
            </div>
            <div className="text-center px-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-[#C6A667]/20 flex items-center justify-center mb-6">
                <ShieldCheck className="h-8 w-8 text-[#C6A667]" />
              </div>
              <h3 className="text-xl font-bold text-[#0A1A2E] mb-3">100% independent</h3>
              <p className="text-[#5A6478]">Comparator independent de credite, broker autorizat.</p>
            </div>
            <div className="text-center px-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-[#C6A667]/20 flex items-center justify-center mb-6">
                <FileCheck className="h-8 w-8 text-[#C6A667]" />
              </div>
              <h3 className="text-xl font-bold text-[#0A1A2E] mb-3">Aplicare gratuită</h3>
              <p className="text-[#5A6478]">Completezi datele o singură dată. Noi ne ocupăm să obținem oferta.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Preview */}
      <section className="py-20 bg-[#F7F4EC]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-[#0A1A2E] mb-2">Ghiduri financiare</h2>
              <p className="text-[#5A6478]">Învață cum să iei cele mai bune decizii pentru banii tăi.</p>
            </div>
            <Link href="/articole" className="hidden md:block">
              <Button variant="outline" className="border-[#0A1A2E] text-[#0A1A2E]">Vezi toate articolele</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                <img src="https://images.unsplash.com/photo-1560518846-1ea118f29673?auto=format&fit=crop&q=80&w=800" alt="Credit ipotecar" className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-6">
                <div className="text-xs font-semibold text-[#C6A667] mb-2">CREDIT IPOTECAR</div>
                <h3 className="text-xl font-bold text-[#0A1A2E] mb-3 line-clamp-2">Ghid complet credit ipotecar 2026</h3>
                <p className="text-[#5A6478] mb-4 line-clamp-2">Află tot ce trebuie să știi înainte să îți cumperi o locuință prin credit ipotecar în acest an.</p>
                <Link href="/articole/credit-ipotecar-ghid-complet" className="text-[#0A1A2E] font-semibold hover:text-[#C6A667] flex items-center gap-1">Citește <ArrowRightLeft className="w-4 h-4" /></Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800" alt="DAE vs Dobanda" className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-6">
                <div className="text-xs font-semibold text-[#C6A667] mb-2">EDUCAȚIE FINANCIARĂ</div>
                <h3 className="text-xl font-bold text-[#0A1A2E] mb-3 line-clamp-2">DAE vs. dobânda nominală — ce trebuie să știi</h3>
                <p className="text-[#5A6478] mb-4 line-clamp-2">De ce dobânda din reclamă nu este costul real al creditului tău și cum să calculezi corect.</p>
                <Link href="/articole/dae-vs-dobanda-nominala" className="text-[#0A1A2E] font-semibold hover:text-[#C6A667] flex items-center gap-1">Citește <ArrowRightLeft className="w-4 h-4" /></Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800" alt="Refinantare" className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-6">
                <div className="text-xs font-semibold text-[#C6A667] mb-2">REFINANȚARE</div>
                <h3 className="text-xl font-bold text-[#0A1A2E] mb-3 line-clamp-2">Refinanțare credit — când are sens</h3>
                <p className="text-[#5A6478] mb-4 line-clamp-2">Calculează dacă scade suficient de mult rata pentru a acoperi costurile noii bănci.</p>
                <Link href="/articole/refinantare-credit-cand-are-sens" className="text-[#0A1A2E] font-semibold hover:text-[#C6A667] flex items-center gap-1">Citește <ArrowRightLeft className="w-4 h-4" /></Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
