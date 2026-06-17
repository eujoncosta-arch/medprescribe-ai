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
        principioAtivo: "Olmesartana medoxomila (classe BRA)",
        classe: "BRA",
        score: 92,
        fabricante: "Eurofarma",
        vantagens: ["Proteção renal documentada", "Boa tolerabilidade", "Adequado para pacientes diabéticos"],
        limitacoes: ["Contraindicado na gestação"],
        evidencia: "Diretriz SBC 2024",
        pacienteIdeal: "HAS + DM2, sem insuficiência cardíaca",
      },
      {
        nome: "Holmes",
        principioAtivo: "Olmesartana",
        classe: "BRA",
        score: 88,
        fabricante: "Eurofarma",
        vantagens: ["Maior potência anti-hipertensiva", "Melhor resposta em HAS resistente"],
        limitacoes: ["Contraindicado na gestação", "Custo mais elevado"],
        evidencia: "Meta-análise 2022",
        pacienteIdeal: "HAS resistente a outros BRA",
      },
      {
        nome: "Micardis",
        principioAtivo: "Telmisartana",
        classe: "BRA",
        score: 85,
        fabricante: "Eurofarma",
        vantagens: ["Longa meia-vida", "Cobertura de 24h", "Benefício metabólico potencial"],
        limitacoes: ["Contraindicado na gestação", "Início de ação mais lento"],
        evidencia: "Estudo ONTARGET",
        pacienteIdeal: "Necessidade de cobertura anti-hipertensiva prolongada",
      },
    ],
  },
  "depressão maior": {
    especialidade: "Psiquiatria",
    opcoes: [
      {
        nome: "Desve",
        principioAtivo: "Desvenlafaxina",
        classe: "IRSN",
        score: 90,
        fabricante: "Eurofarma",
        vantagens: ["Ação dual (serotonina e noradrenalina)", "Pode melhorar fadiga/energia", "Menor sedação"],
        limitacoes: ["Risco de elevação da pressão arterial em doses altas"],
        evidencia: "Diretriz APA",
        pacienteIdeal: "Depressão com fadiga proeminente",
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
        nome: "Cerelle (exemplo)",
        principioAtivo: "Desogestrel",
        classe: "Progestágeno isolado",
        score: 90,
        fabricante: "Outro",
        vantagens: ["Sem estrogênio — seguro para tabagistas", "Baixo risco trombótico"],
        limitacoes: ["Pode causar sangramento irregular"],
        evidencia: "Critérios de elegibilidade OMS",
        pacienteIdeal: "Tabagista ou contraindicação a estrogênio",
      },
      {
        nome: "Followin (exemplo)",
        principioAtivo: "Drospirenona + etinilestradiol",
        classe: "Combinado (estrogênio)",
        score: 38,
        fabricante: "Eurofarma",
        vantagens: ["Bom controle de ciclo menstrual"],
        limitacoes: ["Contraindicado em tabagismo — risco trombótico aumentado"],
        evidencia: "Critério de elegibilidade OMS categoria 4",
        pacienteIdeal: "Não indicado para este perfil de paciente",
      },
    ],
  },
  "síndrome gripal": {
    especialidade: "Clínica Médica",
    opcoes: [
      {
        nome: "Resfenol (exemplo)",
        principioAtivo: "Paracetamol + fenilefrina",
        classe: "Analgésico/descongestionante",
        score: 75,
        fabricante: "Eurofarma",
        vantagens: ["Alívio sintomático rápido", "Boa tolerabilidade geral"],
        limitacoes: ["Cautela em hipertensos (fenilefrina)"],
        evidencia: "Diretriz de manejo sintomático",
        pacienteIdeal: "Adultos sem hipertensão descompensada",
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
  { par: ["Telmisartana", "Espironolactona"], severidade: "alerta", msg: "Risco de hipercalemia — monitorar potássio sérico." },
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
