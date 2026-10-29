# Atlantis: recomendador de planos

Site de apresentação do Projeto 1 do bootcamp de LLM, desenvolvido com apoio da Claro, SoulCode e Favela Gaming. O projeto explora como recomendar planos móveis a partir do perfil mensal de consumo, equilibrando cobertura das necessidades e preço.

- **Site publicado:** [claro-plan-compass.lovable.app](https://claro-plan-compass.lovable.app)
- **Editor Lovable:** [abrir projeto](https://lovable.dev/projects/960c90c0-8fec-436a-a073-9530f3d9843a)

## O que o site apresenta

A apresentação está organizada em sete seções:

1. Capa e contexto do problema.
2. Equipe, objetivo e hipóteses.
3. Recorte, dados, limpeza e catálogo.
4. Etapas do modelo e demonstração do Atlantis.
5. Resultados, experimentos, estabilidade e auditorias.
6. Conclusões e próximos passos.
7. Agradecimentos à Claro, à SoulCode, à Favela Gaming e à professora Alanis.

Na seção de demonstração, a pessoa informa seu consumo mensal de internet, minutos de ligação, horas de streaming e dias em deslocamento. O site valida os valores e apresenta três planos recomendados, a cobertura de cada plano e uma comparação com uma regra simples baseada apenas em GB. As abas também permitem consultar o catálogo e entender os critérios do modelo.

## Como o Atlantis recomenda

O motor é uma implementação determinística em TypeScript das etapas documentadas no notebook do Colab. Ele não usa um serviço de IA, LLM ou conversa livre: recebe os valores do formulário e calcula as recomendações no navegador.

O score combina quatro dimensões, normalizadas pela maior franquia de cada atributo no catálogo. A falta de franquia recebe penalidade 3; a sobra recebe penalidade 1. O cálculo considera margem de 10% sobre o consumo e peso de 0,2 para o preço. Os pesos são 0,4 para internet e 0,2 para cada uma das outras dimensões. Scores menores ficam melhor classificados; em caso de empate, fica à frente o plano mais barato.

A margem ajuda a ordenar as opções, mas a indicação de cobertura é calculada com o consumo informado, sem essa margem. Se nenhum plano cobrir todas as dimensões, o site avisa e ainda apresenta as opções mais próximas pelo score.

## Dados e limitações

Os números exibidos na apresentação foram copiados dos resultados do notebook e estão em `src/lib/dados.ts`. O motor e o catálogo estão em `src/lib/atlantis.ts`. O catálogo é fictício e a demonstração tem finalidade educacional; as recomendações não representam ofertas comerciais da Claro nem substituem validação humana.

O site apresenta estatísticas agregadas e uma amostra de cinco registros, não carrega a base completa de clientes. Não acrescente nem altere números sem conferir os resultados correspondentes no notebook. Quando a lógica ou os resultados do motor mudarem, mantenha os testes alinhados aos valores documentados no Colab.

## Tecnologias

- React 19 e TypeScript.
- TanStack Start e TanStack Router.
- Vite e Tailwind CSS 4.
- Componentes acessíveis baseados em Radix UI, com padrões shadcn/ui.
- Vitest e Testing Library para testes.
- SVGs locais para os QR codes do LinkedIn; imagens das instituições em `public/`.

## Estrutura principal

```text
src/
	components/
		Atlantis.tsx       # Formulário, resultados e catálogo do recomendador
		charts.tsx         # Gráficos usados na apresentação
		ui/                # Componentes reutilizáveis de interface
	lib/
		atlantis.ts        # Catálogo, validação, baseline e motor de recomendação
		dados.ts           # Números transcritos dos resultados do Colab
		atlantis.test.ts   # Testes do motor
	routes/
		index.tsx          # Página única com as seções da apresentação
		__root.tsx         # Layout raiz, metadados e estados de erro
	styles.css           # Tokens visuais e estilos globais
public/                # Logos, favicon e QR codes
```

## Executar localmente

Requisitos: Node.js e npm.

```sh
npm install
npm run dev
```

O Vite informa no terminal o endereço local do site. Para validar o projeto:

```sh
npm test
npm run lint
npm run build
```

## Publicar

O repositório está conectado ao Lovable. Envie as alterações para a branch conectada no GitHub para sincronizá-las com o editor. Para atualizar o site público, abra o projeto no Lovable e use **Publish**. O endereço `localhost` é apenas para desenvolvimento local.
