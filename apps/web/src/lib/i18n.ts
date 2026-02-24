export const defaultLocale = 'es-MX';

export const supportedLocales = ['es-MX', 'en-US'] as const;

export type AppLocale = (typeof supportedLocales)[number];
