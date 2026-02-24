import { LoginForm } from '../../../modules/auth/components/login-form';
import { resolveLocale } from '../../../lib/i18n/locale';

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LoginPage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const locale = resolveLocale(params.lang);

  return (
    <main>
      <section className="card" style={{ maxWidth: 480 }}>
        <h1 className="page-title">{locale === 'en' ? 'Sign in' : 'Iniciar sesión'}</h1>
        <p className="page-subtitle">
          {locale === 'en'
            ? 'Internal access for agency team.'
            : 'Acceso para equipo interno de la agencia.'}
        </p>
        <LoginForm />
      </section>
    </main>
  );
}
