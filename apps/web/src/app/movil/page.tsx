import Link from 'next/link';
import { fetchApi } from '../../lib/api';
import { resolveLocale, withLocalePath } from '../../lib/i18n/locale';

export const dynamic = 'force-dynamic';

type MobileSummary = {
  resumen: {
    tareasHoy: number;
    salidasProximas: number;
    clientesRecientes: number;
  };
  alertas: {
    pagosUrgentes: number;
    documentosPendientes: number;
  };
  tareasHoy: Array<{
    id: string;
    titulo: string;
    estado: string;
    vence: string | null;
    asignadoA: string;
  }>;
  salidasProximas: Array<{
    id: string;
    viaje: string;
    cliente: string;
    fechaSalida: string | null;
    estado: string;
  }>;
  clientesRecientes: Array<{
    id: string;
    nombre: string;
    telefono: string | null;
    email: string | null;
    contactoPreferido: string | null;
  }>;
};

function formatDate(value: string | null) {
  if (!value) return 'Sin fecha';
  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function MovilPage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const locale = resolveLocale(params.lang);

  let data: MobileSummary | null = null;

  try {
    data = await fetchApi<MobileSummary>('/api/dashboard/movil');
  } catch {
    data = null;
  }

  return (
    <main>
      <h1 className="page-title">{locale === 'en' ? 'Mobile view' : 'Vista móvil'}</h1>
      <p className="page-subtitle">
        {locale === 'en'
          ? 'Quick summary for agents on the move.'
          : 'Resumen rápido para agentes en movimiento.'}
      </p>

      {!data ? <p className="text-muted">{locale === 'en' ? 'Could not load API information.' : 'No se pudo cargar información del API.'}</p> : null}

      {data ? (
        <>
          <div className="grid-mobile-cards">
            <article className="card">
              <h2 className="card-title">{locale === 'en' ? 'Today' : 'Hoy'}</h2>
              <p className="text-tight">{locale === 'en' ? 'Tasks' : 'Tareas'}: {data.resumen.tareasHoy}</p>
              <p className="text-tight">{locale === 'en' ? 'Departures' : 'Salidas'}: {data.resumen.salidasProximas}</p>
              <p className="text-tight">{locale === 'en' ? 'Clients' : 'Clientes'}: {data.resumen.clientesRecientes}</p>
            </article>

            <article className="card">
              <h2 className="card-title">{locale === 'en' ? 'Alerts' : 'Alertas'}</h2>
              <p className="text-tight">{locale === 'en' ? 'Urgent payments' : 'Pagos urgentes'}: {data.alertas.pagosUrgentes}</p>
              <p className="text-tight">{locale === 'en' ? 'Pending docs' : 'Docs pendientes'}: {data.alertas.documentosPendientes}</p>
            </article>
          </div>

          <section className="card section-gap">
            <h2 className="card-title">{locale === 'en' ? "Today's tasks" : 'Tareas del día'}</h2>
            {data.tareasHoy.length === 0 ? <p>{locale === 'en' ? 'No tasks for today.' : 'Sin tareas para hoy.'}</p> : null}
            <ul className="list-compact">
              {data.tareasHoy.map((task) => (
                <li key={task.id} className="list-item">
                  <strong>{task.titulo}</strong> · {task.estado} · {formatDate(task.vence)}
                </li>
              ))}
            </ul>
          </section>

          <section className="card section-gap">
            <h2 className="card-title">{locale === 'en' ? 'Upcoming departures' : 'Salidas próximas'}</h2>
            {data.salidasProximas.length === 0 ? <p>{locale === 'en' ? 'No departures in the next 48 hours.' : 'Sin salidas en las próximas 48 horas.'}</p> : null}
            <ul className="list-compact">
              {data.salidasProximas.map((trip) => (
                <li key={trip.id} className="list-item">
                  <strong>{trip.viaje}</strong> · {trip.cliente} · {formatDate(trip.fechaSalida)}
                </li>
              ))}
            </ul>
          </section>

          <section className="card section-gap">
            <h2 className="card-title">{locale === 'en' ? 'Quick actions' : 'Acciones rápidas'}</h2>
            <div className="quick-links">
              <Link href={withLocalePath('/tareas', locale)}>{locale === 'en' ? 'View tasks' : 'Ver tareas'}</Link>
              <Link href={withLocalePath('/crm/clientes', locale)}>{locale === 'en' ? 'Search client' : 'Buscar cliente'}</Link>
              <Link href={withLocalePath('/documentos', locale)}>{locale === 'en' ? 'Review documents' : 'Revisar documentos'}</Link>
              <Link href={withLocalePath('/reportes', locale)}>{locale === 'en' ? 'View reports' : 'Ver reportes'}</Link>
            </div>
          </section>
        </>
      ) : null}
    </main>
  );
}
