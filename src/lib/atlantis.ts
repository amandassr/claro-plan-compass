// Motor do Atlantis: tradução fiel das Etapas 4, 6, 7 e 10 do notebook do Colab.

export type Dim = "dados_gb" | "minutos" | "streaming_horas" | "deslocamento_dias";
export const DIMS: Dim[] = ["dados_gb", "minutos", "streaming_horas", "deslocamento_dias"];

export const NOMES: Record<Dim, [string, string]> = {
  dados_gb: ["Internet", "GB"],
  minutos: ["Minutos de ligação", "min"],
  streaming_horas: ["Streaming", "h"],
  deslocamento_dias: ["Deslocamento", "dias"],
};

export const LIMITES: Record<Dim, [number, number]> = {
  dados_gb: [0, 300],
  minutos: [0, 5000],
  streaming_horas: [0, 200],
  deslocamento_dias: [0, 31],
};

export type Plano = { plano: string; preco: number } & Record<Dim, number>;

export const CATALOGO: Plano[] = [
  { plano: "Essencial", preco: 39.9, dados_gb: 8, minutos: 120, streaming_horas: 2, deslocamento_dias: 1 },
  { plano: "Conecta", preco: 54.9, dados_gb: 15, minutos: 250, streaming_horas: 4, deslocamento_dias: 2 },
  { plano: "Flex", preco: 69.9, dados_gb: 25, minutos: 350, streaming_horas: 7, deslocamento_dias: 4 },
  { plano: "Digital", preco: 84.9, dados_gb: 35, minutos: 450, streaming_horas: 12, deslocamento_dias: 6 },
  { plano: "Max", preco: 109.9, dados_gb: 55, minutos: 700, streaming_horas: 18, deslocamento_dias: 8 },
  { plano: "Total", preco: 149.9, dados_gb: 90, minutos: 1100, streaming_horas: 28, deslocamento_dias: 12 },
  { plano: "Viagem", preco: 119.9, dados_gb: 45, minutos: 550, streaming_horas: 14, deslocamento_dias: 20 },
  { plano: "Streaming", preco: 99.9, dados_gb: 40, minutos: 350, streaming_horas: 30, deslocamento_dias: 5 },
  { plano: "Intenso", preco: 129.9, dados_gb: 70, minutos: 850, streaming_horas: 22, deslocamento_dias: 10 },
];

export const PESOS: Record<Dim, number> = {
  dados_gb: 0.4,
  minutos: 0.2,
  streaming_horas: 0.2,
  deslocamento_dias: 0.2,
};

export const CONFIG_FINAL = { penalidade_falta: 3, penalidade_sobra: 1, margem_pico: 0.1, peso_preco: 0.2 };

export const AVISO =
  "Simulação educacional com catálogo fictício. A indicação precisa de validação humana (catálogo, contrato e elegibilidade).";

export const ESCALA: Record<Dim, number> = Object.fromEntries(
  DIMS.map((d) => [d, Math.max(...CATALOGO.map((p) => p[d]))]),
) as Record<Dim, number>;
const PRECO_MAX = Math.max(...CATALOGO.map((p) => p.preco));

export type Perfil = Record<Dim, number>;

export function score(perfil: Perfil, p: Plano, cfg = CONFIG_FINAL, pesos = PESOS) {
  let soma = 0;
  for (const d of DIMS) {
    const dif = (perfil[d] * (1 + cfg.margem_pico) - p[d]) / ESCALA[d];
    const pen = dif > 0 ? cfg.penalidade_falta : cfg.penalidade_sobra;
    soma += pesos[d] * pen * dif * dif;
  }
  return Math.sqrt(soma) + cfg.peso_preco * (p.preco / PRECO_MAX);
}

export function recomendar(perfil: Perfil, k = 3, cfg = CONFIG_FINAL) {
  return CATALOGO.map((p) => ({ ...p, score: score(perfil, p, cfg) }))
    .sort((a, b) => a.score - b.score || a.preco - b.preco)
    .slice(0, k);
}

export function baseline(perfil: Perfil, k = 3) {
  return CATALOGO.map((p) => ({ ...p, distancia: Math.abs(p.dados_gb - perfil.dados_gb) }))
    .sort((a, b) => a.distancia - b.distancia || a.preco - b.preco)
    .slice(0, k);
}

export const cobreTudo = (perfil: Perfil, p: Plano) => DIMS.every((d) => perfil[d] <= p[d]);

export function validarPerfil(entrada: Partial<Record<Dim, string | number>>): Perfil {
  const out = {} as Perfil;
  for (const d of DIMS) {
    const [nome, un] = NOMES[d];
    const [lo, hi] = LIMITES[d];
    const bruto = entrada[d];
    if (bruto === undefined || String(bruto).trim() === "") throw new Error(`informe o campo "${nome}" (${un}).`);
    const v = Number(String(bruto).replace(",", "."));
    if (Number.isNaN(v)) throw new Error(`"${nome}" precisa ser um número (você digitou "${bruto}").`);
    if (v < lo || v > hi) throw new Error(`"${nome}" deve estar entre ${lo} e ${hi} ${un} (você digitou ${v}).`);
    out[d] = v;
  }
  return out;
}

export type Recomendacao = {
  posicao: number;
  plano: Plano;
  score: number;
  cobre_tudo: boolean;
  selos: string[];
};

export type Resposta =
  | { ok: false; erro: string }
  | { ok: true; perfil: Perfil; recomendacoes: Recomendacao[]; nenhum_cobre_tudo: boolean; aviso: string };

export function recomendarParaAgente(entrada: Partial<Record<Dim, string | number>>): Resposta {
  let perfil: Perfil;
  try {
    perfil = validarPerfil(entrada);
  } catch (e) {
    return { ok: false, erro: (e as Error).message };
  }
  const rec = recomendar(perfil).map((r, i) => ({
    posicao: i + 1,
    plano: r as Plano,
    score: r.score,
    cobre_tudo: cobreTudo(perfil, r),
    selos: [] as string[],
  }));
  const cobrem = rec.filter((r) => r.cobre_tudo);
  const barato = cobrem.length ? cobrem.reduce((a, b) => (a.plano.preco <= b.plano.preco ? a : b)).plano.plano : null;
  rec.forEach((r) => {
    if (r.posicao === 1) r.selos.push("Melhor equilíbrio");
    if (r.plano.plano === barato) r.selos.push("Menor preço que cobre tudo");
  });
  return { ok: true, perfil, recomendacoes: rec, nenhum_cobre_tudo: cobrem.length === 0, aviso: AVISO };
}

export const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export const num = (v: number, d = 1) => v.toLocaleString("pt-BR", { maximumFractionDigits: d });
