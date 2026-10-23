"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type Variant = "A" | "B";
type Counts = { views: number; clicks: number };
type TestResult = Record<Variant, Counts>;

// Keep these texts in sync with app/page.tsx.
const tests = [
  {
    name: "homepage_headline",
    label: "Test 1: Homepage headline",
    texts: {
      A: "Shorter waits for your insured travelers in a medical emergency abroad",
      B: "1.5 hours to reach someone. 15 hours for medical advice. It happened to a friend abroad.",
    },
  },
  {
    name: "primary_button_text",
    label: "Test 2: Primary button text",
    texts: {
      A: "Try the triage demo",
      B: "See how an intake works",
    },
  },
];

async function countEvents(
  test: string,
  variant: Variant,
  eventType: "view" | "click"
) {
  const { count, error } = await supabase
    .from("ab_events")
    .select("*", { count: "exact", head: true })
    .eq("test_name", test)
    .eq("variant", variant)
    .eq("event_type", eventType);
  if (error) throw new Error(error.message);
  return count ?? 0;
}

function rate(c: Counts) {
  if (c.views === 0) return "—";
  return `${((c.clicks / c.views) * 100).toFixed(1)}%`;
}

function summarize(r: TestResult) {
  const minViews = Math.min(r.A.views, r.B.views);
  if (minViews < 10) {
    return "Not enough data yet: each variant needs at least 10 views before the click rates can be compared.";
  }
  const aRate = (r.A.clicks / r.A.views) * 100;
  const bRate = (r.B.clicks / r.B.views) * 100;
  const same = r.A.clicks * r.B.views === r.B.clicks * r.A.views;
  const lead = same
    ? "Both variants have the same click rate."
    : `Variant ${aRate > bRate ? "A" : "B"} has the higher click rate, by ${Math.abs(
        aRate - bRate
      ).toFixed(1)} percentage points.`;
  const caution =
    minViews < 100
      ? " Small sample (fewer than 100 views per variant): treat this as an indication, not proof."
      : "";
  return lead + caution;
}

export default function AbResults() {
  const [results, setResults] = useState<Record<string, TestResult> | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const entries = await Promise.all(
        tests.map(async (t) => {
          const [av, ac, bv, bc] = await Promise.all([
            countEvents(t.name, "A", "view"),
            countEvents(t.name, "A", "click"),
            countEvents(t.name, "B", "view"),
            countEvents(t.name, "B", "click"),
          ]);
          const result: TestResult = {
            A: { views: av, clicks: ac },
            B: { views: bv, clicks: bc },
          };
          return [t.name, result] as const;
        })
      );
      setResults(Object.fromEntries(entries));
      setError("");
    } catch {
      setError(
        "Could not load A/B results. Check that ab_events is exposed in the Supabase Data API and has a SELECT policy."
      );
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <section className="mb-16">
      <h2 className="text-lg font-semibold mb-2 text-white">A/B Test Results</h2>
      <p className="text-sm text-gray-400 mb-4">
        Real events recorded on the homepage. Metric: sessions that clicked the primary
        button divided by sessions that viewed the page. Counts are per browser session,
        so a returning visitor can be counted again.
      </p>

      {error && <p className="text-sm text-red-400 mb-4">{error}</p>}
      {!results && !error && <p className="text-sm text-gray-500">Loading results...</p>}

      {results &&
        tests.map((t) => {
          const r = results[t.name];
          return (
            <div key={t.name} className="border border-gray-700 rounded-md p-4 mb-4">
              <p className="font-semibold text-white mb-1">{t.label}</p>
              <p className="text-xs text-gray-500 mb-3">
                Sessions in this test: {r.A.views + r.B.views}
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="text-left border-b border-gray-700">
                      <th className="py-2 pr-4 text-white">Variant</th>
                      <th className="py-2 pr-4 text-white">Text</th>
                      <th className="py-2 pr-4 text-white">Views</th>
                      <th className="py-2 pr-4 text-white">Clicks</th>
                      <th className="py-2 text-white">Click rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(["A", "B"] as Variant[]).map((v) => (
                      <tr key={v} className="border-b border-gray-800 align-top">
                        <td className="py-2 pr-4 font-medium text-gray-100">{v}</td>
                        <td className="py-2 pr-4 text-gray-300">{t.texts[v]}</td>
                        <td className="py-2 pr-4 text-gray-300">{r[v].views}</td>
                        <td className="py-2 pr-4 text-gray-300">{r[v].clicks}</td>
                        <td className="py-2 text-gray-100">{rate(r[v])}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-300 mt-3">{summarize(r)}</p>
            </div>
          );
        })}

      <button
        type="button"
        onClick={load}
        disabled={loading}
        className="border border-gray-600 text-gray-200 px-3 py-1 rounded-md text-xs hover:border-blue-500 disabled:opacity-50"
      >
        {loading ? "Refreshing..." : "Refresh results"}
      </button>
    </section>
  );
}