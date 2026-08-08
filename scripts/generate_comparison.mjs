#!/usr/bin/env node
/**
 * Generate one comparison via the Multi-Brain AI client schema and merge into production JSON.
 *
 * Usage:
 *   XAI_API_KEY=... node scripts/generate_comparison.mjs hubspot pipedrive
 *   OPENAI_API_KEY=... AI_PROVIDER=openai node scripts/generate_comparison.mjs mailchimp klaviyo
 *
 * Validates required fields, resolves software from data/software.json, writes production_comparisons.json.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

/** Load KEY=VAL from .env / .env.local (gitignored). Windows node.exe often misses WSL exports. */
function loadEnvFiles() {
  for (const name of ['.env.local', '.env']) {
    const p = path.join(ROOT, name);
    if (!fs.existsSync(p)) continue;
    for (const line of fs.readFileSync(p, 'utf8').split(/\r?\n/)) {
      const t = line.trim();
      if (!t || t.startsWith('#')) continue;
      const i = t.indexOf('=');
      if (i < 1) continue;
      const k = t.slice(0, i).trim();
      let v = t.slice(i + 1).trim();
      if (
        (v.startsWith('"') && v.endsWith('"')) ||
        (v.startsWith("'") && v.endsWith("'"))
      ) {
        v = v.slice(1, -1);
      }
      if (!process.env[k]) process.env[k] = v;
    }
  }
}
loadEnvFiles();

const provider = (process.env.AI_PROVIDER || 'xai').toLowerCase();
const apiKey =
  process.env.XAI_API_KEY ||
  process.env.OPENAI_API_KEY ||
  process.env.AI_API_KEY;

const [idA, idB] = process.argv.slice(2);
if (!idA || !idB) {
  console.error('Usage: node scripts/generate_comparison.mjs <softwareIdA> <softwareIdB>');
  process.exit(1);
}
if (!apiKey) {
  console.error('Set XAI_API_KEY or OPENAI_API_KEY (and optional AI_PROVIDER=openai|xai).');
  process.exit(1);
}

const software = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'data/software.json'), 'utf8')
);
const promptTemplate = fs.readFileSync(
  path.join(ROOT, 'lib/prompts/comparison_engine.md'),
  'utf8'
);
const prodPath = path.join(ROOT, 'data/production_comparisons.json');
const production = JSON.parse(fs.readFileSync(prodPath, 'utf8'));

const a = software.find((s) => s.id === idA);
const b = software.find((s) => s.id === idB);
if (!a || !b) {
  console.error('Unknown software id. Check data/software.json.');
  process.exit(1);
}

const slug = `${idA.replace(/_/g, '-')}-vs-${idB.replace(/_/g, '-')}`;
const userPayload = `
Software A:
${JSON.stringify(a, null, 2)}

Software B:
${JSON.stringify(b, null, 2)}
`;

const prompt = `${promptTemplate}\n\n# LIVE INPUT\n${userPayload}`;

const endpoints = {
  xai: {
    url: 'https://api.x.ai/v1/chat/completions',
    // Prefer explicit model; aliases like grok-3 also work on current xAI API
    model: process.env.AI_MODEL || 'grok-4.5',
  },
  openai: {
    url: 'https://api.openai.com/v1/chat/completions',
    model: process.env.AI_MODEL || 'gpt-4o',
  },
};

const cfg = endpoints[provider];
if (!cfg) {
  console.error(`Unsupported AI_PROVIDER: ${provider}`);
  process.exit(1);
}

console.log(`Generating ${slug} via ${provider} (${cfg.model})...`);

const res = await fetch(cfg.url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: cfg.model,
    temperature: 0.2,
    messages: [{ role: 'user', content: prompt }],
  }),
});

if (!res.ok) {
  console.error('API error', res.status, await res.text());
  process.exit(1);
}

const data = await res.json();
let content = data.choices?.[0]?.message?.content || '';
content = content.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();

let parsed;
try {
  parsed = JSON.parse(content);
} catch (e) {
  console.error('Model did not return valid JSON:\n', content.slice(0, 800));
  process.exit(1);
}

const requiredArrays = ['prosA', 'consA', 'prosB', 'consB'];
for (const key of requiredArrays) {
  if (!Array.isArray(parsed[key]) || parsed[key].length === 0) {
    console.error(`Invalid or empty array field: ${key}`);
    process.exit(1);
  }
}
if (!parsed.verdict || !parsed.verdictReason) {
  console.error('Missing verdict or verdictReason');
  process.exit(1);
}

const points = (parsed.comparisonPoints || []).map((p) => ({
  feature: p.feature,
  softwareA: Boolean(p.softwareA ?? p.software_a),
  softwareB: Boolean(p.softwareB ?? p.software_b),
}));

const entry = {
  slug,
  title: `${a.name} vs ${b.name}`,
  softwareA: a,
  softwareB: b,
  verdict: parsed.verdict,
  verdictReason: parsed.verdictReason,
  comparisonPoints: points,
  prosA: parsed.prosA,
  consA: parsed.consA,
  prosB: parsed.prosB,
  consB: parsed.consB,
  quality: 'generated',
};

const idx = production.findIndex((c) => c.slug === slug);
if (idx >= 0) production[idx] = entry;
else production.push(entry);

production.sort((x, y) => x.slug.localeCompare(y.slug));
fs.writeFileSync(prodPath, JSON.stringify(production, null, 2) + '\n');
console.log(`Wrote ${slug} → data/production_comparisons.json (${production.length} total)`);
