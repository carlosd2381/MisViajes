# Diccionario de Datos — MisViajes CRM

Última actualización: 2026-02-23
Origen de verdad técnico: `database/schema.prisma`

## Regla operativa
Cualquier cambio a entidades/campos debe reflejarse en:
1. `database/schema.prisma`
2. Este archivo (`docs/data-dictionary.md`)

## Entidades

### User
| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| id | String (cuid) | Sí | Identificador único del usuario |
| email | String (unique) | Sí | Correo de acceso |
| fullName | String | Sí | Nombre completo |
| role | UserRole | Sí | Rol (`ADMIN`, `SENIOR_AGENT`, `AGENT`, `OPERATIONS`) |
| createdAt | DateTime | Sí | Fecha de creación |
| updatedAt | DateTime | Sí | Fecha de última actualización |

### Client
| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| id | String (cuid) | Sí | Identificador único del cliente |
| fullName | String | Sí | Nombre completo |
| email | String (unique) | No | Correo principal |
| phone | String | No | Teléfono de contacto |
| preferredMethod | String | No | Método preferido (`WhatsApp`/`Email`) |
| budgetRange | String | No | Rango de presupuesto por viaje |
| travelStyle | String | No | Estilo de viaje |
| createdAt | DateTime | Sí | Fecha de creación |
| updatedAt | DateTime | Sí | Fecha de última actualización |

### Lead
| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| id | String (cuid) | Sí | Identificador único del lead |
| source | String | Sí | Origen del lead (Meta, Google, referido, etc.) |
| score | String | No | Temperatura (`HOT`, `WARM`, `COLD`) |
| status | LeadStatus | Sí | Estado comercial |
| lostReason | String | No | Motivo de pérdida |
| expectedBudget | Decimal | No | Presupuesto estimado |
| timeline | String | No | Tiempo estimado de compra |
| clientId | String | Sí | FK a `Client` |
| assignedAgentId | String | No | FK a `User` asignado |
| createdAt | DateTime | Sí | Fecha de creación |
| updatedAt | DateTime | Sí | Fecha de última actualización |

### Trip
| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| id | String (cuid) | Sí | Identificador único del viaje |
| title | String | Sí | Nombre interno del viaje |
| status | TripStatus | Sí | Estado de reserva (Inquiry → Completed/Cancelled) |
| startDate | DateTime | No | Fecha de inicio del viaje |
| endDate | DateTime | No | Fecha de término del viaje |
| notes | String | No | Notas operativas del viaje |
| clientId | String | Sí | FK a `Client` |
| createdAt | DateTime | Sí | Fecha de creación |
| updatedAt | DateTime | Sí | Fecha de última actualización |

### ItineraryItem
| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| id | String (cuid) | Sí | Identificador del elemento de itinerario |
| tripId | String | Sí | FK a `Trip` |
| dayNumber | Int | Sí | Día del itinerario (1..n) |
| startTime | String | No | Hora de inicio |
| endTime | String | No | Hora de fin |
| itemType | ItineraryItemType | Sí | Tipo (`FLIGHT`, `HOTEL`, etc.) |
| title | String | Sí | Título del elemento |
| description | String | No | Descripción detallada |
| confirmation | String | No | Número/código de confirmación |
| providerName | String | No | Proveedor o suplidor |
| location | String | No | Ubicación o punto de encuentro |
| createdAt | DateTime | Sí | Fecha de creación |
| updatedAt | DateTime | Sí | Fecha de última actualización |

### Opportunity
| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| id | String (cuid) | Sí | Identificador de oportunidad |
| title | String | Sí | Nombre de oportunidad |
| stage | OpportunityStage | Sí | Etapa comercial |
| dealValue | Decimal | No | Valor total esperado de venta |
| probability | Int | No | Probabilidad de cierre (0-100) |
| expectedCloseDate | DateTime | No | Fecha esperada de cierre |
| competitorNotes | String | No | Notas de competencia/precio |
| clientId | String | Sí | FK a `Client` |
| leadId | String | No | FK a `Lead` |
| tripId | String | No | FK a `Trip` |
| assignedAgentId | String | No | FK a `User` agente asignado |
| createdAt | DateTime | Sí | Fecha de creación |
| updatedAt | DateTime | Sí | Fecha de última actualización |

