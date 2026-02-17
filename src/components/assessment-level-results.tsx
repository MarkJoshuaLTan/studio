
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency, cn } from "@/lib/utils";
import type { CalculationResults } from "./results-display";
import type { TaxSettings } from "@/lib/definitions";

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

export function AssessmentLevelResults({
  results,
  settings,
}: AssessmentLevelResultsProps) {
  const isResidential = results.propertyType === "Residential";
  // These are the varying assessment levels for demonstration
  const assessmentLevels = isResidential
    ? [0.05, 0.02, 0.01]
    : [0.1, 0.05, 0.03];
  
  const taxRate = settings.taxRates[results.propertyType] || (isResidential ? 0.02 : 0.03);

  // These values are constant across all cards as they use the default assessment level
  const currentTax = results.currentTax;
  const yearlyTax2028Capped = results.realYearlyTax2028;

  return (
    <div className="mt-8">
       <CardHeader className="px-0 pt-0">
          <CardTitle>Assessment Level Impact Analysis</CardTitle>
          <CardDescription>
            See how different proposed assessment levels affect your estimated tax for 2029 and beyond. The current and 2028 estimates are shown for comparison.
          </CardDescription>
      </CardHeader>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {assessmentLevels.map((level) => {
          // This value changes based on the assessment level for demonstration
          const assessedValueRPVARA = results.marketValue2029 * level;
          const yearlyTaxRPVARA = assessedValueRPVARA * taxRate;

          return (
            <Card key={level} className="flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="text-center text-5xl font-bold text-accent">
                  {level * 100}%
                </CardTitle>
                <CardDescription className="text-center">
                  Proposed Assessment Level
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <dl>
                  <ResultRow
                    label="Current Yearly Tax"
                    value={formatCurrency(currentTax)}
                  />
                  <Separator className="my-2" />
                  <div className="text-center font-semibold text-primary mb-1 leading-tight">
                    RPVARA
                    <br />
                    <span className="font-normal text-xs text-muted-foreground">(Est. Yearly Tax)</span>
                  </div>
                   <ResultRow
                    label={
                      <span className="text-muted-foreground">
                        2028
                        <br />
                        <span className="font-normal text-xs">(Capped at 6%)</span>
                      </span>
                    }
                    value={formatCurrency(yearlyTax2028Capped)}
                  />
                  <ResultRow
                    label={<span className="text-muted-foreground">2029 & 2030</span>}
                    value={formatCurrency(yearlyTaxRPVARA)}
                    isMain={true}
                  />
                </dl>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
