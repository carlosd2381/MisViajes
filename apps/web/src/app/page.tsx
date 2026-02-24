import Link from 'next/link';
import { getUiText, resolveLocale, withLocalePath } from '../lib/i18n/locale';

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function HomePage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const locale = resolveLocale(params.lang);
  const text = getUiText(locale);

  return (
    <main>
      <section className="card">
        <h1 className="page-title">{text.appName}</h1>
        <p className="page-subtitle">
          {locale === 'en'
            ? 'Initial project foundation ready to continue with MVP modules.'
            : 'Base del proyecto inicial lista para continuar con módulos del MVP.'}
        </p>
        <ul>
          <li>
            <Link href={withLocalePath('/dashboard', locale)}>
              {locale === 'en' ? 'Go to dashboard' : 'Ir al dashboard'}
            </Link>
          </li>
          <li>
            <Link href={withLocalePath('/auth/login', locale)}>
              {locale === 'en' ? 'Go to login' : 'Ir al login'}
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
