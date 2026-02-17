"use client";

import React, { useEffect, useState } from 'react';
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import type { CalculationResults } from "./results-display";
import { Building2 } from "lucide-react";

interface PrintableReceiptProps {
  results: CalculationResults | null;
}

export function PrintableReceipt({ results }: PrintableReceiptProps) {
    const [printDate, setPrintDate] = useState('');

    useEffect(() => {
        setPrintDate(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
    }, []);

    if (!results) {
        return null;
    }

  return (
    <div id="printable-receipt" className="hidden">
      {/* This component is now hidden and effectively disabled */}
    </div>
  );
}
