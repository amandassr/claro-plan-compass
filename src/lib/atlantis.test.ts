import { describe, expect, it } from "vitest";
import { baseline, recomendar, recomendarParaAgente } from "./atlantis";

describe("motor Atlantis (mesmos resultados do notebook)", () => {
  it("cliente 20001: modelo final recomenda Max, Digital, Viagem com os scores do Colab", () => {
    const r = recomendar({ dados_gb: 36.1, minutos: 569, streaming_horas: 13.5, deslocamento_dias: 8 });
    expect(r.map((x) => x.plano)).toEqual(["Max", "Digital", "Viagem"]);
    expect(r.map((x) => Number(x.score.toFixed(4)))).toEqual([0.2716, 0.3025, 0.4197]);
  });

  it("cliente 20001: baseline recomenda Digital, Streaming, Viagem", () => {
    const b = baseline({ dados_gb: 36.1, minutos: 569, streaming_horas: 13.5, deslocamento_dias: 8 });
    expect(b.map((x) => x.plano)).toEqual(["Digital", "Streaming", "Viagem"]);
  });

  it("perfil 48 GB / 520 min / 15 h / 6 dias: Max, Intenso, Digital", () => {
    const r = recomendarParaAgente({ dados_gb: 48, minutos: 520, streaming_horas: 15, deslocamento_dias: 6 });
    expect(r.ok && r.recomendacoes.map((x) => x.plano.plano)).toEqual(["Max", "Intenso", "Digital"]);
  });

  it("rejeita valor fora da faixa (internet acima de 300 GB)", () => {
    const r = recomendarParaAgente({ dados_gb: 400, minutos: 500, streaming_horas: 10, deslocamento_dias: 2 });
    expect(r.ok).toBe(false);
  });
});
