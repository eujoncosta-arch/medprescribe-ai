"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useApp } from "@/lib/store";
import { PROTOCOLOS } from "@/lib/data";
import { Card } from "@/components/ui";

export default function ProtocolosPage() {
  const { especialidadeAtiva } = useApp();
  const [aberto, setAberto] = useState<string | null>(null);
  const filtrados = PROTOCOLOS.filter((p) => p.especialidade === especialidadeAtiva);

  return (
    <div className="p-6">
      <h2 className="font-serif text-base text-slate-900 mb-4">Protocolos — {especialidadeAtiva}</h2>
      {filtrados.length === 0 && <p className="text-sm text-slate-500">Nenhum protocolo cadastrado para esta especialidade no MVP.</p>}
      {filtrados.map((p) => (
        <Card key={p.titulo} className="mb-3">
          <button onClick={() => setAberto(aberto === p.titulo ? null : p.titulo)} className="flex items-center justify-between w-full text-left">
            <span className="font-serif text-sm text-slate-900">{p.titulo}</span>
            {aberto === p.titulo ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {aberto === p.titulo && <p className="text-sm text-slate-600 mt-2">{p.texto}</p>}
        </Card>
      ))}
    </div>
  );
}
