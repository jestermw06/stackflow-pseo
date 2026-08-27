import type { LongformArticle } from './types';

const article: LongformArticle = {
  slug: 'make-vs-zapier',
  reviewed: 'August 27, 2026',
  dek: 'Zapier wins for most teams that need 9,000+ apps and a linear builder. Make wins when scenarios branch, iterate, and the Zapier task bill starts to hurt.',
  intro: [
    'Make vs Zapier is a workflow-shape decision wearing a price tag. Zapier is the safest no-code automation layer in 2026: 9,000+ apps, Professional from $19.99/month annually at 750 tasks, two-step free Zaps, and a product surface that now includes Agents, Tables, Forms, Canvas, and MCP. Make is the visual canvas: routers, iterators, aggregators, and a credit meter that is still much cheaper per unit of work.',
    'Make renamed “operations” to “credits” on 27 August 2025. For ordinary modules, one module run is one credit. AI modules can cost more. Free is 1,000 credits and two active scenarios. Core is the default paid plan — about $9–12/month on annual billing for 10,000 credits, unlimited scenarios, 1-minute interval (Make adjusted Core pricing during 2026; confirm the live slider). Zapier Free is 100 tasks and two-step Zaps only. Zapier Professional at 750 tasks is $19.99/month annually; 10,000 tasks is $129/month annually. A five-step Zap run 2,000 times is 10,000 Zapier tasks. The same work on Make is 10,000 credits if each run has five modules — Core’s whole allotment — at a fraction of Zapier’s 10k-task price.',
    'StackClash still gives Zapier the overall verdict for most teams: coverage, support, and “it just runs.” Make wins complexity and volume economics. If your workflows are linear and you need an obscure app, Zapier. If you are drawing diagrams with branches and looping line items, Make.',
  ],
  scores: [
    {
      criterion: 'App coverage',
      a: 7,
      b: 10,
      note: 'Zapier’s catalog (9,000+) and premium-app depth still win. Make is thousands, plus HTTP.',
    },
    {
      criterion: 'Complex logic',
      a: 9,
      b: 6,
      note: 'Routers, iterators, aggregators are native on Make. Zapier Paths exist on paid plans and feel bolted on.',
    },
    {
      criterion: 'Ease / time to first workflow',
      a: 6,
      b: 9,
      note: 'Zapier is a list of steps. Make is a canvas with a learning curve.',
    },
    {
      criterion: 'Price at volume',
      a: 9,
      b: 5,
      note: 'Credits vs tasks: Make is usually several times cheaper for multi-step volume.',
    },
    {
      criterion: 'Governance / teams',
      a: 6,
      b: 8,
      note: 'Zapier Team/Enterprise (SSO, shared connections, app controls) is more mature.',
    },
    {
      criterion: 'AI / agents / MCP',
      a: 7,
      b: 8,
      note: 'Both shipped agents and MCP-style access. Zapier’s 9,000-app MCP is the broader toolbelt.',
    },
  ],
  differ: [
    'Zapier counts a task when a Zap step succeeds (triggers generally do not count; built-in tools like Filter and Paths do not count). Multi-step Zaps multiply cost. That model is easy to explain and brutal on chatty workflows. Pay-per-task overage exists on paid plans if you enable it.',
    'Make counts credits per module execution. A scenario with a router still charges the modules that actually run. Iterating 50 line items can be 50 credits plus the parent modules. Polling and AI can surprise you. The canvas makes the cost visible if you look.',
    'Zapier’s editor is top-to-bottom. Non-technical operators ship faster. Make’s editor is a graph. Technical operators debug faster once they learn it. Neither is “better UI.” They match different brains.',
  ],
  chooseA: [
    'Workflows branch, loop, or transform arrays of records',
    'You are comfortable on a visual canvas and will watch the credit meter',
    'Volume would push Zapier into hundreds of dollars / month',
    'You will use HTTP/JSON modules instead of waiting for a native app',
  ],
  chooseB: [
    'You need an app Make does not have (or a better-maintained native action)',
    'Non-technical teammates must build and own Zaps',
    'You want Team/Enterprise governance, shared connections, SSO',
    'Linear, low-volume workflows where $20/month Pro is cheaper than learning Make',
  ],
  pricingCaption:
    'USD. Zapier prices from zapier.com/pricing (August 2026). Make Core/Pro/Teams are annual-equivalent list prices that moved during 2026 — treat as approximate and confirm.',
  pricingRows: [
    {
      label: 'Free',
      a: '1,000 credits/mo, 2 active scenarios, 15-min interval',
      b: '100 tasks/mo, two-step Zaps only',
    },
    {
      label: 'First useful paid plan',
      a: 'Core ~$9–12/mo annual, 10,000 credits, unlimited scenarios',
      b: 'Professional $19.99/mo annual at 750 tasks',
    },
    {
      label: '10,000 units / month',
      a: 'Still Core (10k credits) unless you need Pro features',
      b: 'Pro $129/mo annual (10,000 tasks)',
    },
    {
      label: 'Team layer',
      a: 'Teams ~$29–38/mo annual at 10k credits + roles',
      b: 'Team from $69/mo annual at 2,000 tasks (25 users)',
    },
    {
      label: 'What a unit is',
      a: 'Credit ≈ module run (AI may cost more)',
      b: 'Task ≈ successful action step (MCP calls can cost extra)',
    },
  ],
  pricingNotes: [
    'Make’s August 2025 rename did not change the math: most non-AI modules remain 1 credit. Old articles that say “operations” are describing credits.',
    'Zapier 750 and 1,500 task tiers are Professional-only. Team starts at 2,000 tasks.',
    'Zapier annual is about 33% off monthly. Make annual is typically ~15%+ off and often prepaid for the year.',
    'A 5-step workflow run 2,000 times/month is ~10,000 Zapier tasks (~$129 Pro annual) vs ~10,000 Make credits (Core). That example is why power users leave Zapier.',
  ],
  sections: [
    {
      heading: 'Credits vs tasks, with a real scenario',
      paragraphs: [
        'Take “new form lead → enrich → CRM → Slack → spreadsheet.” That is four or five successful Zapier actions per lead. 500 leads is 2,000–2,500 tasks — already past the 750-task Professional tier. On Make, each module is a credit; the same 500 runs might be 2,500 credits, still inside Core’s 10,000.',
        'Flip it: a Make scenario that iterates every line of an invoice can explode credits even when Zapier would use a single “create records” action. Count modules × runs, not “number of scenarios.”',
      ],
    },
    {
      heading: 'When Zapier’s catalog is the product',
      paragraphs: [
        'Make’s HTTP module closes many gaps. It does not close “our legal team already approved Zapier” or “the native Microsoft/Google/Salesforce actions are maintained.” Premium apps on Zapier paid plans are a genuine differentiator. If one critical connector only exists (or only works well) on Zapier, stop the comparison.',
      ],
    },
    {
      heading: 'AI, agents, and MCP',
      paragraphs: [
        'Zapier Agents bill activities, not tasks. Zapier MCP tool calls draw from the shared task pool (rates live on the rate card). Make AI modules can consume extra credits. In 2026 both vendors want to be the action layer for chat agents. Zapier wins breadth of tools the agent can call. Make wins if the agent is just kicking off a fat scenario you already designed.',
      ],
    },
    {
      heading: 'Reliability and ops',
      paragraphs: [
        'Zapier’s autoreplay, error emails, and “it ran while I slept” reputation is why agencies standardize on it. Make’s execution logs (better on Pro with full-text search) are better for debugging a hairy graph. Priority execution on Make Pro exists because Core can queue. If the workflow is customer-facing and time-sensitive, factor that in.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Is Make cheaper than Zapier?',
      a: 'Usually, once workflows have several modules and real volume. Zapier can be cheaper at tiny volume on Free or 750-task Pro. Run the unit math for your actual steps × runs.',
    },
    {
      q: 'What happened to Make operations?',
      a: 'They are called credits as of 27 August 2025. Same billing idea for standard modules: one run, one credit.',
    },
    {
      q: 'Can Zapier do branching?',
      a: 'Yes — Paths and filters on paid plans. Make’s routers and iterators are still more natural for complex graphs.',
    },
    {
      q: 'Which has more integrations?',
      a: 'Zapier, by a wide margin. Make plus HTTP covers a lot of the rest.',
    },
    {
      q: 'Should we use both?',
      a: 'Some teams do: Zapier for long-tail apps and non-technical builders, Make for the heavy scenarios. Two vendors means two meters and two failure modes. Start with one.',
    },
    {
      q: 'What about n8n?',
      a: 'n8n is the self-host / execution-based alternative. If you want no vendor meter at all and can run infrastructure, it is a third column — not a Zapier clone.',
    },
  ],
  sources: [
    { label: 'Zapier pricing (machine-readable)', href: 'https://zapier.com/pricing' },
    { label: 'Make pricing', href: 'https://www.make.com/en/pricing' },
    { label: 'Make credits documentation', href: 'https://help.make.com/credits' },
  ],
};

export default article;
