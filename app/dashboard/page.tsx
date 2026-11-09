"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { supabase } from "../lib/supabaseClient";

type Counts = {
  triage: number;
  chats: number;
  up: number;
  down: number;
  research: number;
  pricing: number;
  assets: number;
  ab: number;
  green: number;
  orange: number;
  red: number;
  emergency: number;
};

type SessionRow = {
  session_id: string;
  urgency_level: string;
  duration_answer: string;
  guardrail_type: string;
  flagged_for_review: boolean;
  created_at: string;
};

type RecordRow = SessionRow & { rating: "up" | "down" | null };

// Counts rows without downloading them. Optional filters narrow the count.
async function count(table: string, filters: Record<string, string> = {}) {
  let query = supabase.from(table).select("*", { count: "exact", head: true });
  for (const [column, value] of Object.entries(filters)) {
    query = query.eq(column, value);
  }
  const { count: n, error } = await query;
  if (error) throw new Error(`${table}: ${error.message}`);
  return n ?? 0;
}

const durationLabels: Record<string, string> = {
  hours: "A few hours",
  days: "A few days",
  longer: "Longer",
};

const segmentStyles = {
  green: "bg-green-500",
  orange: "bg-orange-500",
  red: "bg-red-500",
  emergency: "bg-purple-500",
};

function resultLabel(row: SessionRow) {
  if (row.guardrail_type === "emergency") {
    return { text: "Stopped by emergency guardrail", dot: segmentStyles.emergency };
  }
  const map: Record<string, { text: string; dot: string }> = {
    green: { text: "Green", dot: segmentStyles.green },
    orange: { text: "Orange", dot: segmentStyles.orange },
    red: { text: "Red", dot: segmentStyles.red },
  };
  return map[row.urgency_level] ?? { text: "—", dot: "bg-gray-600" };
}

