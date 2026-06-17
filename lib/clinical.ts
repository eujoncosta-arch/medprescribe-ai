import { Opcao } from "./data";

export type Paciente = {
  idade: string;
  comorbidades: string[];
  alergias: string;
  funcaoRenal: string;
};

export type Alerta = { sever: "bloqueante" | "alerta"; msg: string };

export function getAlerts(opcao: Opcao, paciente: Paciente): Alerta[] {
  const alerts: Alerta[] = [];
  const alergiasLower = paciente.alergias.toLowerCase();
  const principioBase = opcao.principioAtivo.toLowerCase();

  if (paciente.comorbidades.includes("Gestante") && opcao.classe.includes("BRA")) {
    alerts.push({ sever: "bloqueante", msg: "Contraindicado na gestação (risco renal fetal documentado em bula)." });
  }
  if (paciente.comorbidades.includes("Tabagismo") && opcao.classe.includes("Combinado")) {
    alerts.push({ sever: "bloqueante", msg: "Risco trombótico aumentado em tabagistas — estrogênio combinado não recomendado." });
  }
  if (alergiasLower && principioBase.includes(alergiasLower.split(",")[0].trim())) {
    alerts.push({ sever: "bloqueante", msg: "Alergia relatada pelo paciente ao princípio ativo ou classe relacionada." });
  }
  if (paciente.funcaoRenal !== "Normal" && opcao.classe.includes("BRA")) {
    alerts.push({ sever: "alerta", msg: "Função renal alterada — verificar necessidade de ajuste de dose na bula." });
  }
  return alerts;
}

/**
 * Ranqueia por evidência clínica (score) primeiro. O filtro institucional,
 * quando ativo, reordena apenas as opções já aprovadas pela checagem de
 * segurança — nunca promove uma opção bloqueada para o topo.
 */
export function buildRanking(opcoes: Opcao[], paciente: Paciente, filtroInstitucional: boolean) {
  const comAlertas = opcoes.map((o) => ({ ...o, alerts: getAlerts(o, paciente) }));
  const bloqueadas = comAlertas.filter((o) => o.alerts.some((a) => a.sever === "bloqueante"));
  const permitidas = comAlertas.filter((o) => !o.alerts.some((a) => a.sever === "bloqueante"));

  let ranking = [...permitidas].sort((a, b) => b.score - a.score);
  if (filtroInstitucional) {
    const euro = ranking.filter((o) => o.fabricante === "Eurofarma");
    const outros = ranking.filter((o) => o.fabricante !== "Eurofarma");
    ranking = [...euro, ...outros];
  }
  return { ranking, bloqueadas };
}
