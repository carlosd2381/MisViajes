# Runbook de Despliegue y Operación (MVP)

## 1) Variables de entorno mínimas
Usar `.env` basado en `.env.example`:

- `DATABASE_URL`
- `JWT_SECRET`
- `API_PORT`
- `CORS_ORIGINS`
- `NODE_ENV`

## 2) Preparación de base de datos
1. `pnpm db:up`
2. `pnpm db:push`
3. `pnpm db:seed:small` (solo ambientes de prueba)

## 3) Validación de calidad antes de release
1. `pnpm exec prisma generate --schema database/schema.prisma`
2. `pnpm qa`

## 4) Ejecución local tipo producción
Backend:
1. `pnpm --filter @misviajes/api build`
2. `pnpm --filter @misviajes/api start`

Frontend:
1. `pnpm --filter @misviajes/web build`
2. `pnpm --filter @misviajes/web start`

## 5) Verificaciones operativas
- Liveness + métricas básicas: `GET /api/health`
- Readiness de DB: `GET /api/health/ready`
- Dashboard KPI: `GET /api/dashboard/resumen`

## 6) Cierre de ambiente local
- `pnpm db:down`

## 7) Recomendaciones de seguridad operativa
- Rotar `JWT_SECRET` periódicamente.
- No ejecutar `db:seed` en producción.
- Limitar `CORS_ORIGINS` a dominios autorizados.
- Ejecutar pipeline CI (`.github/workflows/ci.yml`) en cada PR.
