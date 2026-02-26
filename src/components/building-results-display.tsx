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
    <div className="flex justify-between py-2 text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={cn("font-medium text-right", sizeClass)}>
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
  const formattedValue = String(value);
  let sizeClass;

  if (formattedValue.length > 13) {
    sizeClass = "text-base";
  } else if (formattedValue.length > 10) {
    sizeClass = "text-lg";
  } else {
    sizeClass = "text-xl";
  }

  return (
    <div className="flex justify-between items-center py-2">
      <dt className="text-muted-foreground text-base">{label}</dt>
      <dd className={cn("font-bold text-primary text-right", sizeClass)}>
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
  const formattedValue = String(value);
  let sizeClass;

  if (isMain) {
    if (formattedValue.length > 13) {
      sizeClass = "text-base";
    } else if (formattedValue.length > 10) {
      sizeClass = "text-lg";
    } else {
      sizeClass = "text-xl";
    }
  } else {
    if (formattedValue.length > 14) {
      sizeClass = "text-xs";
    } else {
      sizeClass = "text-sm";
    }
  }

  return (
    <div className="flex justify-between items-center py-2">
      <dt className="text-muted-foreground text-sm">{label}</dt>
      <dd
        className={cn(
          "font-semibold text-right",
          sizeClass,
          isMain ? "text-primary" : ""
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
        <Card>
          <CardHeader>
            <CardTitle>Tax Calculation</CardTitle>
            <CardDescription>
              Estimated building & improvements tax breakdown.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="space-y-1">
              <InfoRow label="Building Type" value={results.buildingType} />
              <InfoRow label="Type (Quality Level)" value={`Level ${results.qualityLevel}`} />
              <InfoRow label="Property Classification" value={results.classification} />
              <InfoRow label="Floor Area" value={`${results.floorArea} sq.m`} />
              <InfoRow label="Market Value" value={results.marketValue} isCurrency={true} />
              <InfoRow label="Assessed Value (Current)" value={results.currentAssessedValue} isCurrency={true} />
              <InfoRow label="Assessment Level (Current)" value={`${(results.currentAssessmentLevel * 100).toFixed(0)}%`} />
            </dl>
            <Separator className="my-4" />
            <dl className="space-y-2">
              <SummaryResultRow
                label="Current Yearly Tax"
                value={results.currentYearlyTax}
              />
            </dl>
          </CardContent>
          <CardFooter>
            <p className="text-center text-xs text-muted-foreground w-full">
              This is an estimate for informational purposes only. Official tax computation may vary.
            </p>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Assessment Level Impact Analysis</CardTitle>
        <CardDescription>
          See how different proposed assessment levels affect your estimated tax for buildings and improvements.
        </CardDescription>
      </CardHeader>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <ProposalCard 
          title="Proposal 1" 
          currentTax={results.currentYearlyTax}
          proposalTax={results.p1YearlyTax}
          proposalAL={results.p1AssessmentLevel}
          proposalAV={results.p1AssessedValue}
          delayClass="delay-0"
        />
        <ProposalCard 
          title="Proposal 2" 
          currentTax={results.currentYearlyTax}
          proposalTax={results.p2YearlyTax}
          proposalAL={results.p2AssessmentLevel}
          proposalAV={results.p2AssessedValue}
          delayClass="delay-150"
        />
        <ProposalCard 
          title="Proposal 3" 
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
      "flex flex-col animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-700 ease-out fill-mode-backwards",
      delayClass
    )}>
      <CardHeader className="pb-4">
        <CardTitle className="text-center text-5xl font-bold text-accent">
          {(proposalAL * 100).toFixed(0)}%
        </CardTitle>
        <CardDescription className="text-center">
          Proposed Assessment Level
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <dl>
          <ImpactResultRow
            label="Current Yearly Tax"
            value={currentTax}
          />
          <Separator className="my-2" />
          <div className="text-center font-semibold text-primary mb-1 leading-tight">
            {title.toUpperCase()}
            <br />
            <span className="font-normal text-xs text-muted-foreground">(Est. Yearly Tax)</span>
          </div>
          <ImpactResultRow
            label={<span className="text-muted-foreground">Assessed Value</span>}
            value={proposalAV}
          />
          <ImpactResultRow
            label={<span className="text-muted-foreground">Estimated Yearly Tax</span>}
            value={proposalTax}
            isMain={true}
          />
        </dl>
      </CardContent>
    </Card>
  );
}
