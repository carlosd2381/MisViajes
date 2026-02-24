import './globals.css';
import type { Metadata } from 'next';
import { ReactNode, Suspense } from 'react';
import { AppHeader } from '../components/app-header';

export const metadata: Metadata = {
  title: 'MisViajes CRM',
  description: 'CRM para agencia de viajes mexicana',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Suspense fallback={<header className="app-header" />}>
          <AppHeader />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
