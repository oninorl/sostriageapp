import { supabase } from "./supabaseClient";

export type Variant = "A" | "B";
export type EventType = "view" | "click";

// Each visitor gets a random variant on the first visit and keeps it afterwards.
export function getVariant(testName: string): Variant {
  const key = `ab_variant_${testName}`;
  try {
    const saved = window.localStorage.getItem(key);
    if (saved === "A" || saved === "B") return saved;
    const assigned: Variant = Math.random() < 0.5 ? "A" : "B";
    window.localStorage.setItem(key, assigned);
    return assigned;
  } catch {
    return Math.random() < 0.5 ? "A" : "B";
  }
}

// Records one view and one click per browser session for each test,
// so repeated clicks by the same visitor do not inflate the click rate.
export function trackEvent(testName: string, variant: Variant, eventType: EventType) {
  const key = `ab_${eventType}_${testName}`;
  try {
    if (window.sessionStorage.getItem(key)) return;
    window.sessionStorage.setItem(key, "1");
  } catch {
    // storage unavailable: still record the event
  }
  supabase
    .from("ab_events")
    .insert({ test_name: testName, variant, event_type: eventType })
    .then(({ error }) => {
      if (error) console.error("Could not record A/B event", error.message);
    });
}