### Quote
| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| id | String (cuid) | Sí | Identificador de cotización |
| opportunityId | String | Sí | FK a `Opportunity` |
| version | Int | Sí | Versión incremental de la cotización |
| title | String | No | Título corto de cotización |
| amount | Decimal | No | Monto cotizado |
| expiresAt | DateTime | No | Fecha de vencimiento |
| notes | String | No | Notas comerciales |
| createdAt | DateTime | Sí | Fecha de creación |
| updatedAt | DateTime | Sí | Fecha de última actualización |

### Task
| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| id | String (cuid) | Sí | Identificador de tarea |
| title | String | Sí | Título de tarea |
| description | String | No | Detalle de la tarea |
| dueDate | DateTime | No | Fecha de vencimiento |
| status | TaskStatus | Sí | Estado de tarea |
| priority | TaskPriority | Sí | Prioridad de tarea |
| relatedType | String | No | Tipo de entidad relacionada |
| relatedId | String | No | Id de entidad relacionada |
| opportunityId | String | No | FK a `Opportunity` |
| assignedToId | String | Sí | FK a `User` asignado |
| createdById | String | No | FK a `User` creador |
| createdAt | DateTime | Sí | Fecha de creación |
| updatedAt | DateTime | Sí | Fecha de última actualización |

### Payment
| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| id | String (cuid) | Sí | Identificador de pago |
| tripId | String | Sí | FK a `Trip` |
| clientId | String | Sí | FK a `Client` |
| amount | Decimal | Sí | Monto del pago |
| method | PaymentMethod | Sí | Método de pago |
| status | PaymentStatus | Sí | Estado del pago |
| dueDate | DateTime | No | Fecha límite de pago |
| paidAt | DateTime | No | Fecha/hora de pago |
| reference | String | No | Referencia bancaria o transaccional |
| notes | String | No | Notas internas |
| createdAt | DateTime | Sí | Fecha de creación |
| updatedAt | DateTime | Sí | Fecha de última actualización |

### Invoice
| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| id | String (cuid) | Sí | Identificador de factura |
| tripId | String | Sí | FK a `Trip` |
| clientId | String | Sí | FK a `Client` |
| status | InvoiceStatus | Sí | Estado CFDI/factura |
| rfc | String | No | RFC del receptor |
| cfdiUse | String | No | Uso CFDI |
| folio | String | No | Folio interno/fiscal |
| uuid | String | No | UUID timbrado |
| subtotal | Decimal | No | Subtotal |
| iva | Decimal | No | IVA |
| total | Decimal | No | Total |
| issuedAt | DateTime | No | Fecha de emisión |
| dueDate | DateTime | No | Fecha límite de pago |
| paidAt | DateTime | No | Fecha/hora de pago |
| pdfUrl | String | No | URL del PDF de factura |
| notes | String | No | Notas internas |
| createdAt | DateTime | Sí | Fecha de creación |
| updatedAt | DateTime | Sí | Fecha de última actualización |

### Communication
| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| id | String (cuid) | Sí | Identificador de comunicación |
| clientId | String | Sí | FK a `Client` |
| tripId | String | No | FK a `Trip` |
| channel | CommunicationChannel | Sí | Canal de comunicación |
| direction | CommunicationDirection | Sí | Dirección (`OUTBOUND`/`INBOUND`) |
| language | TemplateLanguage | Sí | Idioma (`ES`, `EN`, `BILINGUAL`) |
| subject | String | No | Asunto del mensaje |
| message | String | Sí | Contenido del mensaje |
| templateKey | String | No | Clave de plantilla aplicada |
| externalId | String | No | Id externo del proveedor (email/WA/SMS) |
| openedAt | DateTime | No | Fecha de apertura/lectura |
| sentAt | DateTime | No | Fecha de envío |
| createdAt | DateTime | Sí | Fecha de creación |
| updatedAt | DateTime | Sí | Fecha de última actualización |

