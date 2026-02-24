import Link from 'next/link';
import { fetchApi } from '../../lib/api';
import { getUiText, resolveLocale, withLocalePath } from '../../lib/i18n/locale';

export const dynamic = 'force-dynamic';

type DashboardSummary = {
  myDay: {
    tareasPendientesHoy: number;
    pagosPorVencerHoy: number;
    salidasHoy: number;
  };
  pipeline: Record<string, number>;
  alertas: {
    pagosVencidos: number;
    pasaportesPorVencer6Meses: number;
    documentosPendientesValidacion: number;
  };
  performance: {
    reservasMes: number;
    conversionLeadsPct: number;
    ingresosCobradosMes: number;
  };
  specialDates: {
    cumpleaniosHoy: number;
    aniversariosHoy: number;
  };
};

const widgets = [
  { title: 'Mi día', href: '/tareas' },
  { title: 'Resumen del pipeline', href: '/pipeline' },
  { title: 'Alertas urgentes', href: '/documentos' },
  { title: 'Métricas de desempeño', href: '/reportes' },
  { title: 'Cumpleaños y aniversarios', href: '/crm/clientes' },
];

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function DashboardPage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const locale = resolveLocale(params.lang);
  const text = getUiText(locale);

  let summary: DashboardSummary | null = null;

  try {
    summary = await fetchApi<DashboardSummary>('/api/dashboard/resumen');
  } catch {
    summary = null;
  }

  return (
    <main>
      <h1 className="page-title">{locale === 'en' ? 'Dashboard' : 'Dashboard'}</h1>
      <p className="page-subtitle">
        {locale === 'en' ? 'Operational MVP overview for the CRM.' : 'Vista operativa inicial del CRM (MVP).'}
      </p>
      <div className="grid-responsive">
        {widgets.map((widget) => (
          <article key={widget.title} className="card">
            <h2 className="card-title">{widget.title}</h2>
            {widget.title === 'Mi día' && summary ? (
              <p className="text-tight text-muted">
                {summary.myDay.tareasPendientesHoy} tareas · {summary.myDay.pagosPorVencerHoy} pagos · {summary.myDay.salidasHoy} salidas hoy.
              </p>
            ) : null}
            {widget.title === 'Resumen del pipeline' && summary ? (
              <p className="text-tight text-muted">
                {Object.entries(summary.pipeline)
                  .slice(0, 3)
                  .map(([stage, total]) => `${stage}: ${total}`)
                  .join(' · ') || 'Sin oportunidades registradas.'}
              </p>
            ) : null}
            {widget.title === 'Alertas urgentes' && summary ? (
              <p className="text-tight text-muted">
                {summary.alertas.pagosVencidos} pagos vencidos · {summary.alertas.documentosPendientesValidacion} documentos pendientes.
              </p>
            ) : null}
            {widget.title === 'Métricas de desempeño' && summary ? (
              <p className="text-tight text-muted">
                Reservas mes: {summary.performance.reservasMes} · Conversión: {summary.performance.conversionLeadsPct}%.
              </p>
            ) : null}
            {widget.title === 'Cumpleaños y aniversarios' && summary ? (
              <p className="text-tight text-muted">
                Cumpleaños: {summary.specialDates.cumpleaniosHoy} · Aniversarios: {summary.specialDates.aniversariosHoy}.
              </p>
            ) : null}
            {!summary ? (
              <p className="text-tight text-muted">{text.common.apiUnavailable}</p>
            ) : null}
            <p className="text-tight">
              <Link href={withLocalePath(widget.href, locale)}>{text.common.openModule}</Link>
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
