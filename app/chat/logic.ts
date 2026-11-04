export type Duration = "hours" | "days" | "longer";
export type Severity = "mild" | "moderate" | "severe";
export type Urgency = "green" | "orange" | "red";
export type GuardrailType = "none" | "empty" | "out_of_scope" | "emergency";

// Simple keyword rules. They do not understand negation ("no chest pain" still
// triggers the emergency response), which is the safe direction to fail in.
const emergencyPhrases = [
  "chest pain",
  "pain in my chest",
  "pressure in my chest",
  "heart attack",
  "can't breathe",
  "cannot breathe",
  "can not breathe",
  "hard to breathe",
  "difficulty breathing",
  "trouble breathing",
  "short of breath",
  "shortness of breath",
  "stopped breathing",
  "choking",
  "throat is closing",
  "throat closing",
  "anaphyla",
  "unconscious",
  "passed out",
  "unresponsive",
  "not responding",
  "seizure",
  "stroke",
  "face is drooping",
  "severe bleeding",
  "bleeding heavily",
  "won't stop bleeding",
  "coughing blood",
  "coughing up blood",
  "vomiting blood",
  "overdose",
  "poison",
  "suicid",
  "kill myself",
  "end my life",
  "want to die",
  "hurt myself",
];

const outOfScopePhrases = [
  "diagnos",
  "do i have",
  "what do i have",
  "what disease",
  "what illness",
  "what condition",
  "is it cancer",
  "what medicine",
  "which medicine",
  "what medication",
  "which medication",
  "what pills",
  "which pills",
  "what should i take",
  "should i take",
  "can i take",
  "how much should i take",
  "what dose",
  "dosage",
  "dose",
  " mg",
  "prescribe",
  "prescription",
  "antibiotics for",
];

// Words that raise a mild case from green to orange.
const raiseWords = ["fever", "blood", "vomit", "dehydrat", "faint", "dizz", "confus"];

function normalize(text: string) {
  return text.toLowerCase().replace(/[’‘]/g, "'").trim();
}

function containsAny(text: string, phrases: string[]) {
  return phrases.some((p) => text.includes(p));
}

export function checkGuardrail(input: string): GuardrailType {
  const text = normalize(input);
  if (containsAny(text, emergencyPhrases)) return "emergency";
  if (containsAny(text, outOfScopePhrases)) return "out_of_scope";
  if (text.length < 3) return "empty";
  return "none";
}

export function getUrgency(problem: string, duration: Duration, severity: Severity): Urgency {
  if (severity === "severe") return "red";
  if (severity === "moderate") return "orange";
  if (duration === "longer") return "orange";
  if (containsAny(normalize(problem), raiseWords)) return "orange";
  return "green";
}

// Orange and red results, and emergency or out-of-scope triggers, go to human review.
export function needsHumanReview(urgency: Urgency | "none", guardrail: GuardrailType) {
  return urgency === "orange" || urgency === "red" || guardrail === "emergency" || guardrail === "out_of_scope";
}

export const urgencyLabels: Record<Urgency, string> = {
  green: "Low urgency",
  orange: "Moderate urgency",
  red: "High urgency",
};

export const nextSteps: Record<Urgency, string> = {
  green:
    "Nothing in your answers points to an urgent problem. If it gets worse or you are worried, contact a doctor or your insurer's assistance line.",
  orange:
    "Your answers suggest this should be looked at soon. In a real service, a doctor would review this case.",
  red: "Your answers suggest this may be serious. Contact a doctor or local emergency services now. In a real service, a doctor would review this case first.",
};

export const messages = {
  emergencyTitle: "This may be an emergency.",
  emergency:
    "Please contact local emergency services now (for example 112 in the EU, or 911 in Mexico and the United States), or go to the nearest hospital. This demo cannot help in an emergency.",
  outOfScope:
    "I can't diagnose conditions or advise on medication or dosage. A doctor has to do that. I can only collect a few details so a doctor can look at your case.",
  empty: "I didn't catch that. Could you describe it in a few words?",
  chooseOption: "Please choose one of the options below.",
  simulated: "Simulated suggestion, not medical advice.",
  humanReview: "Flagged for human review: in a real service a doctor would review this case.",
};