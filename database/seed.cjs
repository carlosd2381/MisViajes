const path = require('node:path');
const dotenv = require('dotenv');
const { fakerES_MX: faker } = require('@faker-js/faker');
const {
  PrismaClient,
  UserRole,
  LeadStatus,
  TripStatus,
  ItineraryItemType,
  OpportunityStage,
  TaskStatus,
  TaskPriority,
  PaymentMethod,
  PaymentStatus,
  InvoiceStatus,
  CommunicationChannel,
  CommunicationDirection,
  TemplateLanguage,
  DocumentCategory,
  DocumentType,
  DocumentValidationStatus,
} = require('../apps/api/src/generated/prisma');

const prisma = new PrismaClient();

dotenv.config({ path: path.resolve(__dirname, '../.env'), quiet: true });
if (!process.env.DATABASE_URL) {
  dotenv.config({ path: path.resolve(__dirname, '../.env.local'), quiet: true });
}
if (!process.env.DATABASE_URL) {
  dotenv.config({ path: path.resolve(__dirname, '../.env.example'), quiet: true });
}

const toInt = (value, fallback) => {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const pick = (enumObj) => faker.helpers.arrayElement(Object.values(enumObj));

const dayOffset = (min, max) =>
  faker.date.soon({ days: faker.number.int({ min, max }) });

async function clearData() {
  await prisma.communication.deleteMany();
  await prisma.messageTemplate.deleteMany();
  await prisma.document.deleteMany();
  await prisma.task.deleteMany();
  await prisma.quote.deleteMany();
  await prisma.opportunity.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.itineraryItem.deleteMany();
  await prisma.trip.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.client.deleteMany();
  await prisma.user.deleteMany();
}

async function createUsers(totalUsers) {
  const users = [];

  users.push(
    await prisma.user.create({
      data: {
        email: 'admin@misviajes.mx',
        fullName: 'Administrador MisViajes',
        role: UserRole.ADMIN,
      },
    }),
  );

  for (let index = 0; index < totalUsers - 1; index += 1) {
    const rolePool = [UserRole.SENIOR_AGENT, UserRole.AGENT, UserRole.OPERATIONS];
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const emailLocal = `${firstName}.${lastName}.${index}`
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .replace(/[^a-zA-Z0-9.]/g, '')
      .toLowerCase();

    const user = await prisma.user.create({
      data: {
        email: `${emailLocal}@misviajes.mx`,
        fullName: `${firstName} ${lastName}`,
        role: faker.helpers.arrayElement(rolePool),
      },
    });

    users.push(user);
  }

  return users;
}

async function createClients(totalClients) {
  const clients = [];

  for (let index = 0; index < totalClients; index += 1) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    const client = await prisma.client.create({
      data: {
        fullName: `${firstName} ${lastName}`,
        email: faker.internet.email({
          firstName,
          lastName,
          provider: 'correo.mx',
        }),
        phone: faker.phone.number('+52 55 #### ####'),
        preferredMethod: faker.helpers.arrayElement(['WhatsApp', 'Email']),
        budgetRange: faker.helpers.arrayElement([
          '20k-50k',
          '50k-100k',
          '100k-250k',
          '250k+',
        ]),
        travelStyle: faker.helpers.arrayElement([
          'solo',
          'couple',
          'family',
          'group',
          'corporate',
        ]),
      },
    });

    clients.push(client);
  }

  return clients;
}

