// Fórmulas clínicas validadas e publicadas. Cada função é pura e determinística —
// nenhuma estimativa é gerada por IA; são equações e escores publicados.

export type CkdEpiInput = { creatinina: number; idade: number; sexo: "F" | "M" };
export function calcCkdEpi({ creatinina, idade, sexo }: CkdEpiInput) {
  if (!creatinina || !idade) return null;
  let egfr: number;
  if (sexo === "F") {
    egfr =
      creatinina <= 0.7
        ? 142 * Math.pow(creatinina / 0.7, -0.241) * Math.pow(0.9938, idade) * 1.012
        : 142 * Math.pow(creatinina / 0.7, -1.2) * Math.pow(0.9938, idade) * 1.012;
  } else {
    egfr =
      creatinina <= 0.9
        ? 142 * Math.pow(creatinina / 0.9, -0.302) * Math.pow(0.9938, idade)
        : 142 * Math.pow(creatinina / 0.9, -1.2) * Math.pow(0.9938, idade);
  }
  egfr = Math.round(egfr * 10) / 10;
  let estagio = "";
  if (egfr >= 90) estagio = "G1 — função renal normal";
  else if (egfr >= 60) estagio = "G2 — levemente reduzida";
  else if (egfr >= 45) estagio = "G3a — reduzida";
  else if (egfr >= 30) estagio = "G3b — moderadamente reduzida";
  else if (egfr >= 15) estagio = "G4 — severamente reduzida";
  else estagio = "G5 — falência renal";
  return { egfr, estagio };
}

export type Cha2ds2VascInput = {
  icc: boolean;
  hipertensao: boolean;
  idade75: boolean;
  diabetes: boolean;
  strokePrevio: boolean;
  doencaVascular: boolean;
  idade65a74: boolean;
  sexoFeminino: boolean;
};
export function calcCha2ds2Vasc(i: Cha2ds2VascInput) {
  const score =
    (i.icc ? 1 : 0) +
    (i.hipertensao ? 1 : 0) +
    (i.idade75 ? 2 : 0) +
    (i.diabetes ? 1 : 0) +
    (i.strokePrevio ? 2 : 0) +
    (i.doencaVascular ? 1 : 0) +
    (i.idade65a74 ? 1 : 0) +
    (i.sexoFeminino ? 1 : 0);
  let interpretacao = "";
  if (score === 0) interpretacao = "Risco baixo — anticoagulação geralmente não indicada";
  else if (score === 1) interpretacao = "Risco intermediário — considerar anticoagulação conforme perfil do paciente";
  else interpretacao = "Risco elevado — anticoagulação geralmente indicada";
  return { score, interpretacao };
}

export type HasBledInput = {
  hipertensao: boolean;
  funcaoRenalAnormal: boolean;
  funcaoHepaticaAnormal: boolean;
  strokePrevio: boolean;
  sangramentoPrevio: boolean;
  inrLabil: boolean;
  idadeMaior65: boolean;
  drogas: boolean;
  alcool: boolean;
};
export function calcHasBled(i: HasBledInput) {
  const score =
    (i.hipertensao ? 1 : 0) +
    (i.funcaoRenalAnormal ? 1 : 0) +
    (i.funcaoHepaticaAnormal ? 1 : 0) +
    (i.strokePrevio ? 1 : 0) +
    (i.sangramentoPrevio ? 1 : 0) +
    (i.inrLabil ? 1 : 0) +
    (i.idadeMaior65 ? 1 : 0) +
    (i.drogas ? 1 : 0) +
    (i.alcool ? 1 : 0);
  const interpretacao =
    score >= 3
      ? "Risco alto de sangramento — reavaliar periodicamente e corrigir fatores modificáveis"
      : "Risco baixo a moderado de sangramento";
  return { score, interpretacao };
}

export type Curb65Input = {
  confusao: boolean;
  ureiaAlta: boolean;
  frAlta: boolean;
  paBaixa: boolean;
  idade65: boolean;
};
export function calcCurb65(i: Curb65Input) {
  const score =
    (i.confusao ? 1 : 0) + (i.ureiaAlta ? 1 : 0) + (i.frAlta ? 1 : 0) + (i.paBaixa ? 1 : 0) + (i.idade65 ? 1 : 0);
  let interpretacao = "";
  if (score <= 1) interpretacao = "Baixo risco — tratamento ambulatorial geralmente apropriado";
  else if (score === 2) interpretacao = "Risco intermediário — considerar internação ou observação supervisionada";
  else interpretacao = "Alto risco — considerar internação, avaliar necessidade de UTI";
  return { score, interpretacao };
}

