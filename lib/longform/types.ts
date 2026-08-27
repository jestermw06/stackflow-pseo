export interface ScoreRow {
  criterion: string;
  a: number;
  b: number;
  note: string;
}

export interface PricingRow {
  label: string;
  a: string;
  b: string;
}

export interface DeepSection {
  heading: string;
  paragraphs: string[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface SourceLink {
  label: string;
  href: string;
}

export interface LongformArticle {
  slug: string;
  reviewed: string;
  dek: string;
  intro: string[];
  scores: ScoreRow[];
  differ: string[];
  chooseA: string[];
  chooseB: string[];
  pricingCaption: string;
  pricingRows: PricingRow[];
  pricingNotes: string[];
  sections: DeepSection[];
  faqs: FaqItem[];
  sources: SourceLink[];
}
