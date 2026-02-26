import { BuildingPropertyClassification } from "./building-data";

export type ProposalType = 'current' | 'p1' | 'p2' | 'p3';

export function getBuildingAssessmentLevel(marketValue: number, classification: BuildingPropertyClassification, proposal: ProposalType): number {
  const isResidential = classification === "Residential";

  if (proposal === 'p3') {
    // Both Residential and Commercial/Industrial have the same ranges for P3 in the prompt
    if (marketValue <= 500000) return 0.20;
    if (marketValue <= 1000000) return 0.25;
    if (marketValue <= 2000000) return 0.30;
    if (marketValue <= 5000000) return 0.40;
    if (marketValue <= 10000000) return 0.50;
    if (marketValue <= 20000000) return 0.60;
    if (marketValue <= 40000000) return 0.65;
    if (marketValue <= 80000000) return 0.70;
    return 0.80;
  }

  if (isResidential) {
    if (proposal === 'current') {
      if (marketValue <= 175000) return 0;
      if (marketValue <= 300000) return 0.10;
      if (marketValue <= 500000) return 0.20;
      if (marketValue <= 750000) return 0.25;
      if (marketValue <= 1000000) return 0.30;
      if (marketValue <= 2000000) return 0.35;
      if (marketValue <= 5000000) return 0.40;
      if (marketValue <= 10000000) return 0.50;
      return 0.60;
    } else if (proposal === 'p1') {
      if (marketValue <= 175000) return 0;
      if (marketValue <= 300000) return 0.07;
      if (marketValue <= 500000) return 0.14;
      if (marketValue <= 750000) return 0.18;
      if (marketValue <= 1000000) return 0.23;
      if (marketValue <= 2000000) return 0.27;
      if (marketValue <= 5000000) return 0.32;
      if (marketValue <= 10000000) return 0.36;
      return 0.43;
    } else if (proposal === 'p2') {
      if (marketValue <= 175000) return 0;
      if (marketValue <= 300000) return 0.06;
      if (marketValue <= 500000) return 0.09;
      if (marketValue <= 750000) return 0.12;
      if (marketValue <= 1000000) return 0.15;
      if (marketValue <= 2000000) return 0.18;
      if (marketValue <= 4000000) return 0.21;
      if (marketValue <= 6000000) return 0.25;
      if (marketValue <= 8000000) return 0.30;
      if (marketValue <= 10000000) return 0.35;
      return 0.40;
    }
  } else {
    // Commercial / Industrial / Commercial bucket
    if (proposal === 'current') {
      if (marketValue <= 300000) return 0.30;
      if (marketValue <= 500000) return 0.35;
      if (marketValue <= 750000) return 0.40;
      if (marketValue <= 1000000) return 0.50;
      if (marketValue <= 2000000) return 0.60;
      if (marketValue <= 5000000) return 0.70;
      if (marketValue <= 10000000) return 0.75;
      return 0.80;
    } else if (proposal === 'p1') {
      if (marketValue <= 300000) return 0.15;
      if (marketValue <= 500000) return 0.20;
      if (marketValue <= 750000) return 0.25;
      if (marketValue <= 1000000) return 0.30;
      if (marketValue <= 2000000) return 0.35;
      if (marketValue <= 4000000) return 0.40;
      if (marketValue <= 6000000) return 0.45;
      if (marketValue <= 8000000) return 0.50;
      if (marketValue <= 10000000) return 0.55;
      return 0.65;
    } else if (proposal === 'p2') {
      if (marketValue <= 500000) return 0.20;
      if (marketValue <= 1000000) return 0.25;
      if (marketValue <= 2000000) return 0.30;
      if (marketValue <= 5000000) return 0.35;
      if (marketValue <= 10000000) return 0.40;
      if (marketValue <= 20000000) return 0.45;
      if (marketValue <= 30000000) return 0.50;
      return 0.55;
    }
  }

  return 0;
}
