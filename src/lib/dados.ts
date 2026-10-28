// Números exatamente como saíram da execução do notebook do Colab.

export const BASE = {
  clientes: 240,
  colunas: 11,
  excedeDados: 64.2,
  excedeAlgum: 81.7,
  problemasGb: [
    { id: 20020, valor: "vazio" },
    { id: 20087, valor: "24 GB" },
    { id: 20176, valor: "não informado" },
  ],
  imputados: 2,
  medianaGb: 44.2,
};

export const DESCRITIVO = [
  { col: "Dados (GB)", media: 44.62, min: 11.3, mediana: 44.2, max: 77 },
  { col: "Minutos", media: 545.46, min: 340, mediana: 546, max: 762 },
  { col: "Streaming (h)", media: 15.93, min: 5.2, mediana: 15.8, max: 25.4 },
  { col: "Deslocamento (dias)", media: 5.22, min: 0, mediana: 5, max: 13 },
  { col: "Mensalidade (R$)", media: 90.63, min: 39.9, mediana: 92.4, max: 149.9 },
];

export const REGIAO = [
  { nome: "Rural", n: 88 },
  { nome: "Periférica", n: 88 },
  { nome: "Urbana", n: 64 },
];
export const IDADE = [
  { nome: "18-25", n: 67 },
  { nome: "26-40", n: 51 },
  { nome: "41-60", n: 57 },
  { nome: "60+", n: 65 },
];

export const RESUMO_PLANO = [
  { plano: "Essencial", clientes: 35, uso: 44.59, franquia: 8, excede: 100, risco: 1.0, preco: 39.9 },
  { plano: "Conecta", clientes: 25, uso: 43.96, franquia: 15, excede: 100, risco: 0.8, preco: 54.9 },
  { plano: "Flex", clientes: 30, uso: 45.97, franquia: 25, excede: 90, risco: 0.4, preco: 69.9 },
  { plano: "Digital", clientes: 30, uso: 42.19, franquia: 35, excede: 70, risco: 0.2, preco: 84.9 },
  { plano: "Streaming", clientes: 29, uso: 48.59, franquia: 40, excede: 72.41, risco: 0.28, preco: 99.9 },
  { plano: "Max", clientes: 25, uso: 43.82, franquia: 55, excede: 16, risco: 0.12, preco: 109.9 },
  { plano: "Viagem", clientes: 40, uso: 45.49, franquia: 45, excede: 52.5, risco: 0.25, preco: 119.9 },
  { plano: "Total", clientes: 26, uso: 41.53, franquia: 90, excede: 0, risco: 0.19, preco: 149.9 },
];

export type Exp = { rotulo: string; preco: number; insuf1: number; insufAlgum: number; insuf3: number; economiza: number; pagaMais: number };

export const H2: Exp[] = [
  { rotulo: "1", preco: 95.98, insuf1: 53.33, insufAlgum: 88.33, insuf3: 55.56, economiza: 40.83, pagaMais: 48.33 },
  { rotulo: "1,5", preco: 98.48, insuf1: 46.67, insufAlgum: 85.42, insuf3: 48.61, economiza: 38.75, pagaMais: 51.67 },
  { rotulo: "3", preco: 102.71, insuf1: 33.33, insufAlgum: 77.5, insuf3: 38.75, economiza: 34.58, pagaMais: 56.67 },
  { rotulo: "6", preco: 106.94, insuf1: 23.33, insufAlgum: 63.75, insuf3: 29.58, economiza: 29.58, pagaMais: 60.83 },
  { rotulo: "10", preco: 109.36, insuf1: 16.67, insufAlgum: 55.42, insuf3: 23.75, economiza: 28.75, pagaMais: 62.08 },
];
export const H1: Exp[] = [
  { rotulo: "0", preco: 102.71, insuf1: 33.33, insufAlgum: 77.5, insuf3: 38.75, economiza: 34.58, pagaMais: 56.67 },
  { rotulo: "0,1", preco: 101.48, insuf1: 37.5, insufAlgum: 80.42, insuf3: 42.78, economiza: 35.83, pagaMais: 55.83 },
  { rotulo: "0,2", preco: 99.75, insuf1: 42.92, insufAlgum: 84.17, insuf3: 46.94, economiza: 37.92, pagaMais: 53.75 },
  { rotulo: "0,4", preco: 97.88, insuf1: 49.58, insufAlgum: 86.25, insuf3: 53.89, economiza: 39.17, pagaMais: 50.83 },
  { rotulo: "0,8", preco: 92.86, insuf1: 65.0, insufAlgum: 94.58, insuf3: 68.75, economiza: 44.17, pagaMais: 45.83 },
];
export const H3: Exp[] = [
  { rotulo: "0%", preco: 102.71, insuf1: 33.33, insufAlgum: 77.5, insuf3: 38.75, economiza: 34.58, pagaMais: 56.67 },
  { rotulo: "5%", preco: 106.25, insuf1: 24.17, insufAlgum: 65.0, insuf3: 33.33, economiza: 30.83, pagaMais: 60.0 },
  { rotulo: "10%", preco: 109.55, insuf1: 14.17, insufAlgum: 52.5, insuf3: 27.08, economiza: 27.92, pagaMais: 63.33 },
  { rotulo: "20%", preco: 115.23, insuf1: 2.92, insufAlgum: 30.0, insuf3: 18.06, economiza: 21.67, pagaMais: 70.83 },
  { rotulo: "30%", preco: 121.13, insuf1: 0.0, insufAlgum: 16.25, insuf3: 12.78, economiza: 17.5, pagaMais: 75.42 },
];

