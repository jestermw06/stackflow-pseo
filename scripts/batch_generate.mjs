#!/usr/bin/env node
/**
 * Batch-generate comparisons via LLM (requires API key).
 *
 * Usage:
 *   XAI_API_KEY=... node scripts/batch_generate.mjs
 *   AI_PROVIDER=openai OPENAI_API_KEY=... node scripts/batch_generate.mjs
 *
 * Reads pairs from PAIR_LIST below (or argv as idA,idB repeats).
 * Skips slugs already present unless --force.
 */
import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const force = process.argv.includes('--force');

// Optional extra pairs for LLM volume (high-intent only)
const DEFAULT_PAIRS = [
  // add more when you want LLM drafts; hand-authored set is already flagship-complete
  ['zoho_crm', 'pipedrive'], // reverse already exists — skip via dedupe
];

const prod = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'data/production_comparisons.json'), 'utf8')
);
const existing = new Set(prod.map((p) => p.slug));

function slugFor(a, b) {
  return `${a.replace(/_/g, '-')}-vs-${b.replace(/_/g, '-')}`;
}

const pairs = [];
const argvPairs = process.argv.slice(2).filter((a) => a !== '--force');
if (argvPairs.length >= 2) {
  for (let i = 0; i < argvPairs.length; i += 2) {
    if (argvPairs[i + 1]) pairs.push([argvPairs[i], argvPairs[i + 1]]);
  }
} else {
  pairs.push(...DEFAULT_PAIRS);
}

if (!process.env.XAI_API_KEY && !process.env.OPENAI_API_KEY && !process.env.AI_API_KEY) {
  console.error('No API key found. Set XAI_API_KEY or OPENAI_API_KEY.');
  console.error('Hand-authored content does not require this script.');
  process.exit(1);
}

let ran = 0;
for (const [a, b] of pairs) {
  const slug = slugFor(a, b);
  if (existing.has(slug) && !force) {
    console.log(`skip existing ${slug}`);
    continue;
  }
  console.log(`generate ${slug}...`);
  const r = spawnSync(
    process.execPath,
    [path.join(__dirname, 'generate_comparison.mjs'), a, b],
    { stdio: 'inherit', env: process.env, cwd: ROOT }
  );
  if (r.status !== 0) {
    console.error(`failed ${slug}`);
    process.exit(r.status || 1);
  }
  ran += 1;
  existing.add(slug);
}
console.log(`done. generated ${ran} pair(s). Review quality, then npm run build.`);
