# Plan de implementación — CRM Agencia de Viajes (México)

Estado del plan: **En curso**
Fuente funcional: `CRM_Project_Blueprint1.md`

## 0) Criterios no negociables
- Todo texto de CRM en español (excepto plantillas bilingües ES/EN).
- Arquitectura modular y archivos pequeños.
- Actualizar diccionario de datos + esquema en cada cambio de modelo.
- Estilo moderno/divertido y consistente.
- Seguimiento de avance en este archivo.

## 1) Fase de cimientos (Semana 1)
**Objetivo:** definir stack, arquitectura, convenciones y base técnica.

### Entregables
- Decisión de stack frontend/backend/base de datos.
- Estructura de monorepo o repos separados.
- Sistema de diseño base (tokens + componentes reutilizables).
- Estrategia i18n (UI ES por defecto + plantillas ES/EN).
- Matriz de roles/permisos inicial.

### Estado
- [ ] Pendiente
- [ ] En progreso
- [x] Completado

## 2) Fase de datos y seguridad (Semana 1–2)
**Objetivo:** preparar núcleo de datos y cumplimiento.

### Entregables
- `data-dictionary` inicial.
- `schema` inicial con versionado.
- Modelo de auditoría (quién/qué/cuándo).
- Base de cumplimiento LFPDPPP (consentimiento, minimización, retención).
- Autenticación + autorización por rol (Admin, Senior, Agent, Ops).

### Estado
- [ ] Pendiente
- [ ] En progreso
- [x] Completado

## 3) Fase CRM Core (Semana 2–3)
**Objetivo:** contactos, leads y proveedores.

### Entregables
- Perfiles de cliente completos.
- Gestión de leads (estado, scoring, origen, asignación).
- Contactos de proveedores y comisiones base.
- Historial de comunicación unificado (estructura inicial).

### Estado
- [ ] Pendiente
- [x] En progreso
- [ ] Completado

## 4) Fase Itinerarios y Reservas (Semana 3–5)
**Objetivo:** construir el corazón operativo.

### Entregables
- Trip Builder modular (componentes por tipo de servicio).
- Flujo de estados de reserva (Inquiry → Completed/Cancelled).
- Soporte para reservas grupales (rooming list, pagos divididos).
- Generación de itinerario para cliente (PDF/propuesta marca agencia).

### Estado
- [ ] Pendiente
- [ ] En progreso
- [ ] Completado

## 5) Fase Ventas, tareas y automatizaciones (Semana 5–6)
**Objetivo:** aumentar conversión y consistencia operativa.

### Entregables
- Oportunidades con valor/probabilidad/cierre esperado.
- Cotizaciones versionadas + plantillas + expiración.
- Workflows automáticos por eventos clave.
- Tareas manuales + integración calendario Google/Outlook.

### Estado
- [ ] Pendiente
- [ ] En progreso
- [ ] Completado

## 6) Fase Finanzas México (Semana 6–8)
**Objetivo:** control financiero y fiscal.

### Entregables
- Tracking de pagos (SPEI, tarjeta, OXXO, efectivo).
- Facturación CFDI 4.0 (estructura e integración objetivo).
- Comisiones proveedor/agente + conciliación.
- Reportes básicos P&L por reserva.

### Estado
- [ ] Pendiente
- [ ] En progreso
- [ ] Completado

## 7) Fase Comunicaciones y Documentos (Semana 8–9)
**Objetivo:** centralizar interacción y archivos.

### Entregables
- Integración email + WhatsApp (prioritaria) + SMS.
- Biblioteca de plantillas ES/EN.
- Gestión documental cliente/reserva/agencia.
- Alertas de expiración (pasaporte/visa).

### Estado
- [ ] Pendiente
- [ ] En progreso
- [ ] Completado

## 8) Fase Dashboard, reportes y móvil (Semana 9–10)
**Objetivo:** visibilidad operativa y trabajo en campo.

### Entregables
- Dashboard con widgets clave (día, pipeline, alertas, métricas).
- Reportes ventas/finanzas/operación/marketing.
- Experiencia móvil para agentes (tareas, lookup, notificaciones, offline parcial).

### Estado
- [ ] Pendiente
- [ ] En progreso
- [ ] Completado

## 9) Fase Integraciones externas (paralela por prioridad)
**Objetivo:** conectar ecosistema externo de forma controlada.

### Prioridad de integración
1. WhatsApp Business API
2. Email (Gmail/Outlook)
3. Calendario (Google/Outlook)
4. Pasarelas de pago (Stripe/Mercado Pago/PayPal/Clip)
5. Facturación/contabilidad (QuickBooks/Contpaqi)
6. APIs hoteleras (Booking/Expedia/directas)

### Estado
- [ ] Pendiente
- [ ] En progreso
- [ ] Completado

## 10) QA, hardening y salida a producción (Semana 10–12)
**Objetivo:** estabilizar, asegurar y desplegar.

### Entregables
- Pruebas unitarias/integración/e2e de flujos críticos.
- Logging, monitoreo y trazabilidad de eventos.
- Revisión seguridad + permisos + protección de PII.
- Checklist de despliegue y plan de rollback.

### Estado
- [ ] Pendiente
- [ ] En progreso
- [ ] Completado

---

## Backlog priorizado (MVP)
1. Auth + Roles
2. Client Profiles + Leads
3. Pipeline + Tareas
4. Trip Builder básico
5. Cotizaciones versionadas
6. Pagos y vencimientos
7. Dashboard operativo
8. WhatsApp + Email

## Riesgos principales
- Complejidad regulatoria CFDI 4.0.
- Dependencia y costos de APIs externas.
- Calidad de datos inicial y migración.
- Control de permisos por rol en módulos financieros.

## Definiciones de avance
- **Pendiente:** no iniciado.
- **En progreso:** en desarrollo activo.
- **Completado:** implementado + validado + documentado (schema/dictionary actualizados).
