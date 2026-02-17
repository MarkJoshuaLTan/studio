export type PropertyType = "Residential" | "Commercial" | "Industrial" | "Commercial / Industrial";

export interface SuggestedItem {
  name: string;
  type: 'barangay' | 'location';
  fullPath?: string;
  unitValue2029?: number;
  unitValue2028?: number;
  propertyType?: PropertyType;
}

export interface LocationDetails {
  unitValue2029: number;
  unitValue2028: number;
  propertyType: PropertyType;
}

export interface BarangayLocations {
  [locationName: string]: LocationDetails;
}

export interface TaxData {
  [barangayName: string]: BarangayLocations;
}

export interface TaxSettings {
  assessmentLevels: Record<string, number>;
  taxRates: Record<string, number>;
  taxData: TaxData;
}
