import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Atlantis } from "@/components/Atlantis";
import { Barra, TradeoffChart } from "@/components/charts";
import { CATALOGO, brl, num } from "@/lib/atlantis";
import {
  AMOSTRA,
  AUDITORIA,
  BASE,
  COMPARACAO,
  DESCRITIVO,
  ESTABILIDADE,
  H1,
  H2,
  H3,
  IDADE,
  REGIAO,
  RESUMO_PLANO,
  SENSIBILIDADE,
  type Exp,
} from "@/lib/dados";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atlantis · Recomendador de planos por perfil de uso" },
      {
        name: "description",
        content:
          "Projeto 1 do bootcamp: recomendador de planos móveis para clientes com excesso de consumo, com dados, experimentos e o assistente Atlantis funcionando.",
      },
      { property: "og:title", content: "Atlantis · Recomendador de planos por perfil de uso" },
      {
        property: "og:description",
        content: "Dados, modelo, resultados e demonstração ao vivo do assistente Atlantis.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* ──────────────────────────────────────────────────────────────
   EDITE AQUI: nome da equipe e integrantes.
   Para a foto, coloque a URL da imagem em `foto` (ou deixe vazio).
   ────────────────────────────────────────────────────────────── */
const EQUIPE = "Equipe Atlantis";
const INTEGRANTES: { nome: string; linkedin: string; foto: string; qr: string }[] = [
  { nome: "Amanda Ribeiro", linkedin: "https://www.linkedin.com/in/amanda-ribeiro-b5b2b3176/", foto: "/amanda-ribeiro.jpg", qr: "/amanda-ribeiro-qr.svg" },
  { nome: "Amanda Carvalho", linkedin: "https://www.linkedin.com/in/amanda-carvalho-teixeira-430b9113a/", foto: "/amanda-carvalho.jpg", qr: "/amanda-carvalho-qr.svg" },
  { nome: "Raquel Domingues", linkedin: "https://www.linkedin.com/in/raquelcs-domingues/", foto: "/raquel-domingues.jpg", qr: "/raquel-domingues-qr.svg" },
  { nome: "Andresa Caroline", linkedin: "https://www.linkedin.com/in/Andresa-caroline/", foto: "/andresa-caroline.jpg", qr: "/andresa-caroline-qr.svg" },
];

const TELAS = [
  { id: "capa", n: "01", t: "Capa" },
  { id: "objetivo", n: "02", t: "Equipe e objetivo" },
  { id: "escolhas", n: "03", t: "Escolhas" },
  { id: "construido", n: "04", t: "O que construímos" },
  { id: "resultados", n: "05", t: "Resultados" },
  { id: "conclusao", n: "06", t: "Conclusão" },
  { id: "agradecimentos", n: "07", t: "Agradecimentos" },
];

function Index() {
  const ativa = useTelaAtiva();
  return (
    <div className="min-h-screen">
      <Nav ativa={ativa} />
      <Capa />
      <Objetivo />
      <Escolhas />
      <Construido />
      <Resultados />
      <Conclusao />
      <Agradecimentos />
      <footer className="border-t border-border px-6 py-10 text-sm text-muted-foreground md:px-12">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4">
          <p>
            {EQUIPE} · Projeto 1 — Recomendador de planos por perfil de uso
          </p>
          <p>Dados e planos fictícios. Simulação educacional.</p>
        </div>
      </footer>
    </div>
  );
}

function useTelaAtiva() {
  const [ativa, setAtiva] = useState("capa");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setAtiva(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    TELAS.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return ativa;
}

function Nav({ ativa }: { ativa: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3 md:px-12">
        <a href="#capa" className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-full bg-primary font-display font-bold text-primary-foreground">A</span>
          <span className="font-display text-lg font-semibold">Atlantis</span>
        </a>
        <nav className="hidden items-center gap-1 lg:flex">
          {TELAS.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              className={`rounded-full px-3 py-1.5 text-sm transition ${ativa === t.id ? "bg-ink text-ink-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <span className="mr-1.5 font-mono text-[11px] opacity-60">{t.n}</span>
              {t.t}
            </a>
          ))}
        </nav>
        <a href="#demo" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary-deep">
          Testar o Atlantis
        </a>
      </div>
    </header>
  );
}

function Secao({ id, n, kicker, titulo, children, escuro }: { id: string; n: string; kicker: string; titulo: ReactNode; children: ReactNode; escuro?: boolean }) {
  return (
    <section id={id} className={`scroll-mt-16 px-6 py-24 md:px-12 md:py-32 ${escuro ? "grain bg-ink text-ink-foreground" : ""}`}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 grid gap-6 md:grid-cols-[120px_1fr]">
          <p className={`font-mono text-sm ${escuro ? "text-ink-muted" : "text-muted-foreground"}`}>{n} / 07</p>
          <div>
            <p className={`kicker ${escuro ? "text-accent" : "text-primary"}`}>{kicker}</p>
            <h2 className="mt-3 max-w-4xl text-4xl font-semibold leading-[1.02] md:text-6xl">{titulo}</h2>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

/* 01 — CAPA */
function Capa() {
  return (
    <section id="capa" className="relative overflow-hidden px-6 pb-20 pt-16 md:px-12 md:pt-24">
      <div className="mx-auto grid max-w-7xl items-end gap-12 lg:grid-cols-[1.25fr_1fr]">
        <div className="animate-rise">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-border px-3 py-1 text-xs font-medium">Bootcamp · Projeto 1</span>
            <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary-deep">Recorte: excesso de consumo</span>
          </div>
          <h1 className="mt-8 text-[clamp(3rem,8vw,7.5rem)] font-semibold leading-[0.92]">
            O plano certo
            <br />
            <span className="text-primary">antes</span> da franquia
            <br />
            acabar.
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground">
            Recomendador de planos por perfil de uso: um modelo que penaliza a falta de franquia, considera picos de consumo e o
            preço, e um assistente — o <strong className="text-foreground">Atlantis</strong> — que explica cada indicação.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#demo" className="rounded-full bg-ink px-6 py-3.5 font-semibold text-ink-foreground transition hover:bg-primary">
              Ver demonstração
            </a>
            <p className="text-sm text-muted-foreground">
              Apresentado por <strong className="text-foreground">{EQUIPE}</strong>
            </p>
          </div>
        </div>

        <div className="grain relative animate-rise rounded-4xl bg-ink p-8 text-ink-foreground [animation-delay:150ms] md:p-10">
          <p className="kicker text-ink-muted">O ponto de partida</p>
          <p className="mt-6 font-display text-[7rem] font-semibold leading-none tabular">
            64<span className="text-5xl">,2%</span>
          </p>
          <p className="mt-3 max-w-xs text-ink-foreground/80">
            dos {BASE.clientes} clientes da base já usam mais internet do que o plano atual oferece.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-ink-foreground/15 pt-6">
            <div>
              <p className="font-display text-3xl font-semibold tabular">81,7%</p>
              <p className="text-sm text-ink-muted">estouram em alguma dimensão</p>
            </div>
            <div>
              <p className="font-display text-3xl font-semibold tabular">51,7% → 20%</p>
              <p className="text-sm text-ink-muted">top-1 com dados insuficientes, baseline vs. modelo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 02 — INTEGRANTES E OBJETIVO */
function Objetivo() {
  return (
    <Secao id="objetivo" n="02" kicker="Integrantes e objetivo" titulo="Quem fez e qual problema queremos resolver.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {INTEGRANTES.map((p, i) => (
          <article key={i} className="group rounded-3xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="aspect-square overflow-hidden rounded-2xl bg-muted">
              {p.foto ? (
                <img src={p.foto} alt={p.nome} className="size-full object-cover" />
              ) : (
                <div className="grid size-full place-items-center text-center text-sm text-muted-foreground">
                  <span>
                    <span className="block font-display text-5xl text-foreground/20">{i + 1}</span>
                    espaço para foto
                  </span>
                </div>
              )}
            </div>
            <h3 className="mt-5 text-xl font-semibold">{p.nome}</h3>
            <p className="text-sm text-muted-foreground">Integrante do projeto</p>
            <a href={p.linkedin} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
              LinkedIn ↗
            </a>
            <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
              <img src={p.qr} alt={`QR code do LinkedIn de ${p.nome}`} className="size-20 rounded border border-border bg-white p-1" />
              <p className="text-xs text-muted-foreground">Escaneie para abrir o perfil</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-20 grid gap-12 lg:grid-cols-2">
        <div>
          <p className="kicker text-muted-foreground">Pergunta de pesquisa</p>
          <blockquote className="mt-4 font-display text-2xl leading-snug md:text-3xl">
            Em uma base de clientes cujo consumo tende a passar da franquia, como{" "}
            <span className="text-primary">penalizar a falta de franquia</span>, aplicar uma{" "}
            <span className="text-primary">margem para picos</span> e incluir o <span className="text-primary">preço</span> modifica a
            qualidade das três recomendações, em comparação com uma regra simples baseada só em GB?
          </blockquote>
        </div>
        <div className="space-y-4">
          {[
            ["H1 — preço", "Incluir o preço no score reduz o preço médio recomendado, mas pode aumentar a proporção de planos insuficientes."],
            ["H2 — penalidade", "Aumentar a penalidade por falta de franquia reduz a proporção de recomendações insuficientes em dados."],
            ["H3 — picos", "Uma margem de segurança sobre o consumo (ex.: +10%) reduz as insuficiências, ao custo de um preço médio maior."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-border bg-card p-5">
              <p className="font-display text-lg font-semibold">{t}</p>
              <p className="mt-1 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </Secao>
  );
}

/* 03 — ESCOLHAS */
function Escolhas() {
  return (
    <Secao id="escolhas" n="03" kicker="Escolhas" titulo="Recorte, público, dados e tecnologias.">
      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["Recorte", "Excesso de consumo", "com apoio de equilíbrio entre preço e adequação"],
          ["Público", "240 clientes", "base fictícia, 11 colunas"],
          ["Dados", "4 atributos de uso", "internet, minutos, streaming e deslocamento"],
          ["Tecnologias", "Python no Colab", "pandas, NumPy, Matplotlib e Gradio"],
        ].map(([k, v, d]) => (
          <div key={k} className="rounded-3xl bg-muted p-6">
            <p className="kicker text-muted-foreground">{k}</p>
            <p className="mt-6 font-display text-2xl font-semibold">{v}</p>
            <p className="mt-1 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <h3 className="text-2xl font-semibold">Quem está na base</h3>
          <p className="mt-2 text-muted-foreground">
            Região e faixa etária <strong className="text-foreground">não entram no modelo</strong> — servem só para auditar se algum grupo é prejudicado.
          </p>
          <Distrib titulo="Região" itens={REGIAO} />
          <Distrib titulo="Faixa etária" itens={IDADE} />
        </div>
        <div>
          <h3 className="text-2xl font-semibold">Onde o excesso se concentra</h3>
          <p className="mt-2 text-muted-foreground">% de clientes que usam mais GB do que o plano atual oferece.</p>
          <div className="mt-6 space-y-3">
            {RESUMO_PLANO.map((r) => (
              <div key={r.plano} className="grid grid-cols-[90px_1fr_64px] items-center gap-3 text-sm md:grid-cols-[100px_1fr_70px_150px]">
                <span className="font-medium">{r.plano}</span>
                <Barra valor={r.excede} tom={r.excede >= 70 ? "primary" : "ink"} />
                <span className="text-right font-semibold tabular">{num(r.excede, 0)}%</span>
                <span className="hidden text-xs text-muted-foreground md:block">
                  usa {num(r.uso)} GB · tem {r.franquia} GB
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Clientes do Essencial e do Conecta: 100% estouram a franquia de dados e têm o maior risco médio de cancelamento (1,0 e 0,8).
          </p>
        </div>
      </div>

      <div className="mt-20 grid gap-12 lg:grid-cols-2">
        <div>
          <h3 className="text-2xl font-semibold">Limpeza dos dados</h3>
          <p className="mt-2 text-muted-foreground">
            A coluna <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">dados_gb</code> chegou como texto. Três valores
            precisaram de tratamento:
          </p>
          <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
            {BASE.problemasGb.map((p) => (
              <div key={p.id} className="flex items-center justify-between px-5 py-3 text-sm">
                <span className="font-mono">{p.id}</span>
                <span className="rounded-full bg-primary-soft px-3 py-0.5 font-mono text-primary-deep">"{p.valor}"</span>
                <span className="text-muted-foreground">{p.valor === "24 GB" ? "→ 24,0" : `→ mediana ${num(BASE.medianaGb)} GB`}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Nenhum valor fora das faixas plausíveis. Outliers estatísticos foram mantidos: um cliente de 77 GB é raro, mas é exatamente
            quem o recorte quer atender. O rótulo <code className="font-mono">perfil_grupo</code> é igual para os 240 clientes e por isso não separa perfis.
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold">Resumo do consumo</h3>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full text-sm tabular">
              <thead className="text-left text-xs text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Atributo</th>
                  <th className="px-4 py-3 text-right font-medium">Mín.</th>
                  <th className="px-4 py-3 text-right font-medium">Média</th>
                  <th className="px-4 py-3 text-right font-medium">Mediana</th>
                  <th className="px-4 py-3 text-right font-medium">Máx.</th>
                </tr>
              </thead>
              <tbody>
                {DESCRITIVO.map((d) => (
                  <tr key={d.col} className="border-t border-border">
                    <td className="px-4 py-3 font-medium">{d.col}</td>
                    <td className="px-4 py-3 text-right">{num(d.min, 2)}</td>
                    <td className="px-4 py-3 text-right">{num(d.media, 2)}</td>
                    <td className="px-4 py-3 text-right">{num(d.mediana, 2)}</td>
                    <td className="px-4 py-3 text-right">{num(d.max, 2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <details className="mt-4 rounded-2xl border border-border bg-card p-4 text-sm">
            <summary className="cursor-pointer font-semibold">Ver as primeiras linhas da base</summary>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-xs tabular">
                <thead className="text-left text-muted-foreground">
                  <tr>
                    {["id", "idade", "região", "GB", "min", "stream. h", "desloc.", "plano", "mensal.", "risco"].map((h) => (
                      <th key={h} className="px-2 py-2 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {AMOSTRA.map((c) => (
                    <tr key={c.id} className="border-t border-border">
                      <td className="px-2 py-2 font-mono">{c.id}</td>
                      <td className="px-2 py-2">{c.idade}</td>
                      <td className="px-2 py-2">{c.regiao}</td>
                      <td className="px-2 py-2">{num(c.dados_gb)}</td>
                      <td className="px-2 py-2">{c.minutos}</td>
                      <td className="px-2 py-2">{num(c.streaming_horas)}</td>
                      <td className="px-2 py-2">{c.deslocamento_dias}</td>
                      <td className="px-2 py-2">{c.plano}</td>
                      <td className="px-2 py-2">{num(c.mensalidade, 2)}</td>
                      <td className="px-2 py-2">{c.risco}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </div>
      </div>

      <div className="mt-20 rounded-4xl border border-border bg-card p-6 md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="kicker text-primary">Nossa alteração no catálogo</p>
            <h3 className="mt-3 text-3xl font-semibold">Criamos o plano Intenso.</h3>
            <p className="mt-3 text-muted-foreground">
              A base tem clientes de até ~77 GB e o catálogo original tinha um buraco entre o Max (55 GB) e o Total (90 GB). Os valores
              vêm de interpolação linear entre os dois; o preço interpolado (≈ R$ 127) foi arredondado para cima.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm tabular">
              <thead className="text-left text-xs text-muted-foreground">
                <tr>
                  <th className="py-2 font-medium">Plano</th>
                  <th className="py-2 text-right font-medium">Preço</th>
                  <th className="py-2 text-right font-medium">GB</th>
                  <th className="py-2 text-right font-medium">Min</th>
                  <th className="py-2 text-right font-medium">Stream. h</th>
                  <th className="py-2 text-right font-medium">Desloc.</th>
                </tr>
              </thead>
              <tbody>
                {CATALOGO.map((p) => (
                  <tr key={p.plano} className={`border-t border-border ${p.plano === "Intenso" ? "font-semibold text-primary" : ""}`}>
                    <td className="py-2">{p.plano}</td>
                    <td className="py-2 text-right">{brl(p.preco)}</td>
                    <td className="py-2 text-right">{p.dados_gb}</td>
                    <td className="py-2 text-right">{p.minutos}</td>
                    <td className="py-2 text-right">{p.streaming_horas}</td>
                    <td className="py-2 text-right">{p.deslocamento_dias}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Secao>
  );
}

function Distrib({ titulo, itens }: { titulo: string; itens: { nome: string; n: number }[] }) {
  return (
    <div className="mt-8">
      <p className="kicker text-muted-foreground">{titulo}</p>
      <div className="mt-3 flex h-12 overflow-hidden rounded-xl">
        {itens.map((it, i) => (
          <div
            key={it.nome}
            className={`flex items-center justify-between px-3 text-xs font-medium ${["bg-ink text-ink-foreground", "bg-primary text-primary-foreground", "bg-muted text-foreground", "bg-accent text-accent-foreground"][i]}`}
            style={{ width: `${(it.n / 240) * 100}%` }}
          >
            <span className="truncate">{it.nome}</span>
            <span className="tabular">{it.n}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 04 — O QUE FOI CONSTRUÍDO */
function Construido() {
  const etapas = [
    ["Limpar", "Corrigir “24 GB”, vazios e “não informado”, com auditoria do que foi imputado."],
    ["Baseline", "Os 3 planos com GB mais próximos do consumo. Não distingue sobrar de faltar."],
    ["Score", "Distância ponderada nas 4 dimensões, normalizada pela escala do catálogo."],
    ["Penalidade", "Faltar franquia custa 3× mais na nota do que sobrar."],
    ["Picos + preço", "Margem de 10% sobre o consumo e peso 0,2 para o preço."],
    ["Atlantis", "Valida a entrada, recomenda o top-3 e explica cada plano em português."],
  ];
  return (
    <Secao id="construido" n="04" kicker="O que foi construído" titulo="Do dado sujo a uma recomendação explicada.">
      <ol className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {etapas.map(([t, d], i) => (
          <li key={t} className="bg-card p-6">
            <p className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</p>
            <p className="mt-4 font-display text-xl font-semibold">{t}</p>
            <p className="mt-1 text-sm text-muted-foreground">{d}</p>
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-ink p-6 text-ink-foreground md:p-8">
          <p className="kicker text-ink-muted">Fórmula</p>
          <p className="mt-4 font-mono text-sm leading-relaxed md:text-base">
            score = √( Σ peso<sub>i</sub> × penalidade<sub>i</sub> × dif_norm<sub>i</sub>² )
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ peso_preco × (preço / preço_máx)
          </p>
          <p className="mt-4 text-sm text-ink-muted">Menor nota = plano mais adequado. Empate: vence o mais barato.</p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
          <p className="kicker text-muted-foreground">Mesmo cliente, duas respostas</p>
          <p className="mt-2 text-sm text-muted-foreground">Cliente 20001 · 36,1 GB · 569 min · 13,5 h · 8 dias · paga R$ 39,90 no Essencial</p>
          <div className="mt-5 grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="font-semibold">Baseline</p>
              <ol className="mt-2 space-y-1 text-muted-foreground">
                <li>1. Digital · 35 GB <span className="text-primary">(falta)</span></li>
                <li>2. Streaming · 40 GB</li>
                <li>3. Viagem · 45 GB</li>
              </ol>
            </div>
            <div>
              <p className="font-semibold">Modelo final</p>
              <ol className="mt-2 space-y-1 text-muted-foreground">
                <li>1. <strong className="text-foreground">Max</strong> · score 0,2716</li>
                <li>2. Digital · 0,3025</li>
                <li>3. Viagem · 0,4197</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div id="demo" className="scroll-mt-20 pt-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker text-primary">Demonstração ao vivo</p>
            <h3 className="mt-2 text-3xl font-semibold md:text-4xl">Converse com o Atlantis.</h3>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            O mesmo motor do notebook, rodando no navegador. Teste um caso normal, um extremo e uma entrada inválida.
          </p>
        </div>
        <Atlantis />
      </div>
    </Secao>
  );
}

/* 05 — RESULTADOS */
function Resultados() {
  return (
    <Secao id="resultados" n="05" kicker="Resultados" titulo="Menos planos que estouram, a um custo conhecido." escuro>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["51,67% → 20%", "top-1 com franquia de dados insuficiente"],
          ["55,42% → 34,58%", "das 3 sugestões sem dados suficientes"],
          ["R$ 102,53 → R$ 107,23", "preço médio recomendado (o custo da melhoria)"],
        ].map(([v, d]) => (
          <div key={d} className="rounded-3xl border border-ink-foreground/15 p-6">
            <p className="font-display text-3xl font-semibold tabular md:text-4xl">{v}</p>
            <p className="mt-2 text-sm text-ink-muted">{d}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-3xl bg-ink-foreground p-2 text-foreground">
        <table className="w-full text-sm tabular">
          <thead className="text-left text-xs text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Indicador (240 clientes)</th>
              <th className="px-4 py-3 text-right font-medium">Baseline</th>
              <th className="px-4 py-3 text-right font-medium">Modelo final</th>
              <th className="px-4 py-3 text-right font-medium">Leitura</th>
            </tr>
          </thead>
          <tbody>
            {COMPARACAO.map((c) => {
              const melhor = c.melhorMenor === null ? null : c.melhorMenor ? c.final < c.base : c.final > c.base;
              const f = (v: number) => (c.un === "R$" ? brl(v) : `${num(v, 2)}%`);
              return (
                <tr key={c.ind} className="border-t border-border">
                  <td className="px-4 py-3">{c.ind}</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">{f(c.base)}</td>
                  <td className="px-4 py-3 text-right font-semibold">{f(c.final)}</td>
                  <td className="px-4 py-3 text-right">
                    {melhor === null ? (
                      <span className="text-muted-foreground">—</span>
                    ) : (
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${melhor ? "bg-ok-soft text-ok" : "bg-primary-soft text-primary-deep"}`}>
                        {melhor ? "melhorou" : "piorou"}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-20 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-3xl bg-ink-foreground p-6 text-foreground md:p-8">
          <p className="kicker text-primary">Conflito entre métricas</p>
          <h3 className="mt-2 text-2xl font-semibold">Custo × cobertura em todos os experimentos</h3>
          <div className="mt-6">
            <TradeoffChart />
          </div>
        </div>
        <div className="space-y-4">
          <Hipotese titulo="H2 · penalidade por falta" eixo="penalidade" dados={H2} veredito="Confirmada" />
          <Hipotese titulo="H1 · peso do preço" eixo="peso" dados={H1} veredito="Confirmada (com conflito)" />
          <Hipotese titulo="H3 · margem para picos" eixo="margem" dados={H3} veredito="Confirmada" />
        </div>
      </div>

      <div className="mt-20 grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-ink-foreground/15 p-6">
          <p className="kicker text-accent">Estabilidade · pesos</p>
          <p className="mt-2 text-sm text-ink-muted">% de clientes com a mesma 1ª recomendação ao trocar os pesos.</p>
          <div className="mt-5 space-y-3">
            {ESTABILIDADE.map((e) => (
              <div key={e.nome} className="text-sm">
                <div className="flex justify-between">
                  <span>{e.nome}</span>
                  <span className="font-semibold tabular">{num(e.igual, 2)}%</span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-ink-foreground/15">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${e.igual}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-ink-foreground/15 p-6">
          <p className="kicker text-accent">Sensibilidade · consumo</p>
          <p className="mt-2 text-sm text-ink-muted">Se todos passarem a consumir mais:</p>
          <div className="mt-5 space-y-5">
            {SENSIBILIDADE.map((s) => (
              <div key={s.nome}>
                <p className="text-sm">{s.nome}</p>
                <p className="font-display text-3xl font-semibold tabular">{num(s.igual, 2)}%</p>
                <p className="text-xs text-ink-muted">
                  mantêm a recomendação · preço médio {brl(s.preco)} (+{brl(s.delta)})
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-ink-foreground/15 p-6">
          <p className="kicker text-accent">Auditoria · justiça</p>
          <p className="mt-2 text-sm text-ink-muted">% com dados insuficientes: plano atual → recomendado.</p>
          <div className="mt-5 space-y-2 text-sm">
            {[...AUDITORIA.regiao, ...AUDITORIA.idade, ...AUDITORIA.risco].map((a) => (
              <div key={a.g} className="flex justify-between border-b border-ink-foreground/10 pb-2">
                <span>{a.g}</span>
                <span className="tabular">
                  <span className="text-ink-muted">{num(a.iAtual, 1)}%</span> → <strong>{num(a.iRec, 1)}%</strong>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20 grid gap-10 lg:grid-cols-3">
        <Lista
          titulo="O que funcionou"
          itens={[
            "A insuficiência de dados no top-1 caiu de 51,67% para 20% em relação à baseline.",
            "Todos os grupos de região e idade passaram a ter menos insuficiência do que no plano atual.",
            "Entre clientes com risco de cancelamento, a insuficiência caiu de 83,84% para 21,21%.",
          ]}
        />
        <Lista
          titulo="Melhorias realizadas"
          itens={[
            "Limpeza auditável de dados_gb, com marcação dos valores imputados.",
            "Plano Intenso para fechar o buraco entre 55 e 90 GB.",
            "Penalidade assimétrica, margem de picos e termo de preço testados um de cada vez.",
            "Interface que valida entrada e explica cada plano.",
          ]}
        />
        <Lista
          titulo="Dificuldades"
          itens={[
            "Cobertura custa dinheiro: o preço médio subiu R$ 4,70 e 60,42% pagariam mais.",
            "Com consumo +20%, só 40,83% mantêm a mesma recomendação.",
            "Clientes de 26-40 anos ficaram com a maior insuficiência recomendada (29,41%).",
            "O rótulo perfil_grupo não diferenciava ninguém.",
          ]}
        />
      </div>
    </Secao>
  );
}

function Hipotese({ titulo, eixo, dados, veredito }: { titulo: string; eixo: string; dados: Exp[]; veredito: string }) {
  return (
    <div className="rounded-3xl border border-ink-foreground/15 p-5">
      <div className="flex items-center justify-between gap-2">
        <p className="font-display text-lg font-semibold">{titulo}</p>
        <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">{veredito}</span>
      </div>
      <table className="mt-3 w-full text-xs tabular">
        <thead className="text-ink-muted">
          <tr>
            <th className="py-1 text-left font-medium">{eixo}</th>
            <th className="py-1 text-right font-medium">preço médio</th>
            <th className="py-1 text-right font-medium">insuf. top-1</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((d) => (
            <tr key={d.rotulo} className="border-t border-ink-foreground/10">
              <td className="py-1">{d.rotulo}</td>
              <td className="py-1 text-right">{brl(d.preco)}</td>
              <td className="py-1 text-right">{num(d.insuf1, 2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Lista({ titulo, itens }: { titulo: string; itens: string[] }) {
  return (
    <div>
      <h3 className="text-2xl font-semibold">{titulo}</h3>
      <ul className="mt-5 space-y-3">
        {itens.map((t) => (
          <li key={t} className="flex gap-3 text-sm text-ink-foreground/85">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* 06 — CONCLUSÃO */
function Conclusao() {
  return (
    <Secao id="conclusao" n="06" kicker="Conclusão e próximos passos" titulo="Penalizar a falta funciona. O preço precisa ser dosado.">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-6 text-lg leading-relaxed">
          <p>
            Olhar só para os GB deixa metade das primeiras recomendações sem franquia suficiente. Quando o modelo passa a considerar
            as quatro dimensões, a <strong>penalizar mais a falta do que a sobra</strong> e a reservar uma margem para picos, a
            insuficiência cai de forma consistente.
          </p>
          <p className="text-muted-foreground">
            O preço é a força contrária: com peso 0,8 o preço médio cai para R$ 92,86, mas 65% das indicações voltam a estourar. A
            configuração final (penalidade 3, margem 10%, preço 0,2) é um ponto de equilíbrio — não o mais barato, nem o mais
            seguro.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["Aprendizado", "Uma baseline simples é indispensável: sem ela, nenhuma melhoria tem medida."],
            ["Aprendizado", "Mudar uma coisa por vez deixou claro o que causou cada efeito."],
            ["Aprendizado", "Atributos sensíveis ficam fora do modelo, mas dentro da auditoria."],
            ["Aprendizado", "Indicadores de laboratório não provam satisfação real de clientes."],
          ].map(([k, t], i) => (
            <div key={i} className="rounded-3xl bg-muted p-5">
              <p className="kicker text-muted-foreground">{k}</p>
              <p className="mt-3 font-medium">{t}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20">
        <h3 className="text-2xl font-semibold">Próximos passos</h3>
        <div className="mt-6 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {[
            ["Outros catálogos", "Testar com catálogos diferentes e com o catálogo vigente."],
            ["Dados reais autorizados", "Validar com consumo real, com consentimento e anonimização."],
            ["Outros pesos", "Explorar combinações e um ajuste por perfil de uso."],
            ["Validação com pessoas", "Medir com atendentes e clientes se a explicação ajuda a decidir."],
          ].map(([t, d], i) => (
            <div key={t} className="bg-card p-6">
              <p className="font-mono text-xs text-primary">→ {String(i + 1).padStart(2, "0")}</p>
              <p className="mt-4 font-display text-lg font-semibold">{t}</p>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>

    </Secao>
  );
}

function Agradecimentos() {
  const parceiros = [
    { nome: "Claro", src: "/claro.png", fundo: "bg-white" },
    { nome: "SoulCode", src: "/soulcode.png", fundo: "bg-white" },
    { nome: "Favela Gaming", src: "/favela-gaming.png", fundo: "bg-ink-foreground/10" },
  ];
  return (
    <Secao id="agradecimentos" n="07" kicker="Agradecimentos" titulo="Uma jornada construída em conjunto." escuro>
      <div className="grid items-start gap-12 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-ink-foreground/85">
          <p>
            Chegamos ao final deste bootcamp de LLM com o coração cheio de gratidão e a sensação de que essa jornada foi muito além do aprendizado técnico. Foi uma oportunidade de compartilhar conhecimentos, trocar experiências, superar desafios e descobrir novas possibilidades na área de tecnologia e inteligência artificial.
          </p>
          <p>
            Agradecemos à Claro, à SoulCode e à Favela Gaming por tornarem essa experiência possível e por acreditarem na educação e na tecnologia como ferramentas de transformação, inclusão e construção de novas oportunidades.
          </p>
          <p>
            Nosso agradecimento especial à professora Alanis, pela dedicação, paciência, ensinamentos e por contribuir de forma tão importante para o nosso desenvolvimento ao longo dessa caminhada.
          </p>
          <p>
            Encerramos esse ciclo levando novos conhecimentos, conexões, aprendizados e a motivação para continuar evoluindo e colocando em prática tudo o que construímos juntos.
          </p>
          <p>
            Obrigada a todos que fizeram parte dessa jornada! Que este seja apenas o começo de muitas conquistas, novas oportunidades e projetos incríveis.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {parceiros.map((parceiro) => (
            <div key={parceiro.nome} className={`flex min-h-32 items-center justify-center rounded-xl p-6 ${parceiro.fundo}`}>
              <img src={parceiro.src} alt={`Logo da ${parceiro.nome}`} className="max-h-20 max-w-full object-contain" />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-16 border-t border-ink-foreground/15 pt-10">
        <p className="kicker text-accent">Equipe Atlantis</p>
        <p className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight md:text-6xl">Obrigada. Perguntas?</p>
      </div>
      <img
        src="/equipe-atlantis.jpg"
        alt="Arte da equipe Atlantis em um cenário de fantasia"
        className="mt-10 max-h-[36rem] w-full max-w-md rounded-xl border border-ink-foreground/15 object-contain"
      />
    </Secao>
  );
}
