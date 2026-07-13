import type { Metadata } from 'next';
import './globals.css';
import { AosProvider } from './_components/aos-provider';
import { AppProviders } from './providers';

export const metadata: Metadata = {
  title: 'IPSUM Pathology | Laboratory & Diagnostic Center',
  description:
    'IPSUM Pathology laboratory and diagnostic center for reliable analysis, pathology, and molecular diagnostics.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full scroll-smooth">
      <body>
        <AppProviders>
          <AosProvider />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
