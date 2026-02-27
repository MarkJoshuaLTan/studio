"use client";

import { useState } from "react";
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
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CalculationModal } from "./calculation-modal";

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
  if (valueStr.length > 25) {
    sizeClass = "text-xs";
  } else if (valueStr.length > 15) {
    sizeClass = "text-sm";
  }

  return (
    <div className="flex justify-between py-2.5 text-sm border-b border-white/5 last:border-0 gap-4">
      <dt className="text-muted-foreground/80 font-medium shrink-0">{label}</dt>
      <dd className={cn(
        "font-semibold text-right whitespace-normal break-words min-w-0 flex-1", 
        sizeClass
      )}>
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
  onInfoClick,
}: {
  label: React.ReactNode;
  value: number;
  onInfoClick?: () => void;
}) => {
  const estimatedLength = Math.floor(value).toLocaleString().length + 4;
  let sizeClass;

  if (estimatedLength > 18) sizeClass = "text-lg";
  else if (estimatedLength > 15) sizeClass = "text-xl";
  else if (estimatedLength > 12) sizeClass = "text-2xl";
  else sizeClass = "text-3xl";

  return (
    <div className="flex justify-between items-center py-4 gap-4 group">
      <dt className="flex items-center gap-2">
        <span className="text-muted-foreground/90 text-lg font-medium leading-tight">{label}</span>
        {onInfoClick && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-full text-muted-foreground/20 group-hover:text-primary transition-all"
            onClick={onInfoClick}
          >
            <Calculator className="h-3 w-3" />
          </Button>
        )}
      </dt>
      <dd className={cn(
        "font-bold text-primary text-right tracking-tight drop-shadow-[0_0_15px_rgba(34,197,94,0.3)] whitespace-nowrap break-keep shrink-0", 
        sizeClass
      )}>
        <AnimatedCurrency value={value} />
      </dd>
    </div>
  );
};

const ImpactResultRow = ({
  label,
  value,
}: {
  label: React.ReactNode;
  value: number;
}) => {
  const estimatedLength = Math.floor(value).toLocaleString().length + 4;
  let sizeClass;

  if (estimatedLength > 18) sizeClass = "text-[10px]";
  else if (estimatedLength > 15) sizeClass = "text-xs";
  else sizeClass = "text-sm";

  return (
    <div className="flex justify-between items-start py-2.5 gap-2">
      <dt className="text-muted-foreground/80 text-xs font-medium pt-0.5 leading-tight">{label}</dt>
      <dd
        className={cn(
          "font-bold text-right whitespace-nowrap break-keep shrink-0",
          sizeClass,
          "text-foreground/90"
        )}
      >
        <AnimatedCurrency value={value} />
      </dd>
    </div>
  );
};

export function BuildingResultsDisplay({ results, mode = 'summary' }: BuildingResultsDisplayProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeProposal, setActiveProposal] = useState<'current' | 'p1' | 'p2' | 'p3'>('current');

  if (mode === 'summary') {
    return (
      <div className="animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-700 ease-out">
        <Card className="glass-container border-0 overflow-hidden">
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
                onInfoClick={() => {
                  setActiveProposal('current');
                  setModalOpen(true);
                }}
              />
            </div>
          </CardContent>
          <CardFooter className="bg-white/5 dark:bg-white/5 py-4">
            <p className="text-center text-[10px] uppercase tracking-widest font-bold text-muted-foreground/60 w-full">
              Official tax computation may vary
            </p>
          </CardFooter>
        </Card>

        <CalculationModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          type="building"
          results={results}
          buildingProposal={activeProposal}
        />
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
        {(['p1', 'p2', 'p3'] as const).map((prop, idx) => (
          <ProposalCard 
            key={prop}
            title={`PROPOSAL ${idx + 1}`} 
            currentTax={results.currentYearlyTax}
            proposalTax={results[`${prop}YearlyTax` as keyof BuildingCalculationResults] as number}
            proposalAL={results[`${prop}AssessmentLevel` as keyof BuildingCalculationResults] as number}
            proposalAV={results[`${prop}AssessedValue` as keyof BuildingCalculationResults] as number}
            delayClass={idx === 0 ? "delay-0" : idx === 1 ? "delay-500" : "delay-1000"}
            onInfoClick={() => {
              setActiveProposal(prop);
              setModalOpen(true);
            }}
          />
        ))}
      </div>

      <CalculationModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        type="building"
        results={results}
        buildingProposal={activeProposal}
      />
    </div>
  );
}

function ProposalCard({ title, currentTax, proposalTax, proposalAL, proposalAV, delayClass, onInfoClick }: { 
  title: string; 
  currentTax: number; 
  proposalTax: number; 
  proposalAL: number;
  proposalAV: number;
  delayClass: string;
  onInfoClick: () => void;
}) {
  const estimatedLength = Math.floor(proposalTax).toLocaleString().length + 4;
  let displaySize;
  if (estimatedLength > 18) displaySize = "text-lg";
  else if (estimatedLength > 15) displaySize = "text-xl";
  else if (estimatedLength > 12) displaySize = "text-2xl";
  else displaySize = "text-3xl";

  return (
    <Card className={cn(
      "relative flex flex-col glass-container border-0 animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-1000 ease-out fill-mode-backwards",
      delayClass
    )}>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 h-8 w-8 rounded-full text-muted-foreground/40 hover:text-primary hover:bg-primary/10 transition-all duration-300 z-20"
        onClick={onInfoClick}
      >
        <Calculator className="h-4 w-4" />
      </Button>

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
        <ImpactResultRow
          label="Assessed Value"
          value={proposalAV}
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

        <div className="text-center pt-2">
          <div
            className={cn(
              "font-bold text-primary drop-shadow-[0_0_10px_rgba(34,197,94,0.2)] whitespace-nowrap break-keep",
              displaySize
            )}
          >
            <AnimatedCurrency value={proposalTax} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
