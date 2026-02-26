"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { CalculationResults } from "./results-display";
import type { TaxSettings } from "@/lib/definitions";
import { AnimatedCurrency } from "./animated-currency";

interface AssessmentLevelResultsProps {
  results: CalculationResults;
  settings: TaxSettings;
}

const ResultRow = ({
  label,
  value,
  isMain = false,
}: {
  label: React.ReactNode;
  value: number;
  isMain?: boolean;
}) => {
  const formattedValue = String(value);
  let sizeClass;

  if (isMain) {
    if (formattedValue.length > 13) {
      sizeClass = "text-lg";
    } else if (formattedValue.length > 10) {
      sizeClass = "text-xl";
    } else {
      sizeClass = "text-2xl";
    }
  } else {
    if (formattedValue.length > 14) {
      sizeClass = "text-xs";
    } else {
      sizeClass = "text-sm";
    }
  }

  return (
    <div className="flex justify-between items-center py-2.5">
      <dt className="text-muted-foreground/80 text-sm font-medium">{label}</dt>
      <dd
        className={cn(
          "font-bold text-right",
          sizeClass,
          isMain ? "text-primary drop-shadow-[0_0_10px_rgba(34,197,94,0.2)]" : "text-foreground/90"
        )}
      >
        <AnimatedCurrency value={value} />
      </dd>
    </div>
  );
};

export function AssessmentLevelResults({
  results,
  settings,
}: AssessmentLevelResultsProps) {
  const isResidential = results.propertyType === "Residential";
  const assessmentLevels = isResidential
    ? [0.05, 0.02, 0.01]
    : [0.1, 0.05, 0.03];
  
  const taxRate = settings.taxRates[results.propertyType] || (isResidential ? 0.02 : 0.03);

  const currentTax = results.currentTax;
  const yearlyTax2028Capped = results.realYearlyTax2028;

  return (
    <div className="mt-12">
       <div className="space-y-2 mb-8 px-0">
          <h3 className="text-2xl font-bold tracking-tight">Assessment Level Impact Analysis</h3>
          <p className="text-muted-foreground/80 max-w-2xl">
            See how different proposed assessment levels affect your estimated tax for 2029 and beyond.
          </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {assessmentLevels.map((level, index) => {
          const assessedValueRPVARA = results.marketValue2029 * level;
          const yearlyTaxRPVARA = assessedValueRPVARA * taxRate;

          return (
            <Card 
              key={level} 
              className={cn(
                "flex flex-col glass-container border-0 shadow-xl animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-700 ease-out fill-mode-backwards",
                index === 0 ? "delay-0" : index === 1 ? "delay-150" : "delay-300"
              )}
            >
              <CardHeader className="pb-6 pt-8">
                <div className="text-center">
                  <div className="text-5xl font-black text-primary mb-2 drop-shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                    {level * 100}%
                  </div>
                  <CardDescription className="font-bold text-xs uppercase tracking-widest text-muted-foreground/70">
                    Proposed Assessment Level
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-grow space-y-4 px-6 pb-8">
                <div className="glass-card p-4 space-y-1 bg-white/5 border-white/5">
                  <ResultRow
                    label="Current Yearly Tax"
                    value={currentTax}
                  />
                  <Separator className="my-2 bg-white/10" />
                  <div className="text-center pb-1">
                    <span className="text-[10px] font-black uppercase tracking-tighter text-primary/80">
                      RPVARA PROJECTIONS
                    </span>
                  </div>
                   <ResultRow
                    label={
                      <span className="text-muted-foreground/80">
                        2028 (6% Cap)
                      </span>
                    }
                    value={yearlyTax2028Capped}
                  />
                  <ResultRow
                    label={<span className="text-muted-foreground/80">2029 & 2030</span>}
                    value={yearlyTaxRPVARA}
                    isMain={true}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}