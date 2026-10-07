# My Team Renovation — Landing Page Plan

Uma landing page (single page) de alta conversão para a My Team Renovation, seguindo os padrões do site de referência (hero cheio com imagem, CTA em dourado, âncoras internas) mas com identidade visual mais premium — inspirada diretamente na logo: preto, dourado escovado e prata.

## Direção visual

- **Paleta (dark luxury)**: fundo `#0A0A0A` / `#111`, texto `#F5F5F5`, dourado escovado `#C9A24C` → `#E8C77A` (gradiente), prata `#C0C0C0`. Detalhes com linhas douradas finas (como na logo).
- **Tipografia**: display serifada condensada para títulos (Playfair Display ou Cormorant) + sans-serif geométrica para corpo (Inter/Manrope). Uppercase com tracking largo para eyebrows/seções, evocando a marca.
- **Elementos de marca**: divisórias finas em dourado, cantos retos (sem excesso de radius), micro-interações discretas em hover (linha dourada crescendo, fade suave).
- **Imagens**: fotos de banheiros/cozinhas de alto padrão (placeholder via Unsplash-like ou gerar hero image).
- **Logo**: usar o PNG anexado no header e footer.

## Estrutura (todos os 16 blocos, single page com âncoras)

1. **Header fixo** — Logo + nav (Why Us, Services, Process, FAQ, Contact) + botão "Free Estimate" em dourado.
2. **Block 1 — Hero**: full-screen dark com imagem de fundo (remodel premium), eyebrow dourada, headline em serifa grande, sub em cinza claro, CTA dourado principal + CTA ghost secundário. Selo pequeno "Owner-Led · Family Operated".
3. **Block 2 — Why Choose Us**: placeholder de vídeo (16:9 com play button dourado) à esquerda; 9 bullets com ícones (Lucide) à direita; parágrafo de fechamento full-width.
4. **Block 3 — What Homeowners Learn Too Late**: 4 cards escuros com "❌ frase" em serifa + resposta em corpo, borda esquerda dourada.
5. **Block 4 — Unique Value Proposition**: seção centralizada com quote grande, parágrafo de apoio, linha dourada separadora.
6. **Block 5 — Core Services**: grid 2x2 de cards com ícones (Bath, LayoutGrid, ChefHat, HardHat) + descrição.
7. **Block 6 — Ideal Client**: split — coluna "Made for" (checks dourados) / coluna "Not for" (X em prata acinzentada).
8. **Block 7 — What's at Risk**: lista com 5 itens em cards horizontais escuros; encerra com pergunta destacada em serifa grande.
9. **Block 8 — Corporate Precision + Local Accountability**: 5 pilares em layout de timeline vertical ou grid.
10. **Block 9 — 7-Step Blueprint**: timeline horizontal (desktop) / vertical (mobile) com números grandes dourados.
11. **Block 10 — Comparison Table**: tabela premium 4 colunas (Feature | Handyman | Big Co. | MTR) com coluna MTR destacada em dourado.
12. **Block 11 — Practical Pathways (home value)**: 5 bullets com ícones em grid.
13. **Block 12 — Emotional Payoff**: seção mais quente/editorial, 4 bullets curtos com imagem lateral.
14. **Block 13 — Request Estimate CTA**: banda dourada com CTA grande.
15. **Block 14 — Application Form**: form validado com Zod (name, email, phone, checkboxes de serviço) — envia via mailto ou apenas exibe toast de sucesso (sem backend nesta fase).
16. **Block 15 — FAQ**: Accordion (shadcn) com 5 perguntas.
17. **Block 16 — Final CTA**: full-width escuro com botão dourado final.
18. **Footer**: Logo, tagline, email, site, copyright, linha dourada no topo.

## Escopo técnico

- **Rotas**: substituir `src/routes/index.tsx` (uma única página). Todos os blocos como componentes em `src/components/landing/`.
- **Design tokens**: atualizar `src/styles.css` — sobrescrever `--background`, `--foreground`, `--primary` (dourado), `--secondary` (prata), adicionar `--gradient-gold`, `--shadow-gold`. Manter tokens semânticos (sem cores hardcoded nos componentes).
- **Fontes**: adicionar `<link>` para Google Fonts (Playfair Display + Inter) em `__root.tsx` head.
- **SEO**: `head()` do `index.tsx` com title/description/OG específicos ("My Team Renovation — Premium Home Remodeling…"). Substituir defaults "Lovable App" no `__root.tsx`.
- **Logo**: registrar via `lovable-assets` a partir de `/mnt/user-uploads/high_resolution_image_MTR_1.png` e importar como asset JSON.
- **Hero image**: gerar imagem de banheiro/cozinha premium via `imagegen` (fast tier).
- **Form**: react-hook-form + zod (já compatível com shadcn), sem backend — toast de confirmação. Se depois quiser envio real, adiciono Lovable Cloud + edge function.
- **Ícones**: lucide-react (já disponível).
- **Componentes shadcn usados**: Button, Card, Accordion, Input, Label, Checkbox, Form, Toaster.
- **Animações**: transições CSS simples + fade-in on scroll leve (IntersectionObserver ou tailwindcss-animate). Sem framer-motion para manter enxuto (posso adicionar se quiser mais movimento).

## Fora de escopo (posso adicionar depois se quiser)

- Envio real do formulário (precisaria Lovable Cloud + email service).
- Galeria "Before & After" com imagens reais (uso placeholders agora).
- Vídeo embed real (uso poster + play button, sem player).
- Múltiplas páginas / blog.

Confirma essa direção que eu implemento tudo de uma vez.
