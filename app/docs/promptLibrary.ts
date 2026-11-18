export type PromptEntry = {
  week: number;
  title: string;
  built: string;
  note: string;
  prompt: string;
};

export const prompts: PromptEntry[] = [
  {
    week: 0,
    title: "Setup sprint",
    built: "Homepage with navbar, footer, a /docs placeholder, and a project roadmap.",
    note: "From the Week 0 Build Discipline Packet.",
    prompt: `Build a Next.js homepage with a navbar (links: Home, Docs), a footer, a /docs placeholder page, and a project roadmap section on the homepage showing the course modules. Use Tailwind for styling. Keep it simple and functional, no complex animations.`,
  },
  {
    week: 1,
    title: "Generative core: the triage form",
    built: "The /core page with a simulated, rule-based triage and saved results.",
    note: "As documented on this page in Week 1. In Week 6 the page was changed so that it no longer saves the typed text.",
    prompt: `Create a /core page in my existing Next.js project. Add an intake form with: a free-text field for symptom description, and 2 multiple-choice questions (symptom duration, pain level 1-10). On submit, run a local, rule-based function (no external AI API) that generates: a structured summary of the input, and an urgency level (green/yellow/orange/red) based on keyword matching. Display this in an output card clearly labeled 'Simulated demo output — not real medical advice'. Add a Save button that writes the result to a Supabase table called core_outputs. Below the output card, add a dashboard preview showing the last 5 saved entries from that table. Also update /docs to document this prompt and the triage logic used.`,
  },
  {
    week: 2,
    title: "Research and benchmarking",
    built: "The /research page with notes, global examples, a competitor table, and a risk map.",
    note: "Condensed from the Week 2 prompt log.",
    prompt: `Build the /research page with a research intake form, 5+ global examples, Mexico localization, an 8-competitor filter/search table, and a risk map.`,
  },
  {
    week: 3,
    title: "Product architecture and pricing",
    built: "The /product and /pricing pages with a revenue calculator and saved scenarios.",
    note: "From the Week 3 Build Discipline Packet.",
    prompt: `In my existing Next.js project, create two pages. /product: show 2 customer segments (regional/niche insurers and national/enterprise insurers) and a feature map table showing which features are included in each of 3 tiers (Starter, Growth, Enterprise), with a status column marking what exists in the prototype versus what is planned. /pricing: show 3 tier cards (Starter $500/month + $3.00 per intake, Growth $1,500/month + $2.50 per intake, Enterprise $4,000/month + $2.00 per intake). Add a revenue calculator with inputs for insured members and intake rate (% of members per month), calculating monthly revenue = license fee + (members × intake rate × fee per intake). Add a monthly/annual toggle (annual = monthly × 12). Add an assumptions table listing each assumption, the value used, and why it may be wrong. Add a Save scenario button that writes tier, members, monthly intakes, period, and calculated revenue to a Supabase table pricing_scenarios, and show the last 5 saved scenarios. Label all figures as illustrative. No paid APIs, no login, no payment processing.`,
  },
  {
    week: 4,
    title: "Marketing engine and A/B tests",
    built: "A landing page homepage with two A/B tests, and the /marketing page.",
    note: "From the Week 4 Build Discipline Packet.",
    prompt: `In my existing Next.js project (dark theme, Tailwind, Supabase), upgrade the homepage / into a landing page with a hero (headline, subheadline, two call-to-action buttons), a three-step 'how it works' section, a 'for insurers' section, and a disclaimer that this is a simulated student demo. The hero headline and the primary button text each run an A/B test: assign variant A or B randomly on the first visit, remember it in the browser, and write a view event and a click event to a Supabase table ab_events (test_name, variant, event_type). Create a /marketing page with a brand system section, a target persona section (an insurer's innovation or customer-experience lead, labeled as a fictional composite), landing page copy, 10 social post cards, 3 video script cards, a 14-day campaign calendar, and an A/B results panel that reads ab_events and shows views, clicks, click rate, and sample size per variant. Add Copy and Export (.txt download) buttons on every content card, and a Save asset button that writes to a Supabase table marketing_assets (asset_type, title, content) with a list of saved assets. No paid APIs, no invented testimonials or statistics.`,
  },
  {
    week: 5,
    title: "Public chatbot and guardrails",
    built: "The /chat page with guardrails, a simulated human-review flag, and feedback.",
    note: "From the Week 5 Build Discipline Packet.",
    prompt: `In my existing Next.js project (dark theme, Tailwind, Supabase), create a /chat page: a guided chat with message bubbles and quick-reply buttons. The assistant greets the user, says it is a simulated demo that cannot diagnose or replace a doctor, and asks 3 intake questions: the main problem (free text), how long it has lasted (a few hours, a few days, longer), and how severe it is (mild, moderate, severe). Use simple keyword rules to produce a suggested urgency level (green, orange, red) with a short summary, labeled as a simulated suggestion. Add guardrails: emergency phrases stop the flow at any step and show an emergency message telling the user to contact local emergency services now (for example 112 in the EU, 911 in Mexico and the United States), with no urgency level; diagnosis or medication requests get an out-of-scope message and the current question is asked again. Mark orange and red results and any guardrail trigger as flagged for human review, and explain that in a real service a doctor would review them. After the response, show thumbs up and down with an optional short comment, and a Start over button. Save a structured summary (session ID, urgency level, duration answer, severity answer, guardrail type, flagged for review) to a Supabase table chat_sessions, and save the rating and comment to chat_feedback; never store the free-text symptom description. No paid APIs, no login.`,
  },
  {
    week: 6,
    title: "Integration, impact, and viability",
    built: "The dashboard, the guided demo with an agent map, and this documentation page.",
    note: "From the Week 6 Build Discipline Packet.",
    prompt: `In my existing Next.js project (dark theme, Tailwind, Supabase, ten pages), integrate the final venture site. Update the navbar to link to all ten pages. Create /dashboard: read counts and the latest structured records from the existing Supabase tables (core_outputs, chat_sessions, chat_feedback, research_records, pricing_scenarios, marketing_assets, ab_events), show the urgency distribution of chat sessions, never display typed text or feedback comments, and add a testing summary from a data file. Create /demo: a six-step guided walkthrough with Back, Next, and open-page buttons, and an agent map (inline SVG) of the seven modules, the Supabase tables, and the human checkpoint, marking what is rule-based, static, or simulated. Extend /docs with a prompt library, build logs per week, a practical impact check, and a version 2 roadmap. Fix /core so it stores and shows only structured fields, not the typed symptom text. No paid APIs, no login, no new tables. Label everything simulated as simulated, and do not invent results, customers, or statistics.`,
  },
];