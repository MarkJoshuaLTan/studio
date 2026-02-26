"use client";

import { useState, useEffect, useTransition } from "react";
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
import type { SuggestedItem, TaxSettings } from "@/lib/definitions";
import { useToast } from "@/hooks/use-toast";
import type { CalculationResults } from "./results-display";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

export default function TaxCalculator({
  setResults,
  settings,
}: {
  setResults: (results: CalculationResults | null) => void;
  settings: TaxSettings;
}) {
  const [barangaySearch, setBarangaySearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [selectedBarangay, setSelectedBarangay] =
    useState<SuggestedItem | null>(null);
  const [selectedLocation, setSelectedLocation] =
    useState<SuggestedItem | null>(null);
  const [lotArea, setLotArea] = useState("");

  const [allBarangays, setAllBarangays] = useState<SuggestedItem[]>([]);
  const [barangaySuggestions, setBarangaySuggestions] =
    useState<SuggestedItem[]>([]);
  const [allLocationsForBarangay, setAllLocationsForBarangay] = useState<
    SuggestedItem[]
  >([]);
  const [locationSuggestions, setLocationSuggestions] = useState<
    SuggestedItem[]
  >([]);

  const [isCalculating, startCalculation] = useTransition();

  const { toast } = useToast();
  
  useEffect(() => {
    const barangays = Object.keys(settings.taxData).map(
      (name) => ({ name, type: "barangay" } as SuggestedItem)
    );
    setAllBarangays(barangays);
    setBarangaySuggestions(barangays);
  }, [settings]);

  useEffect(() => {
    if (barangaySearch) {
      const filtered = allBarangays.filter((b) =>
        b.name.toLowerCase().includes(barangaySearch.toLowerCase())
      );
      setBarangaySuggestions(filtered);
    } else {
      setBarangaySuggestions(allBarangays);
    }
  }, [barangaySearch, allBarangays]);

  useEffect(() => {
    if (locationSearch) {
      const filtered = allLocationsForBarangay.filter((l) =>
        l.name.toLowerCase().includes(locationSearch.toLowerCase())
      );
      setLocationSuggestions(filtered);
    } else {
      setLocationSuggestions(allLocationsForBarangay);
    }
  }, [locationSearch, allLocationsForBarangay]);

  const handleSelectBarangay = (item: SuggestedItem | null) => {
    setSelectedBarangay(item);
    setSelectedLocation(null);
    setLocationSearch("");
    setResults(null);
    if (item) {
      const locations = settings.taxData[item.name];
      if (locations) {
        const locationItems: SuggestedItem[] = Object.keys(locations).map(
          (name) => {
            const details = locations[name];
            return {
              name: name,
              type: "location",
              fullPath: `${item.name} > ${name}`,
              unitValue2029: details.unitValue2029,
              unitValue2028: details.unitValue2028,
              propertyType: details.propertyType,
            };
          }
        );
        setAllLocationsForBarangay(locationItems);
        setLocationSuggestions(locationItems);
      } else {
        setAllLocationsForBarangay([]);
        setLocationSuggestions([]);
      }
    } else {
      setBarangaySearch("");
      setAllLocationsForBarangay([]);
      setLocationSuggestions([]);
    }
  };

  const handleSelectLocation = (item: SuggestedItem | null) => {
    setSelectedLocation(item);
    setResults(null);
    if (!item) {
      setLocationSearch("");
    }
  };

  const handleClear = () => {
    setSelectedBarangay(null);
    setSelectedLocation(null);
    setLotArea("");
    setBarangaySearch("");
    setLocationSearch("");
    setResults(null);
  };

  const handleCalculate = () => {
    if (!selectedBarangay) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please select a barangay.",
      });
      return;
    }
    if (!selectedLocation) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please select a location.",
      });
      return;
    }
    const area = parseFloat(lotArea);
    if (isNaN(area) || area <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter a valid lot area.",
      });
      return;
    }

    startCalculation(() => {
      const { unitValue2029, unitValue2028, propertyType } = selectedLocation;

      if (
        !propertyType ||
        settings.assessmentLevels[propertyType] === undefined ||
        !settings.taxRates[propertyType]
      ) {
        toast({
          variant: "destructive",
          title: "Calculation Error",
          description: "Property type is invalid or missing tax rates.",
        });
        return;
      }
      const assessmentLevel = settings.assessmentLevels[propertyType];
      const taxRate = settings.taxRates[propertyType];

      const uv2029 = unitValue2029 ?? 0;
      const uv2028 = unitValue2028 ?? 0;

      const mv2029 = uv2029 * area;
      const mv2028 = uv2028 * area;

      const av2029 = mv2029 * assessmentLevel;
      const tax2029 = av2029 * taxRate;

      const av2028 = mv2028 * assessmentLevel;
      const estimatedTax2028 = av2028 * taxRate;
      const realTax2028 = estimatedTax2028 * 1.06;

      setResults({
        barangay: selectedBarangay.name,
        location: selectedLocation.name,
        propertyType,
        lotArea: area,
        unitValue2029: uv2029,
        marketValue2029: mv2029,
        unitValue2028: uv2028,
        marketValue2028: mv2028,
        assessmentLevel,
        assessedValue2029: av2029,
        yearlyTax2029: tax2029,
        assessedValue2028: av2028,
        currentTax: estimatedTax2028,
        realYearlyTax2028: realTax2028,
      });
    });
  };

  return (
      <Card className="w-full glass-container border-0 overflow-hidden">
        <CardHeader className="relative z-10">
          <CardTitle className="text-2xl">Property Details</CardTitle>
          <CardDescription className="text-muted-foreground/80">
            Enter your property details to estimate your real property tax.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 relative z-10">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="barangay" className="text-foreground/90 font-medium">Barangay</Label>
              <AutocompleteInput
                placeholder="Search for a barangay..."
                suggestions={barangaySuggestions}
                onInputChange={(value) => {
                  setBarangaySearch(value);
                  if (!value) {
                    setBarangaySuggestions(allBarangays);
                  }
                }}
                onSelect={handleSelectBarangay}
                value={selectedBarangay}
                onOpen={() => setBarangaySuggestions(allBarangays)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="text-foreground/90 font-medium">Location / Subdivision</Label>
              <AutocompleteInput
                placeholder="Search for a location..."
                suggestions={locationSuggestions}
                onInputChange={(value) => {
                  setLocationSearch(value);
                   if (!value) {
                    setLocationSuggestions(allLocationsForBarangay);
                  }
                }}
                onSelect={handleSelectLocation}
                value={selectedLocation}
                isLoading={false}
                disabled={!selectedBarangay}
                onOpen={() => setLocationSuggestions(allLocationsForBarangay)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="lot-area" className="text-foreground/90 font-medium">Lot Area (in sq. m)</Label>
              <Input
                id="lot-area"
                type="number"
                placeholder="e.g., 150"
                className="glass-input h-11"
                value={lotArea}
                onChange={(e) => {
                  setLotArea(e.target.value)
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
            {selectedLocation?.propertyType && (
              <div className="space-y-2">
                <Label className="text-foreground/90 font-medium">Property Type</Label>
                <div className="flex h-10 items-center">
                  <Badge variant="outline" className="text-sm font-semibold border-primary/30 bg-primary/10 px-4 py-1.5 text-primary-foreground dark:text-primary backdrop-blur-md">
                    {selectedLocation.propertyType}
                  </Badge>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 relative z-10 pt-2 pb-8">
          <Button
            onClick={handleCalculate}
            disabled={isCalculating}
            className="w-full sm:w-auto h-11 px-8 font-bold shadow-lg shadow-primary/20"
          >
            {isCalculating ? "Calculating..." : "Calculate Tax"}
          </Button>
          <Button
            variant="outline"
            onClick={handleClear}
            className="w-full sm:w-auto h-11 px-8 glass-card border-white/10 hover:bg-white/10"
          >
            Clear
          </Button>
        </CardFooter>
      </Card>
  );
}