export type Level = "Low" | "Medium" | "High";

export const value = [
  {
    label: "User",
    text: "A traveler abroad who feels unwell and needs to reach a doctor. A doctor or triage nurse who receives the structured summary is a second user.",
  },
  {
    label: "Buyer",
    text: "Hypothesis: the innovation or customer-experience lead of a travel or health insurer. No insurer has been approached.",
  },
  {
    label: "Value created (intended)",
    text: "The intake is collected once, in a short form or chat, so a doctor can start from a structured summary instead of repeating the same questions. The aim is a shorter wait before a doctor is involved. This has not been measured.",
  },
  {
    label: "Reason to pay",
    text: "Possibly less repeated intake work and a better service. The prototype uses an illustrative price of a monthly license plus a fee per intake. There is no evidence yet that insurers would pay.",
  },
];

export const evidence = [
  {
    claim: "Travelers wait too long before a doctor is involved.",
    have: "One real case (about 1.5 hours to reach someone and about 15 hours to medical advice) and one validation conversation with a friend who lived it.",
    missing: "Data from many travelers or from an insurer. One case is not an average.",
  },
  {
    claim: "Nobody combines AI-assisted intake with travel-insurance assistance.",
    have: "A desk review of eight providers and substitutes: the AI triage tools sit in healthcare, and the travel-assistance providers reviewed use a manual phone intake.",
    missing: "A systematic market study. Providers may offer things that are not visible online.",
  },
  {
    claim: "A structured intake is understandable and easy to use.",
    have: "Three external testers in Week 5 (two friends and one family member, on laptops) all finished the chat and understood it. More external tests are recorded in the testing summary on the dashboard.",
    missing: "Tests on phones, with strangers, with doctors, or with people in a real emergency. Friendly testers probably judged kindly.",
  },
  {
    claim: "An AI-assisted intake would shorten the wait.",
    have: "Nothing measured. The prototype only shows that the intake can be collected in a short form or chat.",
    missing: "A pilot that measures the time to first useful contact with and without the tool.",
  },
  {
    claim: "Insurers would pay for it.",
    have: "Illustrative pricing with three tiers and a calculator. The assumptions are listed together with the reasons they may be wrong.",
    missing: "A conversation with an insurer, a willingness-to-pay study, or a measured intake rate.",
  },
  {
    claim: "The message resonates with the audience.",
    have: "Two A/B tests on the homepage. At the time of the Week 4 review, small samples showed no reliable winner.",
    missing: "Larger samples, unique visitors, and insurers as the audience.",
  },
];

export type Risk = {
  risk: string;
  mitigation: string;
  residual: Level;
  why: string;
};

export const risks: Risk[] = [
  {
    risk: "A missed emergency: the keyword rules do not recognise a wording.",
    mitigation:
      "Emergency phrases and patterns, applied to both /chat and /core. Failures go to the safe side (false alarms). Every page says it is a simulated demo and shows emergency numbers. An external tester found one gap, and it was fixed.",
    residual: "High",
    why: "Medium in this demo, High if it were used for real. The rules are not clinically validated and will always miss some wordings.",
  },
  {
    risk: "A wrong urgency suggestion, for example a green result for something serious.",
    mitigation:
      "Simple, cautious rules (moderate or severe answers are never green, long-lasting problems are raised), a generic next step instead of medical advice, a human-review flag, and the label 'not medical advice'.",
    residual: "High",
    why: "The thresholds are not validated by a clinician, and the human review is only simulated.",
  },
  {
    risk: "Private or medical information is stored or shown.",
    mitigation:
      "/chat never stores the typed symptom text. /core was fixed this week to store and show only structured fields. The dashboard shows counts and structured fields only. Pages warn users not to enter real information.",
    residual: "Medium",
    why: "The database tables are readable by anyone through the public API, and the optional feedback comment in chat_feedback is free text.",
  },
  {
    risk: "Public write access: anyone can add rows, including spam or abusive text, and research notes are shown to every visitor.",
    mitigation:
      "React escapes text so it cannot run as code, and the free-text fields are limited to notes and a short comment. Nothing else is done.",
    residual: "Medium",
    why: "There is no login, moderation, or rate limiting. These are in version 2.",
  },
  {
    risk: "Users rely on the demo instead of calling emergency services.",
    mitigation:
      "A 'simulated demo, not medical advice' notice on the chat and the triage form, an emergency card with local numbers, and a message that the demo cannot help in an emergency.",
    residual: "Medium",
    why: "A notice cannot stop every user from trusting a tool that looks helpful.",
  },
  {
    risk: "Misleading claims about results or customers.",
    mitigation:
      "Brand rules against invented customers, testimonials, and statistics. Intended benefits are labeled design goals. Differences between AI-generated mockups and the build are documented.",
    residual: "Low",
    why: "The risk stays whenever new copy is written, so the rules have to be applied each time.",
  },
  {
    risk: "Regulation and liability: software that suggests an urgency level can fall under medical-device rules in some regions.",
    mitigation:
      "It is a labeled demo, not a live service, and it uses no real patient data. I have not assessed the regulation.",
    residual: "High",
    why: "A real launch needs a regulatory check first. This is unassessed, not solved.",
  },
];

export const mustBeTrue = [
  "Insurers see long first-contact waits as a problem worth solving and are willing to run a small pilot.",
  "Doctors find a structured summary before the first call useful.",
  "A clinician confirms the urgency rules and the emergency phrases.",
  "The regulatory position is checked and allows a pilot.",
  "The real intake rate and the willingness to pay turn out close to the assumptions, or the pricing is adjusted.",
];