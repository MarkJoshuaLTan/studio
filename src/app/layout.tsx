import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { PWAInstaller } from '@/components/pwa-installer';
import { IntroAnimation } from '@/components/intro-animation';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'TaxWise Parañaque',
  description: 'A modern Real Property Tax Calculator for Parañaque City.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <meta name="theme-color" content="#228B22" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} font-body antialiased min-h-screen relative overflow-x-hidden`}>
        {/* Deep atmospheric background for maximum contrast */}
        <div className="fixed inset-0 -z-10 bg-background overflow-hidden">
          {/* Subtle dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/[0.02]" />
          
          {/* Very subtle glow orbs to prevent flat appearance */}
          <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-primary/[0.03] rounded-full blur-[140px] animate-[pulse_10s_infinite_ease-in-out]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-green-500/[0.02] rounded-full blur-[120px] animate-[pulse_15s_infinite_ease-in-out_3s]" />
          
          {/* Noise texture for that high-end OLED look */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>

        <ThemeProvider>
          <IntroAnimation />
          <PWAInstaller />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
