import './global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import SearchDialog from '@/components/search';
import Plausible from '@/components/Plausible';
import { IBM_Plex_Mono, Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.svg',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`dark ${ibmPlexMono.variable} ${inter.variable} ${ibmPlexMono.className}`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen bg-[#09090b]">
        <Plausible />
        <RootProvider
          search={{
            SearchDialog,
          }}
          theme={{
            enabled: false,
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
