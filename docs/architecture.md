# Arquitectura inicial (MVP)

## Stack seleccionado
- Frontend: Next.js (App Router)
- Backend: NestJS
- Base de datos: PostgreSQL + Prisma
- Monorepo: pnpm workspaces

## Estructura
- `apps/web`: interfaz CRM (español por defecto)
- `apps/api`: API modular (auth, users, crm, bookings, etc.)
- `packages/shared`: tipos y contratos compartidos
- `database`: esquema Prisma y migraciones
- `docs`: planificación, arquitectura, diccionario de datos

## Principios
- Módulos pequeños y desacoplados.
- Contratos compartidos tipados.
- Seguridad por roles desde el inicio.
- Trazabilidad de cambios de datos en schema + diccionario.

## Autenticación y roles (estado actual)
- Estrategia JWT con `passport-jwt`.
- Endpoints iniciales:
	- `POST /api/auth/login`
	- `GET /api/auth/me` (Bearer token)
	- `GET /api/auth/admin-check` (Bearer token + rol ADMIN)
- Usuario de desarrollo inicial:
	- `admin@misviajes.mx`
	- `Admin1234!`

## CRM Contactos (estado actual)
- Endpoints protegidos con JWT:
	- `GET /api/crm/clientes`
	- `GET /api/crm/clientes/:id`
	- `POST /api/crm/clientes`
	- `GET /api/crm/leads`
	- `GET /api/crm/leads/:id`
	- `POST /api/crm/leads`
- Persistencia activa con Prisma/PostgreSQL.

## Itinerarios y reservas (estado actual)
- Endpoints protegidos con JWT:
	- `GET /api/reservas/viajes`
	- `GET /api/reservas/viajes/:id`
	- `POST /api/reservas/viajes`
	- `GET /api/reservas/viajes/:id/itinerario`
	- `POST /api/reservas/viajes/:id/itinerario`
	- `PATCH /api/reservas/viajes/:id/status`
- Persistencia activa con Prisma/PostgreSQL.

## Pipeline y tareas (estado actual)
- Endpoints protegidos con JWT:
	- `GET /api/pipeline/oportunidades`
	- `GET /api/pipeline/oportunidades/:id`
	- `POST /api/pipeline/oportunidades`
	- `PATCH /api/pipeline/oportunidades/:id/etapa`
	- `GET /api/pipeline/oportunidades/:id/cotizaciones`
	- `POST /api/pipeline/oportunidades/:id/cotizaciones`
	- `GET /api/tareas`
	- `GET /api/tareas/:id`
	- `POST /api/tareas`
	- `PATCH /api/tareas/:id/status`
- Persistencia activa con Prisma/PostgreSQL.

## Finanzas y facturación (estado actual)
- Endpoints protegidos con JWT:
	- `GET /api/payments`
	- `POST /api/payments`
	- `PATCH /api/payments/:id/status`
	- `GET /api/invoices`
	- `POST /api/invoices`
	- `PATCH /api/invoices/:id/status`
- Persistencia activa con Prisma/PostgreSQL.

## Comunicación y documentos (estado actual)
- Endpoints protegidos con JWT:
	- `GET /api/comunicaciones`
	- `POST /api/comunicaciones`
	- `GET /api/comunicaciones/plantillas`
	- `POST /api/comunicaciones/plantillas`
	- `GET /api/documentos`
	- `POST /api/documentos`
	- `PATCH /api/documentos/:id/validacion`
- Persistencia activa con Prisma/PostgreSQL.

## Prisma (estado actual)
- Esquema fuente: `database/schema.prisma`
- Cliente generado: `apps/api/src/generated/prisma`
- Comando de generación:
	- `pnpm exec prisma generate --schema database/schema.prisma`

## Monitoreo básico (estado actual)
- Endpoint público:
	- `GET /api/health` (estado API + conteos por entidad para validación rápida de seed)

## Dashboard y reportes (estado actual)
- Endpoints públicos de analítica MVP:
	- `GET /api/dashboard/resumen`
	- `GET /api/dashboard/movil`
	- `GET /api/reportes/resumen`
- Consumidos por frontend en:
	- `/dashboard`
	- `/movil`
	- `/reportes`

## i18n y estilo consistente (estado actual)
- Frontend con selector de idioma `ES/EN` por query param `?lang=es|en`.
- Navegación y pantallas principales con textos localizables.
- Sistema de estilos reutilizables centralizado en `globals.css` para cards, grids, formularios y tipografía.

## QA, seguridad y despliegue (estado actual)
- Seguridad API:
	- `helmet` habilitado
	- CORS configurable por `CORS_ORIGINS`
	- `JWT_SECRET` obligatorio al iniciar
	- Puerto configurable por `API_PORT`
- Salud operativa:
	- `GET /api/health`
	- `GET /api/health/ready` (readiness de base de datos)
- QA automatizado:
	- Script local `pnpm qa` (typecheck + build)
	- Workflow CI en `.github/workflows/ci.yml`
- Runbook de despliegue:
	- `docs/deployment-runbook.md`
