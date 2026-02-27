"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { CalculationResults } from "./results-display";
import type { TaxSettings } from "@/lib/definitions";
import { AnimatedCurrency } from "./animated-currency";

const ResultRow = ({
  label,
  value,
  isMain = false,
}: {
  label: React.ReactNode;
  value: number;
  isMain?: boolean;
}) => {
  // Anti-wrapping and dynamic scaling logic
  const valueStr = value.toLocaleString();
  const estimatedLength = Math.floor(value).toLocaleString().length + 4;
  let sizeClass;

  if (isMain) {
    if (estimatedLength > 18) {
      sizeClass = "text-base";
    } else if (estimatedLength > 15) {
      sizeClass = "text-lg";
    } else if (estimatedLength > 12) {
      sizeClass = "text-xl";
    } else {
      sizeClass = "text-2xl";
    }
  } else {
    if (estimatedLength > 18) {
      sizeClass = "text-[10px]";
    } else if (estimatedLength > 15) {
      sizeClass = "text-xs";
    } else {
      sizeClass = "text-sm";
    }
  }

  return (
    <div className="flex justify-between items-start py-2.5 gap-2">
      <dt className="text-muted-foreground/80 text-xs font-medium pt-0.5 leading-tight">{label}</dt>
      <dd
        className={cn(
          "font-bold text-right whitespace-nowrap break-keep shrink-0",
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
          <p className="text-muted-foreground/80 max-w-2xl text-sm">
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
                "flex flex-col glass-container border-white/10 animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-700 ease-out fill-mode-backwards",
                index === 0 ? "delay-0" : index === 1 ? "delay-150" : "delay-300"
              )}
            >
              <CardHeader className="pb-4 pt-8">
                <div className="text-center">
                  <div className="text-5xl font-black text-primary mb-1 drop-shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                    {level * 100}%
                  </div>
                  <CardDescription className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground/70">
                    Proposed Assessment Level
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-grow space-y-1 px-6 pb-8">
                <ResultRow
                  label="Current Yearly Tax"
                  value={currentTax}
                />
                
                <Separator className="my-4 bg-white/5" />
                
                <div className="text-center pb-3">
                  <div className="text-[10px] font-black uppercase tracking-widest text-primary/80">
                    RPVARA
                  </div>
                  <div className="text-[9px] font-bold uppercase tracking-tight text-muted-foreground/60">
                    (Est. Yearly Tax)
                  </div>
                </div>

                 <ResultRow
                  label={<span>2028<br/><span className="text-[10px] opacity-60">(Capped at 6%)</span></span>}
                  value={yearlyTax2028Capped}
                />
                <ResultRow
                  label="2029 & 2030"
                  value={yearlyTaxRPVARA}
                  isMain={true}
                />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}