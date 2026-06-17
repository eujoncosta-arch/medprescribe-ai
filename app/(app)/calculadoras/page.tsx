"use client";

import { useState } from "react";
import { Card, Badge } from "@/components/ui";
import {
  calcCkdEpi,
  calcCha2ds2Vasc,
  calcHasBled,
  calcCurb65,
  calcWellsTvp,
  calcWellsPe,
  calcChildPugh,
} from "@/lib/calculators";

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`text-left text-xs px-3 py-2 rounded border w-full mb-1.5 ${
        checked ? "bg-teal-700 text-white border-teal-700" : "border-slate-300 text-slate-600"
      }`}
    >
      {label}
    </button>
  );
}

function ResultBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-teal-50 border border-teal-100 text-teal-800 text-sm rounded px-3 py-2 mt-3">{children}</div>
  );
}

function CkdEpiCalc() {
  const [creatinina, setCreatinina] = useState("");
  const [idade, setIdade] = useState("");
  const [sexo, setSexo] = useState<"F" | "M">("F");
  const result = calcCkdEpi({ creatinina: parseFloat(creatinina), idade: parseFloat(idade), sexo });
  return (
    <Card className="mb-4">
      <h3 className="font-serif text-base text-slate-900 mb-1">CKD-EPI 2021</h3>
      <p className="text-xs text-slate-500 mb-3">Estimativa da taxa de filtração glomerular (equação sem variável de raça)</p>
      <div className="grid grid-cols-3 gap-3 mb-2">
        <div>
          <label className="text-xs text-slate-600">Creatinina (mg/dL)</label>
          <input value={creatinina} onChange={(e) => setCreatinina(e.target.value)} placeholder="ex.: 1.1" className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm mt-1" />
        </div>
        <div>
          <label className="text-xs text-slate-600">Idade</label>
          <input value={idade} onChange={(e) => setIdade(e.target.value)} placeholder="ex.: 58" className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm mt-1" />
        </div>
        <div>
          <label className="text-xs text-slate-600">Sexo</label>
          <select value={sexo} onChange={(e) => setSexo(e.target.value as "F" | "M")} className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm mt-1">
            <option value="F">Feminino</option>
            <option value="M">Masculino</option>
          </select>
        </div>
      </div>
      {result && (
        <ResultBadge>
          eGFR estimado: <strong>{result.egfr} mL/min/1.73m²</strong> — {result.estagio}
        </ResultBadge>
      )}
    </Card>
  );
}

function Cha2ds2VascCalc() {
  const [v, setV] = useState({
    icc: false,
    hipertensao: false,
    idade75: false,
    diabetes: false,
    strokePrevio: false,
    doencaVascular: false,
    idade65a74: false,
    sexoFeminino: false,
  });
  const r = calcCha2ds2Vasc(v);
  const toggle = (k: keyof typeof v) => setV((p) => ({ ...p, [k]: !p[k] }));
  return (
    <Card className="mb-4">
      <h3 className="font-serif text-base text-slate-900 mb-1">CHA₂DS₂-VASc</h3>
      <p className="text-xs text-slate-500 mb-3">Risco de AVC em fibrilação atrial não valvar</p>
      <div className="grid grid-cols-2 gap-1">
        <Toggle label="Insuficiência cardíaca / disfunção VE (1)" checked={v.icc} onChange={() => toggle("icc")} />
        <Toggle label="Hipertensão (1)" checked={v.hipertensao} onChange={() => toggle("hipertensao")} />
        <Toggle label="Idade ≥ 75 (2)" checked={v.idade75} onChange={() => toggle("idade75")} />
        <Toggle label="Diabetes (1)" checked={v.diabetes} onChange={() => toggle("diabetes")} />
        <Toggle label="Stroke/TIA/tromboembolismo prévio (2)" checked={v.strokePrevio} onChange={() => toggle("strokePrevio")} />
        <Toggle label="Doença vascular (1)" checked={v.doencaVascular} onChange={() => toggle("doencaVascular")} />
        <Toggle label="Idade 65–74 (1)" checked={v.idade65a74} onChange={() => toggle("idade65a74")} />
        <Toggle label="Sexo feminino (1)" checked={v.sexoFeminino} onChange={() => toggle("sexoFeminino")} />
      </div>
      <ResultBadge>
        Score: <strong>{r.score}</strong> — {r.interpretacao}
      </ResultBadge>
    </Card>
  );
}

