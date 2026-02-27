"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Info, 
  Building2, 
  BookOpen, 
  Lightbulb,
  ArrowRight,
  X
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export function AboutDialog() {
  const developers = [
    { name: "Mark Joshua L. Tan", url: "https://www.facebook.com/markjoshua.l.tan" },
    { name: "Reymart F. Baron", url: "https://www.facebook.com/reymart.baron.2024" },
    { name: "Macrow B. Ponferrada", url: "https://www.facebook.com/busygelo" },
    { name: "Ralph Andrew G. Dawa", url: "https://www.facebook.com/ralph213" },
    { name: "John Reyche B. Balmedina", url: "https://www.facebook.com/deathdeale01" }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="About TaxWise"
          title="About TaxWise"
          className="hover:bg-primary/10"
        >
          <Info className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DialogTrigger>
      <DialogContent 
        showClose={false}
        className="max-w-2xl w-[95vw] h-[85vh] flex flex-col p-0 overflow-hidden border-0 glass-container bg-white/5 dark:bg-black/90 backdrop-blur-3xl shadow-2xl"
      >
        {/* Custom Circular Close Button to match reference */}
        <DialogClose className="absolute right-6 top-6 rounded-full border border-primary/50 p-1.5 opacity-70 transition-all hover:opacity-100 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary z-50">
          <X className="h-5 w-5 text-primary" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <DialogHeader className="p-8 pb-4">
          <DialogTitle className="flex items-center gap-3 text-3xl font-extrabold tracking-tight text-foreground">
            <Building2 className="h-8 w-8 text-primary drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
            About TaxWise Parañaque
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-lg font-medium">
            A comprehensive guide to your modern Real Property Tax estimation tool.
          </DialogDescription>
        </DialogHeader>
        
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto p-8 pt-2 scrollbar-thin scrollbar-thumb-primary/20">
          <div className="space-y-10 pb-10">
            <section className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
                <Lightbulb className="h-5 w-5 text-primary" />
                The Vision
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                TaxWise Parañaque is a specialized digital platform designed to provide property owners in Parañaque City with a transparent and accessible way to navigate the evolving landscape of real estate taxation. As the city transitions through new valuation standards, our goal is to empower citizens with the data they need for proactive financial planning.
              </p>
            </section>

            <Separator className="bg-border/50" />

            <section className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
                <BookOpen className="h-5 w-5 text-primary" />
                Understanding RPVARA (RA 12001)
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                The <strong>Real Property Valuation and Assessment Reform Act (RPVARA)</strong>, officially known as Republic Act No. 12001, is a landmark legislation aimed at professionalizing and streamlining property valuation in the Philippines.
              </p>
              
              <div className="bg-foreground/[0.03] p-6 rounded-2xl border border-border/50 space-y-4">
                <h4 className="text-sm font-black uppercase tracking-[0.15em] text-primary">Core Objectives:</h4>
                <ul className="space-y-4">
                  <li className="flex gap-3 text-sm text-muted-foreground">
                    <ArrowRight className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                    <span><strong className="text-foreground">Uniform Standards:</strong> Adopting international valuation standards to ensure fairness and consistency across all barangays.</span>
                  </li>
                  <li className="flex gap-3 text-sm text-muted-foreground">
                    <ArrowRight className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                    <span><strong className="text-foreground">Economic Growth:</strong> Enhancing investor confidence by providing a predictable and stable tax environment.</span>
                  </li>
                  <li className="flex gap-3 text-sm text-muted-foreground">
                    <ArrowRight className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                    <span><strong className="text-foreground">Transparency:</strong> Making the market value of properties public and easily verifiable by all stakeholders.</span>
                  </li>
                </ul>
              </div>
            </section>

            <Separator className="bg-border/50" />

            <section className="space-y-4">
              <h3 className="text-lg font-bold text-foreground">Team Contacts</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {developers.map((dev) => (
                  <a 
                    key={dev.name} 
                    href={dev.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm font-semibold p-3 rounded-xl bg-foreground/[0.03] border border-border/50 hover:border-primary/30 hover:bg-foreground/[0.06] transition-all group"
                  >
                    <div className="h-2 w-2 rounded-full bg-primary group-hover:scale-125 transition-transform" />
                    <span className="text-muted-foreground group-hover:text-foreground">{dev.name}</span>
                  </a>
                ))}
              </div>
            </section>

            <section className="rounded-2xl bg-destructive/10 p-5 border border-destructive/20">
              <h4 className="text-xs font-black text-destructive uppercase tracking-[0.2em] mb-2">Official Disclaimer</h4>
              <p className="text-xs text-muted-foreground leading-relaxed italic">
                This calculator provides an <strong>estimate only</strong> for informational purposes. Official tax bills, including specific penalties, early-payment discounts, or the Special Education Fund (SEF) levies, must be confirmed directly with the Parañaque City Assessor&apos;s Office.
              </p>
            </section>
          </div>
        </div>
        
        <div className="p-8 border-t border-border/50 bg-foreground/[0.02] flex flex-col items-center gap-1">
          <p className="text-[11px] text-primary uppercase tracking-[0.3em] font-black">
            TaxWise Parañaque &bull; 2026 Edition
          </p>
          <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold">
            Empowering Every Parañaqueño Property Owner
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
