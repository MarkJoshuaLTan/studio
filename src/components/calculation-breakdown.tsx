"use client";

import { useState } from 'react';
import { 
  ArrowDown, 
  Calculator, 
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';
import type { CalculationResults } from './results-display';

interface CalculationBreakdownProps {
  results: CalculationResults;
}

export function CalculationBreakdown({ results }: CalculationBreakdownProps) {
  const [showNumbers, setShowNumbers] = useState(true);

  const formatPercent = (val: number) => `${(val * 100).toFixed(0)}%`;
  const taxRate = results.taxRate || 0.03;

  const StepBlock = ({ title, formula, values, result, isLast = false, isCapped = false }: { 
    title: string; 
    formula: string; 
    values: string; 
    result: string; 
    isLast?: boolean;
    isCapped?: boolean;
  }) => (
    <div className="flex flex-col items-center w-full">
      <Card className="w-full max-w-md glass-card border-white/10 overflow-hidden shadow-none transition-all duration-500 hover:border-primary/30">
        <div className="bg-primary/5 px-4 py-2 border-b border-white/5">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/80">{title}</h4>
        </div>
        <CardContent className="p-5 space-y-2">
          {!showNumbers ? (
            <p className="text-sm font-mono text-muted-foreground/80 leading-relaxed">{formula}</p>
          ) : (
            <>
              <p className="text-[10px] text-muted-foreground/60 uppercase font-bold tracking-tight">{formula}</p>
              <p className="text-sm font-medium text-foreground/90">{values}</p>
              <div className="pt-2 border-t border-white/5 flex justify-between items-center">
                <span className="text-[10px] font-bold text-muted-foreground/40 uppercase">Result</span>
                <p className={cn(
                  "text-xl font-black tracking-tight",
                  isLast ? "text-primary drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]" : "text-foreground"
                )}>
                  {result}
                </p>
              </div>
            </>
          )}
          {isCapped && showNumbers && (
            <div className="mt-3 p-3 rounded-xl bg-primary/5 border border-primary/10 flex gap-3 items-start">
              <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                <strong>RPVARA Transition:</strong> Republic Act 12001 limits the annual tax increase to exactly 6% of the previous year&apos;s tax for 2028.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      {!isLast && (
        <div className="my-3 flex flex-col items-center">
          <div className="w-0.5 h-4 bg-gradient-to-b from-primary/40 to-transparent" />
          <ArrowDown className="h-5 w-5 text-primary/40 animate-pulse" />
        </div>
      )}
    </div>
  );

  return (
    <div className="mt-16 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
        <div className="space-y-2">
          <h3 className="text-3xl font-extrabold tracking-tight text-foreground">How the Tax is Calculated</h3>
          <p className="text-muted-foreground/80 text-sm max-w-xl leading-relaxed">
            A transparent, step-by-step breakdown of the valuation formulas used by the city to arrive at your property tax.
          </p>
        </div>
        <div className="flex items-center space-x-3 bg-foreground/[0.03] backdrop-blur-md p-1.5 rounded-full border border-border/50">
          <span className={cn("text-[10px] font-black uppercase tracking-widest pl-3 transition-colors", !showNumbers ? "text-primary" : "text-muted-foreground/40")}>Formula</span>
          <Switch 
            id="show-numbers" 
            checked={showNumbers} 
            onCheckedChange={setShowNumbers}
            className="data-[state=checked]:bg-primary"
          />
          <span className={cn("text-[10px] font-black uppercase tracking-widest pr-3 transition-colors", showNumbers ? "text-primary" : "text-muted-foreground/40")}>Actual Data</span>
        </div>
      </div>

      <Accordion type="multiple" defaultValue={['current', 'rpvara']} className="w-full space-y-6">
        <AccordionItem value="current" className="border-0 overflow-hidden rounded-[2rem] glass-container shadow-none">
          <AccordionTrigger className="px-8 hover:no-underline hover:bg-foreground/[0.02] transition-all py-6 group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                <Calculator className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left space-y-0.5">
                <span className="text-xl font-black tracking-tight text-foreground block">Current Tax Computation</span>
                <span className="text-xs text-muted-foreground/60 font-bold uppercase tracking-widest">Pre-RPVARA Standards</span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-10 pb-16 px-6 flex flex-col items-center bg-foreground/[0.01]">
            <StepBlock 
              title="Step 1: Market Value"
              formula="Lot Area × Unit Value (Current)"
              values={`${results.lotArea.toLocaleString()} sq.m × ${formatCurrency(results.unitValue2028)}`}
              result={formatCurrency(results.marketValue2028)}
            />
            <StepBlock 
              title="Step 2: Assessed Value"
              formula="Market Value × Assessment Level (%)"
              values={`${formatCurrency(results.marketValue2028)} × ${formatPercent(results.assessmentLevel)}`}
              result={formatCurrency(results.assessedValue2028)}
            />
            <StepBlock 
              title="Step 3: Final Tax"
              formula="Assessed Value × Tax Rate (%)"
              values={`${formatCurrency(results.assessedValue2028)} × ${formatPercent(taxRate)}`}
              result={formatCurrency(results.currentTax)}
              isLast={true}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rpvara" className="border-0 overflow-hidden rounded-[2rem] glass-container shadow-none">
          <AccordionTrigger className="px-8 hover:no-underline hover:bg-foreground/[0.02] transition-all py-6 group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                <Info className="h-6 w-6 text-green-500" />
              </div>
              <div className="text-left space-y-0.5">
                <span className="text-xl font-black tracking-tight text-foreground block">RPVARA Computation (2028–2030)</span>
                <span className="text-xs text-muted-foreground/60 font-bold uppercase tracking-widest">New Unified Standards</span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-10 pb-16 px-6 flex flex-col items-center bg-foreground/[0.01]">
             <StepBlock 
              title="Step 1: Unified Market Value"
              formula="Lot Area × Unit Value (RPVARA)"
              values={`${results.lotArea.toLocaleString()} sq.m × ${formatCurrency(results.unitValue2029)}`}
              result={formatCurrency(results.marketValue2029)}
            />
            <StepBlock 
              title="Step 2: Proposed Assessed Value"
              formula="Market Value × Proposed Assessment Level"
              values={`${formatCurrency(results.marketValue2029)} × ${formatPercent(results.assessmentLevel)}`}
              result={formatCurrency(results.assessedValue2029)}
            />
            <StepBlock 
              title="Step 3: Raw Computed Tax"
              formula="Assessed Value × Unified Tax Rate (%)"
              values={`${formatCurrency(results.assessedValue2029)} × ${formatPercent(taxRate)}`}
              result={formatCurrency(results.yearlyTax2029)}
            />
            <StepBlock 
              title="Final Transition Tax (2028)"
              formula="Current Tax + 6% Increment Cap"
              values={`${formatCurrency(results.currentTax)} + (${formatCurrency(results.currentTax)} × 0.06)`}
              result={formatCurrency(results.realYearlyTax2028)}
              isLast={true}
              isCapped={true}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
