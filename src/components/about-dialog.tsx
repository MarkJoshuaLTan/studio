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
import { Info, Building2, Calculator, ShieldCheck, Users } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
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
      <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Building2 className="h-6 w-6 text-primary" />
            About TaxWise Parañaque
          </DialogTitle>
          <DialogDescription>
            Learn more about the tool and the team behind it.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 p-6 pt-2">
          <div className="space-y-6">
            <section className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Empowering Taxpayers
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                TaxWise Parañaque is a specialized digital tool designed to provide property owners in Parañaque City with a transparent and accessible way to estimate their Real Property Tax (RPT). As the city transitions through new valuation standards, our goal is to eliminate confusion and help citizens plan their finances with confidence.
              </p>
            </section>

            <Separator />

            <section className="space-y-3">
              <h3 className="text-lg font-semibold">How It Works</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The application utilizes the latest guidelines from the <strong>Real Property Valuation and Assessment Reform Act (RPVARA)</strong>. It calculates tax based on:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
                <li>Barangay-specific <strong>Unit Values</strong> (Market Value per sq.m).</li>
                <li><strong>Assessment Levels</strong> (Percentage of Market Value that is taxable).</li>
                <li>Standard <strong>Tax Rates</strong> for Residential, Commercial, and Industrial properties.</li>
                <li>Automatic application of the <strong>6% cap</strong> for the 2028 transitional period.</li>
              </ul>
            </section>

            <Separator />

            <section className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Transparency & Calibration
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We believe in data accuracy. The tool features an admin-only calibration panel where authorized personnel can update unit values and tax rates as they evolve, ensuring that every estimate remains as close to official records as possible.
              </p>
            </section>

            <Separator />

            <section className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Meet the Developers
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "Mark Joshua L. Tan",
                  "Ralph Andrew G. Dawa",
                  "Macrow Ponferada",
                  "Reymart F. Baron"
                ].map((name) => (
                  <div key={name} className="flex items-center gap-2 text-sm font-medium p-2 rounded-md bg-muted/50">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {name}
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-lg bg-primary/5 p-4 border border-primary/10">
              <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Disclaimer</h4>
              <p className="text-xs text-muted-foreground leading-tight">
                This calculator provides an <strong>estimate only</strong>. Official tax computations, including potential penalties, discounts, or special assessments (like the Special Education Fund), must be obtained directly from the Parañaque City Assessor&apos;s Office.
              </p>
            </section>
          </div>
        </ScrollArea>
        <div className="p-4 border-t bg-muted/20 flex justify-center">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
            TaxWise Parañaque &copy; 2024
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
