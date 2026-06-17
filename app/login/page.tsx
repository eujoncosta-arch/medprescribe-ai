"use client";

import { useRouter } from "next/navigation";
import { Stethoscope } from "lucide-react";
import { useApp } from "@/lib/store";
import { Card, PrimaryButton } from "@/components/ui";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useApp();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    login();
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Card className="w-full max-w-sm">
        <div className="flex items-center gap-2 mb-1">
          <Stethoscope size={22} className="text-teal-700" />
          <span className="font-serif text-lg text-slate-900">MedPrescribe AI</span>
        </div>
        <p className="text-xs text-slate-500 mb-5">
          Ambiente de demonstração — dados fictícios. Não substitui o julgamento clínico do médico.
        </p>
        <form onSubmit={handleLogin}>
          <label className="text-xs text-slate-600">E-mail institucional</label>
          <input
            defaultValue="camila.andrade@medprescribe.demo"
            className="w-full border border-slate-300 rounded px-3 py-2 text-sm mb-3 mt-1"
          />
          <label className="text-xs text-slate-600">Senha</label>
          <input
            type="password"
            defaultValue="demo123"
            className="w-full border border-slate-300 rounded px-3 py-2 text-sm mb-5 mt-1"
          />
          <PrimaryButton full>Entrar</PrimaryButton>
        </form>
      </Card>
    </div>
  );
}
