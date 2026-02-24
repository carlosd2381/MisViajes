'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { getUiText, resolveLocale, withLocalePath } from '../lib/i18n/locale';

export function AppHeader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = resolveLocale(searchParams.get('lang') ?? undefined);
  const nextLocale = locale === 'es' ? 'en' : 'es';
  const text = getUiText(locale);

  const href = (path: string) => withLocalePath(path, locale);
  const toggleHref = withLocalePath(pathname || '/', nextLocale);

  return (
    <header className="app-header">
      <nav className="app-nav">
        <strong>{text.appName}</strong>
        <Link href={href('/')}>{text.nav.home}</Link>
        <Link href={href('/dashboard')}>{text.nav.dashboard}</Link>
        <Link href={href('/movil')}>{text.nav.mobile}</Link>
        <Link href={href('/auth/login')}>{text.nav.login}</Link>
        <Link href={toggleHref} className="locale-switch">
          {locale === 'es' ? 'EN' : 'ES'}
        </Link>
      </nav>
    </header>
  );
}
