export type DemoLink = { href: string; label: string };

export type DemoStep = {
  id: number;
  short: string;
  title: string;
  description: string;
  see: string[];
  simulated: string[];
  links: DemoLink[];
};

export const steps: DemoStep[] = [
  {
    id: 1,
    short: "The problem",
    title: "The problem",
    description:
      "A traveler who needs medical help abroad can wait a long time before a doctor is involved. One real experience: about 1.5 hours to reach someone and about 15 hours before medical advice. That is one case, not an average.",
    see: [
      "The homepage, with one of two headlines (assigned randomly per visitor)",
      "The idea in a few lines: collect the intake once, let a doctor decide",
      "The demo disclaimer and the not-affiliated notice",
    ],
    simulated: [
      "Nothing on the homepage is a live service.",
      "The 1.5 and 15 hours come from one friend's experience, not from a study.",
    ],
    links: [{ href: "/", label: "Open the homepage" }],
  },
  {
    id: 2,
    short: "The chat assistant",
    title: "The chat assistant",
    description:
      "A guided chat asks three questions, suggests an urgency level, and stops for emergencies. A doctor, not the assistant, makes every medical decision.",
    see: [
      "Three questions: the main problem, how long it has lasted, and how severe it is",
      "An urgency label (low, moderate, or high) with a generic next step",
      "A notice when a case would be flagged for human review",
      "An emergency card for phrases such as \"I can't breathe\"",
      "Thumbs up or down at the end",
    ],
    simulated: [
      "No language model: the questions are fixed and the answers follow keyword rules.",
      "The human review is simulated. No doctor reviews anything.",
      "The rules are not clinically validated and miss some wordings.",
      "The text you type is never saved.",
    ],
    links: [{ href: "/chat", label: "Open the chat" }],
  },
  {
    id: 3,
    short: "The triage form",
    title: "The triage form",
    description: "The first version of the idea: one short form instead of a conversation.",
    see: [
      "A form with symptoms, duration, and a pain level",
      "A result card in green, orange, or red",
      "A save button and a list of saved results that shows only the urgency level, duration, and pain level",
    ],
    simulated: [
      "Keyword rules and a pain-level threshold, not a medical model.",
      "The same emergency rules as the chat apply.",
      "The text you type is shown only to you and is never saved.",
    ],
    links: [{ href: "/core", label: "Open the triage form" }],
  },
  {
    id: 4,
    short: "Research and pricing",
    title: "Research and pricing",
    description: "Why the idea might be worth building, and what insurers could pay for it.",
    see: [
      "Research: global examples, a searchable table of eight competitors and substitutes, a Mexico section, and a risk map",
      "Pricing: three tiers, a revenue calculator with a monthly and annual view, an assumptions table, and saved scenarios",
    ],
    simulated: [
      "The research is a desk review of eight providers, not a market study.",
      "Prices and the intake rate are illustrative assumptions, not measured data.",
      "No insurer has been approached.",
    ],
    links: [
      { href: "/research", label: "Open the research page" },
      { href: "/pricing", label: "Open the pricing page" },
    ],
  },
  {
    id: 5,
    short: "Marketing and A/B tests",
    title: "Marketing and A/B tests",
    description:
      "How the product would be explained to insurers, and a first test of two headlines and two button texts on the homepage.",
    see: [
      "A brand system, a fictional persona, 10 LinkedIn drafts, 3 video scripts, and a 14-day calendar, with copy, export, and save buttons",
      "A results panel with views, clicks, and click rates for both A/B tests",
    ],
    simulated: [
      "Nothing has been published or scheduled.",
      "The persona is a fictional composite, not a real person.",
      "The A/B results come from small samples: read them as an indication, not as proof.",
    ],
    links: [
      { href: "/marketing", label: "Open the marketing page" },
      { href: "/", label: "Open the homepage" },
    ],
  },
  {
    id: 6,
    short: "The dashboard",
    title: "The dashboard",
    description: "What has been recorded across all modules, and how the testing went.",
    see: [
      "Counts for triage intakes, chat conversations, ratings, research notes, pricing scenarios, marketing assets, and A/B sessions",
      "A bar with the results of the chat conversations",
      "The latest chat records and the testing summary with the external users",
    ],
    simulated: [
      "The rows are real records in the database, but they include test data from development and from testers.",
      "The page shows counts and structured fields only, never typed text or comments.",
    ],
    links: [{ href: "/dashboard", label: "Open the dashboard" }],
  },
];