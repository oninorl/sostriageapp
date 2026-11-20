export type RoadmapItem = { text: string; addresses?: string };

export const principle =
  "Order of priority: safety first, then evidence, then security, then new features. A feature that makes the product look better but not safer or better proven comes last.";

export const now: RoadmapItem[] = [
  { text: "A ten-page integrated prototype on Vercel and Supabase." },
  { text: "A guided chat and a triage form with rule-based emergency and out-of-scope guardrails." },
  { text: "A simulated human-review flag. No doctor reviews anything." },
  { text: "Research, a pricing simulator, marketing content, and two A/B tests on the homepage." },
  { text: "A dashboard with live counts from all modules and a testing summary." },
  { text: "Tests by external users, recorded in the testing summary." },
];

export const next: RoadmapItem[] = [
  {
    text: "A clinician reviews the emergency phrases and the urgency rules.",
    addresses: "Missed emergency, wrong urgency",
  },
  {
    text: "Talk to three to five insurers or assistance providers to check the problem, the buyer, the real intake rate, and willingness to pay.",
    addresses: "Unproven value, reason to pay",
  },
  {
    text: "Replace the monthly/annual toggle with pricing scenarios (see below).",
    addresses: "Reason to pay",
  },
  {
    text: "Test on phones and with people who are not friends, including people who do not speak English well.",
    addresses: "Usability evidence",
  },
  {
    text: "Count unique visitors in the A/B tests and collect more sessions before choosing a winner.",
    addresses: "A/B limits",
  },
  {
    text: "Add login, moderation, and rate limiting, and stop reading free-text tables from the browser: serve only aggregated numbers from a server.",
    addresses: "Privacy, public write access",
  },
  {
    text: "Check the regulatory position, including whether software that suggests an urgency level counts as a medical device.",
    addresses: "Regulation",
  },
];

export const later: RoadmapItem[] = [
  {
    text: "A pilot with one insurer that measures the time to first useful contact with and without the tool.",
    addresses: "Unproven value",
  },
  {
    text: "A real human-review workflow, where a doctor sees flagged cases before anything else happens.",
    addresses: "Simulated checkpoint",
  },
  {
    text: "Cover more kinds of problems, as requested by testers, only with rules reviewed by a clinician.",
    addresses: "Missed emergency, wrong urgency",
  },
  {
    text: "Spanish and other languages, starting with the countries where the first users are.",
    addresses: "Usability evidence",
  },
  {
    text: "Evaluate whether a language model adds value, only with clinician sign-off, strict guardrails, and a cost and safety test.",
    addresses: "Missed emergency, wrong urgency",
  },
  {
    text: "Export or integration with an insurer's own systems, only after a pilot agreement.",
  },
];

export const scenarios = {
  today:
    "The pricing calculator has a monthly and annual toggle. It changes the period, not the assumptions, so it only shows the same scenario twice.",
  plan: "In version 2 the toggle is replaced by three scenarios. Each one sets the assumptions together, so a visitor can compare the outcomes side by side:",
  items: [
    {
      name: "Conservative",
      text: "Fewer insured members use the service, a lower intake rate, and a pilot group instead of all members.",
    },
    {
      name: "Base",
      text: "Starts from today's defaults in the calculator: 50,000 members, a 2% intake rate, and the Growth tier.",
    },
    {
      name: "Optimistic",
      text: "More members, a higher intake rate, and a larger tier.",
    },
  ],
  note: "The values for Conservative and Optimistic should come from conversations with insurers and from measured pilot data, not from guesses. Until then they stay open.",
};