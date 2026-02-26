export type BuildingPropertyClassification = "Residential" | "Commercial" | "Commercial/Industrial";

export interface QualityLevel {
  level: string;
  value: number;
}

export interface BuildingType {
  name: string;
  classification: BuildingPropertyClassification;
  qualityLevels: QualityLevel[];
}

export const BUILDING_TYPES: BuildingType[] = [
  {
    name: "ONE FAMILY DWELLING",
    classification: "Residential",
    qualityLevels: [
      { level: "V", value: 25000 },
      { level: "IV", value: 20000 },
      { level: "III", value: 16000 },
      { level: "II", value: 13000 },
      { level: "I", value: 10000 },
    ],
  },
  {
    name: "DUPLEX DWELLING – TOWNHOUSE",
    classification: "Residential",
    qualityLevels: [
      { level: "V", value: 22500 },
      { level: "IV", value: 20500 },
      { level: "III", value: 18000 },
      { level: "II", value: 13500 },
      { level: "I", value: 9000 },
    ],
  },
  {
    name: "WAREHOUSE – HARDWARE STORE",
    classification: "Commercial/Industrial",
    qualityLevels: [
      { level: "V", value: 13500 },
      { level: "IV", value: 11000 },
      { level: "III", value: 8500 },
      { level: "II", value: 7000 },
      { level: "I", value: 5500 },
    ],
  },
  {
    name: "RESIDENTIAL CONDOMINIUM (HIGHRISE) 9 STY AND ABOVE",
    classification: "Residential",
    qualityLevels: [
      { level: "V", value: 50000 },
      { level: "IV", value: 45000 },
      { level: "III", value: 40000 },
    ],
  },
  {
    name: "TOWNHOUSE W/ CCT (RESL. CONDO)",
    classification: "Residential",
    qualityLevels: [
      { level: "V", value: 22500 },
      { level: "IV", value: 20500 },
      { level: "III", value: 18000 },
      { level: "II", value: 13500 },
      { level: "I", value: 9000 },
    ],
  },
  {
    name: "APARTELLE – APARTMENT BUILDING / HOSTEL",
    classification: "Residential",
    qualityLevels: [
      { level: "V", value: 35500 },
      { level: "IV", value: 28500 },
      { level: "III", value: 23000 },
      { level: "II", value: 18500 },
      { level: "I", value: 15000 },
    ],
  },
  {
    name: "OFFICE BUILDING – BANKS / COMMERCIAL BUILDING / SHOWROOM / MALL",
    classification: "Commercial",
    qualityLevels: [
      { level: "V", value: 33500 },
      { level: "IV", value: 27000 },
      { level: "III", value: 21500 },
      { level: "II", value: 17000 },
      { level: "I", value: 14000 },
    ],
  },
];
