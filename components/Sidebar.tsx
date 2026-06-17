"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FilePlus2, History, BookOpen, AlertTriangle, Star, LogOut, Stethoscope, Calculator } from "lucide-react";
import { useApp } from "@/lib/store";
import { ESPECIALIDADES } from "@/lib/data";

const ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/nova-prescricao", label: "Nova prescrição", icon: FilePlus2 },
  { href: "/historico", label: "Histórico", icon: History },
  { href: "/protocolos", label: "Protocolos", icon: BookOpen },
  { href: "/interacoes", label: "Interações", icon: AlertTriangle },
  { href: "/calculadoras", label: "Calculadoras", icon: Calculator },
  { href: "/favoritos", label: "Favoritos", icon: Star },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { especialidadeAtiva, setEspecialidadeAtiva, logout } = useApp();

  return (
    <div className="w-56 bg-slate-900 text-slate-200 flex flex-col shrink-0">
      <div className="flex items-center gap-2 px-4 py-4 border-b border-slate-800">
        <Stethoscope size={20} className="text-teal-400" />
        <span className="font-serif text-base text-white">MedPrescribe</span>
      </div>

      <div className="px-4 py-3 border-b border-slate-800">
        <label className="text-[11px] text-slate-400 block mb-1">Especialidade ativa</label>
        <select
          value={especialidadeAtiva}
          onChange={(e) => setEspecialidadeAtiva(e.target.value)}
          className="w-full bg-slate-800 text-slate-100 text-sm rounded px-2 py-1.5 border border-slate-700"
        >
          {ESPECIALIDADES.map((e) => (
            <option key={e}>{e}</option>
          ))}
        </select>
      </div>

      <nav className="flex-1 py-2">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                active ? "bg-slate-800 text-teal-400 border-r-2 border-teal-400" : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/login"
        onClick={logout}
        className="flex items-center gap-3 px-4 py-3 text-sm text-slate-400 hover:text-white border-t border-slate-800"
      >
        <LogOut size={16} /> Sair
      </Link>
    </div>
  );
}
