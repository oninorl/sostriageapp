export type BuildLog = {
  week: number;
  title: string;
  built: string[];
  decided: string[];
};

export const logs: BuildLog[] = [
  {
    week: 0,
    title: "Setup sprint",
    built: [
      "Next.js and Tailwind app, GitHub repository, Vercel deployment, and a Supabase project with a first table and a test row.",
      "Homepage with navbar, footer, a /docs placeholder, a project roadmap, and a README with setup steps.",
    ],
    decided: [
      "Fixed: PowerShell blocked the npx script (execution policy).",
      "Fixed: npm rejected capital letters in the project name.",
      "Worked around a locked folder in OneDrive that could not be deleted.",
      "Fixed: a merge conflict between the local and the GitHub README and .gitignore.",
    ],
  },
  {
    week: 1,
    title: "Generative core: the triage form",
    built: [
      "The /core page: an intake form, simulated keyword-based triage (green, orange, red), a save button, and a list of saved results.",
      "A prompt library entry on /docs, and the homepage translated to English.",
    ],
    decided: [
      "Fixed: saving failed with a 404 because the Supabase URL already contained /rest/v1, so the path was doubled.",
      "Fixed: saving then failed with a 401 because the tables were not exposed in the Supabase Data API.",
      "Fixed: the Vercel environment variables were saved as type Secret, which the browser cannot use; they were added again as normal variables.",
    ],
  },
  {
    week: 2,
    title: "Research and benchmarking",
    built: [
      "The /research page: a research note form, 6 global examples with SOS International as the origin case, a Mexico section, a searchable table of 8 competitors and substitutes, and a labeled risk map.",
      "One validation conversation with a friend who lived the problem.",
    ],
    decided: [
      "Fixed: unreadable dark text on a dark background, caused by light-mode styling that conflicted with the site's dark theme.",
      "Rebuilt the risk map as a labeled SVG after the first version had unlabeled dots.",
    ],
  },
  {
    week: 3,
    title: "Product architecture and pricing",
    built: [
      "The /product page: two customer segments and a feature map across three tiers.",
      "The /pricing page: three tiers, a revenue calculator with a monthly and annual view, an assumptions table, and saved scenarios.",
    ],
    decided: [
      "Set the per-intake fees to $3.00, $2.50, and $2.00, a smaller volume discount than the agent suggested.",
      "Marked features that are not built as Planned on the feature map.",
      "Documented where the AI-generated mockup overstated the prototype, and kept the build as the source of truth.",
    ],
  },
  {
    week: 4,
    title: "Marketing engine and A/B tests",
    built: [
      "A landing page homepage with two A/B tests (headline and button text) that record views and clicks.",
      "The /marketing page: brand system, a fictional persona, landing copy, 10 LinkedIn drafts, 3 video scripts, a 14-day calendar, copy and export buttons, saved assets, and an A/B results panel.",
    ],
    decided: [
      "The first A/B results (45 sessions, 9 clicks) showed no reliable winner, and I reported that instead of declaring one.",
      "Fixed: a build error caused by a wrongly named data file.",
      "Learned: the UX mockup has to be made before coding, not after.",
    ],
  },
  {
    week: 5,
    title: "Public chatbot and guardrails",
    built: [
      "The /chat page: three intake questions, a suggested urgency level, emergency and out-of-scope guardrails, a simulated human-review flag, and thumbs feedback.",
      "The mockup was made first and reviewed before any code was written.",
    ],
    decided: [
      "Decided not to store the typed symptom text, only structured fields.",
      "Rejected the mockup's diagnosis and treatment tips.",
      "Fixed: \"i cant breathe\" without an apostrophe was missed (found in my own testing).",
      "Fixed: \"unable to breathe\" and \"not able to breathe\" were missed (found by an external tester).",
      "Three external testers (two friends and one family member) tested on laptops.",
    ],
  },
  {
    week: 6,
    title: "Integration, impact, and viability",
    built: [
      "The /core page now stores and shows only structured fields, and uses the same emergency rules as /chat.",
      "The /dashboard page: live counts from all seven tables, a results bar, the latest chat records, and a testing summary.",
      "The /demo page: a six-step guided walkthrough and an agent map.",
      "This documentation page with the prompt library and the build logs.",
    ],
    decided: [
      "Found during the impact check: /core saved the typed symptom text and showed it to every visitor. It now stores and shows only the urgency level, duration, and pain level, and the old rows were deleted.",
    ],
  },
];