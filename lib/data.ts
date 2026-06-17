// PILOTO DE DADOS REAIS — MEDICAMENTOS EUROFARMA
// Marcas, princípios ativos, indicações e restrições abaixo (campo "fabricante: Eurofarma")
// foram conferidos em 17/06/2026 contra bulas oficiais da Eurofarma para profissional de
// saúde (eurofarma.com.br/produtos/bulas/healthcare e bulário consultado via fontes que
// reproduzem o conteúdo da bula oficial da ANVISA). Texto parafraseado, não copiado.
// Cobre 4 especialidades como amostra representativa do portfólio Eurofarma — não é uma
// cobertura completa de "todos os prognósticos". Mesmo validado contra bula real, este
// piloto NÃO passou pela revisão farmacêutica/versionamento descritos na arquitetura
// original e não deve ser usado para decisão clínica real.
export const DOCTOR = { nome: "Dra. Camila Andrade", crm: "CRM/SP 154.872" };

export const ESPECIALIDADES = ["Cardiologia", "Psiquiatria", "Ginecologia", "Clínica Médica"];

export const COMORBIDADES_OPCOES = [
  "Diabetes tipo 2",
  "Insuficiência cardíaca",
  "Doença renal crônica",
  "Tabagismo",
  "Gestante",
];

export type Opcao = {
  nome: string;
  principioAtivo: string;
  classe: string;
  score: number;
  fabricante: "Eurofarma" | "Outro";
  vantagens: string[];
  limitacoes: string[];
  evidencia: string;
  pacienteIdeal: string;
};

export const DRUGS_DB: Record<string, { especialidade: string; opcoes: Opcao[] }> = {
  "hipertensão arterial": {
    especialidade: "Cardiologia",
    opcoes: [
      {
        nome: "Zart",
        principioAtivo: "Losartana potássica",
        classe: "BRA",
        score: 92,
        fabricante: "Eurofarma",
        vantagens: [
          "Proteção renal documentada em diabéticos tipo 2 com proteinúria (retarda progressão da doença renal)",
          "Redução do risco cardiovascular em hipertensos com hipertrofia ventricular esquerda",
          "Pode ser usado em insuficiência cardíaca quando IECA não é mais adequado",
        ],
        limitacoes: ["Contraindicado na gestação (categoria D) e na lactação"],
        evidencia: "Bula Eurofarma para profissional de saúde (Zart)",
        pacienteIdeal: "HAS com DM2 e proteinúria, ou HAS com hipertrofia ventricular esquerda",
      },
      {
        nome: "Holmes",
        principioAtivo: "Olmesartana medoxomila",
        classe: "BRA",
        score: 85,
        fabricante: "Eurofarma",
        vantagens: [
          "Efeito anti-hipertensivo mantido em tratamentos de um ano ou mais, sem taquifilaxia nem efeito rebote",
          "Eficácia semelhante em ambos os sexos e em idosos acima de 65 anos",
        ],
        limitacoes: [
          "Contraindicado na gestação",
          "Contraindicado em insuficiência renal grave (clearance < 30 mL/min) ou anúria",
          "Associação com alisquireno contraindicada em diabéticos",
        ],
        evidencia: "Bula Eurofarma para profissional de saúde (Holmes)",
        pacienteIdeal: "HAS em monoterapia, sem necessidade de associação inicial",
      },
      {
        nome: "Vartaz",
        principioAtivo: "Valsartana",
        classe: "BRA",
        score: 82,
        fabricante: "Eurofarma",
        vantagens: [
          "Não requer ajuste de dose em disfunção renal ou em insuficiência hepática não biliar sem colestase",
          "Indicado também para insuficiência cardíaca (NYHA II-IV) e pós-infarto do miocárdio",
          "Reduz hospitalização por insuficiência cardíaca",
        ],
        limitacoes: ["Dose máxima diária de 320 mg", "Não aprovado para menores de 18 anos no Brasil"],
        evidencia: "Bula Eurofarma para profissional de saúde (Vartaz)",
        pacienteIdeal: "HAS associada a insuficiência cardíaca ou pós-infarto, sobretudo com função renal/hepática alterada",
      },
    ],
  },
  "depressão maior": {
    especialidade: "Psiquiatria",
    opcoes: [
      {
        nome: "Desve",
        principioAtivo: "Succinato de desvenlafaxina monoidratado",
        classe: "IRSN",
        score: 90,
        fabricante: "Eurofarma",
        vantagens: [
          "Mecanismo dual: aumenta a disponibilidade de serotonina e noradrenalina",
          "Indicado especificamente para transtorno depressivo maior (TDM)",
        ],
        limitacoes: [
          "Não indicado para população pediátrica",
          "Contraindicado com IMAO (intervalo mínimo de 14 dias) ou uso concomitante de venlafaxina",
          "Categoria de risco C na gravidez",
        ],
        evidencia: "Bula Eurofarma para profissional de saúde (Desve)",
        pacienteIdeal: "Depressão maior em adultos, sem uso concomitante de IMAO",
      },
      {
        nome: "Lexapro",
        principioAtivo: "Escitalopram",
        classe: "ISRS",
        score: 84,
        fabricante: "Outro",
        vantagens: ["Excelente tolerabilidade", "Forte ação ansiolítica"],
        limitacoes: ["Pode causar disfunção sexual", "Menor efeito sobre energia/fadiga"],
        evidencia: "Meta-análise Cipriani 2018",
        pacienteIdeal: "Depressão com ansiedade associada",
      },
    ],
  },
  "anticoncepção em tabagista": {
    especialidade: "Ginecologia",
    opcoes: [
      {
        nome: "Desogestrel (Eurofarma)",
        principioAtivo: "Desogestrel 75 mcg",
        classe: "Progestágeno isolado",
        score: 90,
        fabricante: "Eurofarma",
        vantagens: [
          "Sem estrogênio na fórmula — opção considerada em tabagistas",
          "Uso contínuo, sem pausa entre cartelas",
        ],
        limitacoes: ["Pode causar sangramento irregular", "Contraindicado em histórico de trombose ou doença hepática grave"],
        evidencia: "Bula Eurofarma para profissional de saúde (Desogestrel 75 mcg)",
        pacienteIdeal: "Tabagista ou contraindicação ao uso de estrogênio",
      },
      {
        nome: "Drospirenona + Etinilestradiol (Eurofarma)",
        principioAtivo: "Drospirenona + etinilestradiol",
        classe: "Combinado (estrogênio)",
        score: 38,
        fabricante: "Eurofarma",
        vantagens: ["Bom controle de ciclo menstrual", "Pode reduzir sintomas de acne e retenção hídrica"],
        limitacoes: ["Contém estrogênio — maior risco trombótico em tabagistas, sobretudo acima de 35 anos"],
        evidencia: "Bula Eurofarma para profissional de saúde (Drospirenona + Etinilestradiol)",
        pacienteIdeal: "Não é a primeira escolha para este perfil de paciente (tabagista)",
      },
    ],
  },
  "síndrome gripal": {
    especialidade: "Clínica Médica",
    opcoes: [
      {
        nome: "Dualgi (Eurofarma)",
        principioAtivo: "Ibuprofeno + paracetamol",
        classe: "Analgésico/antitérmico combinado",
        score: 75,
        fabricante: "Eurofarma",
        vantagens: ["Combinação analgésica e antitérmica para o componente de dor e febre do quadro gripal", "Indicado para terapias de curta duração"],
        limitacoes: ["Não possui ação descongestionante", "Cautela em pacientes com risco gastrointestinal (componente AINE)"],
        evidencia: "Bula Eurofarma para profissional de saúde (Dualgi)",
        pacienteIdeal: "Adultos com dor e febre associadas a quadros gripais, sem contraindicação a AINE",
      },
      {
        nome: "Paracetamol (genérico)",
        principioAtivo: "Paracetamol",
        classe: "Analgésico/antipirético",
        score: 80,
        fabricante: "Outro",
        vantagens: ["Posologia simples", "Seguro em hipertensos"],
        limitacoes: ["Sem ação descongestionante"],
        evidencia: "Diretriz de manejo sintomático",
        pacienteIdeal: "Hipertensos ou necessidade de simplicidade posológica",
      },
    ],
  },
};

