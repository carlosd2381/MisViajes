# Protección de rama recomendada (`main`)

Repositorio: `carlosd2381/MisViajes`
Rama objetivo: `main`

## Opción A: GitHub UI (rápida)
1. Ir a `Settings` → `Branches` → `Add branch protection rule`.
2. Branch name pattern: `main`.
3. Activar:
   - `Require a pull request before merging`
   - `Require approvals` = `1`
   - `Dismiss stale pull request approvals when new commits are pushed`
   - `Require status checks to pass before merging`
   - `Require branches to be up to date before merging`
   - `Require conversation resolution before merging`
   - `Require linear history`
4. En `Status checks`, seleccionar (aparecen tras una corrida completa de CI):
   - `qa (20)`
   - `qa (22)`
5. Guardar la regla.

## Opción B: CLI (cuando tengas `gh`)
Instalar y autenticar:
- `brew install gh`
- `gh auth login`

Aplicar protección por API:

```bash
gh api \
  --method PUT \
  repos/carlosd2381/MisViajes/branches/main/protection \
  --input - <<'JSON'
{
  "required_status_checks": {
    "strict": true,
    "checks": [
      { "context": "qa (20)" },
      { "context": "qa (22)" }
    ]
  },
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "required_approving_review_count": 1,
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": false,
    "require_last_push_approval": false
  },
  "restrictions": null,
  "required_conversation_resolution": true,
  "required_linear_history": true,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "block_creations": false,
  "required_signatures": false,
  "lock_branch": false,
  "allow_fork_syncing": true
}
JSON
```

## Validación
- Abrir PR de prueba contra `main`.
- Confirmar que exige checks `qa (20)` y `qa (22)` y 1 aprobación antes de merge.