async function run() {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      'DATABASE_URL no definido. Crea un archivo .env con una conexión PostgreSQL válida.',
    );
  }

  const seedValue = Number.parseInt(process.env.SEED_VALUE ?? '20260223', 10);
  faker.seed(seedValue);

  const totalUsers = toInt(process.env.SEED_USERS, 8);
  const totalClients = toInt(process.env.SEED_CLIENTS, 40);
  const totalTrips = toInt(process.env.SEED_TRIPS, 60);
  const totalLeads = toInt(process.env.SEED_LEADS, 45);
  const totalOpportunities = toInt(process.env.SEED_OPPORTUNITIES, 35);
  const totalTasks = toInt(process.env.SEED_TASKS, 70);
  const totalPayments = toInt(process.env.SEED_PAYMENTS, 50);
  const totalInvoices = toInt(process.env.SEED_INVOICES, 45);
  const totalCommunications = toInt(process.env.SEED_COMMUNICATIONS, 65);
  const totalDocuments = toInt(process.env.SEED_DOCUMENTS, 55);

  await clearData();

  const users = await createUsers(totalUsers);
  const clients = await createClients(totalClients);

  const leads = [];
  for (let index = 0; index < totalLeads; index += 1) {
    const client = faker.helpers.arrayElement(clients);
    const assignedAgent = faker.helpers.arrayElement(users);

    const lead = await prisma.lead.create({
      data: {
        source: faker.helpers.arrayElement([
          'Meta Ads',
          'Google Ads',
          'Referido',
          'Web Orgánico',
          'WhatsApp',
        ]),
        score: faker.helpers.arrayElement(['HOT', 'WARM', 'COLD']),
        status: pick(LeadStatus),
        expectedBudget: faker.number.int({ min: 20000, max: 350000 }),
        timeline: faker.helpers.arrayElement([
          'Este mes',
          'Próximos 3 meses',
          'Próximos 6 meses',
        ]),
        clientId: client.id,
        assignedAgentId: assignedAgent.id,
      },
    });

    leads.push(lead);
  }

  const trips = [];
  for (let index = 0; index < totalTrips; index += 1) {
    const client = faker.helpers.arrayElement(clients);
    const startDate = dayOffset(5, 220);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + faker.number.int({ min: 3, max: 12 }));

    const trip = await prisma.trip.create({
      data: {
        title: `${faker.location.city()} ${faker.helpers.arrayElement([
          'Escapada',
          'Circuito',
          'Aventura',
          'Luna de miel',
        ])}`,
        status: pick(TripStatus),
        startDate,
        endDate,
        notes: faker.lorem.sentence(),
        clientId: client.id,
      },
    });

    trips.push(trip);

    const itinerarySize = faker.number.int({ min: 2, max: 6 });
    for (let dayNumber = 1; dayNumber <= itinerarySize; dayNumber += 1) {
      await prisma.itineraryItem.create({
        data: {
          tripId: trip.id,
          dayNumber,
          startTime: `${faker.number.int({ min: 7, max: 12 })}:00`,
          endTime: `${faker.number.int({ min: 13, max: 22 })}:00`,
          itemType: pick(ItineraryItemType),
          title: faker.helpers.arrayElement([
            'Vuelo principal',
            'Check-in hotel',
            'Tour guiado',
            'Traslado privado',
            'Actividad libre',
          ]),
          description: faker.lorem.sentence(),
          confirmation: faker.string.alphanumeric({ length: 8 }).toUpperCase(),
          providerName: faker.company.name(),
          location: faker.location.city(),
        },
      });
    }
  }

  const opportunities = [];
  for (let index = 0; index < totalOpportunities; index += 1) {
    const client = faker.helpers.arrayElement(clients);
    const lead = faker.helpers.arrayElement(leads);
    const trip = faker.helpers.arrayElement(trips);
    const assignedAgent = faker.helpers.arrayElement(users);

    const opportunity = await prisma.opportunity.create({
      data: {
        title: `Propuesta ${faker.location.city()} ${index + 1}`,
        stage: pick(OpportunityStage),
        dealValue: faker.number.int({ min: 25000, max: 500000 }),
        probability: faker.number.int({ min: 10, max: 95 }),
        expectedCloseDate: dayOffset(7, 120),
        competitorNotes: faker.lorem.sentence(),
        clientId: client.id,
        leadId: lead.id,
        tripId: trip.id,
        assignedAgentId: assignedAgent.id,
      },
    });

    opportunities.push(opportunity);

    const quoteVersions = faker.number.int({ min: 1, max: 3 });
    for (let version = 1; version <= quoteVersions; version += 1) {
      await prisma.quote.create({
        data: {
          opportunityId: opportunity.id,
          version,
          title: `Cotización v${version}`,
          amount: faker.number.int({ min: 20000, max: 450000 }),
          expiresAt: dayOffset(10, 45),
          notes: faker.lorem.sentence(),
        },
      });
    }
  }

  for (let index = 0; index < totalTasks; index += 1) {
    const assignedTo = faker.helpers.arrayElement(users);
    const createdBy = faker.helpers.arrayElement(users);
    const opportunity = faker.helpers.arrayElement(opportunities);

    await prisma.task.create({
      data: {
        title: faker.helpers.arrayElement([
          'Seguimiento con cliente',
          'Validar disponibilidad hotel',
          'Enviar propuesta final',
          'Confirmar pago anticipo',
          'Revisar documentación visa',
        ]),
        description: faker.lorem.sentence(),
        dueDate: dayOffset(1, 30),
        status: pick(TaskStatus),
        priority: pick(TaskPriority),
        relatedType: 'opportunity',
        relatedId: opportunity.id,
        opportunityId: opportunity.id,
        assignedToId: assignedTo.id,
        createdById: createdBy.id,
      },
    });
  }

  for (let index = 0; index < totalPayments; index += 1) {
    const trip = faker.helpers.arrayElement(trips);
    const status = pick(PaymentStatus);
    const dueDate = dayOffset(1, 60);

    await prisma.payment.create({
      data: {
        tripId: trip.id,
        clientId: trip.clientId,
        amount: faker.number.int({ min: 3000, max: 120000 }),
        method: pick(PaymentMethod),
        status,
        dueDate,
        paidAt: status === PaymentStatus.PAID ? dayOffset(1, 20) : null,
        reference: faker.string.alphanumeric({ length: 10 }).toUpperCase(),
        notes: faker.lorem.sentence(),
      },
    });
  }

  for (let index = 0; index < totalInvoices; index += 1) {
    const trip = faker.helpers.arrayElement(trips);
    const subtotal = faker.number.int({ min: 10000, max: 250000 });
    const iva = Number((subtotal * 0.16).toFixed(2));
    const total = subtotal + iva;
    const status = pick(InvoiceStatus);

    await prisma.invoice.create({
      data: {
        tripId: trip.id,
        clientId: trip.clientId,
        status,
        rfc: faker.string.alpha({ length: 4, casing: 'upper' }) +
          faker.date.birthdate({ min: 21, max: 65, mode: 'age' })
            .toISOString()
            .slice(2, 10)
            .replace(/-/g, '') +
          faker.string.alphanumeric({ length: 3, casing: 'upper' }),
        cfdiUse: faker.helpers.arrayElement(['G03', 'S01', 'P01']),
        folio: `FAC-${faker.string.numeric({ length: 6 })}`,
        uuid: faker.string.uuid(),
        subtotal,
        iva,
        total,
        issuedAt: dayOffset(1, 30),
        dueDate: dayOffset(10, 80),
        paidAt: status === InvoiceStatus.PAID ? dayOffset(2, 40) : null,
        pdfUrl: faker.internet.url(),
        notes: faker.lorem.sentence(),
      },
    });
  }

  const templates = [
    {
      key: 'welcome-new-lead',
      name: 'Bienvenida nuevo lead',
      channel: CommunicationChannel.WHATSAPP,
      language: TemplateLanguage.BILINGUAL,
      body: '¡Hola {{nombre}}! Thanks for contacting MisViajes. ¿Te comparto opciones hoy mismo?',
    },
    {
      key: 'quote-follow-up',
      name: 'Seguimiento cotización',
      channel: CommunicationChannel.EMAIL,
      language: TemplateLanguage.BILINGUAL,
      subject: 'Seguimiento de propuesta / Quote follow-up',
      body: 'Hola {{nombre}}, te compartimos seguimiento de tu propuesta. Let us know if you need updates.',
    },
    {
      key: 'payment-reminder',
      name: 'Recordatorio de pago',
      channel: CommunicationChannel.WHATSAPP,
      language: TemplateLanguage.ES,
      body: 'Te recordamos que tienes un pago próximo de tu viaje {{viaje}}.',
    },
    {
      key: 'document-request',
      name: 'Solicitud de documentos',
      channel: CommunicationChannel.EMAIL,
      language: TemplateLanguage.BILINGUAL,
      subject: 'Documentación pendiente / Pending documents',
      body: 'Por favor comparte tu documentación pendiente para continuar con la reserva.',
    },
  ];

  for (const template of templates) {
    await prisma.messageTemplate.create({ data: template });
  }

  const templateRecords = await prisma.messageTemplate.findMany({ where: { isActive: true } });

  for (let index = 0; index < totalCommunications; index += 1) {
    const client = faker.helpers.arrayElement(clients);
    const trip = faker.helpers.arrayElement(trips);
    const template = faker.helpers.arrayElement(templateRecords);

    await prisma.communication.create({
      data: {
        clientId: client.id,
        tripId: faker.datatype.boolean({ probability: 0.7 }) ? trip.id : null,
        channel: template.channel,
        direction: pick(CommunicationDirection),
        language: template.language,
        subject: template.subject,
        message: template.body,
        templateKey: template.key,
        externalId: faker.string.alphanumeric({ length: 12 }).toUpperCase(),
        sentAt: dayOffset(1, 30),
        openedAt: faker.datatype.boolean({ probability: 0.55 }) ? dayOffset(1, 35) : null,
      },
    });
  }

  for (let index = 0; index < totalDocuments; index += 1) {
    const trip = faker.helpers.arrayElement(trips);
    const client = faker.helpers.arrayElement(clients);

    const category = faker.helpers.arrayElement([
      DocumentCategory.CLIENT,
      DocumentCategory.BOOKING,
      DocumentCategory.AGENCY,
    ]);

    const docTypePool = {
      [DocumentCategory.CLIENT]: [
        DocumentType.PASSPORT,
        DocumentType.VISA,
        DocumentType.VACCINATION,
        DocumentType.INSURANCE,
        DocumentType.WAIVER,
      ],
      [DocumentCategory.BOOKING]: [
        DocumentType.SUPPLIER_CONFIRMATION,
        DocumentType.VOUCHER,
        DocumentType.INVOICE,
        DocumentType.RECEIPT,
        DocumentType.CANCELLATION,
      ],
      [DocumentCategory.AGENCY]: [
        DocumentType.CONTRACT,
        DocumentType.RATE_SHEET,
        DocumentType.SOP,
        DocumentType.OTHER,
      ],
    };

    await prisma.document.create({
      data: {
        clientId: category === DocumentCategory.AGENCY ? null : client.id,
        tripId: category === DocumentCategory.BOOKING ? trip.id : null,
        category,
        docType: faker.helpers.arrayElement(docTypePool[category]),
        validationStatus: pick(DocumentValidationStatus),
        title: faker.helpers.arrayElement([
          'Pasaporte vigente',
          'Voucher hotel',
          'Seguro de viaje',
          'Factura CFDI',
          'Contrato proveedor',
        ]),
        fileName: `${faker.system.fileName({ extensionCount: 1 })}.pdf`,
        fileUrl: faker.internet.url(),
        expiresAt: faker.datatype.boolean({ probability: 0.35 }) ? dayOffset(60, 360) : null,
        notes: faker.lorem.sentence(),
      },
    });
  }

  console.log('✅ Seed completado');
  console.table({
    users: totalUsers,
    clients: totalClients,
    leads: totalLeads,
    trips: totalTrips,
    opportunities: totalOpportunities,
    tasks: totalTasks,
    payments: totalPayments,
    invoices: totalInvoices,
    communications: totalCommunications,
    documents: totalDocuments,
    seedValue,
  });
}

run()
  .catch((error) => {
    console.error('❌ Error en seed', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
