"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { useApp } from "@/lib/store";
import { DRUGS_DB } from "@/lib/data";
import { Card, PrimaryButton } from "@/components/ui";

export default function DashboardPage() {
  const { especialidadeAtiva, historico } = useApp();

  return (
    <div className="p-6">
      <div className="bg-teal-50 border border-teal-100 rounded px-4 py-2 text-xs text-teal-800 mb-5 flex items-center gap-2">
        <ShieldCheck size={14} /> Ambiente de demonstração. Dados fictícios — não inserir informações reais de pacientes.
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-100 rounded-lg p-4">
          <p className="text-xs text-slate-500">Prescrições registradas</p>
          <p className="text-2xl font-medium text-slate-900 mt-1">{historico.length}</p>
        </div>
        <div className="bg-slate-100 rounded-lg p-4">
          <p className="text-xs text-slate-500">Especialidade ativa</p>
          <p className="text-2xl font-medium text-slate-900 mt-1">{especialidadeAtiva}</p>
        </div>
        <div className="bg-slate-100 rounded-lg p-4">
          <p className="text-xs text-slate-500">Diagnósticos cadastrados no MVP</p>
          <p className="text-2xl font-medium text-slate-900 mt-1">{Object.keys(DRUGS_DB).length}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <h2 className="font-serif text-base text-slate-900">Atividade recente</h2>
        <Link href="/nova-prescricao">
          <PrimaryButton>+ Nova prescrição</PrimaryButton>
        </Link>
      </div>

      <Card>
        {historico.slice(0, 4).map((h) => (
          <div key={h.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0 text-sm">
            <span className="text-slate-700">{h.diagnostico}</span>
            <span className="text-slate-500">{h.medicamento}</span>
            <span className="text-slate-400 text-xs">{h.data}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}