function HasBledCalc() {
  const [v, setV] = useState({
    hipertensao: false,
    funcaoRenalAnormal: false,
    funcaoHepaticaAnormal: false,
    strokePrevio: false,
    sangramentoPrevio: false,
    inrLabil: false,
    idadeMaior65: false,
    drogas: false,
    alcool: false,
  });
  const r = calcHasBled(v);
  const toggle = (k: keyof typeof v) => setV((p) => ({ ...p, [k]: !p[k] }));
  return (
    <Card className="mb-4">
      <h3 className="font-serif text-base text-slate-900 mb-1">HAS-BLED</h3>
      <p className="text-xs text-slate-500 mb-3">Risco de sangramento em anticoagulação</p>
      <div className="grid grid-cols-2 gap-1">
        <Toggle label="Hipertensão (PAS > 160)" checked={v.hipertensao} onChange={() => toggle("hipertensao")} />
        <Toggle label="Função renal anormal" checked={v.funcaoRenalAnormal} onChange={() => toggle("funcaoRenalAnormal")} />
        <Toggle label="Função hepática anormal" checked={v.funcaoHepaticaAnormal} onChange={() => toggle("funcaoHepaticaAnormal")} />
        <Toggle label="Stroke prévio" checked={v.strokePrevio} onChange={() => toggle("strokePrevio")} />
        <Toggle label="Sangramento prévio ou predisposição" checked={v.sangramentoPrevio} onChange={() => toggle("sangramentoPrevio")} />
        <Toggle label="INR lábil" checked={v.inrLabil} onChange={() => toggle("inrLabil")} />
        <Toggle label="Idade > 65" checked={v.idadeMaior65} onChange={() => toggle("idadeMaior65")} />
        <Toggle label="Uso de antiplaquetários/AINEs" checked={v.drogas} onChange={() => toggle("drogas")} />
        <Toggle label="Uso abusivo de álcool" checked={v.alcool} onChange={() => toggle("alcool")} />
      </div>
      <ResultBadge>
        Score: <strong>{r.score}</strong> — {r.interpretacao}
      </ResultBadge>
    </Card>
  );
}

function Curb65Calc() {
  const [v, setV] = useState({ confusao: false, ureiaAlta: false, frAlta: false, paBaixa: false, idade65: false });
  const r = calcCurb65(v);
  const toggle = (k: keyof typeof v) => setV((p) => ({ ...p, [k]: !p[k] }));
  return (
    <Card className="mb-4">
      <h3 className="font-serif text-base text-slate-900 mb-1">CURB-65</h3>
      <p className="text-xs text-slate-500 mb-3">Gravidade de pneumonia adquirida na comunidade</p>
      <div className="grid grid-cols-2 gap-1">
        <Toggle label="Confusão mental" checked={v.confusao} onChange={() => toggle("confusao")} />
        <Toggle label="Ureia sérica > 42 mg/dL (~7 mmol/L)" checked={v.ureiaAlta} onChange={() => toggle("ureiaAlta")} />
        <Toggle label="Frequência respiratória ≥ 30/min" checked={v.frAlta} onChange={() => toggle("frAlta")} />
        <Toggle label="PA: PAS < 90 ou PAD ≤ 60" checked={v.paBaixa} onChange={() => toggle("paBaixa")} />
        <Toggle label="Idade ≥ 65" checked={v.idade65} onChange={() => toggle("idade65")} />
      </div>
      <ResultBadge>
        Score: <strong>{r.score}</strong> de 5 — {r.interpretacao}
      </ResultBadge>
    </Card>
  );
}

