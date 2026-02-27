"use client";

import { useState, useEffect } from 'react';
import { Building2, Loader2, Map as MapIcon, Home as HomeIcon } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BuildingCalculator, { type BuildingCalculationResults } from '@/components/building-calculator';
import { BuildingResultsDisplay } from '@/components/building-results-display';
import { CalculationBreakdown } from '@/components/calculation-breakdown';

export default function Home() {
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [buildingResults, setBuildingResults] = useState<BuildingCalculationResults | null>(null);
  const [settings, setSettings] = useState<TaxSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const localSettings = localStorage.getItem('tax-settings');
      if (localSettings) {
        setSettings(JSON.parse(localSettings));
      } else {
        setSettings(initialTaxSettings);
        localStorage.setItem('tax-settings', JSON.stringify(initialTaxSettings));
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
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
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/60 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg backdrop-blur-md border border-primary/20">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-xl font-extrabold tracking-tighter md:text-2xl text-primary drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]">
              TaxWise Parañaque
            </h1>
          </div>
          <div className="flex items-center gap-1">
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
            <Tabs defaultValue="land" className="w-full space-y-12">
              <div className="flex justify-center">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="land" className="flex items-center gap-2">
                    <MapIcon className="h-4 w-4" />
                    Land Valuation
                  </TabsTrigger>
                  <TabsTrigger value="building" className="flex items-center gap-2">
                    <HomeIcon className="h-4 w-4" />
                    Building & Improvements
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent 
                value="land" 
                forceMount
                className="m-0 focus-visible:ring-0 data-[state=inactive]:hidden data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-8 duration-600 ease-in-out"
              >
                <div className={cn(
                  'grid grid-cols-1 items-start gap-8',
                  results ? 'lg:grid-cols-5' : 'lg:justify-items-center'
                )}>
                  <div className={cn(
                    'w-full space-y-12',
                    results ? 'lg:col-span-3' : 'max-w-3xl'
                  )}>
                    <TaxCalculator setResults={setResults} settings={settings} />
                    {results && (
                      <div className="space-y-12">
                        <div className="lg:hidden">
                          <ResultsDisplay results={results} />
                        </div>
                        <AssessmentLevelResults
                          results={results}
                          settings={settings}
                        />
                        <CalculationBreakdown results={results} />
                      </div>
                    )}
                  </div>
                  {results && (
                    <div className="hidden lg:block lg:col-span-2 lg:sticky lg:top-24">
                      <ResultsDisplay results={results} />
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent 
                value="building" 
                forceMount
                className="m-0 focus-visible:ring-0 data-[state=inactive]:hidden data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-8 duration-600 ease-in-out"
              >
                <div className={cn(
                  'grid grid-cols-1 items-start gap-8',
                  buildingResults ? 'lg:grid-cols-5' : 'lg:justify-items-center'
                )}>
                  <div className={cn(
                    'w-full space-y-12',
                    buildingResults ? 'lg:col-span-3' : 'max-w-3xl'
                  )}>
                    <BuildingCalculator setResults={setBuildingResults} />
                    {buildingResults && (
                      <div className="space-y-12">
                        <div className="lg:hidden">
                          <BuildingResultsDisplay results={buildingResults} mode="summary" />
                        </div>
                        <BuildingResultsDisplay results={buildingResults} mode="impact" />
                      </div>
                    )}
                  </div>
                  {buildingResults && (
                    <div className="hidden lg:block lg:col-span-2 lg:sticky lg:top-24">
                      <BuildingResultsDisplay results={buildingResults} mode="summary" />
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="text-center text-destructive glass-container p-12">
              Failed to load application settings. Please try again later.
            </div>
          )}
        </div>
      </main>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <div className="flex flex-col gap-2 rounded-full border border-white/10 bg-background/60 p-2 backdrop-blur-xl">
          <AboutDialog />
          <ContactSupportButton />
        </div>
      </div>

      <footer className="border-t border-white/5 py-6 md:px-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground/60 md:text-left"></p>
        </div>
      </footer>
    </div>
  );
}
