import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { banks } from "@/lib/data";

const stepOneSchema = z.object({
  tipCredit: z.string().min(1, "Selectează tipul creditului"),
  suma: z.string().min(1, "Introdu suma"),
  perioada: z.string().min(1, "Selectează perioada"),
});

const stepTwoSchema = z.object({
  venitNet: z.string().min(1, "Introdu venitul net"),
  angajator: z.string().min(2, "Introdu angajatorul"),
  tipVenit: z.string().min(1, "Selectează tipul venitului"),
});

const stepThreeSchema = z.object({
  bancaPreferata: z.string().optional(),
  nume: z.string().min(2, "Introdu numele complet"),
  email: z.string().email("Email invalid"),
  telefon: z.string().min(10, "Telefon invalid"),
});

type Step1 = z.infer<typeof stepOneSchema>;
type Step2 = z.infer<typeof stepTwoSchema>;
type Step3 = z.infer<typeof stepThreeSchema>;

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<Partial<Step1 & Step2 & Step3>>({});
  const { toast } = useToast();

  const step1 = useForm<Step1>({ resolver: zodResolver(stepOneSchema), defaultValues: formData });
  const step2 = useForm<Step2>({ resolver: zodResolver(stepTwoSchema), defaultValues: formData });
  const step3 = useForm<Step3>({ resolver: zodResolver(stepThreeSchema), defaultValues: formData });

  const onStep1 = (data: Step1) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStep(2);
  };

  const onStep2 = (data: Step2) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStep(3);
  };

  const onStep3 = (data: Step3) => {
    setFormData(prev => ({ ...prev, ...data }));
    setSubmitted(true);
    toast({ title: "Aplicarea a fost trimisă cu succes!", description: "Te vom contacta în maxim 24h." });
  };

  const steps = [
    { n: 1, label: "Tip credit" },
    { n: 2, label: "Venituri" },
    { n: 3, label: "Date contact" },
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F7F4EC] flex items-center justify-center">
        <div className="bg-white border border-[#E5E3D9] rounded-xl p-12 text-center max-w-md mx-auto">
          <CheckCircle className="h-16 w-16 text-[#2E7D5B] mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-[#0A1A2E] mb-3">Aplicarea a fost trimisă!</h2>
          <p className="text-[#5A6478] mb-6">Un consultant FinExperts te va contacta în maxim 24h pentru a te ghida în procesul de aprobare.</p>
          <div className="text-xs text-[#5A6478] bg-[#F7F4EC] rounded-lg p-4 mb-6">
            Aplicarea este gratuită și fără obligații.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F4EC]">
      <div className="bg-[#0A1A2E] py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Aplică credit</h1>
          <p className="text-gray-300">Completezi datele o singură dată. Noi ne ocupăm să obținem oferta de la banca aleasă sau de la cea mai avantajoasă pentru profilul tău.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="flex items-center gap-2 mb-10">
          {steps.map((s, i) => (
            <div key={s.n} className="flex items-center gap-2 flex-1">
              <div className={`flex items-center gap-2 ${step >= s.n ? "text-[#0A1A2E]" : "text-[#5A6478]"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${step > s.n ? "bg-[#2E7D5B] border-[#2E7D5B] text-white" : step === s.n ? "border-[#0A1A2E] text-[#0A1A2E]" : "border-[#E5E3D9] text-[#5A6478]"}`}>
                  {step > s.n ? "✓" : s.n}
                </div>
                <span className="text-sm font-medium hidden sm:block">{s.label}</span>
              </div>
              {i < steps.length - 1 && <div className={`flex-1 h-0.5 ${step > s.n ? "bg-[#2E7D5B]" : "bg-[#E5E3D9]"}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white border border-[#E5E3D9] rounded-xl p-8">
          {step === 1 && (
            <form onSubmit={step1.handleSubmit(onStep1)} className="space-y-6">
              <h2 className="text-xl font-bold text-[#0A1A2E] mb-6">Pasul 1: Tipul creditului</h2>

              <div>
                <Label className="text-sm font-semibold text-[#0A1A2E] mb-2 block">Tip credit</Label>
                <Select onValueChange={(v) => step1.setValue("tipCredit", v)} defaultValue={formData.tipCredit}>
                  <SelectTrigger data-testid="select-tip-credit" className="border-[#E5E3D9]">
                    <SelectValue placeholder="Selectează tipul creditului" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal">Credit de nevoi personale</SelectItem>
                    <SelectItem value="ipotecar">Credit ipotecar</SelectItem>
                  </SelectContent>
                </Select>
                {step1.formState.errors.tipCredit && <p className="text-[#C4432F] text-xs mt-1">{step1.formState.errors.tipCredit.message}</p>}
              </div>

              <div>
                <Label className="text-sm font-semibold text-[#0A1A2E] mb-2 block">Suma dorită (RON)</Label>
                <Input data-testid="input-suma" type="number" {...step1.register("suma")} placeholder="ex. 20000" className="border-[#E5E3D9]" />
                {step1.formState.errors.suma && <p className="text-[#C4432F] text-xs mt-1">{step1.formState.errors.suma.message}</p>}
              </div>

              <div>
                <Label className="text-sm font-semibold text-[#0A1A2E] mb-2 block">Perioada dorită</Label>
                <Select onValueChange={(v) => step1.setValue("perioada", v)} defaultValue={formData.perioada}>
                  <SelectTrigger data-testid="select-perioada" className="border-[#E5E3D9]">
                    <SelectValue placeholder="Selectează perioada" />
                  </SelectTrigger>
                  <SelectContent>
                    {[6, 12, 24, 36, 48, 60, 72, 84].map(m => (
                      <SelectItem key={m} value={String(m)}>{m} luni ({(m/12).toFixed(1)} ani)</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {step1.formState.errors.perioada && <p className="text-[#C4432F] text-xs mt-1">{step1.formState.errors.perioada.message}</p>}
              </div>

              <Button type="submit" data-testid="btn-step1-next" className="w-full bg-[#0A1A2E] hover:bg-[#132846] text-white font-bold h-12">
                Continuă <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={step2.handleSubmit(onStep2)} className="space-y-6">
              <h2 className="text-xl font-bold text-[#0A1A2E] mb-6">Pasul 2: Venituri</h2>

              <div>
                <Label className="text-sm font-semibold text-[#0A1A2E] mb-2 block">Venit net lunar (RON)</Label>
                <Input data-testid="input-venit-net" type="number" {...step2.register("venitNet")} placeholder="ex. 4500" className="border-[#E5E3D9]" />
                {step2.formState.errors.venitNet && <p className="text-[#C4432F] text-xs mt-1">{step2.formState.errors.venitNet.message}</p>}
              </div>

              <div>
                <Label className="text-sm font-semibold text-[#0A1A2E] mb-2 block">Angajator / Firmă</Label>
                <Input data-testid="input-angajator" {...step2.register("angajator")} placeholder="ex. SC Exemplu SRL" className="border-[#E5E3D9]" />
                {step2.formState.errors.angajator && <p className="text-[#C4432F] text-xs mt-1">{step2.formState.errors.angajator.message}</p>}
              </div>

              <div>
                <Label className="text-sm font-semibold text-[#0A1A2E] mb-2 block">Tip venit</Label>
                <Select onValueChange={(v) => step2.setValue("tipVenit", v)} defaultValue={formData.tipVenit}>
                  <SelectTrigger data-testid="select-tip-venit" className="border-[#E5E3D9]">
                    <SelectValue placeholder="Selectează tipul venitului" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salariu">Salariu angajat</SelectItem>
                    <SelectItem value="pfa">PFA / Liber profesionist</SelectItem>
                    <SelectItem value="dividende">Dividende</SelectItem>
                    <SelectItem value="pensie">Pensie</SelectItem>
                    <SelectItem value="chirii">Chirii</SelectItem>
                  </SelectContent>
                </Select>
                {step2.formState.errors.tipVenit && <p className="text-[#C4432F] text-xs mt-1">{step2.formState.errors.tipVenit.message}</p>}
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 border-[#E5E3D9]">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Înapoi
                </Button>
                <Button type="submit" data-testid="btn-step2-next" className="flex-1 bg-[#0A1A2E] hover:bg-[#132846] text-white font-bold">
                  Continuă <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={step3.handleSubmit(onStep3)} className="space-y-6">
              <h2 className="text-xl font-bold text-[#0A1A2E] mb-6">Pasul 3: Date contact</h2>

              <div>
                <Label className="text-sm font-semibold text-[#0A1A2E] mb-2 block">Banca preferată (opțional)</Label>
                <Select onValueChange={(v) => step3.setValue("bancaPreferata", v)} defaultValue={formData.bancaPreferata}>
                  <SelectTrigger data-testid="select-banca" className="border-[#E5E3D9]">
                    <SelectValue placeholder="Orice bancă / Nu știu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Orice bancă (cea mai bună ofertă)</SelectItem>
                    {banks.map(b => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-semibold text-[#0A1A2E] mb-2 block">Nume complet</Label>
                <Input data-testid="input-nume" {...step3.register("nume")} placeholder="Ion Popescu" className="border-[#E5E3D9]" />
                {step3.formState.errors.nume && <p className="text-[#C4432F] text-xs mt-1">{step3.formState.errors.nume.message}</p>}
              </div>

              <div>
                <Label className="text-sm font-semibold text-[#0A1A2E] mb-2 block">Email</Label>
                <Input data-testid="input-email" type="email" {...step3.register("email")} placeholder="ion@exemplu.ro" className="border-[#E5E3D9]" />
                {step3.formState.errors.email && <p className="text-[#C4432F] text-xs mt-1">{step3.formState.errors.email.message}</p>}
              </div>

              <div>
                <Label className="text-sm font-semibold text-[#0A1A2E] mb-2 block">Telefon</Label>
                <Input data-testid="input-telefon" type="tel" {...step3.register("telefon")} placeholder="07XX XXX XXX" className="border-[#E5E3D9]" />
                {step3.formState.errors.telefon && <p className="text-[#C4432F] text-xs mt-1">{step3.formState.errors.telefon.message}</p>}
              </div>

              <p className="text-xs text-[#5A6478] bg-[#F7F4EC] rounded-lg p-3">
                Aplicarea este gratuită și fără obligații. Datele tale sunt transmise criptat, doar către banca aleasă.
              </p>

              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1 border-[#E5E3D9]">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Înapoi
                </Button>
                <Button type="submit" data-testid="btn-submit" className="flex-1 bg-[#C6A667] hover:bg-[#b09255] text-[#0A1A2E] font-bold">
                  Trimite aplicarea
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
