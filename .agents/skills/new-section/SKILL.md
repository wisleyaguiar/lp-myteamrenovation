---
name: new-section
description: Cria uma nova seção da landing page seguindo as convenções de src/components/landing (Section/Eyebrow/Heading/GoldCTA, imports diretos de assets, cn). Use ao adicionar ou reestruturar seções da página.
argument-hint: <NomeDaSecao> [descrição do conteúdo]
---

# Nova seção da landing

Argumentos: `$ARGUMENTS`

## Onde colocar

- Seções de conteúdo: `src/components/landing/sections.tsx`.
- Seções com estado/formulário/accordion: `src/components/landing/interactive.tsx`.
- Portfólio/depoimentos: `src/components/landing/portfolio.tsx`.
- Registre no `<main>` de `src/routes/index.tsx` (import nomeado + posição na ordem).

## Padrão

```tsx
import { Section, Eyebrow, Heading, GoldCTA } from "./primitives";
import someImage from "@/assets/some-image.jpg"; // binário direto, nunca o .asset.json

const ITEMS = [/* dados estáticos em SCREAMING_CASE no topo do arquivo */];

export function FooSection() {
  return (
    <Section id="foo" className="bg-obsidian">
      <Eyebrow>Rótulo curto</Eyebrow>
      <Heading className="mt-6">Título da seção</Heading>
      {/* conteúdo */}
      <GoldCTA>Request an Estimate</GoldCTA>
    </Section>
  );
}
```

## Regras

- Nome `XxxSection`, export nomeado, `id` em kebab-case para âncoras do header.
- Reuse `primitives.tsx` antes de criar markup novo; mescle classes com `cn` de `@/lib/utils`.
- Use tokens do tema (`bg-obsidian`, `text-gold`, `bg-card`, `ring-border`), não cores hex.
- Ícones de `lucide-react`.
- `<img>`: sempre `alt` descritivo, `width`/`height`, e `loading="lazy"` (exceto acima da dobra).
- Copy em inglês (público-alvo do site).
- Ao final rode `npm run lint`.
