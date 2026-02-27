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
import { AnimatedCurrency } from "./animated-currency";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CalculationModal } from "./calculation-modal";

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
  taxRate?: number;
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

const ResultRow = ({
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
    <div className="flex justify-between items-center py-4 border-b border-white/10 last:border-0 gap-4 group">
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

export function ResultsDisplay({ results }: ResultsDisplayProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'current' | 'rpvara' | 'future'>('current');

  return (
    <div className="mt-0 animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-700 ease-out">
      <Card className="glass-container border-0 overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl">Tax Calculation</CardTitle>
          <CardDescription className="text-muted-foreground/80">
            Your estimated property tax breakdown.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="glass-card p-4 space-y-1">
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
          </div>
          
          <div className="glass-card p-4 space-y-1 bg-white/5 border-white/5">
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
            <Separator className="my-2 bg-white/10" />
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
          </div>

          <div className="pt-2">
            <ResultRow
              label="Current Tax"
              value={results.currentTax}
              onInfoClick={() => {
                setModalMode('current');
                setModalOpen(true);
              }}
            />
            <ResultRow
              label={
                <span>
                  Tax (2028)
                  <br />
                  <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-tighter">
                    (Capped at 6%)
                  </span>
                </span>
              }
              value={results.realYearlyTax2028}
              onInfoClick={() => {
                setModalMode('rpvara');
                setModalOpen(true);
              }}
            />
            <ResultRow
              label="Tax (2029)"
              value={results.yearlyTax2029}
              onInfoClick={() => {
                setModalMode('future');
                setModalOpen(true);
              }}
            />
          </div>
        </CardContent>
        <CardFooter className="bg-white/5 dark:bg-white/5 py-4">
            <p className="text-center text-[10px] uppercase tracking-widest font-bold text-muted-foreground/60 w-full">
                Estimate for informational purposes only
            </p>
        </CardFooter>
      </Card>

      <CalculationModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        type="land"
        results={results}
        mode={modalMode === 'future' ? 'rpvara' : modalMode}
      />
    </div>
  );
}
