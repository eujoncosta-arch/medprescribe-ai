"use client";

import { useApp } from "@/lib/store";
import { Card } from "@/components/ui";

export default function HistoricoPage() {
  const { historico } = useApp();

  return (
    <div className="p-6">
      <h2 className="font-serif text-base text-slate-900 mb-4">Histórico de prescrições</h2>
      <Card>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-slate-400 border-b border-slate-100">
              <th className="py-2">Data</th>
              <th className="py-2">Paciente</th>
              <th className="py-2">Diagnóstico</th>
              <th className="py-2">Medicamento</th>
              <th className="py-2">Médico</th>
            </tr>
          </thead>
          <tbody>
            {historico.map((h) => (
              <tr key={h.id} className="border-b border-slate-50 last:border-0">
                <td className="py-2 text-slate-500">{h.data}</td>
                <td className="py-2 text-slate-700">{h.paciente}</td>
                <td className="py-2 text-slate-700">{h.diagnostico}</td>
                <td className="py-2 text-slate-700" style={{ fontFamily: "ui-monospace, monospace" }}>
                  {h.medicamento}
                </td>
                <td className="py-2 text-slate-500">{h.medico}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