export const BASELINE_PT = { preco: 102.53, insuf1: 51.67 };

export const COMPARACAO = [
  { ind: "Preço médio recomendado", base: 102.53, final: 107.23, un: "R$", melhorMenor: true },
  { ind: "Diferença vs. plano atual", base: 11.9, final: 16.6, un: "R$", melhorMenor: true },
  { ind: "Clientes que economizam", base: 32.08, final: 30.42, un: "%", melhorMenor: false },
  { ind: "Clientes que pagam mais", base: 56.67, final: 60.42, un: "%", melhorMenor: true },
  { ind: "Top-1 com dados insuficientes", base: 51.67, final: 20.0, un: "%", melhorMenor: true },
  { ind: "Top-1 insuficiente em alguma dimensão", base: 85.83, final: 60.0, un: "%", melhorMenor: true },
  { ind: "Top-3 com dados insuficientes", base: 55.42, final: 34.58, un: "%", melhorMenor: true },
  { ind: "Recomendação igual ao plano atual", base: 11.25, final: 9.17, un: "%", melhorMenor: null },
];

export const ESTABILIDADE = [
  { nome: "Dados 55%", igual: 83.75, preco: 106.11 },
  { nome: "Pesos iguais", igual: 88.75, preco: 107.17 },
  { nome: "Foco streaming", igual: 80.0, preco: 107.9 },
  { nome: "Foco mobilidade", igual: 83.75, preco: 104.98 },
];
export const SENSIBILIDADE = [
  { nome: "Consumo +10%", igual: 68.75, preco: 113.82, delta: 6.58 },
  { nome: "Consumo +20%", igual: 40.83, preco: 119.78, delta: 12.54 },
];

export const AUDITORIA = {
  regiao: [
    { g: "Periférica", n: 88, atual: 88.42, rec: 107.34, iAtual: 61.36, iRec: 25.0 },
    { g: "Rural", n: 88, atual: 91.89, rec: 107.23, iAtual: 65.91, iRec: 20.45 },
    { g: "Urbana", n: 64, atual: 91.93, rec: 107.09, iAtual: 65.62, iRec: 12.5 },
  ],
  idade: [
    { g: "18-25", n: 67, atual: 86.54, rec: 109.97, iAtual: 67.16, iRec: 20.9 },
    { g: "26-40", n: 51, atual: 92.15, rec: 107.06, iAtual: 70.59, iRec: 29.41 },
    { g: "41-60", n: 57, atual: 90.86, rec: 107.79, iAtual: 68.42, iRec: 22.81 },
    { g: "60+", n: 65, atual: 93.44, rec: 104.05, iAtual: 52.31, iRec: 9.23 },
  ],
  risco: [
    { g: "Sem risco (0)", n: 141, atual: 105.18, rec: 105.29, iAtual: 50.35, iRec: 19.15 },
    { g: "Com risco (1)", n: 99, atual: 69.9, rec: 110.0, iAtual: 83.84, iRec: 21.21 },
  ],
};

// As 5 primeiras linhas da base exibidas no notebook (df.head()).
export const AMOSTRA = [
  { id: 20001, idade: "41-60", regiao: "rural", dados_gb: 36.1, minutos: 569, streaming_horas: 13.5, deslocamento_dias: 8, plano: "Essencial", mensalidade: 39.9, risco: 1 },
  { id: 20002, idade: "18-25", regiao: "rural", dados_gb: 46.5, minutos: 660, streaming_horas: 13.7, deslocamento_dias: 5, plano: "Max", mensalidade: 109.9, risco: 0 },
  { id: 20003, idade: "60+", regiao: "rural", dados_gb: 40.4, minutos: 649, streaming_horas: 16.4, deslocamento_dias: 7, plano: "Flex", mensalidade: 69.9, risco: 1 },
  { id: 20004, idade: "26-40", regiao: "rural", dados_gb: 31.9, minutos: 633, streaming_horas: 21.7, deslocamento_dias: 2, plano: "Digital", mensalidade: 84.9, risco: 0 },
  { id: 20005, idade: "18-25", regiao: "urbana", dados_gb: 48.5, minutos: 527, streaming_horas: 10.1, deslocamento_dias: 6, plano: "Conecta", mensalidade: 54.9, risco: 1 },
];
