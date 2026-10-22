export type Post = {
  id: number;
  day: number;
  platform: string;
  theme: string;
  text: string;
};

export const posts: Post[] = [
  {
    id: 1,
    day: 1,
    platform: "LinkedIn",
    theme: "Story",
    text: "A friend of mine needed medical help abroad. It took 1.5 hours to reach someone on the emergency assistance line, and 15 hours before he got medical advice.\n\nThat is one experience, not an average. But it made me ask a simple question: how much of that time is spent collecting the same basic information before a doctor is involved?\n\nI am building SOS Triage, a simulated AI-assisted intake for travel insurers, to explore that question.\n\n#TravelInsurance #CustomerExperience",
  },
  {
    id: 2,
    day: 2,
    platform: "LinkedIn",
    theme: "Problem",
    text: "Every emergency call starts the same way: name, location, what happened, how long, how bad.\n\nWhen staff collect this by phone, every traveler starts from zero, and the doctor waits for the summary.\n\nWhat if the traveler filled in those basics once, in a short form, and the doctor received a structured summary before the first call?\n\nThat is the idea behind SOS Triage. It is a simulated student demo, not a live service.\n\n#InsurTech #TravelInsurance",
  },
  {
    id: 3,
    day: 3,
    platform: "LinkedIn",
    theme: "How it works",
    text: "How SOS Triage works, in three steps:\n\n1. The traveler describes symptoms, how long they have lasted, and a pain level.\n2. The system structures the answers into a summary and suggests an urgency level (green, orange, or red).\n3. A doctor reviews the summary and makes the medical decision.\n\nIn this demo the urgency logic is simulated with simple keyword rules. You can try it here: sostriageapp.vercel.app/core\n\n#InsurTech #DigitalHealth",
  },
  {
    id: 4,
    day: 4,
    platform: "LinkedIn",
    theme: "Trust",
    text: "What SOS Triage does not do:\n\nIt does not diagnose.\nIt does not treat.\nIt does not replace a doctor.\n\nIt structures what a traveler reports and suggests an urgency level. A doctor makes every medical decision.\n\nIf an AI tool near medical care cannot say clearly what it will not do, it should not be trusted. This is our starting point.\n\n#DigitalHealth #CustomerExperience",
  },
  {
    id: 5,
    day: 6,
    platform: "LinkedIn",
    theme: "Pricing",
    text: "Pricing should be something you can test with your own numbers.\n\nSOS Triage uses a monthly license plus a fee per intake, in three tiers. We built a calculator: enter your member count and an intake rate, and see the monthly or annual cost.\n\nAll figures are illustrative for this demo, and the intake rate in particular is an assumption we list openly, not measured data.\n\nTry it: sostriageapp.vercel.app/pricing\n\n#InsurTech #TravelInsurance",
  },
  {
    id: 6,
    day: 7,
    platform: "LinkedIn",
    theme: "Research insight",
    text: "We reviewed 8 providers across AI triage and travel assistance.\n\nIn our desk research, the AI triage tools sit in healthcare, and the travel-insurance assistance providers we looked at still start with a manual phone intake. We did not find the two combined.\n\nThis is a small review, not a market study, but it is where we think the gap might be.\n\nThe full comparison is on our research page: sostriageapp.vercel.app/research\n\n#InsurTech #TravelInsurance",
  },
  {
    id: 7,
    day: 9,
    platform: "LinkedIn",
    theme: "Risks",
    text: "What could make this idea fail? We mapped five risks:\n\n1. A wrong urgency suggestion\n2. Regulation and liability around medical AI\n3. Insurers not seeing the value\n4. A larger player entering first\n5. Travelers not trusting AI in an emergency\n\nThe first two matter most. That is why a doctor always decides, and why every figure and output is labeled as a simulation.\n\n#DigitalHealth #RiskManagement",
  },
  {
    id: 8,
    day: 10,
    platform: "LinkedIn",
    theme: "Validation",
    text: "One conversation is not validation, but it was a useful start.\n\nI asked a friend who lived this problem whether he would trust an AI-assisted intake before speaking to a doctor. His view: yes, as long as a doctor stays responsible for the medical decision.\n\nThat is why the whole product is built around that principle. Next, we need to hear from insurers.\n\n#CustomerExperience #TravelInsurance",
  },
  {
    id: 9,
    day: 12,
    platform: "LinkedIn",
    theme: "Behind the build",
    text: "Behind the build: this started as a student project, built in small steps with an AI coding assistant.\n\nThe most useful lesson so far is about the process, not the code: every claim on the website has to be something we can back up. If it is simulated, we say simulated. If it is a goal, we say goal.\n\nThat rule is shaping everything we write.\n\n#BuildInPublic #DigitalHealth",
  },
  {
    id: 10,
    day: 14,
    platform: "LinkedIn",
    theme: "Feedback request",
    text: "If you work in customer experience or innovation at a travel or health insurer, I would value your honest feedback.\n\nWhat would you need to see before considering a pilot of an AI-assisted intake? Clear limits? Pricing? Evidence from real cases?\n\nTry the demo and tell me what is missing: sostriageapp.vercel.app\n\nSimulated student demo, not affiliated with any insurer.\n\n#InsurTech #CustomerExperience",
  },
]; 