### MessageTemplate
| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| id | String (cuid) | Sí | Identificador de plantilla |
| key | String (unique) | Sí | Clave única para automatizaciones |
| name | String | Sí | Nombre de plantilla |
| channel | CommunicationChannel | Sí | Canal objetivo |
| language | TemplateLanguage | Sí | Idioma de plantilla |
| subject | String | No | Asunto (aplica para email) |
| body | String | Sí | Cuerpo de plantilla |
| isActive | Boolean | Sí | Indica si está activa |
| createdAt | DateTime | Sí | Fecha de creación |
| updatedAt | DateTime | Sí | Fecha de última actualización |

### Document
| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| id | String (cuid) | Sí | Identificador de documento |
| clientId | String | No | FK a `Client` |
| tripId | String | No | FK a `Trip` |
| category | DocumentCategory | Sí | Categoría (`CLIENT`, `BOOKING`, `AGENCY`) |
| docType | DocumentType | Sí | Tipo específico de documento |
| validationStatus | DocumentValidationStatus | Sí | Estado de validación del documento |
| title | String | Sí | Título interno |
| fileName | String | Sí | Nombre del archivo |
| fileUrl | String | Sí | URL/ruta del archivo |
| expiresAt | DateTime | No | Fecha de vencimiento |
| uploadedAt | DateTime | Sí | Fecha de carga |
| notes | String | No | Notas operativas |
| createdAt | DateTime | Sí | Fecha de creación |
| updatedAt | DateTime | Sí | Fecha de última actualización |

## Catálogos

### UserRole
- `ADMIN`
- `SENIOR_AGENT`
- `AGENT`
- `OPERATIONS`

### LeadStatus
- `NEW`
- `CONTACTED`
- `QUALIFIED`
- `PROPOSAL_SENT`
- `NEGOTIATING`
- `CONVERTED`
- `LOST`

### TripStatus
- `INQUIRY`
- `RESEARCH`
- `QUOTED`
- `REVISED`
- `APPROVED`
- `CONFIRMED`
- `FINALIZED`
- `IN_PROGRESS`
- `COMPLETED`
- `CANCELLED`

### ItineraryItemType
- `FLIGHT`
- `HOTEL`
- `TRANSFER`
- `ACTIVITY`
- `CAR_RENTAL`
- `INSURANCE`
- `RESTAURANT`
- `NOTE`

### OpportunityStage
- `NEW`
- `QUOTING`
- `NEGOTIATING`
- `BOOKED`
- `TRAVELING`
- `POST_TRIP`
- `LOST`

### TaskStatus
- `PENDING`
- `IN_PROGRESS`
- `COMPLETED`
- `CANCELLED`

### TaskPriority
- `LOW`
- `MEDIUM`
- `HIGH`
- `URGENT`

### PaymentMethod
- `SPEI`
- `CREDIT_CARD`
- `OXXO`
- `CASH`
- `PAYPAL`
- `MERCADO_PAGO`
- `STRIPE`
- `CLIP`

### PaymentStatus
- `PENDING`
- `PARTIAL`
- `PAID`
- `REFUNDED`
- `OVERDUE`

### InvoiceStatus
- `DRAFT`
- `ISSUED`
- `PAID`
- `CANCELLED`
- `CREDIT_NOTE`

### CommunicationChannel
- `EMAIL`
- `WHATSAPP`
- `SMS`
- `INTERNAL_NOTE`

### CommunicationDirection
- `OUTBOUND`
- `INBOUND`

### TemplateLanguage
- `ES`
- `EN`
- `BILINGUAL`

### DocumentCategory
- `CLIENT`
- `BOOKING`
- `AGENCY`

### DocumentType
- `PASSPORT`
- `VISA`
- `VACCINATION`
- `INSURANCE`
- `WAIVER`
- `SUPPLIER_CONFIRMATION`
- `VOUCHER`
- `INVOICE`
- `RECEIPT`
- `CANCELLATION`
- `CONTRACT`
- `RATE_SHEET`
- `SOP`
- `OTHER`

### DocumentValidationStatus
- `PENDING`
- `VALID`
- `EXPIRED`
- `REJECTED`
