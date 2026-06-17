"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Info, ShieldAlert } from "lucide-react";
import { useApp } from "@/lib/store";
import { DRUGS_DB, COMORBIDADES_OPCOES, DOCTOR, Opcao } from "@/lib/data";
import { buildRanking, Paciente } from "@/lib/clinical";
import { Card, Badge, PrimaryButton, SecondaryButton, Banner, WhyThisChoice } from "@/components/ui";

export default function NovaPrescricaoPage() {
  const { especialidadeAtiva, salvarHistorico } = useApp();

  const [step, setStep] = useState(1);
  const [diagnostico, setDiagnostico] = useState("");
  const [paciente, setPaciente] = useState<Paciente>({ idade: "", comorbidades: [], alergias: "", funcaoRenal: "Normal" });
  const [filtroInstitucional, setFiltroInstitucional] = useState(false);
  const [erroDiagnostico, setErroDiagnostico] = useState("");
  const [expandido, setExpandido] = useState<string | null>(null);
  const [selecionada, setSelecionada] = useState<Opcao | null>(null);
  const [banner, setBanner] = useState<{ tone: "sucesso" | "info"; msg: string } | null>(null);

  const diagnosticosDisponiveis = Object.entries(DRUGS_DB)
    .filter(([, v]) => v.especialidade === especialidadeAtiva)
    .map(([k]) => k);

  function toggleComorbidade(c: string) {
    setPaciente((p) => ({
      ...p,
      comorbidades: p.comorbidades.includes(c) ? p.comorbidades.filter((x) => x !== c) : [...p.comorbidades, c],
    }));
  }

  function gerarSugestao() {
    const key = diagnostico.trim().toLowerCase();
    if (!DRUGS_DB[key] || DRUGS_DB[key].especialidade !== especialidadeAtiva) {
      setErroDiagnostico(
        `Diagnóstico não cadastrado neste MVP para ${especialidadeAtiva}. Experimente: ${
          diagnosticosDisponiveis.join(", ") || "nenhum cadastrado nesta especialidade"
        }.`
      );
      return;
    }
    setErroDiagnostico("");
    setStep(2);
  }

  function confirmarSelecao(opcao: Opcao) {
    setSelecionada(opcao);
    setStep(3);
  }

  function salvar() {
    if (!selecionada) return;
    salvarHistorico({ diagnostico, medicamento: selecionada.nome });
    setBanner({ tone: "sucesso", msg: "Prescrição salva no histórico." });
    setStep(1);
    setDiagnostico("");
    setPaciente({ idade: "", comorbidades: [], alergias: "", funcaoRenal: "Normal" });
    setSelecionada(null);
  }

  const key = diagnostico.trim().toLowerCase();
  const { ranking, bloqueadas } = DRUGS_DB[key] ? buildRanking(DRUGS_DB[key].opcoes, paciente, filtroInstitucional) : { ranking: [], bloqueadas: [] };

  return (
    <div className="p-6 max-w-3xl">
      <Banner banner={banner} onClose={() => setBanner(null)} />

      <div className="flex items-center gap-3 mb-6 text-sm">
        {["Diagnóstico", "Sugestão e comparação", "Prescrever"].map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                step === i + 1 ? "bg-teal-700 text-white" : step > i + 1 ? "bg-teal-100 text-teal-800" : "bg-slate-100 text-slate-400"
              }`}
            >
              {i + 1}
            </div>
            <span className={step === i + 1 ? "text-slate-900" : "text-slate-400"}>{label}</span>
            {i < 2 && <div className="w-8 h-px bg-slate-200" />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <Card>
          <h2 className="font-serif text-base text-slate-900 mb-1">Diagnóstico e perfil do paciente</h2>
          <p className="text-xs text-slate-500 mb-4">Especialidade: {especialidadeAtiva}</p>

          <label className="text-xs text-slate-600">Diagnóstico</label>
          <input
            value={diagnostico}
            onChange={(e) => setDiagnostico(e.target.value)}
            placeholder="ex.: hipertensão arterial"
            className="w-full border border-slate-300 rounded px-3 py-2 text-sm mt-1 mb-2"
          />
          <div className="flex gap-2 flex-wrap mb-4">
            {diagnosticosDisponiveis.map((d) => (
              <button key={d} onClick={() => setDiagnostico(d)} className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-1 rounded">
                {d}
              </button>
            ))}
          </div>
          {erroDiagnostico && (
            <div className="bg-rose-50 text-rose-800 text-xs rounded px-3 py-2 mb-4 flex items-start gap-2">
              <Info size={14} className="mt-0.5 shrink-0" /> {erroDiagnostico}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs text-slate-600">Idade</label>
              <input
                value={paciente.idade}
                onChange={(e) => setPaciente((p) => ({ ...p, idade: e.target.value }))}
                placeholder="ex.: 58"
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm mt-1"
              />
            </div>
            <div>
              <label className="text-xs text-slate-600">Função renal</label>
              <select
                value={paciente.funcaoRenal}
                onChange={(e) => setPaciente((p) => ({ ...p, funcaoRenal: e.target.value }))}
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm mt-1"
              >
                <option>Normal</option>
                <option>TFG 30–60</option>
                <option>TFG &lt;30</option>
              </select>
            </div>
          </div>

          <label className="text-xs text-slate-600 block mb-1">Comorbidades</label>
          <div className="flex gap-2 flex-wrap mb-4">
            {COMORBIDADES_OPCOES.map((c) => (
              <button
                key={c}
                onClick={() => toggleComorbidade(c)}
                className={`text-xs px-2 py-1 rounded border ${
                  paciente.comorbidades.includes(c) ? "bg-teal-700 text-white border-teal-700" : "border-slate-300 text-slate-600"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <label className="text-xs text-slate-600">Alergias relatadas</label>
          <input
            value={paciente.alergias}
            onChange={(e) => setPaciente((p) => ({ ...p, alergias: e.target.value }))}
            placeholder="ex.: olmesartana"
            className="w-full border border-slate-300 rounded px-3 py-2 text-sm mt-1 mb-5"
          />

          <PrimaryButton onClick={gerarSugestao}>Gerar sugestão terapêutica</PrimaryButton>
        </Card>
      )}

      {step === 2 && (
        <div>
          <div className="flex items-center justify-between bg-slate-100 rounded px-4 py-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={filtroInstitucional} onChange={(e) => setFiltroInstitucional(e.target.checked)} />
              Aplicar priorização institucional (parceria Eurofarma)
            </div>
            <Badge tone={filtroInstitucional ? "amber" : "slate"}>{filtroInstitucional ? "filtro ativo" : "filtro desligado"}</Badge>
          </div>
          {filtroInstitucional && (
            <div className="bg-amber-50 border border-amber-100 text-amber-800 text-xs rounded px-3 py-2 mb-4 flex items-start gap-2">
              <Info size={14} className="mt-0.5 shrink-0" />
              A ordem abaixo reflete política institucional, não o ranking de evidência clínica. Desligue o filtro para ver o ranking
              clínico puro.
            </div>
          )}

          {ranking.length === 0 && (
            <Card>
              <p className="text-sm text-slate-500">
                Todas as opções cadastradas para este diagnóstico foram bloqueadas para o perfil informado. Veja os motivos abaixo.
              </p>
            </Card>
          )}

          {ranking.map((opcao, idx) => (
            <Card key={opcao.nome} className={`mb-3 ${idx === 0 ? "border-teal-300" : ""}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    {idx === 0 && <Badge tone="teal">sugestão principal</Badge>}
                    <h3 className="font-serif text-base text-slate-900">{opcao.nome}</h3>
                    <Badge tone="slate">{opcao.classe}</Badge>
                    {opcao.fabricante === "Eurofarma" && <Badge tone="amber">Eurofarma</Badge>}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{opcao.principioAtivo}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">score de evidência</p>
                  <p className="text-lg font-medium text-slate-800">{opcao.score}</p>
                </div>
              </div>

              {opcao.alerts.length > 0 && (
                <div className="mt-3 space-y-1">
                  {opcao.alerts.map((a, i) => (
                    <div key={i} className="bg-orange-50 text-orange-800 text-xs rounded px-2 py-1.5 flex items-center gap-2">
                      <ShieldAlert size={14} /> {a.msg}
                    </div>
                  ))}
                </div>
              )}

              <button onClick={() => setExpandido(expandido === opcao.nome ? null : opcao.nome)} className="flex items-center gap-1 text-xs text-teal-700 mt-3">
                Por que essa escolha? {expandido === opcao.nome ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
              {expandido === opcao.nome && <WhyThisChoice opcao={opcao} />}

              <div className="mt-3">
                <PrimaryButton onClick={() => confirmarSelecao(opcao)}>Selecionar e continuar</PrimaryButton>
              </div>
            </Card>
          ))}

          {bloqueadas.length > 0 && (
            <Card className="bg-rose-50 border-rose-100">
              <p className="text-sm font-medium text-rose-800 mb-2">Opções contraindicadas para este paciente</p>
              {bloqueadas.map((o) => (
                <div key={o.nome} className="text-xs text-rose-700 mb-2">
                  <strong>{o.nome}</strong> — {o.alerts.map((a) => a.msg).join(" ")}
                </div>
              ))}
            </Card>
          )}

          <SecondaryButton onClick={() => setStep(1)}>Voltar</SecondaryButton>
        </div>
      )}

      {step === 3 && selecionada && (
        <Card>
          <h2 className="font-serif text-base text-slate-900 mb-3">Resumo da prescrição</h2>
          <table className="w-full text-sm mb-4">
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-1.5 text-slate-500">Diagnóstico</td>
                <td className="py-1.5 text-slate-800 text-right">{diagnostico}</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-1.5 text-slate-500">Medicamento selecionado</td>
                <td className="py-1.5 text-slate-800 text-right" style={{ fontFamily: "ui-monospace, monospace" }}>
                  {selecionada.nome}
                </td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-1.5 text-slate-500">Fonte / evidência</td>
                <td className="py-1.5 text-slate-800 text-right">{selecionada.evidencia}</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-1.5 text-slate-500">Médico responsável</td>
                <td className="py-1.5 text-slate-800 text-right">{DOCTOR.nome}</td>
              </tr>
              <tr>
                <td className="py-1.5 text-slate-500">Data</td>
                <td className="py-1.5 text-slate-800 text-right">{new Date().toLocaleDateString("pt-BR")}</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-slate-400 mb-4">Posologia exata e ajustes devem ser confirmados na bula vigente — este MVP não calcula doses.</p>
          <div className="flex gap-2">
            <PrimaryButton onClick={salvar}>Salvar no histórico</PrimaryButton>
            <SecondaryButton onClick={() => alert("Exportação de PDF disponível na versão completa do produto.")}>Exportar PDF</SecondaryButton>
          </div>
        </Card>
      )}
    </div>
  );
}
