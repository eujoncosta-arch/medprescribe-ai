"use client";

import { useState } from "react";
import { ShieldAlert } from "lucide-react";
import { INTERACOES_DB, TODOS_PRINCIPIOS } from "@/lib/data";
import { Card, PrimaryButton } from "@/components/ui";

export default function InteracoesPage() {
  const [selecionados, setSelecionados] = useState<string[]>([]);
  const [resultados, setResultados] = useState<typeof INTERACOES_DB | null>(null);

  function toggle(item: string) {
    setSelecionados((s) => (s.includes(item) ? s.filter((x) => x !== item) : [...s, item]));
    setResultados(null);
  }

  function verificar() {
    const encontradas = INTERACOES_DB.filter((i) => i.par.every((p) => selecionados.includes(p)));
    setResultados(encontradas);
  }

  return (
    <div className="p-6 max-w-2xl">
      <h2 className="font-serif text-base text-slate-900 mb-1">Verificador de interações medicamentosas</h2>
      <p className="text-xs text-slate-500 mb-4">Selecione dois ou mais princípios ativos para verificar interações cadastradas no MVP.</p>
      <Card>
        <div className="flex gap-2 flex-wrap mb-4">
          {TODOS_PRINCIPIOS.map((p) => (
            <button
              key={p}
              onClick={() => toggle(p)}
              className={`text-xs px-2 py-1 rounded border ${
                selecionados.includes(p) ? "bg-teal-700 text-white border-teal-700" : "border-slate-300 text-slate-600"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        <PrimaryButton disabled={selecionados.length < 2} onClick={verificar}>
          Verificar interações
        </PrimaryButton>

        {resultados !== null && (
          <div className="mt-4 space-y-2">
            {resultados.length === 0 && (
              <p className="text-sm text-slate-500">Nenhuma interação relevante encontrada na base do MVP entre os itens selecionados.</p>
            )}
            {resultados.map((r, i) => (
              <div
                key={i}
                className={`text-sm rounded px-3 py-2 flex items-start gap-2 ${
                  r.severidade === "bloqueante" ? "bg-rose-50 text-rose-800" : "bg-orange-50 text-orange-800"
                }`}
              >
                <ShieldAlert size={16} className="mt-0.5 shrink-0" />
                <span>
                  <strong>{r.par.join(" + ")}</strong> — {r.msg}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
