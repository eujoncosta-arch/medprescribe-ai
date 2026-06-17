"use client";

import React, { createContext, useContext, useState } from "react";
import { DOCTOR, HISTORICO_INICIAL, HistoricoItem } from "./data";

interface AppState {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  especialidadeAtiva: string;
  setEspecialidadeAtiva: (e: string) => void;
  historico: HistoricoItem[];
  salvarHistorico: (item: { diagnostico: string; medicamento: string }) => void;
  favoritos: string[];
  toggleFavorito: (nome: string) => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [especialidadeAtiva, setEspecialidadeAtiva] = useState("Cardiologia");
  const [historico, setHistorico] = useState<HistoricoItem[]>(HISTORICO_INICIAL);
  const [favoritos, setFavoritos] = useState<string[]>(["Zart", "Desve"]);

  function salvarHistorico({ diagnostico, medicamento }: { diagnostico: string; medicamento: string }) {
    setHistorico((h) => [
      {
        id: h.length + 1,
        data: new Date().toLocaleDateString("pt-BR"),
        paciente: `Paciente ${h.length + 1} (demo)`,
        diagnostico,
        medicamento,
        medico: DOCTOR.nome,
      },
      ...h,
    ]);
  }

  function toggleFavorito(nome: string) {
    setFavoritos((f) => (f.includes(nome) ? f.filter((x) => x !== nome) : [...f, nome]));
  }

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        login: () => setIsLoggedIn(true),
        logout: () => setIsLoggedIn(false),
        especialidadeAtiva,
        setEspecialidadeAtiva,
        historico,
        salvarHistorico,
        favoritos,
        toggleFavorito,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp precisa ser usado dentro de <AppProvider>");
  return ctx;
}
