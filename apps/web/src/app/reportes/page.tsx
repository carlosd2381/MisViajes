import { fetchApi } from '../../lib/api';
import { resolveLocale } from '../../lib/i18n/locale';

export const dynamic = 'force-dynamic';

type ReportSummary = {
  ventas: {
    reservasTotales: number;
    reservasCompletadas: number;
    conversionLeadsPct: number;
    ingresosCobradosMes: number;
    cuentasPorCobrar: number;
  };
  operacion: {
    tareasVencidas: number;
  };
  pipeline: Record<string, number>;
};

function money(value: number) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(value);
}

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ReportesPage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const locale = resolveLocale(params.lang);

  let summary: ReportSummary | null = null;

  try {
    summary = await fetchApi<ReportSummary>('/api/reportes/resumen');
  } catch {
    summary = null;
  }

  return (
    <main>
      <h1 className="page-title">{locale === 'en' ? 'Reports' : 'Reportes'}</h1>
      <p className="page-subtitle">
        {locale === 'en'
          ? 'Operational and commercial indicators (MVP).'
          : 'Indicadores operativos y comerciales (MVP).'}
      </p>

      {!summary ? <p className="text-muted">{locale === 'en' ? 'Could not load API summary.' : 'No se pudo cargar el resumen desde el API.'}</p> : null}

      {summary ? (
        <div className="grid-reports">
          <article className="card">
            <h2 className="card-title">{locale === 'en' ? 'Sales' : 'Ventas'}</h2>
            <p className="text-tight">{locale === 'en' ? 'Total bookings' : 'Reservas totales'}: {summary.ventas.reservasTotales}</p>
            <p className="text-tight">{locale === 'en' ? 'Completed bookings' : 'Reservas completadas'}: {summary.ventas.reservasCompletadas}</p>
            <p className="text-tight">{locale === 'en' ? 'Lead conversion' : 'Conversión leads'}: {summary.ventas.conversionLeadsPct}%</p>
          </article>

          <article className="card">
            <h2 className="card-title">{locale === 'en' ? 'Cash flow' : 'Flujo financiero'}</h2>
            <p className="text-tight">{locale === 'en' ? 'Collected this month' : 'Cobrado este mes'}: {money(summary.ventas.ingresosCobradosMes)}</p>
            <p className="text-tight">{locale === 'en' ? 'Accounts receivable' : 'Cuentas por cobrar'}: {money(summary.ventas.cuentasPorCobrar)}</p>
          </article>

          <article className="card">
            <h2 className="card-title">{locale === 'en' ? 'Operations' : 'Operación'}</h2>
            <p className="text-tight">{locale === 'en' ? 'Overdue tasks' : 'Tareas vencidas'}: {summary.operacion.tareasVencidas}</p>
            <p className="text-tight">
              Pipeline: {Object.entries(summary.pipeline)
                .slice(0, 3)
                .map(([stage, total]) => `${stage}: ${total}`)
                .join(' · ') || (locale === 'en' ? 'No data' : 'Sin datos')}
            </p>
          </article>
        </div>
      ) : null}
    </main>
  );
}
