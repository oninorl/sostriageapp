export type CalendarItem = {
  day: number;
  phase: "Awareness" | "Consideration" | "Feedback";
  asset: { type: "post" | "script" | "none"; id?: number };
  channel: string;
  goal: string;
  check: string;
};

export const campaign = [
  {
    label: "Goal",
    text: "Get insurance and travel-health professionals to try the demo and give feedback.",
  },
  {
    label: "Audience",
    text: "Elena, the insurer's customer-experience and innovation lead (fictional composite persona).",
  },
  {
    label: "Duration and cadence",
    text: "14 days, one item per day, all on LinkedIn.",
  },
  {
    label: "Budget",
    text: "$0. No paid ads and no scheduling tool.",
  },
  {
    label: "Success measures",
    text: "Primary: click rate on the primary button in the homepage A/B tests (recorded in ab_events). Secondary: replies from insurance or travel professionals.",
  },
  {
    label: "Status",
    text: "Planned simulation. Nothing has been published or scheduled.",
  },
  {
    label: "Rule",
    text: "Every item follows the brand dos and don'ts: simulated demo, a doctor decides, no invented customers or statistics.",
  },
];

export const calendar: CalendarItem[] = [
  {
    day: 1,
    phase: "Awareness",
    asset: { type: "post", id: 1 },
    channel: "LinkedIn",
    goal: "Make the problem recognizable",
    check: "Reactions and comments",
  },
  {
    day: 2,
    phase: "Awareness",
    asset: { type: "post", id: 2 },
    channel: "LinkedIn",
    goal: "Explain the repeated intake",
    check: "Reactions and comments",
  },
  {
    day: 3,
    phase: "Awareness",
    asset: { type: "post", id: 3 },
    channel: "LinkedIn",
    goal: "Show how it works",
    check: "Comments and questions",
  },
  {
    day: 4,
    phase: "Awareness",
    asset: { type: "post", id: 4 },
    channel: "LinkedIn",
    goal: "Build trust: what the tool does not do",
    check: "Questions about liability",
  },
  {
    day: 5,
    phase: "Awareness",
    asset: { type: "script", id: 1 },
    channel: "LinkedIn video",
    goal: "Tell the story visually",
    check: "Video views and replies. Review the A/B results so far.",
  },
  {
    day: 6,
    phase: "Awareness",
    asset: { type: "post", id: 5 },
    channel: "LinkedIn",
    goal: "Show transparent pricing",
    check: "Replies about pricing",
  },
  {
    day: 7,
    phase: "Awareness",
    asset: { type: "post", id: 6 },
    channel: "LinkedIn",
    goal: "Share the research gap",
    check: "Weekly review: what resonated",
  },
  {
    day: 8,
    phase: "Consideration",
    asset: { type: "script", id: 2 },
    channel: "LinkedIn video",
    goal: "Show the product in use",
    check: "Video views and replies",
  },
  {
    day: 9,
    phase: "Consideration",
    asset: { type: "post", id: 7 },
    channel: "LinkedIn",
    goal: "Show honesty about the risks",
    check: "Questions about risks",
  },
  {
    day: 10,
    phase: "Consideration",
    asset: { type: "post", id: 8 },
    channel: "LinkedIn",
    goal: "Show real early feedback",
    check: "Midpoint review: A/B results and replies",
  },
  {
    day: 11,
    phase: "Consideration",
    asset: { type: "script", id: 3 },
    channel: "LinkedIn video",
    goal: "Make the pricing testable",
    check: "Video views and replies",
  },
  {
    day: 12,
    phase: "Feedback",
    asset: { type: "post", id: 9 },
    channel: "LinkedIn",
    goal: "Show the process and the values behind it",
    check: "Reactions and comments",
  },
  {
    day: 13,
    phase: "Feedback",
    asset: { type: "none" },
    channel: "LinkedIn and direct messages",
    goal: "Reply to comments and messages, and share the demo link with 5 people who work in insurance or travel",
    check: "Number of conversations started",
  },
  {
    day: 14,
    phase: "Feedback",
    asset: { type: "post", id: 10 },
    channel: "LinkedIn",
    goal: "Ask insurers for feedback",
    check: "Final review: A/B results, replies, and what to change",
  },
];