import { BASELINE_PT, H1, H2, H3, type Exp } from "@/lib/dados";

const W = 640;
const H = 400;
const P = { l: 52, r: 20, t: 20, b: 46 };
const xMin = 90, xMax = 125, yMin = 0, yMax = 70;
const sx = (v: number) => P.l + ((v - xMin) / (xMax - xMin)) * (W - P.l - P.r);
const sy = (v: number) => H - P.b - ((v - yMin) / (yMax - yMin)) * (H - P.t - P.b);

const SERIES: { nome: string; dados: Exp[]; cor: string }[] = [
  { nome: "H2 · penalidade", dados: H2, cor: "var(--chart-1)" },
  { nome: "H1 · preço", dados: H1, cor: "var(--chart-3)" },
  { nome: "H3 · picos", dados: H3, cor: "var(--chart-4)" },
];

export function TradeoffChart() {
  return (
    <figure>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Preço médio recomendado versus porcentagem de planos com dados insuficientes">
        {[0, 10, 20, 30, 40, 50, 60, 70].map((y) => (
          <g key={y}>
            <line x1={P.l} x2={W - P.r} y1={sy(y)} y2={sy(y)} stroke="var(--border)" />
            <text x={P.l - 10} y={sy(y) + 4} textAnchor="end" fontSize="11" fill="var(--muted-foreground)">{y}%</text>
          </g>
        ))}
        {[90, 95, 100, 105, 110, 115, 120, 125].map((x) => (
          <text key={x} x={sx(x)} y={H - P.b + 20} textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">R$ {x}</text>
        ))}
        {SERIES.map((s) => (
          <g key={s.nome}>
            <polyline fill="none" stroke={s.cor} strokeWidth="2" strokeOpacity=".45" points={s.dados.map((d) => `${sx(d.preco)},${sy(d.insuf1)}`).join(" ")} />
            {s.dados.map((d) => (
              <g key={d.rotulo}>
                <circle cx={sx(d.preco)} cy={sy(d.insuf1)} r="5.5" fill={s.cor} />
                <text x={sx(d.preco) + 8} y={sy(d.insuf1) - 7} fontSize="10" fill="var(--muted-foreground)">{d.rotulo}</text>
              </g>
            ))}
          </g>
        ))}
        <rect x={sx(BASELINE_PT.preco) - 6} y={sy(BASELINE_PT.insuf1) - 6} width="12" height="12" fill="var(--chart-2)" />
        <text x={sx(BASELINE_PT.preco) + 10} y={sy(BASELINE_PT.insuf1) + 4} fontSize="11" fontWeight="600" fill="var(--foreground)">Baseline</text>
        <circle cx={sx(107.23)} cy={sy(20)} r="11" fill="var(--accent)" stroke="var(--foreground)" strokeWidth="1.5" />
        <text x={sx(107.23) + 16} y={sy(20) + 4} fontSize="11" fontWeight="700" fill="var(--foreground)">Modelo final</text>
        <text x={W / 2} y={H - 6} textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">Preço médio recomendado (top-1)</text>
      </svg>
      <figcaption className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
        {SERIES.map((s) => (
          <span key={s.nome} className="flex items-center gap-2">
            <span className="size-2.5 rounded-full" style={{ background: s.cor }} />
            {s.nome}
          </span>
        ))}
        <span>Eixo vertical: % do top-1 com franquia de dados insuficiente</span>
      </figcaption>
    </figure>
  );
}

export function Barra({ valor, max = 100, tom = "primary" }: { valor: number; max?: number; tom?: "primary" | "ink" | "ok" | "muted" }) {
  const cls = { primary: "bg-primary", ink: "bg-ink", ok: "bg-ok", muted: "bg-muted-foreground/40" }[tom];
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
      <div className={`h-full rounded-full ${cls}`} style={{ width: `${Math.min(100, (valor / max) * 100)}%` }} />
    </div>
  );
}
