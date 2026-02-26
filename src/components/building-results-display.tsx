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
  if (valueStr.length > 20) {
    sizeClass = "text-xs";
  }

  return (
    <div className="flex justify-between py-2 text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={cn("font-medium text-right", sizeClass)}>{value}</dd>
    </div>
  );
};

const ResultRow = ({
  label,
  value,
  isPrimary = true,
}: {
  label: React.ReactNode;
  value: string;
  isPrimary?: boolean;
}) => {
  const valueLength = value.length;
  let sizeClass;

  if (isPrimary) {
    if (valueLength > 13) sizeClass = "text-base";
    else if (valueLength > 10) sizeClass = "text-lg";
    else sizeClass = "text-xl";
  } else {
    sizeClass = "text-sm";
  }

  return (
    <div className="flex justify-between items-center py-2">
      <dt className="text-muted-foreground text-sm">{label}</dt>
      <dd className={cn("font-bold text-right", isPrimary ? "text-primary" : "text-foreground", sizeClass)}>
        {value}
      </dd>
    </div>
  );
};

export function BuildingResultsDisplay({ results }: BuildingResultsDisplayProps) {
  return (
    <div className="space-y-8">
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
            <InfoRow label="Quality Level" value={`Level ${results.qualityLevel}`} />
            <InfoRow label="Classification" value={results.classification} />
            <InfoRow label="Floor Area" value={`${results.floorArea} sq.m`} />
            <InfoRow
              label="Selected Unit Value"
              value={formatCurrency(results.unitValue)}
            />
          </dl>
          <Separator className="my-4" />
          <dl className="space-y-1">
            <InfoRow
              label="Total Market Value"
              value={formatCurrency(results.marketValue)}
            />
            <InfoRow
              label="Assessment Level (Current)"
              value={`${(results.currentAssessmentLevel * 100).toFixed(0)}%`}
            />
            <InfoRow
              label="Assessed Value (Current)"
              value={formatCurrency(results.currentAssessedValue)}
            />
          </dl>
          <Separator className="my-4" />
          <dl className="space-y-2">
            <ResultRow
              label="Current Yearly Tax"
              value={formatCurrency(results.currentYearlyTax)}
            />
          </dl>
        </CardContent>
        <CardFooter>
          <p className="text-center text-xs text-muted-foreground w-full">
            This is an estimate for informational purposes only.
          </p>
        </CardFooter>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold px-1">Proposal Comparisons</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
    <Card className="flex flex-col border-primary/10">
      <CardHeader className="pb-4">
        <CardTitle className="text-center text-xl font-bold text-accent">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <dl>
          <ResultRow
            label="Current Yearly Tax"
            value={formatCurrency(currentTax)}
            isPrimary={false}
          />
          <Separator className="my-3" />
          <div className="space-y-1">
            <ResultRow
              label="Assessment Level"
              value={`${(proposalAL * 100).toFixed(0)}%`}
              isPrimary={false}
            />
            <ResultRow
              label="Assessed Value"
              value={formatCurrency(proposalAV)}
              isPrimary={false}
            />
            <div className="pt-2">
              <div className="text-xs text-center text-muted-foreground font-semibold uppercase tracking-wider mb-1">
                Estimated Yearly Tax
              </div>
              <div className="text-center font-bold text-2xl text-primary">
                {formatCurrency(proposalTax)}
              </div>
            </div>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
