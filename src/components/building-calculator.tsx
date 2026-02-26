"use client";

import { useState, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AutocompleteInput } from "./autocomplete-input";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "./ui/badge";
import { BUILDING_TYPES, BuildingType, QualityLevel, BuildingPropertyClassification } from "@/lib/building-data";
import { SuggestedItem } from "@/lib/definitions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getBuildingAssessmentLevel } from "@/lib/building-logic";

export type BuildingCalculationResults = {
  buildingType: string;
  qualityLevel: string;
  classification: BuildingPropertyClassification;
  floorArea: number;
  unitValue: number;
  marketValue: number;
  currentAssessedValue: number;
  currentAssessmentLevel: number;
  currentYearlyTax: number;
  p1AssessedValue: number;
  p1AssessmentLevel: number;
  p1YearlyTax: number;
  p2AssessedValue: number;
  p2AssessmentLevel: number;
  p2YearlyTax: number;
  p3AssessedValue: number;
  p3AssessmentLevel: number;
  p3YearlyTax: number;
};

export default function BuildingCalculator({
  setResults,
}: {
  setResults: (results: BuildingCalculationResults | null) => void;
}) {
  const [buildingSearch, setBuildingSearch] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingType | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<QualityLevel | null>(null);
  const [floorArea, setFloorArea] = useState("");

  const [isCalculating, startCalculation] = useTransition();
  const { toast } = useToast();

  const buildingSuggestions: SuggestedItem[] = BUILDING_TYPES.map(b => ({
    name: b.name,
    type: 'location' // Reusing the type from land calculator for Autocomplete compatibility
  }));

  const handleSelectBuilding = (item: SuggestedItem | null) => {
    if (item) {
      const found = BUILDING_TYPES.find(b => b.name === item.name);
      setSelectedBuilding(found || null);
    } else {
      setSelectedBuilding(null);
    }
    setSelectedQuality(null);
    setResults(null);
  };

  const handleClear = () => {
    setSelectedBuilding(null);
    setSelectedQuality(null);
    setFloorArea("");
    setBuildingSearch("");
    setResults(null);
  };

  const handleCalculate = () => {
    if (!selectedBuilding) {
      toast({ variant: "destructive", title: "Missing Information", description: "Please select a building type." });
      return;
    }
    if (!selectedQuality) {
      toast({ variant: "destructive", title: "Missing Information", description: "Please select a quality level." });
      return;
    }
    const area = parseFloat(floorArea);
    if (isNaN(area) || area <= 0) {
      toast({ variant: "destructive", title: "Invalid Input", description: "Please enter a valid floor area." });
      return;
    }

    startCalculation(() => {
      const marketValue = area * selectedQuality.value;
      const classification = selectedBuilding.classification;
      const taxRate = (classification === "Residential") ? 0.02 : 0.03;

      const currentAL = getBuildingAssessmentLevel(marketValue, classification, 'current');
      const p1AL = getBuildingAssessmentLevel(marketValue, classification, 'p1');
      const p2AL = getBuildingAssessmentLevel(marketValue, classification, 'p2');
      const p3AL = getBuildingAssessmentLevel(marketValue, classification, 'p3');

      const results: BuildingCalculationResults = {
        buildingType: selectedBuilding.name,
        qualityLevel: selectedQuality.level,
        classification,
        floorArea: area,
        unitValue: selectedQuality.value,
        marketValue,
        currentAssessedValue: marketValue * currentAL,
        currentAssessmentLevel: currentAL,
        currentYearlyTax: (marketValue * currentAL) * taxRate,
        p1AssessedValue: marketValue * p1AL,
        p1AssessmentLevel: p1AL,
        p1YearlyTax: (marketValue * p1AL) * taxRate,
        p2AssessedValue: marketValue * p2AL,
        p2AssessmentLevel: p2AL,
        p2YearlyTax: (marketValue * p2AL) * taxRate,
        p3AssessedValue: marketValue * p3AL,
        p3AssessmentLevel: p3AL,
        p3YearlyTax: (marketValue * p3AL) * taxRate,
      };

      setResults(results);
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Building & Improvements Details</CardTitle>
        <CardDescription>
          Enter details to estimate the valuation of buildings and improvements.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="building-type">Select Building Type</Label>
            <AutocompleteInput
              placeholder="Search for a building type..."
              suggestions={buildingSuggestions.filter(s => s.name.toLowerCase().includes(buildingSearch.toLowerCase()))}
              onInputChange={setBuildingSearch}
              onSelect={handleSelectBuilding}
              value={selectedBuilding ? { name: selectedBuilding.name, type: 'location' } : null}
              onOpen={() => setBuildingSearch("")}
            />
          </div>
          <div className="space-y-2">
            <Label>Property Classification</Label>
            <div className="flex h-10 items-center">
              <Badge variant="outline" className="text-sm font-medium border-primary/20 bg-primary/5 px-3 py-1">
                {selectedBuilding?.classification || "Select building type first"}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="quality-level">Select Type (Quality Level)</Label>
            <Select 
              disabled={!selectedBuilding} 
              onValueChange={(val) => {
                const found = selectedBuilding?.qualityLevels.find(q => q.level === val);
                setSelectedQuality(found || null);
                setResults(null);
              }}
              value={selectedQuality?.level || ""}
            >
              <SelectTrigger id="quality-level">
                <SelectValue placeholder={selectedBuilding ? "Select level..." : "Select building type first"} />
              </SelectTrigger>
              <SelectContent>
                {selectedBuilding?.qualityLevels.map((q) => (
                  <SelectItem key={q.level} value={q.level}>
                    Level {q.level} — ₱{q.value.toLocaleString()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="floor-area">Floor Area (sq. m)</Label>
            <Input
              id="floor-area"
              type="number"
              placeholder="e.g., 150"
              value={floorArea}
              onChange={(e) => {
                setFloorArea(e.target.value);
                setResults(null);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleCalculate();
                }
              }}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={handleCalculate}
          disabled={isCalculating}
          className="w-full sm:w-auto"
        >
          {isCalculating ? "Calculating..." : "Calculate Valuation"}
        </Button>
        <Button
          variant="outline"
          onClick={handleClear}
          className="w-full sm:w-auto"
        >
          Clear
        </Button>
      </CardFooter>
    </Card>
  );
}
