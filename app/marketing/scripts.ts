export type Script = {
  id: number;
  title: string;
  text: string;
};

export const scripts: Script[] = [
  {
    id: 1,
    title: "Script 1 · The 1.5 hours (story)",
    text: "Length: about 45 seconds\nFormat: text on a dark background, then a screen recording of the homepage\nGoal: make an insurer recognize the problem\n\nScene 1 (0–8 s)\nVisual: dark screen, the text \"1.5 hours\" appears, then \"15 hours\".\nVoice-over: \"A friend needed medical help abroad.\"\n\nScene 2 (8–20 s)\nVisual: the same two numbers with the labels \"to reach someone\" and \"for medical advice\", and a small note: \"One real experience, not an average.\"\nVoice-over: \"It took one and a half hours to reach someone on the emergency line, and fifteen hours before he got medical advice. That is one experience, not an average.\"\n\nScene 3 (20–32 s)\nVisual: the three-step \"How it works\" section of the homepage.\nVoice-over: \"A lot of that time may go to collecting the same basic information before a doctor is involved. SOS Triage is a simulated way to explore a faster first step.\"\n\nScene 4 (32–45 s)\nVisual: the demo disclaimer, then the web address.\nVoice-over: \"It is a student demo, and a doctor always decides. Try it at sostriageapp.vercel.app.\"\n\nCall to action: Try the triage demo.",
  },
  {
    id: 2,
    title: "Script 2 · How an intake works (demo)",
    text: "Length: about 50 seconds\nFormat: screen recording of /core with voice-over\nGoal: show what the product actually does, and what is simulated\n\nScene 1 (0–8 s)\nVisual: the /core page with the empty form.\nVoice-over: \"This is the SOS Triage demo. A traveler describes the problem in a short form.\"\n\nScene 2 (8–22 s)\nVisual: type \"mild headache\", leave the duration on \"A few hours\", set the pain level to 3, click \"Get Triage Assessment\". A green card appears.\nVoice-over: \"Symptoms, how long they have lasted, and a pain level. The system returns a structured summary and a suggested urgency level. Here: green.\"\n\nScene 3 (22–34 s)\nVisual: type \"chest pain\", set the pain level to 9, click again. A red card appears.\nVoice-over: \"A more serious description gives a red suggestion. In this demo the logic is simulated with simple keyword rules. It is not a medical model.\"\n\nScene 4 (34–50 s)\nVisual: click \"Save this result\", then scroll to \"Recent Saved Intakes\" and refresh the page.\nVoice-over: \"The result can be saved, so a doctor would see the summary before the first call. The tool never diagnoses. A doctor decides.\"\n\nCall to action: Try the demo yourself.",
  },
  {
    id: 3,
    title: "Script 3 · Pricing you can test (calculator)",
    text: "Length: about 45 seconds\nFormat: screen recording of /pricing with voice-over\nGoal: show insurers that pricing is transparent and testable\n\nScene 1 (0–10 s)\nVisual: the three tier cards on /pricing.\nVoice-over: \"Pricing is a monthly license plus a fee per intake. Starter is 500 dollars plus 3 dollars per intake. Growth is 1,500 plus 2.50. Enterprise is 4,000 plus 2.\"\n\nScene 2 (10–28 s)\nVisual: select Growth, enter 50,000 members and a 2 percent intake rate. The result shows 1,000 intakes and 4,000 dollars. Click \"Annual\": 48,000 dollars.\nVoice-over: \"Enter your member count and an intake rate. With 50,000 members and 2 percent, that is 1,000 intakes and 4,000 dollars a month, or 48,000 a year.\"\n\nScene 3 (28–45 s)\nVisual: scroll to the assumptions table and highlight the \"Intake rate\" row.\nVoice-over: \"The intake rate is our biggest assumption. It is a placeholder, not measured data, and all figures are illustrative. We list every assumption openly, so you can question it.\"\n\nCall to action: Try the calculator with your own numbers.",
  },
];