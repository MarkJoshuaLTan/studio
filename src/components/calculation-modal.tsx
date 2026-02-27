"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import type { CalculationResults } from "./results-display";
import type { BuildingCalculationResults } from "./building-calculator";
import { Calculator, Info, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalculationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'land' | 'building';
  results: CalculationResults | BuildingCalculationResults;
  mode?: 'current' | 'rpvara';
  buildingProposal?: 'current' | 'p1' | 'p2' | 'p3';
}

export function CalculationModal({
  open,
  onOpenChange,
  type,
  results,
  mode = 'current',
  buildingProposal = 'current'
}: CalculationModalProps) {
  
  const Step = ({ title, label, formula, result, isLast = false, isCapped = false }: {
    title: string;
    label: string;
    formula: string;
    result: number;
    isLast?: boolean;
    isCapped?: boolean;
  }) => (
    <div className="flex flex-col items-center w-full">
      <div className="w-full glass-card p-5 border-white/10 bg-white/5 space-y-2">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/80">{title}</h4>
        <p className="text-[10px] text-muted-foreground/60 uppercase font-bold tracking-tight">{label}</p>
        <p className="text-sm font-medium text-foreground/90">{formula}</p>
        <div className="pt-2 border-t border-white/5 flex justify-between items-center">
          <span className="text-[10px] font-bold text-muted-foreground/40 uppercase">Result</span>
          <p className={cn(
            "text-xl font-black tracking-tight",
            isLast ? "text-primary drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]" : "text-foreground"
          )}>
            {formatCurrency(result)}
          </p>
        </div>
        {isCapped && (
          <div className="mt-3 p-3 rounded-xl bg-primary/5 border border-primary/10 flex gap-3 items-start">
            <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <p className="text-[10px] text-muted-foreground leading-relaxed italic">
              <strong>RPVARA Transition:</strong> Republic Act 12001 limits the annual tax increase to exactly 6% of the previous year's tax for 2028.
            </p>
          </div>
        )}
      </div>
      {!isLast && (
        <div className="my-2 text-primary/30">
          <ArrowDown className="h-5 w-5" />
        </div>
      )}
    </div>
  );

  const renderLandContent = () => {
    const res = results as CalculationResults;
    const isRPVARA = mode === 'rpvara';
    const uv = isRPVARA ? res.unitValue2029 : res.unitValue2028;
    const mv = isRPVARA ? res.marketValue2029 : res.marketValue2028;
    const av = isRPVARA ? res.marketValue2029 * res.assessmentLevel : res.assessedValue2028;
    const tax = isRPVARA ? av * (res.taxRate || 0.03) : res.currentTax;

    return (
      <div className="space-y-4">
        <Step 
          title="Step 1: Market Value"
          label={isRPVARA ? "Lot Area × Unit Value (RPVARA)" : "Lot Area × Unit Value (Current)"}
          formula={`${res.lotArea.toLocaleString()} sq.m × ${formatCurrency(uv)}`}
          result={mv}
        />
        <Step 
          title="Step 2: Assessed Value"
          label="Market Value × Assessment Level"
          formula={`${formatCurrency(mv)} × ${(res.assessmentLevel * 100).toFixed(0)}%`}
          result={av}
        />
        <Step 
          title="Step 3: Yearly Tax"
          label="Assessed Value × Tax Rate"
          formula={`${formatCurrency(av)} × ${((res.taxRate || 0.03) * 100).toFixed(0)}%`}
          result={tax}
          isLast={!isRPVARA}
        />
        {isRPVARA && (
          <Step 
            title="Final Transition Tax (2028)"
            label="Current Tax + 6% Increment Cap"
            formula={`${formatCurrency(res.currentTax)} + (${formatCurrency(res.currentTax)} × 0.06)`}
            result={res.realYearlyTax2028}
            isLast={true}
            isCapped={true}
          />
        )}
      </div>
    );
  };

  const renderBuildingContent = () => {
    const res = results as BuildingCalculationResults;
    const p = buildingProposal;
    const al = res[`${p}AssessmentLevel` as keyof BuildingCalculationResults] as number;
    const av = res[`${p}AssessedValue` as keyof BuildingCalculationResults] as number;
    const tax = res[`${p}YearlyTax` as keyof BuildingCalculationResults] as number;
    const taxRate = (res.classification === "Residential") ? 0.02 : 0.03;

    return (
      <div className="space-y-4">
        <Step 
          title="Step 1: Market Value"
          label="Floor Area × Unit Value"
          formula={`${res.floorArea.toLocaleString()} sq.m × ${formatCurrency(res.unitValue)}`}
          result={res.marketValue}
        />
        <Step 
          title="Step 2: Assessed Value"
          label="Market Value × Assessment Level"
          formula={`${formatCurrency(res.marketValue)} × ${(al * 100).toFixed(0)}%`}
          result={av}
        />
        <Step 
          title="Step 3: Yearly Tax"
          label="Assessed Value × Tax Rate"
          formula={`${formatCurrency(av)} × ${(taxRate * 100).toFixed(0)}%`}
          result={tax}
          isLast={true}
        />
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-[95vw] glass-container border-0 bg-[#0B0F1B]/95 backdrop-blur-3xl p-0 overflow-hidden shadow-none">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Calculator className="h-5 w-5 text-primary" />
            </div>
            <DialogTitle className="text-xl font-extrabold tracking-tight">
              {type === 'land' ? 'Land Valuation Breakdown' : 'Building Valuation Breakdown'}
            </DialogTitle>
          </div>
          <DialogDescription className="text-muted-foreground/60 text-xs font-medium">
            Step-by-step transparency into your property tax computation.
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 pt-2 max-h-[70vh] overflow-y-auto scrollbar-thin">
          {type === 'land' ? renderLandContent() : renderBuildingContent()}
        </div>

        <div className="p-6 pt-0 mt-2 border-t border-white/5 bg-foreground/[0.02] flex flex-col items-center">
          <p className="text-[10px] text-primary uppercase tracking-[0.2em] font-black mt-4">
            Official Calculation Breakdown
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
