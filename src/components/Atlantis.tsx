import { useMemo, useState } from "react";
import {
  AVISO,
  CATALOGO,
  CONFIG_FINAL,
  DIMS,
  LIMITES,
  NOMES,
  PESOS,
  baseline,
  brl,
  cobreTudo,
  num,
  recomendarParaAgente,
  type Dim,
  type Perfil,
  type Plano,
} from "@/lib/atlantis";

type Entrada = Record<Dim, string>;

const SLIDER_MAX: Record<Dim, number> = { dados_gb: 120, minutos: 1500, streaming_horas: 40, deslocamento_dias: 31 };

type Aba = "recomendar" | "catalogo" | "como";

export function Atlantis() {
  const [aba, setAba] = useState<Aba>("recomendar");
  const [entrada, setEntrada] = useState<Entrada>({ dados_gb: "", minutos: "", streaming_horas: "", deslocamento_dias: "" });
  const [atual, setAtual] = useState<string>("");
  const [enviado, setEnviado] = useState<{ e: Entrada; atual: string } | null>(null);

  const resposta = useMemo(() => (enviado ? recomendarParaAgente(enviado.e) : null), [enviado]);

  const enviar = (e = entrada, a = atual) => setEnviado({ e, atual: a });

  return (
    <div className="overflow-hidden rounded-4xl border border-border bg-card shadow-[0_30px_80px_-40px_color-mix(in_oklab,var(--ink)_45%,transparent)]">
      {/* barra do app */}
      <div className="grain flex flex-wrap items-center justify-between gap-4 bg-ink px-6 py-5 text-ink-foreground md:px-8">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-primary font-display text-xl font-bold text-primary-foreground">A</span>
          <div>
            <p className="font-display text-xl font-semibold leading-none">Atlantis</p>
            <p className="mt-1 text-sm text-ink-muted">Assistente de recomendação de planos</p>
          </div>
        </div>
        <nav className="flex gap-1 rounded-full bg-ink-foreground/10 p-1 text-sm" role="tablist">
          {([
            ["recomendar", "Encontrar meu plano"],
            ["catalogo", "Catálogo"],
            ["como", "Como decide"],
          ] as [Aba, string][]).map(([k, l]) => (
            <button
              key={k}
              role="tab"
              aria-selected={aba === k}
              onClick={() => setAba(k)}
              className={`rounded-full px-4 py-2 font-medium transition ${aba === k ? "bg-ink-foreground text-ink" : "text-ink-foreground/80 hover:text-ink-foreground"}`}
            >
              {l}
            </button>
          ))}
        </nav>
      </div>

      {aba === "recomendar" && (
        <div className="grid lg:grid-cols-[380px_1fr]">
          <form
            className="space-y-6 border-b border-border p-6 md:p-8 lg:border-b-0 lg:border-r"
            onSubmit={(ev) => {
              ev.preventDefault();
              enviar();
            }}
          >
            <div>
              <p className="kicker text-muted-foreground">Seu perfil de consumo</p>
              <p className="mt-2 text-sm text-muted-foreground">Preencha os dados mensais para receber uma recomendação.</p>
            </div>

            {DIMS.map((d) => {
              const [nome, un] = NOMES[d];
              const v = Number(entrada[d].replace(",", "."));
              return (
                <div key={d}>
                  <div className="flex items-baseline justify-between">
                    <label htmlFor={d} className="text-sm font-semibold">
                      {nome}
                    </label>
                    <div className="flex items-baseline gap-1">
                      <input
                        id={d}
                        inputMode="decimal"
                        value={entrada[d]}
                        onChange={(e) => setEntrada({ ...entrada, [d]: e.target.value })}
                        className="w-20 rounded-md border border-input bg-background px-2 py-1 text-right font-mono text-sm tabular focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      <span className="w-8 text-xs text-muted-foreground">{un}</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    aria-label={`${nome} (controle deslizante)`}
                    min={0}
                    max={SLIDER_MAX[d]}
                    step={d === "streaming_horas" || d === "dados_gb" ? 0.5 : 1}
                    value={Number.isNaN(v) ? 0 : Math.min(v, SLIDER_MAX[d])}
                    onChange={(e) => setEntrada({ ...entrada, [d]: e.target.value })}
                    className="mt-3 w-full accent-primary"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Aceita de {LIMITES[d][0]} a {LIMITES[d][1]} {un}/mês
                  </p>
                </div>
              );
            })}

            <div>
              <label htmlFor="atual" className="text-sm font-semibold">
                Plano atual <span className="font-normal text-muted-foreground">(opcional)</span>
              </label>
              <select
                id="atual"
                value={atual}
                onChange={(e) => setAtual(e.target.value)}
                className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Não informar</option>
                {CATALOGO.map((p) => (
                  <option key={p.plano} value={p.plano}>
                    {p.plano} — {brl(p.preco)}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition hover:bg-primary-deep"
            >
              Recomendar planos
            </button>
          </form>

          <div className="min-h-[520px] bg-background/60 p-6 md:p-8" aria-live="polite">
            {!resposta && <Vazio />}
            {resposta && !resposta.ok && (
              <div role="alert" className="rounded-2xl border border-primary/40 bg-primary-soft p-5">
                <p className="font-display text-lg font-semibold text-primary-deep">Quase lá!</p>
                <p className="mt-1 text-sm">Não foi possível recomendar: {resposta.erro}</p>
              </div>
            )}
            {resposta && resposta.ok && enviado && <Resultado r={resposta} atual={enviado.atual} />}
          </div>
        </div>
      )}

      {aba === "catalogo" && <Catalogo />}
      {aba === "como" && <ComoDecide />}
    </div>
  );
}

function Vazio() {
  return (
    <div className="flex h-full flex-col items-start justify-center gap-4">
      <div className="max-w-md rounded-2xl rounded-tl-sm bg-muted p-5">
        <p className="text-sm leading-relaxed">
          Informe seu consumo mensal de internet, minutos, streaming e dias em deslocamento. O Atlantis indica três planos e mostra
          quanto cada um cobre do seu perfil.
        </p>
      </div>
      <p className="text-sm text-muted-foreground">A recomendação aparece aqui depois do envio do formulário.</p>
    </div>
  );
}

function Resultado({ r, atual }: { r: Extract<ReturnType<typeof recomendarParaAgente>, { ok: true }>; atual: string }) {
  const p = r.perfil;
  const base = baseline(p);
  const cobreBase = base.filter((b) => cobreTudo(p, b)).length;
  const cobreMod = r.recomendacoes.filter((x) => x.cobre_tudo).length;
  const top = r.recomendacoes[0];
  if (!top) return null;

  return (
    <div className="animate-rise space-y-6">
      <div className="max-w-2xl rounded-2xl rounded-tl-sm bg-muted p-5 text-sm leading-relaxed">
        Para <strong>{num(p.dados_gb)} GB</strong>, <strong>{num(p.minutos)} min</strong>,{" "}
        <strong>{num(p.streaming_horas)} h</strong> de streaming e <strong>{num(p.deslocamento_dias)} dias</strong> de
        deslocamento, a melhor opção é o <strong>{top.plano.plano}</strong> ({brl(top.plano.preco)}/mês)
        {top.cobre_tudo ? ", que cobre todas as necessidades." : ", mas ele ainda não cobre tudo."}
      </div>

      {r.nenhum_cobre_tudo && (
        <div role="alert" className="rounded-2xl border border-primary/40 bg-primary-soft p-4 text-sm">
          <strong>Atenção:</strong> nenhum plano do catálogo cobre integralmente este perfil; mostramos os mais próximos.
        </div>
      )}

      <div className="grid gap-4 xl:grid-cols-3">
        {r.recomendacoes.map((x) => (
          <Card key={x.plano.plano} plano={x.plano} perfil={p} posicao={x.posicao} selos={x.selos} cobre={x.cobre_tudo} atual={atual} />
        ))}
      </div>

      <details className="group rounded-2xl border border-border bg-card p-5">
        <summary className="cursor-pointer list-none text-sm font-semibold">
          Comparar com a regra simples (baseline) <span className="text-muted-foreground group-open:hidden">+</span>
        </summary>
        <p className="mt-3 text-sm text-muted-foreground">
          A baseline olha só os GB de internet. Nas 3 opções dela, <strong className="text-foreground">{cobreBase} de 3</strong> cobrem
          tudo; nas 3 do Atlantis, <strong className="text-foreground">{cobreMod} de 3</strong>.
        </p>
        <table className="mt-3 w-full text-sm">
          <tbody>
            {base.map((b) => (
              <tr key={b.plano} className="border-t border-border">
                <td className="py-2 font-medium">{b.plano}</td>
                <td className="py-2 tabular">{brl(b.preco)}</td>
                <td className={`py-2 text-right ${cobreTudo(p, b) ? "text-ok" : "text-primary"}`}>
                  {cobreTudo(p, b) ? "cobre tudo" : "não cobre tudo"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>

      <p className="text-xs text-muted-foreground">{r.aviso}</p>
    </div>
  );
}

function Card({ plano, perfil, posicao, selos, cobre, atual }: { plano: Plano; perfil: Perfil; posicao: number; selos: string[]; cobre: boolean; atual: string }) {
  const atualP = CATALOGO.find((c) => c.plano === atual);
  const dif = atualP ? plano.preco - atualP.preco : null;
  return (
    <article className={`flex flex-col gap-4 rounded-2xl border bg-card p-5 ${posicao === 1 ? "border-primary ring-1 ring-primary" : "border-border"}`}>
      <div className="flex flex-wrap gap-1.5">
        <span className="rounded-full bg-ink px-2.5 py-0.5 text-xs font-semibold text-ink-foreground">{posicao}ª opção</span>
        {selos.map((s) => (
          <span key={s} className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">
            {s}
          </span>
        ))}
      </div>
      <div>
        <h4 className="text-2xl font-semibold">{plano.plano}</h4>
        <p className="font-display text-3xl font-bold text-primary tabular">
          {brl(plano.preco)}
          <span className="text-sm font-medium text-muted-foreground">/mês</span>
        </p>
        <p className={`mt-1 text-sm font-semibold ${cobre ? "text-ok" : "text-primary"}`}>
          {cobre ? "Cobre todas as necessidades" : "Não cobre tudo"}
        </p>
        {dif !== null && (
          <p className="mt-1 text-xs text-muted-foreground">
            {Math.abs(dif) < 0.005
              ? `Mesmo valor do ${atual}.`
              : dif < 0
                ? `Economia de ${brl(-dif)}/mês em relação ao ${atual}.`
                : `${brl(dif)}/mês a mais que o ${atual}.`}
          </p>
        )}
      </div>
      <div className="space-y-3">
        {DIMS.map((d) => {
          const [nome, un] = NOMES[d];
          const uso = perfil[d];
          const fr = plano[d];
          const over = uso > fr;
          const pct = fr <= 0 ? 100 : Math.min(100, (uso / fr) * 100);
          return (
            <div key={d}>
              <div className="flex justify-between text-xs">
                <span className="font-medium">{nome}</span>
                <span className={over ? "font-semibold text-primary" : "text-muted-foreground"}>
                  {over ? `faltam ${num(uso - fr)} ${un}` : `${num(uso)} de ${num(fr)} ${un}`}
                </span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                <div className={`h-full rounded-full ${over ? "bg-primary" : "bg-ok"}`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}

function Catalogo() {
  const [ordem, setOrdem] = useState<"preco" | "dados">("preco");
  const lista = [...CATALOGO].sort((a, b) => (ordem === "preco" ? a.preco - b.preco : b.dados_gb - a.dados_gb));
  const max = { dados_gb: 90, minutos: 1100, streaming_horas: 30, deslocamento_dias: 20 } as Record<Dim, number>;
  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">9 planos do catálogo fictício (Etapa 4), incluindo o Intenso, criado pela equipe.</p>
        <div className="flex gap-1 rounded-full bg-muted p-1 text-xs">
          {(["preco", "dados"] as const).map((o) => (
            <button key={o} onClick={() => setOrdem(o)} className={`rounded-full px-3 py-1.5 font-medium ${ordem === o ? "bg-card shadow-sm" : "text-muted-foreground"}`}>
              {o === "preco" ? "Menor preço" : "Mais internet"}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {lista.map((p) => (
          <article key={p.plano} className={`rounded-2xl border p-5 ${p.plano === "Intenso" ? "border-primary bg-primary-soft/40" : "border-border"}`}>
            <div className="flex items-baseline justify-between">
              <h4 className="text-xl font-semibold">{p.plano}</h4>
              {p.plano === "Intenso" && <span className="kicker text-primary">Novo</span>}
            </div>
            <p className="font-display text-2xl font-bold tabular">{brl(p.preco)}</p>
            <div className="mt-4 space-y-2.5">
              {DIMS.map((d) => (
                <div key={d} className="grid grid-cols-[90px_1fr_56px] items-center gap-2 text-xs">
                  <span className="text-muted-foreground">{NOMES[d][0]}</span>
                  <div className="h-1.5 rounded-full bg-muted">
                    <div className="h-full rounded-full bg-ink" style={{ width: `${(p[d] / max[d]) * 100}%` }} />
                  </div>
                  <span className="text-right tabular">
                    {p[d]} {NOMES[d][1]}
                  </span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ComoDecide() {
  return (
    <div className="grid gap-8 p-6 md:grid-cols-2 md:p-8">
      <div className="space-y-4 text-sm leading-relaxed">
        <h4 className="text-2xl font-semibold">Como o Atlantis decide</h4>
        <p>
          É o modelo final das Etapas 7 a 9, sem alterações. Cada plano recebe uma nota e <strong>quanto menor, melhor</strong>.
        </p>
        <ul className="space-y-2">
          <li>Faltar franquia pesa <strong>{CONFIG_FINAL.penalidade_falta}×</strong> mais do que sobrar.</li>
          <li>Margem para picos de consumo: <strong>{CONFIG_FINAL.margem_pico * 100}%</strong>.</li>
          <li>Peso do preço na nota: <strong>{num(CONFIG_FINAL.peso_preco)}</strong>.</li>
        </ul>
        <p>Para dizer se um plano cobre ou não, o Atlantis usa o consumo <strong>real</strong>, sem a margem de picos.</p>
        <p className="text-xs text-muted-foreground">{AVISO}</p>
      </div>
      <div className="space-y-4">
        <div className="rounded-2xl bg-ink p-5 font-mono text-xs leading-relaxed text-ink-foreground">
          score = √( Σ peso × penalidade × diferença_normalizada² )<br />+ peso_preco × (preço / preço_máximo)
        </div>
        <div className="rounded-2xl border border-border p-5">
          <p className="kicker text-muted-foreground">Pesos por atributo</p>
          <div className="mt-3 space-y-2">
            {DIMS.map((d) => (
              <div key={d} className="grid grid-cols-[130px_1fr_40px] items-center gap-2 text-sm">
                <span>{NOMES[d][0]}</span>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${PESOS[d] * 100 * 2.5}%` }} />
                </div>
                <span className="text-right tabular">{PESOS[d] * 100}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