export type WellsTvpInput = {
  cancerAtivo: boolean;
  paralisiaImobilizacao: boolean;
  repousoOuCirurgia: boolean;
  dorTrajetoVenoso: boolean;
  edemaMembroTodo: boolean;
  edemaPanturrilha: boolean;
  edemaDepressivel: boolean;
  veiasColaterais: boolean;
  tvpPrevia: boolean;
  diagnosticoAlternativo: boolean;
};
export function calcWellsTvp(i: WellsTvpInput) {
  const score =
    (i.cancerAtivo ? 1 : 0) +
    (i.paralisiaImobilizacao ? 1 : 0) +
    (i.repousoOuCirurgia ? 1 : 0) +
    (i.dorTrajetoVenoso ? 1 : 0) +
    (i.edemaMembroTodo ? 1 : 0) +
    (i.edemaPanturrilha ? 1 : 0) +
    (i.edemaDepressivel ? 1 : 0) +
    (i.veiasColaterais ? 1 : 0) +
    (i.tvpPrevia ? 1 : 0) +
    (i.diagnosticoAlternativo ? -2 : 0);
  let interpretacao = "";
  if (score <= 0) interpretacao = "Probabilidade baixa de TVP";
  else if (score <= 2) interpretacao = "Probabilidade moderada de TVP";
  else interpretacao = "Probabilidade alta de TVP";
  return { score, interpretacao };
}

export type WellsPeInput = {
  sinaisTvp: boolean;
  diagnosticoAlternativoMenosProvavel: boolean;
  fcAlta: boolean;
  imobilizacaoOuCirurgia: boolean;
  tvpTepPrevio: boolean;
  hemoptise: boolean;
  malignidade: boolean;
};
export function calcWellsPe(i: WellsPeInput) {
  const score =
    (i.sinaisTvp ? 3 : 0) +
    (i.diagnosticoAlternativoMenosProvavel ? 3 : 0) +
    (i.fcAlta ? 1.5 : 0) +
    (i.imobilizacaoOuCirurgia ? 1.5 : 0) +
    (i.tvpTepPrevio ? 1.5 : 0) +
    (i.hemoptise ? 1 : 0) +
    (i.malignidade ? 1 : 0);
  let interpretacao = "";
  if (score < 2) interpretacao = "Probabilidade baixa de TEP";
  else if (score <= 6) interpretacao = "Probabilidade moderada de TEP";
  else interpretacao = "Probabilidade alta de TEP";
  return { score, interpretacao };
}

export type ChildPughInput = {
  bilirrubina: "menor2" | "2a3" | "maior3";
  albumina: "maior35" | "28a35" | "menor28";
  inr: "menor1_7" | "1_7a2_3" | "maior2_3";
  ascite: "ausente" | "leve" | "moderadaGrave";
  encefalopatia: "ausente" | "grauI_II" | "grauIII_IV";
};
const CHILD_PUGH_POINTS: Record<string, number> = {
  menor2: 1,
  "2a3": 2,
  maior3: 3,
  maior35: 1,
  "28a35": 2,
  menor28: 3,
  menor1_7: 1,
  "1_7a2_3": 2,
  maior2_3: 3,
  ausente: 1,
  leve: 2,
  moderadaGrave: 3,
  grauI_II: 2,
  grauIII_IV: 3,
};
export function calcChildPugh(i: ChildPughInput) {
  const score =
    CHILD_PUGH_POINTS[i.bilirrubina] +
    CHILD_PUGH_POINTS[i.albumina] +
    CHILD_PUGH_POINTS[i.inr] +
    CHILD_PUGH_POINTS[i.ascite] +
    CHILD_PUGH_POINTS[i.encefalopatia];
  let classe = "";
  if (score <= 6) classe = "Classe A — doença compensada";
  else if (score <= 9) classe = "Classe B — comprometimento significativo";
  else classe = "Classe C — doença descompensada";
  return { score, classe };
}
