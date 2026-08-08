/** Canonical StackFlow comparison types — single source of truth for data + UI. */

export interface Software {
  id: string;
  name: string;
  category: string;
  description: string;
  key_features: string[];
  official_url: string;
}

export interface ComparisonPoint {
  feature: string;
  softwareA: boolean;
  softwareB: boolean;
}

export interface Comparison {
  slug: string;
  title: string;
  softwareA: Software;
  softwareB: Software;
  verdict: string;
  verdictReason: string;
  comparisonPoints?: ComparisonPoint[];
  prosA: string[];
  consA: string[];
  prosB: string[];
  consB: string[];
}
