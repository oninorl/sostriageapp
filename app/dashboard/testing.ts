export type Tester = {
  id: string;
  week: 5 | 6;
  who: string;
  device: string;
  finished: boolean;
  understood: boolean;
  rating: "up" | "down" | null;
  issueFound: string;
  fix: string;
};

// Fill this in from your own notes. Use only what really happened, and never add names.
// For a new tester: copy a row, change the id, set week to 6, and fill in the real details.
export const testers: Tester[] = [
  {
    id: "T1",
    week: 5,
    who: "Friend",
    device: "Laptop",
    finished: true,
    understood: true,
    rating: "up",
    issueFound: "None",
    fix: "—",
  },
  {
    id: "T2",
    week: 5,
    who: "Friend",
    device: "Laptop",
    finished: true,
    understood: true,
    rating: "down",
    issueFound: '"unable to breathe" was not recognised as an emergency',
    fix: "Breathing patterns added to the emergency rules; the same rules now also protect /core",
  },
  {
    id: "T3",
    week: 5,
    who: "Family member",
    device: "Laptop",
    finished: true,
    understood: true,
    rating: "up",
    issueFound: "None",
    fix: "—",
  },
  {
    id: "T4",
    week: 6,
    who: "Friend",
    device: "Phone",
    finished: true,
    understood: true,
    rating: "up",
    issueFound: "The suggestion gave no reasoning for the urgency level",
    fix: 'Added a "Why this suggestion" box that names the rule behind the result',
  },
  {
    id: "T5",
    week: 6,
    who: "Friend",
    device: "Laptop",
    finished: true,
    understood: true,
    rating: "down",
    issueFound:
      'Comment: "I don\'t want a doctor, I want solutions". Also found the name "Agent Map" unclear',
    fix: "No code change: the assistant deliberately gives no diagnosis or treatment advice",
  },
  {
    id: "T6",
    week: 6,
    who: "Friend",
    device: "Phone",
    finished: true,
    understood: true,
    rating: "up",
    issueFound: "Wanted more options for different kinds of problems",
    fix: "Not built: more conditions in a rule-based tool is a safety risk. Kept for the v2 roadmap",
  },
  {
    id: "T7",
    week: 6,
    who: "Partner",
    device: "Phone",
    finished: true,
    understood: true,
    rating: "up",
    issueFound:
      'Did not understand the question about "simulated"; would not trust a bot for medical advice',
    fix: "No change: the confusion came from the question wording, and the distrust is recorded as a risk",
  },
  {
    id: "T8",
    week: 6,
    who: "Family member",
    device: "Computer",
    finished: true,
    understood: true,
    rating: "up",
    issueFound: "None",
    fix: "—",
  },
];

// Update this after the full-site regression test. status: "not_run", "passed", or "failed".
export const regression = {
  status: "not_run" as "not_run" | "passed" | "failed",
  passed: 0,
  total: 11,
};