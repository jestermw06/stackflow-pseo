import comparisonData from '../data/production_comparisons.json';
import softwareData from '../data/software.json';
import {
  TOOL_PILLAR_MIN_COMPARISONS,
  TOOL_PILLARS,
  type ToolPillarCopy,
} from './toolPillars';
import type { Comparison, Software } from './types';

const comparisons = comparisonData as Comparison[];
const softwareList = softwareData as Software[];

export function getSoftwareById(id: string): Software | undefined {
  return softwareList.find((s) => s.id === id);
}

export function getComparisonsForTool(id: string): Comparison[] {
  return comparisons
    .filter(
      (c) => c.softwareA?.id === id || c.softwareB?.id === id
    )
    .sort((a, b) => (a.title || a.slug).localeCompare(b.title || b.slug));
}

export function getPillarToolIds(): string[] {
  const counts = new Map<string, number>();
  for (const c of comparisons) {
    for (const id of [c.softwareA?.id, c.softwareB?.id]) {
      if (!id) continue;
      counts.set(id, (counts.get(id) || 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .filter(([, n]) => n >= TOOL_PILLAR_MIN_COMPARISONS)
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => id);
}

export function getPillarCopy(id: string): ToolPillarCopy | null {
  return TOOL_PILLARS[id] || null;
}

export function hasToolPage(id: string): boolean {
  return getComparisonsForTool(id).length >= TOOL_PILLAR_MIN_COMPARISONS;
}

export function defaultPillarCopy(software: Software): ToolPillarCopy {
  return {
    tagline: software.description,
    overview: [
      `${software.name} is listed in our ${software.category} coverage on StackClash. Use the head-to-head comparisons below to see how it stacks up where buyers actually choose.`,
    ],
    bestFor: software.key_features.slice(0, 3).map((f) => `Teams that prioritize ${f.toLowerCase()}`),
    notIdealFor: [
      'Use cases better served by a specialist tool in our matchups',
      'Teams that need capabilities only covered by competitors below',
    ],
    verdict: `Review the comparisons featuring ${software.name} to decide if it fits your stack—or which alternative wins for your use case.`,
  };
}
