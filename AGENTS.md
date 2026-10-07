<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

# Guidelines for AI Agents & Developers

## 1. Local Assets Architecture
- **No `.asset.json` in components**: Lovable commits `.asset.json` metadata stubs while keeping binary assets in external Cloudflare R2 buckets. In this repository, all assets were downloaded to `src/assets/` as real binary files (`.jpg`, `.png`) to make the project 100% independent of Lovable preview hosts.
- **Direct Imports**: All components (`chrome.tsx`, `hero.tsx`, `portfolio.tsx`, `sections.tsx`) import image files directly (`import logo from "@/assets/mtr-logo.png"`). Never revert them to `.asset.json`.
- **Download Automation**: If new `.asset.json` stubs are pulled from Lovable, run `npm run assets:download` (`scripts/download-assets.mjs`) to fetch the binary assets locally.

## 2. Favicons & Brand Assets
- High-resolution favicon generated from `src/assets/mtr-logo.png`.
- Output files: `public/favicon.ico` (multi-res 16–256px), `public/favicon.png` (192px), `public/apple-touch-icon.png` (180px).
- Defined in `src/routes/__root.tsx` head links.

## 3. Runtime & Build Target (Nitro)
- Configured in `vite.config.ts`: `nitro: { preset: process.env.NITRO_PRESET || "node-server" }`.
- Default build targets a standalone Node.js server (`.output/server/index.mjs`) instead of Cloudflare Workers.
- Production startup command: `npm run start` (starts `.output/server/index.mjs` on `PORT=3000`).

## 4. Docker & Coolify Deployment
- **Dockerfile**: Multi-stage lightweight build (`node:22-alpine`), exposing port `3000`.
- **CI/CD Workflow**: `.github/workflows/coolify-deploy.yml` triggers automated deploy to Coolify instance (`aguiardev.online`) on every push/merge to `main`.
- **Authentication**: Uses repository secret `COOLIFY_API_TOKEN` via Bearer header.
