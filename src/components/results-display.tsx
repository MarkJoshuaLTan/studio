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
import { AnimatedCurrency } from "./animated-currency";

export type CalculationResults = {
  barangay: string;
  location: string;
  propertyType: string;
  lotArea: number;
  unitValue2029: number;
  marketValue2029: number;
  unitValue2028: number;
  marketValue2028: number;
  assessmentLevel: number;
  assessedValue2029: number;
  yearlyTax2029: number;
  assessedValue2028: number;
  currentTax: number;
  realYearlyTax2028: number;
};

interface ResultsDisplayProps {
  results: CalculationResults;
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

const ResultRow = ({
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

export function ResultsDisplay({ results }: ResultsDisplayProps) {
  return (
    <div className="mt-0 animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-700 ease-out">
      <Card>
        <CardHeader>
          <CardTitle>Tax Calculation</CardTitle>
          <CardDescription>
            Your estimated property tax breakdown.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="space-y-1">
            <InfoRow label="Barangay" value={results.barangay} />
            <InfoRow label="Location" value={results.location} />
            <InfoRow label="Property Type" value={results.propertyType} />
            <InfoRow label="Lot Area" value={`${results.lotArea} sq.m`} />
            <InfoRow
              label="Unit Value (RPVARA)"
              value={results.unitValue2029}
              isCurrency={true}
            />
            <InfoRow
              label="Unit Value (Current)"
              value={results.unitValue2028}
              isCurrency={true}
            />
          </dl>
          <Separator className="my-4" />
          <dl className="space-y-1">
            <InfoRow
              label="Market Value (RPVARA)"
              value={results.marketValue2029}
              isCurrency={true}
            />
            <InfoRow
              label="Assessed Value (RPVARA)"
              value={results.assessedValue2029}
              isCurrency={true}
            />
          </dl>
          <Separator className="my-4" />
          <dl className="space-y-1">
            <InfoRow
              label="Market Value (Current)"
              value={results.marketValue2028}
              isCurrency={true}
            />
            <InfoRow
              label="Assessed Value (Current)"
              value={results.assessedValue2028}
              isCurrency={true}
            />
          </dl>
          <Separator className="my-4" />
          <dl className="space-y-2">
            <ResultRow
              label="Current Tax"
              value={results.currentTax}
            />
            <ResultRow
              label={
                <span>
                  Est. Yearly Tax (2028)
                  <br />
                  <span className="text-sm font-normal text-muted-foreground">
                    (Capped at 6%)
                  </span>
                </span>
              }
              value={results.realYearlyTax2028}
            />
            <ResultRow
              label="Est. Yearly Tax (2029)"
              value={results.yearlyTax2029}
            />
          </dl>
        </CardContent>
        <CardFooter className="flex-col items-stretch gap-4 pt-4">
            <p className="text-center text-xs text-muted-foreground">
                This is an estimate for informational purposes only. Official tax
                computation may vary.
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}
