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
import { formatCurrency, cn } from "@/lib/utils";
import type { BuildingCalculationResults } from "./building-calculator";

interface BuildingResultsDisplayProps {
  results: BuildingCalculationResults;
  mode?: 'summary' | 'impact';
}

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  const valueStr = String(value);
  let sizeClass = "";
  if (valueStr.length > 15) {
    sizeClass = "text-xs";
  }

  return (
    <div className="flex justify-between py-2 text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={cn("font-medium text-right", sizeClass)}>{value}</dd>
    </div>
  );
};

const SummaryResultRow = ({
  label,
  value,
}: {
  label: React.ReactNode;
  value: string;
}) => {
  const valueLength = value.length;
  let sizeClass;

  if (valueLength > 13) {
    sizeClass = "text-base";
  } else if (valueLength > 10) {
    sizeClass = "text-lg";
  } else {
    sizeClass = "text-xl";
  }

  return (
    <div className="flex justify-between items-center py-2">
      <dt className="text-muted-foreground text-base">{label}</dt>
      <dd className={cn("font-bold text-primary text-right", sizeClass)}>
        {value}
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
  value: string;
  isMain?: boolean;
}) => {
  const valueLength = value.length;
  let sizeClass;

  if (isMain) {
    if (valueLength > 13) {
      sizeClass = "text-base";
    } else if (valueLength > 10) {
      sizeClass = "text-lg";
    } else {
      sizeClass = "text-xl";
    }
  } else {
    if (valueLength > 14) {
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
        {value}
      </dd>
    </div>
  );
};

export function BuildingResultsDisplay({ results, mode = 'summary' }: BuildingResultsDisplayProps) {
  if (mode === 'summary') {
    return (
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
            <InfoRow label="Market Value" value={formatCurrency(results.marketValue)} />
            <InfoRow label="Assessed Value (Current)" value={formatCurrency(results.currentAssessedValue)} />
            <InfoRow label="Assessment Level (Current)" value={`${(results.currentAssessmentLevel * 100).toFixed(0)}%`} />
          </dl>
          <Separator className="my-4" />
          <dl className="space-y-2">
            <SummaryResultRow
              label="Current Yearly Tax"
              value={formatCurrency(results.currentYearlyTax)}
            />
          </dl>
        </CardContent>
        <CardFooter>
          <p className="text-center text-xs text-muted-foreground w-full">
            This is an estimate for informational purposes only. Official tax computation may vary.
          </p>
        </CardFooter>
      </Card>
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
        />
        <ProposalCard 
          title="Proposal 2" 
          currentTax={results.currentYearlyTax}
          proposalTax={results.p2YearlyTax}
          proposalAL={results.p2AssessmentLevel}
          proposalAV={results.p2AssessedValue}
        />
        <ProposalCard 
          title="Proposal 3" 
          currentTax={results.currentYearlyTax}
          proposalTax={results.p3YearlyTax}
          proposalAL={results.p3AssessmentLevel}
          proposalAV={results.p3AssessedValue}
        />
      </div>
    </div>
  );
}

function ProposalCard({ title, currentTax, proposalTax, proposalAL, proposalAV }: { 
  title: string; 
  currentTax: number; 
  proposalTax: number; 
  proposalAL: number;
  proposalAV: number;
}) {
  return (
    <Card className="flex flex-col">
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
            value={formatCurrency(currentTax)}
          />
          <Separator className="my-2" />
          <div className="text-center font-semibold text-primary mb-1 leading-tight">
            {title.toUpperCase()}
            <br />
            <span className="font-normal text-xs text-muted-foreground">(Est. Yearly Tax)</span>
          </div>
          <ImpactResultRow
            label={<span className="text-muted-foreground">Assessed Value</span>}
            value={formatCurrency(proposalAV)}
          />
          <ImpactResultRow
            label={<span className="text-muted-foreground">Estimated Yearly Tax</span>}
            value={formatCurrency(proposalTax)}
            isMain={true}
          />
        </dl>
      </CardContent>
    </Card>
  );
}
