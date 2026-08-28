import type { Metadata } from 'next';
import { Geist, Geist_Mono, Outfit } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import { I18nProvider } from 'next-i18next/client';
import { getResources, getT, initServerI18next } from 'next-i18next/server';
import i18nConfig from '../i18n.config';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'App Template',
  description: 'Plex4It Next.js application template',
};

initServerI18next(i18nConfig);

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { i18n, lng } = await getT();
  const resources = getResources(i18n, undefined, [lng, i18nConfig.fallbackLng]);

  return (
    <html
      lang={lng}
      suppressHydrationWarning
      className={cn(
        'h-full',
        'antialiased',
        geistSans.variable,
        geistMono.variable,
        'font-sans',
        outfit.variable
      )}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <I18nProvider resources={resources} language={lng}>
              {children}
              <Toaster position="bottom-right" />
            </I18nProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
