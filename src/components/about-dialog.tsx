"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Info, 
  Building2, 
  Calculator, 
  ShieldCheck, 
  Users, 
  Milestone, 
  BookOpen, 
  Lightbulb,
  ArrowRight
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function AboutDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="About TaxWise"
          title="About TaxWise"
        >
          <Info className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Building2 className="h-6 w-6 text-primary" />
            About TaxWise Parañaque
          </DialogTitle>
          <DialogDescription>
            A comprehensive guide to your modern Real Property Tax estimation tool.
          </DialogDescription>
        </DialogHeader>
        
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto p-6 pt-2">
          <div className="space-y-8 pb-6">
            <section className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                The Vision
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                TaxWise Parañaque is a specialized digital platform designed to provide property owners in Parañaque City with a transparent and accessible way to navigate the evolving landscape of real estate taxation. As the city transitions through new valuation standards, our goal is to empower citizens with the data they need for proactive financial planning.
              </p>
            </section>

            <Separator />

            <section className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Understanding RPVARA (RA 12001)
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The <strong>Real Property Valuation and Assessment Reform Act (RPVARA)</strong>, officially known as Republic Act No. 12001, is a landmark legislation aimed at professionalizing and streamlining property valuation in the Philippines.
              </p>
              <div className="bg-muted/30 p-4 rounded-lg border border-border space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary">Core Objectives:</h4>
                <ul className="space-y-2">
                  <li className="flex gap-2 text-xs text-muted-foreground">
                    <ArrowRight className="h-3 w-3 mt-0.5 shrink-0 text-primary" />
                    <span><strong>Uniform Standards:</strong> Adopting international valuation standards to ensure fairness and consistency across all barangays.</span>
                  </li>
                  <li className="flex gap-2 text-xs text-muted-foreground">
                    <ArrowRight className="h-3 w-3 mt-0.5 shrink-0 text-primary" />
                    <span><strong>Economic Growth:</strong> Enhancing investor confidence by providing a predictable and stable tax environment.</span>
                  </li>
                  <li className="flex gap-2 text-xs text-muted-foreground">
                    <ArrowRight className="h-3 w-3 mt-0.5 shrink-0 text-primary" />
                    <span><strong>Transparency:</strong> Making the market value of properties public and easily verifiable by all stakeholders.</span>
                  </li>
                </ul>
              </div>
            </section>

            <Separator />

            <section className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Milestone className="h-5 w-5 text-primary" />
                The 2028-2030 Transition Period
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Recognizing the impact of updated valuations, the law provides for a gradual transition to protect taxpayers from sudden financial shocks.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 border rounded-md bg-primary/5 hover:bg-primary/10 transition-colors">
                  <h5 className="font-bold text-sm mb-1">The 6% Cap (2028)</h5>
                  <p className="text-xs text-muted-foreground">During the first year of the new schedule, the increase in tax is limited to a maximum of 6% compared to the previous year, regardless of the new market value.</p>
                </div>
                <div className="p-4 border rounded-md bg-accent/5 hover:bg-accent/10 transition-colors">
                  <h5 className="font-bold text-sm mb-1">Full Adoption (2029+)</h5>
                  <p className="text-xs text-muted-foreground">By 2029, the full valuation standards will be applied. TaxWise allows you to simulate how different proposed assessment levels will affect your future dues.</p>
                </div>
              </div>
            </section>

            <Separator />

            <section className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                How It Works
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The application processes complex datasets including:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 list-none text-xs text-muted-foreground">
                <li className="flex items-center gap-2 bg-muted/50 p-2 rounded-md">
                  <div className="h-1.5 w-1.5 bg-primary rounded-full"/> 
                  Barangay-specific Unit Values
                </li>
                <li className="flex items-center gap-2 bg-muted/50 p-2 rounded-md">
                  <div className="h-1.5 w-1.5 bg-primary rounded-full"/> 
                  Variable Assessment Levels
                </li>
                <li className="flex items-center gap-2 bg-muted/50 p-2 rounded-md">
                  <div className="h-1.5 w-1.5 bg-primary rounded-full"/> 
                  Property Classification Logic
                </li>
                <li className="flex items-center gap-2 bg-muted/50 p-2 rounded-md">
                  <div className="h-1.5 w-1.5 bg-primary rounded-full"/> 
                  Automated Cap Calculations
                </li>
              </ul>
            </section>

            <Separator />

            <section className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Data Privacy & Integrity
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We value your privacy. TaxWise is a client-side first application. Your property details and calculations are stored locally on your device and are never sent to a central server unless you explicitly use the support or reporting features.
              </p>
            </section>

            <Separator />

            <section className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                The Developers
              </h3>
              <p className="text-sm text-muted-foreground">
                Conceptualized and developed by a dedicated team committed to digital innovation in public administration.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "Mark Joshua L. Tan",
                  "Ralph Andrew G. Dawa",
                  "Macrow Ponferada",
                  "Reymart F. Baron"
                ].map((name) => (
                  <div key={name} className="flex items-center gap-2 text-sm font-medium p-2 rounded-md bg-muted/50 border border-transparent hover:border-primary/20 transition-all">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {name}
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-lg bg-destructive/5 p-4 border border-destructive/10">
              <h4 className="text-xs font-bold text-destructive uppercase tracking-wider mb-1">Official Disclaimer</h4>
              <p className="text-xs text-muted-foreground leading-relaxed italic">
                This calculator provides an <strong>estimate only</strong> for informational purposes. Official tax bills, including specific penalties, early-payment discounts, or the Special Education Fund (SEF) levies, must be confirmed directly with the Parañaque City Assessor&apos;s Office.
              </p>
            </section>
          </div>
        </div>
        
        <div className="p-4 border-t bg-muted/20 flex flex-col items-center gap-1">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold text-primary">
            TaxWise Parañaque &bull; 2026 Edition
          </p>
          <p className="text-[9px] text-muted-foreground/60 uppercase">
            Empowering Every Parañaqueño Property Owner
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