export const PROTOCOLOS = [
  { especialidade: "Cardiologia", titulo: "HAS em pacientes diabéticos", texto: "Preferência por BRA com proteção renal documentada; evitar diuréticos tiazídicos em altas doses por risco metabólico." },
  { especialidade: "Psiquiatria", titulo: "Depressão maior com fadiga proeminente", texto: "Considerar antidepressivos de ação dual (IRSN) antes de ISRS puro quando fadiga é sintoma central." },
  { especialidade: "Ginecologia", titulo: "Anticoncepção em tabagista", texto: "Evitar métodos combinados com estrogênio em tabagistas, especialmente acima de 35 anos, pelo risco trombótico." },
  { especialidade: "Clínica Médica", titulo: "Síndrome gripal", texto: "Manejo sintomático conservador; atenção a sinais de alarme e a comorbidades cardiovasculares antes de associar descongestionantes." },
];

export const INTERACOES_DB = [
  { par: ["Losartana", "Espironolactona"], severidade: "alerta", msg: "Risco de hipercalemia — monitorar potássio sérico." },
  { par: ["Desvenlafaxina", "Tramadol"], severidade: "bloqueante", msg: "Risco de síndrome serotoninérgica — combinação não recomendada." },
  { par: ["Escitalopram", "Tramadol"], severidade: "bloqueante", msg: "Risco de síndrome serotoninérgica." },
  { par: ["Olmesartana", "Lítio"], severidade: "alerta", msg: "BRA pode aumentar níveis séricos de lítio — monitorar." },
];

export const TODOS_PRINCIPIOS = Array.from(
  new Set([
    ...Object.values(DRUGS_DB).flatMap((d) => d.opcoes.map((o) => o.principioAtivo.split(" (")[0].split(" +")[0])),
    "Espironolactona",
    "Tramadol",
    "Lítio",
  ])
).sort();

export type HistoricoItem = {
  id: number;
  data: string;
  paciente: string;
  diagnostico: string;
  medicamento: string;
  medico: string;
};

export const HISTORICO_INICIAL: HistoricoItem[] = [
  { id: 1, data: "12/06/2026", paciente: "J.M.S.", diagnostico: "Hipertensão arterial", medicamento: "Zart", medico: DOCTOR.nome },
  { id: 2, data: "10/06/2026", paciente: "A.P.O.", diagnostico: "Depressão maior", medicamento: "Desve", medico: DOCTOR.nome },
  { id: 3, data: "05/06/2026", paciente: "R.T.L.", diagnostico: "Síndrome gripal", medicamento: "Paracetamol (genérico)", medico: DOCTOR.nome },
];
