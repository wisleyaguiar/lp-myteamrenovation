#!/usr/bin/env bash
# PreToolUse guard: enforces the "Never in this repository" rules from AGENTS.md.
input=$(cat)
tool=$(jq -r '.tool_name' <<<"$input")

if [[ "$tool" == "Bash" ]]; then
  cmd=$(jq -r '.tool_input.command // ""' <<<"$input")
  if grep -qE 'git[[:space:]]+push' <<<"$cmd" && grep -qE '(^|[[:space:]])(-f|--force|--force-with-lease)([[:space:]=]|$)|[[:space:]]\+[^[:space:]]' <<<"$cmd"; then
    echo "Bloqueado: force push reescreve o histórico sincronizado com o Lovable (AGENTS.md)." >&2
    exit 2
  fi
  exit 0
fi

file=$(jq -r '.tool_input.file_path // ""' <<<"$input")
if grep -qE '(routeTree\.gen\.ts|\.asset\.json|package-lock\.json|bun\.lock)$' <<<"$file"; then
  echo "Bloqueado: $file é gerado/protegido (AGENTS.md). Use o comando que o gera." >&2
  exit 2
fi
exit 0