function WellsCalc() {
  const [modo, setModo] = useState<"tvp" | "tep">("tvp");
  const [tvp, setTvp] = useState({
    cancerAtivo: false,
    paralisiaImobilizacao: false,
    repousoOuCirurgia: false,
    dorTrajetoVenoso: false,
    edemaMembroTodo: false,
    edemaPanturrilha: false,
    edemaDepressivel: false,
    veiasColaterais: false,
    tvpPrevia: false,
    diagnosticoAlternativo: false,
  });
  const [pe, setPe] = useState({
    sinaisTvp: false,
    diagnosticoAlternativoMenosProvavel: false,
    fcAlta: false,
    imobilizacaoOuCirurgia: false,
    tvpTepPrevio: false,
    hemoptise: false,
    malignidade: false,
  });
  const rTvp = calcWellsTvp(tvp);
  const rPe = calcWellsPe(pe);
  const toggleTvp = (k: keyof typeof tvp) => setTvp((p) => ({ ...p, [k]: !p[k] }));
  const togglePe = (k: keyof typeof pe) => setPe((p) => ({ ...p, [k]: !p[k] }));

  return (
    <Card className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-serif text-base text-slate-900">Escore de Wells</h3>
        <div className="flex gap-1">
          <button onClick={() => setModo("tvp")} className={`text-xs px-2 py-1 rounded border ${modo === "tvp" ? "bg-teal-700 text-white border-teal-700" : "border-slate-300 text-slate-600"}`}>TVP</button>
          <button onClick={() => setModo("tep")} className={`text-xs px-2 py-1 rounded border ${modo === "tep" ? "bg-teal-700 text-white border-teal-700" : "border-slate-300 text-slate-600"}`}>TEP</button>
        </div>
      </div>
      <p className="text-xs text-slate-500 mb-3">Probabilidade clínica de trombose venosa profunda ou tromboembolismo pulmonar</p>

      {modo === "tvp" ? (
        <>
          <div className="grid grid-cols-2 gap-1">
            <Toggle label="Câncer ativo (1)" checked={tvp.cancerAtivo} onChange={() => toggleTvp("cancerAtivo")} />
            <Toggle label="Paralisia/imobilização de MMII (1)" checked={tvp.paralisiaImobilizacao} onChange={() => toggleTvp("paralisiaImobilizacao")} />
            <Toggle label="Repouso >3 dias ou cirurgia <12 sem (1)" checked={tvp.repousoOuCirurgia} onChange={() => toggleTvp("repousoOuCirurgia")} />
            <Toggle label="Dor no trajeto venoso profundo (1)" checked={tvp.dorTrajetoVenoso} onChange={() => toggleTvp("dorTrajetoVenoso")} />
            <Toggle label="Edema de todo o membro (1)" checked={tvp.edemaMembroTodo} onChange={() => toggleTvp("edemaMembroTodo")} />
            <Toggle label="Edema de panturrilha >3cm (1)" checked={tvp.edemaPanturrilha} onChange={() => toggleTvp("edemaPanturrilha")} />
            <Toggle label="Edema depressível maior (1)" checked={tvp.edemaDepressivel} onChange={() => toggleTvp("edemaDepressivel")} />
            <Toggle label="Veias colaterais superficiais (1)" checked={tvp.veiasColaterais} onChange={() => toggleTvp("veiasColaterais")} />
            <Toggle label="TVP prévia documentada (1)" checked={tvp.tvpPrevia} onChange={() => toggleTvp("tvpPrevia")} />
            <Toggle label="Diagnóstico alternativo tão provável (-2)" checked={tvp.diagnosticoAlternativo} onChange={() => toggleTvp("diagnosticoAlternativo")} />
          </div>
          <ResultBadge>
            Score: <strong>{rTvp.score}</strong> — {rTvp.interpretacao}
          </ResultBadge>
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-1">
            <Toggle label="Sinais clínicos de TVP (3)" checked={pe.sinaisTvp} onChange={() => togglePe("sinaisTvp")} />
            <Toggle label="Diagnóstico alternativo menos provável (3)" checked={pe.diagnosticoAlternativoMenosProvavel} onChange={() => togglePe("diagnosticoAlternativoMenosProvavel")} />
            <Toggle label="FC > 100 (1.5)" checked={pe.fcAlta} onChange={() => togglePe("fcAlta")} />
            <Toggle label="Imobilização ≥3 dias ou cirurgia 4 sem (1.5)" checked={pe.imobilizacaoOuCirurgia} onChange={() => togglePe("imobilizacaoOuCirurgia")} />
            <Toggle label="TVP/TEP prévio (1.5)" checked={pe.tvpTepPrevio} onChange={() => togglePe("tvpTepPrevio")} />
            <Toggle label="Hemoptise (1)" checked={pe.hemoptise} onChange={() => togglePe("hemoptise")} />
            <Toggle label="Malignidade ativa (1)" checked={pe.malignidade} onChange={() => togglePe("malignidade")} />
          </div>
          <ResultBadge>
            Score: <strong>{rPe.score}</strong> — {rPe.interpretacao}
          </ResultBadge>
        </>
      )}
    </Card>
  );
}

