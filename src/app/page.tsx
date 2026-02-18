"use client";

import { useState, useEffect } from 'react';
import { Building2, Loader2 } from 'lucide-react';
import TaxCalculator from '@/components/tax-calculator';
import { ThemeToggle } from '@/components/theme-toggle';
import { ResultsDisplay, type CalculationResults } from '@/components/results-display';
import { AssessmentLevelResults } from '@/components/assessment-level-results';
import { InstallPWAButton } from '@/components/install-pwa-button';
import type { TaxSettings } from '@/lib/definitions';
import { cn } from '@/lib/utils';
import { AdminPanelDialog } from '@/components/admin-panel-dialog';
import { initialTaxSettings } from '@/lib/tax-settings';
import { ContactSupportButton } from '@/components/contact-support-button';
import { AboutDialog } from '@/components/about-dialog';

export default function Home() {
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [settings, setSettings] = useState<TaxSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This now runs only on the client.
    try {
      const localSettings = localStorage.getItem('tax-settings');
      if (localSettings) {
        setSettings(JSON.parse(localSettings));
      } else {
        // No local settings, use the initial default settings
        setSettings(initialTaxSettings);
        localStorage.setItem('tax-settings', JSON.stringify(initialTaxSettings));
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
      // Fallback to initial settings in case of parsing error
      setSettings(initialTaxSettings);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSettingsChange = (newSettings: TaxSettings) => {
    setSettings(newSettings);
    localStorage.setItem('tax-settings', JSON.stringify(newSettings));
  };


  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Building2 className="h-7 w-7 text-primary" />
            <h1 className="text-xl font-bold tracking-tight md:text-2xl">
              TaxWise Parañaque
            </h1>
          </div>
          <div className="flex items-center">
            <AboutDialog />
            <ContactSupportButton />
            <AdminPanelDialog settings={settings} onSettingsChange={handleSettingsChange} />
            <InstallPWAButton />
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container relative mx-auto max-w-7xl px-4 py-8 md:py-12">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : settings ? (
            <div
              className={cn(
                'grid grid-cols-1 items-start gap-8',
                results ? 'lg:grid-cols-5' : 'lg:justify-items-center'
              )}
            >
              <div
                className={cn(
                  'w-full space-y-8',
                  results ? 'lg:col-span-3' : 'max-w-3xl'
                )}
              >
                <TaxCalculator setResults={setResults} settings={settings} />
                {results && (
                  <>
                    <div className="lg:hidden">
                      <ResultsDisplay results={results} />
                    </div>
                    <AssessmentLevelResults
                      results={results}
                      settings={settings}
                    />
                  </>
                )}
              </div>
              {results && (
                <div className="hidden lg:block lg:col-span-2 lg:sticky lg:top-24">
                  <ResultsDisplay results={results} />
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-destructive">
              Failed to load application settings. Please try again later.
            </div>
          )}
        </div>
      </main>
      <footer className="border-t py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            {/* Footer content can go here */}
          </p>
          <div className="flex items-center">
             {/* Intentionally empty */}
          </div>
        </div>
      </footer>
    </div>
  );
}
