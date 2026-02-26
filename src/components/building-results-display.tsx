"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { BuildingCalculationResults } from "./building-calculator";
import { AnimatedCurrency } from "./animated-currency";

interface BuildingResultsDisplayProps {
  results: BuildingCalculationResults;
  mode?: 'summary' | 'impact';
}

const InfoRow = ({
  label,
  value,
  isCurrency = false,
}: {
  label: string;
  value: string | number;
  isCurrency?: boolean;
}) => {
  const valueStr = String(value);
  let sizeClass = "";
  if (valueStr.length > 15) {
    sizeClass = "text-xs";
  }

  return (
    <div className="flex justify-between py-2.5 text-sm border-b border-white/5 last:border-0">
      <dt className="text-muted-foreground/80 font-medium">{label}</dt>
      <dd className={cn("font-semibold text-right whitespace-nowrap break-keep", sizeClass)}>
        {isCurrency && typeof value === 'number' ? (
          <AnimatedCurrency value={value} />
        ) : (
          value
        )}
      </dd>
    </div>
  );
};

const SummaryResultRow = ({
  label,
  value,
}: {
  label: React.ReactNode;
  value: number;
}) => {
  const estimatedLength = Math.floor(value).toLocaleString().length + 4;
  let sizeClass;

  if (estimatedLength > 18) {
    sizeClass = "text-xl";
  } else if (estimatedLength > 15) {
    sizeClass = "text-2xl";
  } else if (estimatedLength > 12) {
    sizeClass = "text-3xl";
  } else {
    sizeClass = "text-4xl";
  }

  return (
    <div className="flex justify-between items-center py-4">
      <dt className="text-muted-foreground/90 text-lg font-medium">{label}</dt>
      <dd className={cn("font-bold text-primary text-right tracking-tight drop-shadow-[0_0_15px_rgba(34,197,94,0.3)] whitespace-nowrap break-keep", sizeClass)}>
        <AnimatedCurrency value={value} />
      </dd>
    </div>
  );
};

const ImpactResultRow = ({
  label,
  value,
  isMain = false,
}: {
  label: React.ReactNode;
  value: number;
  isMain?: boolean;
}) => {
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
    <div className="flex justify-between items-start py-2.5">
      <dt className="text-muted-foreground/80 text-xs font-medium mr-2 pt-0.5 leading-tight">{label}</dt>
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

export function BuildingResultsDisplay({ results, mode = 'summary' }: BuildingResultsDisplayProps) {
  if (mode === 'summary') {
    return (
      <div className="animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-700 ease-out">
        <Card className="glass-container border-0 overflow-hidden shadow-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl">Tax Calculation</CardTitle>
            <CardDescription className="text-muted-foreground/80">
              Estimated building & improvements tax breakdown.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="glass-card p-4 space-y-1">
              <InfoRow label="Building Type" value={results.buildingType} />
              <InfoRow label="Type (Quality Level)" value={`Level ${results.qualityLevel}`} />
              <InfoRow label="Property Classification" value={results.classification} />
              <InfoRow label="Floor Area" value={`${results.floorArea} sq.m`} />
              <InfoRow label="Market Value" value={results.marketValue} isCurrency={true} />
              <InfoRow label="Assessed Value (Current)" value={results.currentAssessedValue} isCurrency={true} />
              <InfoRow label="Assessment Level (Current)" value={`${(results.currentAssessmentLevel * 100).toFixed(0)}%`} />
            </div>
            <div className="pt-2">
              <SummaryResultRow
                label="Current Yearly Tax"
                value={results.currentYearlyTax}
              />
            </div>
          </CardContent>
          <CardFooter className="bg-white/5 dark:bg-white/5 py-4">
            <p className="text-center text-[10px] uppercase tracking-widest font-bold text-muted-foreground/60 w-full">
              Official tax computation may vary
            </p>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <div className="space-y-2 mb-8 px-0">
        <h3 className="text-2xl font-bold tracking-tight">Assessment Level Impact Analysis</h3>
        <p className="text-muted-foreground/80 max-w-2xl text-sm">
          See how different proposed assessment levels affect your estimated tax for buildings and improvements.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProposalCard 
          title="PROPOSAL 1" 
          currentTax={results.currentYearlyTax}
          proposalTax={results.p1YearlyTax}
          proposalAL={results.p1AssessmentLevel}
          proposalAV={results.p1AssessedValue}
          delayClass="delay-0"
        />
        <ProposalCard 
          title="PROPOSAL 2" 
          currentTax={results.currentYearlyTax}
          proposalTax={results.p2YearlyTax}
          proposalAL={results.p2AssessmentLevel}
          proposalAV={results.p2AssessedValue}
          delayClass="delay-150"
        />
        <ProposalCard 
          title="PROPOSAL 3" 
          currentTax={results.currentYearlyTax}
          proposalTax={results.p3YearlyTax}
          proposalAL={results.p3AssessmentLevel}
          proposalAV={results.p3AssessedValue}
          delayClass="delay-300"
        />
      </div>
    </div>
  );
}

function ProposalCard({ title, currentTax, proposalTax, proposalAL, proposalAV, delayClass }: { 
  title: string; 
  currentTax: number; 
  proposalTax: number; 
  proposalAL: number;
  proposalAV: number;
  delayClass: string;
}) {
  return (
    <Card className={cn(
      "flex flex-col glass-container border-white/10 shadow-2xl animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-700 ease-out fill-mode-backwards",
      delayClass
    )}>
      <CardHeader className="pb-4 pt-8">
        <div className="text-center">
          <div className="text-5xl font-black text-primary mb-1 drop-shadow-[0_0_20px_rgba(34,197,94,0.4)]">
            {(proposalAL * 100).toFixed(0)}%
          </div>
          <CardDescription className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground/70">
            Proposed Assessment Level
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-1 px-6 pb-8">
        <ImpactResultRow
          label="Current Yearly Tax"
          value={currentTax}
        />
        
        <Separator className="my-4 bg-white/5" />
        
        <div className="text-center pb-3">
          <div className="text-[10px] font-black uppercase tracking-widest text-primary/80">
            {title}
          </div>
          <div className="text-[9px] font-bold uppercase tracking-tight text-muted-foreground/60">
            (Est. Yearly Tax)
          </div>
        </div>

        <ImpactResultRow
          label="Assessed Value"
          value={proposalAV}
        />
        <ImpactResultRow
          label="Estimated Yearly Tax"
          value={proposalTax}
          isMain={true}
        />
      </CardContent>
    </Card>
  );
}