function ChildPughCalc() {
  const [v, setV] = useState<{
    bilirrubina: "menor2" | "2a3" | "maior3";
    albumina: "maior35" | "28a35" | "menor28";
    inr: "menor1_7" | "1_7a2_3" | "maior2_3";
    ascite: "ausente" | "leve" | "moderadaGrave";
    encefalopatia: "ausente" | "grauI_II" | "grauIII_IV";
  }>({ bilirrubina: "menor2", albumina: "maior35", inr: "menor1_7", ascite: "ausente", encefalopatia: "ausente" });
  const r = calcChildPugh(v);
  return (
    <Card className="mb-4">
      <h3 className="font-serif text-base text-slate-900 mb-1">Child-Pugh</h3>
      <p className="text-xs text-slate-500 mb-3">Gravidade de doença hepática crônica</p>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-slate-600">Bilirrubina total</label>
          <select value={v.bilirrubina} onChange={(e) => setV((p) => ({ ...p, bilirrubina: e.target.value as any }))} className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm mt-1">
            <option value="menor2">&lt; 2 mg/dL (1pt)</option>
            <option value="2a3">2–3 mg/dL (2pt)</option>
            <option value="maior3">&gt; 3 mg/dL (3pt)</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-slate-600">Albumina</label>
          <select value={v.albumina} onChange={(e) => setV((p) => ({ ...p, albumina: e.target.value as any }))} className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm mt-1">
            <option value="maior35">&gt; 3.5 g/dL (1pt)</option>
            <option value="28a35">2.8–3.5 g/dL (2pt)</option>
            <option value="menor28">&lt; 2.8 g/dL (3pt)</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-slate-600">INR</label>
          <select value={v.inr} onChange={(e) => setV((p) => ({ ...p, inr: e.target.value as any }))} className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm mt-1">
            <option value="menor1_7">&lt; 1.7 (1pt)</option>
            <option value="1_7a2_3">1.7–2.3 (2pt)</option>
            <option value="maior2_3">&gt; 2.3 (3pt)</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-slate-600">Ascite</label>
          <select value={v.ascite} onChange={(e) => setV((p) => ({ ...p, ascite: e.target.value as any }))} className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm mt-1">
            <option value="ausente">Ausente (1pt)</option>
            <option value="leve">Leve (2pt)</option>
            <option value="moderadaGrave">Moderada/grave (3pt)</option>
          </select>
        </div>
        <div className="col-span-2">
          <label className="text-xs text-slate-600">Encefalopatia hepática</label>
          <select value={v.encefalopatia} onChange={(e) => setV((p) => ({ ...p, encefalopatia: e.target.value as any }))} className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm mt-1">
            <option value="ausente">Ausente (1pt)</option>
            <option value="grauI_II">Grau I–II (2pt)</option>
            <option value="grauIII_IV">Grau III–IV (3pt)</option>
          </select>
        </div>
      </div>
      <ResultBadge>
        Score: <strong>{r.score}</strong> de 15 — {r.classe}
      </ResultBadge>
    </Card>
  );
}

export default function CalculadorasPage() {
  return (
    <div className="p-6 max-w-3xl">
      <div className="bg-slate-100 rounded px-4 py-2 text-xs text-slate-600 mb-5">
        Fórmulas e escores publicados e validados na literatura — nenhum valor aqui é gerado ou estimado por IA.
      </div>
      <CkdEpiCalc />
      <Cha2ds2VascCalc />
      <HasBledCalc />
      <Curb65Calc />
      <WellsCalc />
      <ChildPughCalc />
    </div>
  );
}
