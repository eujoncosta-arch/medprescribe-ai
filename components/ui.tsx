"use client";

import React from "react";
import { Check, X } from "lucide-react";
import { Opcao } from "@/lib/data";

export function Badge({ children, tone = "slate" }: { children: React.ReactNode; tone?: "slate" | "teal" | "amber" | "rose" | "orange" }) {
  const tones: Record<string, string> = {
    slate: "bg-slate-100 text-slate-700",
    teal: "bg-teal-50 text-teal-800",
    amber: "bg-amber-50 text-amber-800",
    rose: "bg-rose-50 text-rose-800",
    orange: "bg-orange-50 text-orange-800",
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${tones[tone]}`}>{children}</span>;
}

export function PrimaryButton({
  children,
  onClick,
  disabled,
  full,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  full?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${full ? "w-full" : ""} bg-teal-700 hover:bg-teal-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-2 rounded transition-colors`}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, onClick, full }: { children: React.ReactNode; onClick?: () => void; full?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`${full ? "w-full" : ""} border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-medium px-4 py-2 rounded transition-colors`}
    >
      {children}
    </button>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-white border border-slate-200 rounded-lg p-5 ${className}`}>{children}</div>;
}

export function WhyThisChoice({ opcao }: { opcao: Opcao }) {
  return (
    <div style={{ borderLeft: "3px solid #B45309", borderRadius: 0 }} className="bg-amber-50 pl-4 pr-4 py-3 mt-3">
      <p className="text-xs uppercase tracking-wide text-amber-700 mb-1">anotação clínica</p>
      <h4 className="font-serif text-base text-amber-900 mb-2">Por que esta escolha?</h4>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-amber-800 font-medium mb-1 flex items-center gap-1">
            <Check size={14} /> Vantagens
          </p>
          <ul className="text-amber-900 space-y-1">
            {opcao.vantagens.map((v, i) => (
              <li key={i}>• {v}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-amber-800 font-medium mb-1 flex items-center gap-1">
            <X size={14} /> Limitações
          </p>
          <ul className="text-amber-900 space-y-1">
            {opcao.limitacoes.map((v, i) => (
              <li key={i}>• {v}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className="text-xs text-amber-700 mt-3">
        Nível de evidência: {opcao.evidencia} · Perfil ideal: {opcao.pacienteIdeal}
      </p>
    </div>
  );
}

export function Banner({ banner, onClose }: { banner: { tone: "sucesso" | "info"; msg: string } | null; onClose: () => void }) {
  if (!banner) return null;
  const tones: Record<string, string> = {
    sucesso: "bg-teal-50 border-teal-200 text-teal-800",
    info: "bg-slate-100 border-slate-200 text-slate-700",
  };
  return (
    <div className={`flex items-center justify-between border rounded px-4 py-2 text-sm mb-4 ${tones[banner.tone]}`}>
      <span>{banner.msg}</span>
      <button onClick={onClose} className="ml-3">
        <X size={14} />
      </button>
    </div>
  );
}
