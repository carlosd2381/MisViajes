# MisViajes CRM

![CI](https://github.com/carlosd2381/MisViajes/actions/workflows/ci.yml/badge.svg)

Monorepo modular para CRM de agencia de viajes mexicana.

## Estructura
- `apps/web`: Frontend (Next.js)
- `apps/api`: Backend (NestJS)
- `packages/shared`: Tipos/utilidades compartidas
- `database`: Esquema de datos (Prisma)
- `docs`: Planeación, diccionario de datos y documentación técnica

## Requisitos
- Node.js 20+
- pnpm 10+

## Inicio rápido
0. Inicia Docker Desktop (requerido para `pnpm db:up`)
1. `pnpm install`
2. `pnpm db:up` (PostgreSQL local con Docker)
3. `pnpm db:push` (crea/actualiza tablas)
4. `pnpm exec prisma generate --schema database/schema.prisma`
5. `pnpm db:seed:small` (datos de muestra)
6. `pnpm dev:web` (frontend)
7. `pnpm dev:api` (backend)

## Datos de muestra dinámicos (seed)
- Seed completo: `pnpm db:seed`
- Seed rápido (dataset más pequeño): `pnpm db:seed:small`
- Encender/apagar base local: `pnpm db:up` / `pnpm db:down`
- Personalización por entorno (ejemplo):
  - `SEED_VALUE=20260223 SEED_CLIENTS=25 SEED_TRIPS=30 pnpm db:seed`

Variables soportadas:
- `SEED_VALUE` (semilla reproducible)
- `SEED_USERS`, `SEED_CLIENTS`, `SEED_LEADS`, `SEED_TRIPS`
- `SEED_OPPORTUNITIES`, `SEED_TASKS`, `SEED_PAYMENTS`, `SEED_INVOICES`
- `SEED_COMMUNICATIONS`, `SEED_DOCUMENTS`

## Convenciones clave
- UI CRM en español.
- Plantillas de comunicación bilingües ES/EN.
- Cambios a entidades deben actualizar:
  - `database/schema.prisma`
  - `docs/data-dictionary.md`

## QA y seguridad
- QA completo: `pnpm qa`
- QA rápido: `pnpm qa:quick`
- Typecheck: `pnpm typecheck`
- Lint manual: `pnpm qa:lint`

Seguridad API (MVP):
- Headers seguros con `helmet`
- CORS configurable por `CORS_ORIGINS`
- `JWT_SECRET` obligatorio al iniciar API
- Endpoint de readiness: `GET /api/health/ready`

## Despliegue
- Guía operativa: `docs/deployment-runbook.md`
- Protección de rama (GitHub): `docs/branch-protection.md`
