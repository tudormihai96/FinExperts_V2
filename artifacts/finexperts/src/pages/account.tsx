import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-[#F7F4EC]">
      <div className="bg-[#0A1A2E] py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-2">Contul meu</h1>
          <p className="text-gray-300">Aici găsești toate aplicările tale de credit și asigurările solicitate.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="bg-white border border-[#E5E3D9] rounded-xl p-8">
          <h2 className="text-xl font-bold text-[#0A1A2E] mb-6">Aplicări credit</h2>
          <div data-testid="empty-applications" className="text-center py-16">
            <FileText className="h-16 w-16 text-[#E5E3D9] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#0A1A2E] mb-2">Nicio aplicare încă</h3>
            <p className="text-[#5A6478] mb-8">Aplică primul credit pentru a-l vedea aici.</p>
            <Link href="/aplicare-credit">
              <Button data-testid="btn-apply-first" className="bg-[#0A1A2E] hover:bg-[#132846] text-white font-bold">
                Aplică primul credit
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
