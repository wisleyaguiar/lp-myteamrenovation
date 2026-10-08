---
name: preflight
description: Roda lint + build e valida .output antes de push para main (CI não faz isso; push em main = deploy Coolify + sync Lovable).
disable-model-invocation: true
---

# Preflight

O CI só dispara o deploy. Tudo que quebrar aqui vai direto para produção.

1. `git status --short` — liste o que será enviado; avise se houver arquivos não rastreados relevantes.
2. `npm run lint` — qualquer erro bloqueia. Corrija ou reporte; não desabilite regras.
3. `npm run build` — deve terminar sem erro.
4. Confirme que `.output/server/index.mjs` existe após o build.
5. Opcional, se o usuário pedir: `PORT=3000 npm run start` em background, `curl -sf localhost:3000 >/dev/null`, depois encerre o processo.

Relate um checklist: ✅/❌ por etapa, com a saída relevante de qualquer falha.
Nunca faça push nem commit nesta skill — só valida.
