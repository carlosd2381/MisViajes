export type Locale = 'es' | 'en';

export function resolveLocale(raw?: string | string[]): Locale {
  const value = Array.isArray(raw) ? raw[0] : raw;
  return value === 'en' ? 'en' : 'es';
}

export function withLocalePath(path: string, locale: Locale) {
  const separator = path.includes('?') ? '&' : '?';
  return `${path}${separator}lang=${locale}`;
}

export function getUiText(locale: Locale) {
  const isEn = locale === 'en';

  return {
    appName: 'MisViajes CRM',
    nav: {
      home: isEn ? 'Home' : 'Inicio',
      dashboard: isEn ? 'Dashboard' : 'Dashboard',
      mobile: isEn ? 'Mobile View' : 'Vista móvil',
      login: isEn ? 'Login' : 'Login',
    },
    common: {
      openModule: isEn ? 'Open module' : 'Abrir módulo',
      apiUnavailable: isEn ? 'Could not load data from API.' : 'No se pudo cargar datos reales del API.',
    },
  };
}
