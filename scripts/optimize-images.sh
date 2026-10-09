#!/usr/bin/env bash
# Gera derivados otimizados (sem EXIF) de .spec/ajustes-melhorias-lp/fotos-novas/ em src/assets/lp/.
# Idempotente: sobrescreve apenas os próprios derivados; nunca toca nos ativos antigos de src/assets.
set -euo pipefail
cd "$(dirname "$0")/.."
SRC=.spec/ajustes-melhorias-lp/fotos-novas
OUT=src/assets/lp
mkdir -p "$OUT"

# img <entrada> <saída-sem-extensão> <largura-máx> <teto-KB>
# -resize "Nx>" só reduz (sem upscale); -strip remove EXIF/ICC; cwebp roda sem metadados por padrão.
# A qualidade parte de 80 (JPEG) / 72 (WebP) e cai de 4 em 4 até caber no teto (mín. 40); senão, falha.
img() {
  local in="$SRC/$1" base="$OUT/$2" w="$3" max=$(($4 * 1000)) q
  for ((q = 80; q >= 40; q -= 4)); do
    magick "$in" -auto-orient -resize "${w}x>" -strip -sampling-factor 4:2:0 -interlace Plane \
      -quality "$q" "$base.jpg"
    (($(wc -c <"$base.jpg") <= max)) && break
  done
  (($(wc -c <"$base.jpg") <= max)) || { echo "ERRO: $base.jpg acima de $4 KB" >&2; exit 1; }
  for ((q = 72; q >= 40; q -= 4)); do
    magick "$in" -auto-orient -resize "${w}x>" -strip png:- | cwebp -quiet -m 6 -q "$q" -o "$base.webp" -- -
    (($(wc -c <"$base.webp") <= max)) && break
  done
  (($(wc -c <"$base.webp") <= max)) || { echo "ERRO: $base.webp acima de $4 KB" >&2; exit 1; }
}

img 01_hero_desktop.jpg hero-desktop 1920 250
img 01b_hero_mobile.jpg hero-mobile 828 150
img 03_promessa.jpg promessa 1200 200
img 04_galeria_kitchen-remodel_ALTO.jpg gallery-04 720 80
img 05_galeria_marble-shower.jpg gallery-05 800 80
img 06_galeria_custom-kitchen.jpg gallery-06 770 80
img 07_galeria_primary-bathroom_ALTO.jpg gallery-07 720 80
img 08_galeria_walk-in-shower.jpg gallery-08 800 80
img 09_galeria_custom-carpentry.jpg gallery-09 800 80
img 10_galeria_luxury-flooring.jpg gallery-10 800 80
img 11_galeria_hardwood-stairs.jpg gallery-11 800 80
img 12_galeria_NOVA_spa-bathroom.jpg gallery-12 800 80
img 13_galeria_NOVA_shower-with-bench.jpg gallery-13 800 80
img 14_made-for_esquerda.jpg made-for-left 1200 200
img 15_made-for_direita.jpg made-for-right 1200 200
img 17_faixa-larga.jpg wide-banner 1179 80

# Logo: alfa preservado. WebP 600w; fallback PNG32 400w (alfa real, < 120 KB; exibido a ~132 px).
magick "$SRC/18_logo_transparente.png" -strip -resize "400x>" -define png:compression-level=9 \
  PNG32:"$OUT/logo.png"
magick "$SRC/18_logo_transparente.png" -strip -resize "600x>" png:- | cwebp -quiet -m 6 -q 85 -alpha_q 90 -o "$OUT/logo.webp" -- -

# OG 1200x630 (JPEG, sem metadados)
magick "$SRC/19_og-image_compartilhamento.jpg" -resize 1200x630^ -gravity center -extent 1200x630 \
  -strip -sampling-factor 4:2:0 -quality 82 "$OUT/og-image.jpg"
echo "ok: $(ls "$OUT" | wc -l | tr -d ' ') arquivos em $OUT"
