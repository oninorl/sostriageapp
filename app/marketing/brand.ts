export const brand = {
  name: "SOS Triage",
  tagline: "A faster first step when you need a doctor abroad.",
  positioning:
    "SOS Triage is a simulated AI-assisted intake tool for travel insurers. It collects a traveler's symptoms before the first call, suggests an urgency level, and leaves every medical decision to a doctor.",
  disclaimer:
    "Simulated student demo, not a real medical service. SOS Triage is an independent project and is not affiliated with SOS International or any insurer.",
  colors: [
    { name: "Night", hex: "#0A0A0A", use: "Page background" },
    { name: "Slate", hex: "#1F2937", use: "Cards and inputs" },
    { name: "Cloud", hex: "#F3F4F6", use: "Headings and main text" },
    { name: "Mist", hex: "#9CA3AF", use: "Secondary text" },
    { name: "Signal blue", hex: "#2563EB", use: "Buttons and links" },
    { name: "Green", hex: "#22C55E", use: "Urgency labels only: low" },
    { name: "Orange", hex: "#F97316", use: "Urgency labels only: medium" },
    { name: "Red", hex: "#EF4444", use: "Urgency labels only: high" },
  ],
  voice: [
    {
      trait: "Calm",
      text: "A medical emergency is stressful. The writing stays steady and never uses alarmist language.",
    },
    {
      trait: "Plain",
      text: "Short sentences, no jargon. Say 'suggests an urgency level', not 'performs AI-driven clinical triage'.",
    },
    {
      trait: "Honest",
      text: "State what is simulated and what is only a goal. One real experience is one experience, not a statistic.",
    },
  ],
  dos: [
    "Say 'simulated demo' whenever the prototype is described.",
    "Present the 1.5 hours and 15 hours as one real experience, not as an average.",
    "Say 'suggests an urgency level' and 'a doctor decides'.",
    "Speak to insurers about service quality, wait times, and staff workload.",
  ],
  donts: [
    "Claim that the tool diagnoses, treats, or replaces doctors.",
    "Invent customers, logos, testimonials, or statistics.",
    "Promise time savings that have not been measured.",
    "Use fear or emergency imagery (sirens, blood) to sell.",
  ],
};

export const persona = {
  label:
    "Fictional composite persona. A hypothesis built from the buyer role (Week 3) and the research (Week 2), not from interviews with real insurers.",
  name: "Elena",
  role: "Head of Customer Experience and Innovation at a mid-sized travel and health insurer",
  goals: [
    "Improve the quality of emergency assistance for insured travelers.",
    "Shorten the time a traveler waits before a doctor is involved.",
    "Keep medical staff focused on the cases that need a doctor.",
    "Try new tools in a low-risk pilot before committing.",
  ],
  pains: [
    "Long waits lead to complaints after a trip.",
    "Staff repeat the same intake questions on every call.",
    "New technology is hard to justify without clear pricing.",
    "Any use of AI near medical decisions raises liability concerns.",
  ],
  objections: [
    "Will AI replace or mislead our doctors?",
    "Who is responsible if the suggested urgency is wrong?",
    "Will travelers trust an AI intake in an emergency?",
    "What will it cost per intake?",
  ],
  needs: [
    "Proof that a doctor always decides.",
    "Transparent pricing she can model with her own numbers.",
    "A small pilot option, such as the Starter tier.",
    "Honest limits: what is built and what is only planned.",
  ],
  channels:
    "Where to reach her (assumption to validate): LinkedIn, insurance and travel-health events, and direct outreach from the founder.",
};

export const landingCopy = [
  {
    label: "Headline, variant A",
    text: "Shorter waits for your insured travelers in a medical emergency abroad",
  },
  {
    label: "Headline, variant B",
    text: "1.5 hours to reach someone. 15 hours for medical advice. It happened to a friend abroad.",
  },
  {
    label: "Subheadline",
    text: "SOS Triage is a simulated AI-assisted intake: the traveler describes their symptoms, the system structures them and suggests an urgency level, and a doctor stays responsible for the medical decision.",
  },
  {
    label: "Primary button, variants A and B",
    text: "A: Try the triage demo\nB: See how an intake works",
  },
  {
    label: "How it works",
    text: "1. The traveler describes the problem. Symptoms, how long they have lasted, and a pain level, entered in a short form instead of repeated over the phone.\n2. The system structures the intake. The answers become a structured summary and a suggested urgency level (green, orange, or red). In this demo the logic is simulated with simple keyword rules.\n3. A doctor decides. The doctor receives the summary before the first call and stays responsible for the medical decision. The tool never diagnoses.",
  },
  {
    label: "For insurers (design goals, not measured results)",
    text: "Less repetitive intake: the same questions are collected once, in a form, so staff do not start every call from zero.\nA summary ready for the doctor: symptoms, duration, pain level, and a suggested urgency level arrive together.\nTransparent pricing: a monthly license plus a fee per intake, with three tiers and a calculator you can try.",
  },
  {
    label: "FAQ",
    text: "Does SOS Triage give medical advice?\nNo. It structures what the traveler reports and suggests an urgency level. A doctor makes every medical decision.\n\nIs this a live service?\nNo. It is a simulated student demo. The urgency logic uses simple keyword rules and no real patient data.\n\nWhat does it cost?\nA monthly license plus a fee per intake, in three tiers. The figures on the pricing page are illustrative.",
  },
  {
    label: "Closing call to action",
    text: "Explore the demo, then try the pricing calculator with your own member numbers.",
  },
  {
    label: "Disclaimer",
    text: "Simulated student demo, not a real medical service. SOS Triage is an independent project and is not affiliated with SOS International or any insurer.",
  },
];