export default function DashboardPage() {
  const [counts, setCounts] = useState<Counts | null>(null);
  const [records, setRecords] = useState<RecordRow[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const [triage, chats, up, down, research, pricing, assets, ab, green, orange, red, emergency] =
        await Promise.all([
          count("core_outputs"),
          count("chat_sessions"),
          count("chat_feedback", { rating: "up" }),
          count("chat_feedback", { rating: "down" }),
          count("research_records"),
          count("pricing_scenarios"),
          count("marketing_assets"),
          count("ab_events", { test_name: "homepage_headline", event_type: "view" }),
          count("chat_sessions", { urgency_level: "green" }),
          count("chat_sessions", { urgency_level: "orange" }),
          count("chat_sessions", { urgency_level: "red" }),
          count("chat_sessions", { guardrail_type: "emergency" }),
        ]);

      // Only structured columns are selected: no typed text, no feedback comments.
      const { data: sessions, error: sessionsError } = await supabase
        .from("chat_sessions")
        .select("session_id, urgency_level, duration_answer, guardrail_type, flagged_for_review, created_at")
        .order("created_at", { ascending: false })
        .limit(5);
      if (sessionsError) throw new Error(`chat_sessions: ${sessionsError.message}`);

      const rows = (sessions ?? []) as SessionRow[];
      const ratings: Record<string, "up" | "down"> = {};
      if (rows.length > 0) {
        const { data: feedback, error: feedbackError } = await supabase
          .from("chat_feedback")
          .select("session_id, rating")
          .in(
            "session_id",
            rows.map((r) => r.session_id)
          );
        if (feedbackError) throw new Error(`chat_feedback: ${feedbackError.message}`);
        for (const f of feedback ?? []) ratings[f.session_id] = f.rating;
      }

      setCounts({ triage, chats, up, down, research, pricing, assets, ab, green, orange, red, emergency });
      setRecords(rows.map((r) => ({ ...r, rating: ratings[r.session_id] ?? null })));
      setError("");
    } catch (e) {
      const message = e instanceof Error ? e.message : "unknown error";
      setError(
        `Could not load the dashboard (${message}). Check that every table is exposed in the Supabase Data API and has a SELECT policy.`
      );
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const cards = counts
    ? [
        { label: "Triage intakes", value: counts.triage },
        { label: "Chat conversations", value: counts.chats },
        { label: "Chat ratings (up)", value: counts.up },
        { label: "Chat ratings (down)", value: counts.down },
        { label: "Research notes", value: counts.research },
        { label: "Pricing scenarios", value: counts.pricing },
        { label: "Marketing assets", value: counts.assets },
        { label: "A/B sessions (homepage)", value: counts.ab },
      ]
    : [];

  const segments = counts
    ? [
        { key: "green" as const, label: "Green", count: counts.green },
        { key: "orange" as const, label: "Orange", count: counts.orange },
        { key: "red" as const, label: "Red", count: counts.red },
        { key: "emergency" as const, label: "Stopped by emergency guardrail", count: counts.emergency },
      ]
    : [];
  const total = segments.reduce((sum, s) => sum + s.count, 0);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 px-6 py-12 max-w-4xl mx-auto w-full text-gray-100">
        <p className="text-sm text-blue-400 mb-1">DASHBOARD</p>
        <h1 className="text-2xl font-bold mb-2 text-white">Project Dashboard</h1>
        <p className="text-sm text-gray-400 mb-2">
          Usage and results of the SOS Triage prototype, read live from Supabase.
        </p>
        <p className="text-xs text-gray-500 mb-8">
          Counts include test data from development and from testers. This page shows counts and
          structured fields only: it never displays typed text or feedback comments.
        </p>

        {error && <p className="text-sm text-red-400 mb-6">{error}</p>}
        {!counts && !error && <p className="text-sm text-gray-500">Loading...</p>}

        {counts && (
          <>
            <section className="mb-10">
              <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                {cards.map((c) => (
                  <div key={c.label} className="border border-gray-700 rounded-md p-4">
                    <p className="text-sm text-gray-400 mb-2">{c.label}</p>
                    <p className="text-3xl font-bold text-white">{c.value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3 text-white">Chat conversations by result</h2>
              {total === 0 ? (
                <p className="text-sm text-gray-500">No finished chat conversations yet.</p>
              ) : (
                <>
                  <div className="flex h-8 w-full rounded-md overflow-hidden border border-gray-700">
                    {segments
                      .filter((s) => s.count > 0)
                      .map((s) => {
                        const pct = (s.count / total) * 100;
                        return (
                          <div
                            key={s.key}
                            className={`${segmentStyles[s.key]} flex items-center justify-center text-xs font-semibold text-gray-950`}
                            style={{ width: `${pct}%` }}
                            title={`${s.label}: ${s.count}`}
                          >
                            {pct >= 8 ? `${Math.round(pct)}%` : ""}
                          </div>
                        );
                      })}
                  </div>
                  <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-300">
                    {segments.map((s) => (
                      <li key={s.key} className="flex items-center gap-2">
                        <span className={`inline-block w-3 h-3 rounded-sm ${segmentStyles[s.key]}`} />
                        {s.label}: {s.count} ({total ? Math.round((s.count / total) * 100) : 0}%)
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </section>

            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3 text-white">Latest chat records</h2>
              {records.length === 0 ? (
                <p className="text-sm text-gray-500">No chat conversations saved yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="text-left border-b border-gray-700">
                        <th className="py-2 pr-4 text-white">Date</th>
                        <th className="py-2 pr-4 text-white">Result</th>
                        <th className="py-2 pr-4 text-white">Symptom duration</th>
                        <th className="py-2 pr-4 text-white">Flagged for review</th>
                        <th className="py-2 text-white">Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records.map((r) => {
                        const result = resultLabel(r);
                        return (
                          <tr key={r.session_id} className="border-b border-gray-800">
                            <td className="py-2 pr-4 text-gray-300">
                              {new Date(r.created_at).toLocaleString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </td>
                            <td className="py-2 pr-4 text-gray-100">
                              <span className="flex items-center gap-2">
                                <span className={`inline-block w-3 h-3 rounded-full ${result.dot}`} />
                                {result.text}
                              </span>
                            </td>
                            <td className="py-2 pr-4 text-gray-300">
                              {durationLabels[r.duration_answer] ?? "—"}
                            </td>
                            <td className="py-2 pr-4 text-gray-300">
                              {r.flagged_for_review ? "Yes" : "No"}
                            </td>
                            <td className="py-2 text-gray-300">
                              {r.rating === "up" ? "👍" : r.rating === "down" ? "👎" : "—"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            <button
              type="button"
              onClick={load}
              disabled={loading}
              className="border border-gray-600 text-gray-200 px-3 py-1 rounded-md text-xs hover:border-blue-500 disabled:opacity-50"
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}