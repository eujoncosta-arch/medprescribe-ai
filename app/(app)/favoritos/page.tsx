"use client";

import { Star } from "lucide-react";
import { useApp } from "@/lib/store";
import { DRUGS_DB, Opcao } from "@/lib/data";
import { Card } from "@/components/ui";

export default function FavoritosPage() {
  const { favoritos, toggleFavorito } = useApp();
  const todos: Opcao[] = Array.from(new Map(Object.values(DRUGS_DB).flatMap((d) => d.opcoes).map((o) => [o.nome, o])).values());

  return (
    <div className="p-6">
      <h2 className="font-serif text-base text-slate-900 mb-4">Favoritos</h2>
      <div className="grid grid-cols-2 gap-3">
        {todos.map((o) => (
          <Card key={o.nome} className="flex items-start justify-between">
            <div>
              <p className="font-serif text-sm text-slate-900">{o.nome}</p>
              <p className="text-xs text-slate-500">{o.classe}</p>
            </div>
            <button onClick={() => toggleFavorito(o.nome)}>
              <Star size={18} className={favoritos.includes(o.nome) ? "fill-amber-500 text-amber-500" : "text-slate-300"} />
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
