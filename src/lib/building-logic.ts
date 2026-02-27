import { BuildingPropertyClassification } from "./building-data";

export type ProposalType = 'current' | 'p1' | 'p2' | 'p3';

export interface AssessmentRange {
  min: number;
  max: number;
  level: number;
}

const P3_TABLE: AssessmentRange[] = [
  { min: 0, max: 500000, level: 0.20 },
  { min: 500000, max: 1000000, level: 0.25 },
  { min: 1000000, max: 2000000, level: 0.30 },
  { min: 2000000, max: 5000000, level: 0.40 },
  { min: 5000000, max: 10000000, level: 0.50 },
  { min: 10000000, max: 20000000, level: 0.60 },
  { min: 20000000, max: 40000000, level: 0.65 },
  { min: 40000000, max: 80000000, level: 0.70 },
  { min: 80000000, max: Infinity, level: 0.80 },
];

const RESIDENTIAL_TABLES: Record<Exclude<ProposalType, 'p3'>, AssessmentRange[]> = {
  current: [
    { min: 0, max: 175000, level: 0 },
    { min: 175000, max: 300000, level: 0.10 },
    { min: 300000, max: 500000, level: 0.20 },
    { min: 500000, max: 750000, level: 0.25 },
    { min: 750000, max: 1000000, level: 0.30 },
    { min: 1000000, max: 2000000, level: 0.35 },
    { min: 2000000, max: 5000000, level: 0.40 },
    { min: 5000000, max: 10000000, level: 0.50 },
    { min: 10000000, max: Infinity, level: 0.60 },
  ],
  p1: [
    { min: 0, max: 175000, level: 0 },
    { min: 175000, max: 300000, level: 0.07 },
    { min: 300000, max: 500000, level: 0.14 },
    { min: 500000, max: 750000, level: 0.18 },
    { min: 750000, max: 1000000, level: 0.23 },
    { min: 1000000, max: 2000000, level: 0.27 },
    { min: 2000000, max: 5000000, level: 0.32 },
    { min: 5000000, max: 10000000, level: 0.36 },
    { min: 10000000, max: Infinity, level: 0.43 },
  ],
  p2: [
    { min: 0, max: 175000, level: 0 },
    { min: 175000, max: 300000, level: 0.06 },
    { min: 300000, max: 500000, level: 0.09 },
    { min: 500000, max: 750000, level: 0.12 },
    { min: 750000, max: 1000000, level: 0.15 },
    { min: 1000000, max: 2000000, level: 0.18 },
    { min: 2000000, max: 4000000, level: 0.21 },
    { min: 4000000, max: 6000000, level: 0.25 },
    { min: 6000000, max: 8000000, level: 0.30 },
    { min: 8000000, max: 10000000, level: 0.35 },
    { min: 10000000, max: Infinity, level: 0.40 },
  ],
};

const COMMERCIAL_TABLES: Record<Exclude<ProposalType, 'p3'>, AssessmentRange[]> = {
  current: [
    { min: 0, max: 300000, level: 0.30 },
    { min: 300000, max: 500000, level: 0.35 },
    { min: 500000, max: 750000, level: 0.40 },
    { min: 750000, max: 1000000, level: 0.50 },
    { min: 1000000, max: 2000000, level: 0.60 },
    { min: 2000000, max: 5000000, level: 0.70 },
    { min: 5000000, max: 10000000, level: 0.75 },
    { min: 10000000, max: Infinity, level: 0.80 },
  ],
  p1: [
    { min: 0, max: 300000, level: 0.15 },
    { min: 300000, max: 500000, level: 0.20 },
    { min: 500000, max: 750000, level: 0.25 },
    { min: 750000, max: 1000000, level: 0.30 },
    { min: 1000000, max: 2000000, level: 0.35 },
    { min: 2000000, max: 4000000, level: 0.40 },
    { min: 4000000, max: 6000000, level: 0.45 },
    { min: 6000000, max: 8000000, level: 0.50 },
    { min: 8000000, max: 10000000, level: 0.55 },
    { min: 10000000, max: Infinity, level: 0.65 },
  ],
  p2: [
    { min: 0, max: 500000, level: 0.20 },
    { min: 500000, max: 1000000, level: 0.25 },
    { min: 1000000, max: 2000000, level: 0.30 },
    { min: 2000000, max: 5000000, level: 0.35 },
    { min: 5000000, max: 10000000, level: 0.40 },
    { min: 10000000, max: 20000000, level: 0.45 },
    { min: 20000000, max: 30000000, level: 0.50 },
    { min: 30000000, max: Infinity, level: 0.55 },
  ],
};

export function getBuildingAssessmentTable(classification: BuildingPropertyClassification, proposal: ProposalType): AssessmentRange[] {
  if (proposal === 'p3') return P3_TABLE;
  const isResidential = classification === "Residential";
  return isResidential ? RESIDENTIAL_TABLES[proposal] : COMMERCIAL_TABLES[proposal];
}

export function getBuildingAssessmentLevel(marketValue: number, classification: BuildingPropertyClassification, proposal: ProposalType): number {
  const table = getBuildingAssessmentTable(classification, proposal);
  const row = table.find(r => marketValue <= r.max);
  return row ? row.level : table[table.length - 1].level;
}
