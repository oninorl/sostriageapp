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
];

// Update this after the full-site regression test. status: "not_run", "passed", or "failed".
export const regression = {
  status: "not_run" as "not_run" | "passed" | "failed",
  passed: 0,
  total: 11,
};