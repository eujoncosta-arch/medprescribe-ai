"use client";

import { usePathname } from "next/navigation";
import { DOCTOR } from "@/lib/data";

const TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/nova-prescricao": "Nova prescrição",
  "/historico": "Histórico",
  "/protocolos": "Protocolos",
  "/interacoes": "Interações medicamentosas",
  "/favoritos": "Favoritos",
};

export default function TopBar() {
  const pathname = usePathname();
  const title = TITLES[pathname] ?? "MedPrescribe AI";

  return (
    <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3">
      <h1 className="font-serif text-lg text-slate-900">{title}</h1>
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-800 flex items-center justify-center text-xs font-medium">CA</div>
        <div>
          <p className="text-slate-800 leading-none">{DOCTOR.nome}</p>
          <p className="text-xs text-slate-400 leading-none mt-0.5">{DOCTOR.crm}</p>
        </div>
      </div>
    </div>
  );
}
