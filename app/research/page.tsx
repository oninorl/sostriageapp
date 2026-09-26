"use client";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { supabase } from "../lib/supabaseClient";

const globalExamples = [
  {
    name: "SOS International",
    location: "Netherlands",
    note: "Origin case — one of four major Dutch travel-insurance alarm centers. No AI triage: every call starts with the same manual intake, directly explaining the ~1.5h / ~15h wait times that inspired this project.",
  },
  {
    name: "Infermedica",
    location: "Poland / Global",
    note: "AI symptom-checker platform active in 30+ countries, 25M+ health checks since 2012. Not specific to travel insurance workflows.",
  },
  {
    name: "Mount Sinai \"Check Symptoms and Get Care\"",
    location: "United States",
    note: "Hospital-built digital triage based on recognized telephone triage protocols. 75% patient satisfaction. Only serves that hospital's own patients.",
  },
  {
    name: "Telemedicine ABC",
    location: "Rwanda",
    note: "AI triage via USSD/SMS/web, validated over 2.6M consultations. Shows this model works even in low-connectivity environments.",
  },
  {
    name: "Fabric Health",
    location: "United States",
    note: "Automates triage for virtual and in-person care, reducing call center load and wait times.",
  },
  {
    name: "Allianz Partners / Generali",
    location: "Global",
    note: "Traditional travel-insurance assistance providers, same manual-intake model as SOS International — confirms this is an industry-wide pattern, not one company's issue.",
  },
];

type Competitor = {
  name: string;
  type: string;
  hasAI: boolean;
  note: string;
};

const competitors: Competitor[] = [
  { name: "SOS International", type: "Travel insurance alarm center", hasAI: false, note: "Manual phone intake" },
  { name: "Infermedica", type: "AI symptom checker", hasAI: true, note: "Not travel-insurance specific" },
  { name: "Mount Sinai", type: "Hospital digital triage", hasAI: true, note: "Only own patients" },
  { name: "Fabric Health", type: "Care automation", hasAI: true, note: "US healthcare focus" },
  { name: "Telemedicine ABC", type: "Low-access AI triage", hasAI: true, note: "Local healthcare focus" },
  { name: "Chubb México", type: "Student/travel insurance", hasAI: false, note: "Manual phone intake" },
  { name: "Assist Card México", type: "Travel assistance", hasAI: false, note: "Has student-specific product, no AI" },
  { name: "Allianz Partners", type: "Global travel assistance", hasAI: false, note: "Manual phone intake" },
];

type Risk = {
  label: string;
  detail: string;
  x: number;
  y: number;
};

const risks: Risk[] = [
  { label: "Technical risk", detail: "Wrong urgency assessment", x: 25, y: 95 },
  { label: "Regulatory risk", detail: "Medical AI liability rules", x: 45, y: 90 },
  { label: "Market risk", detail: "Insurers not interested", x: 50, y: 85 },
  { label: "Competitive risk", detail: "Larger player enters first", x: 60, y: 60 },
  { label: "Trust risk", detail: "Travelers distrust AI in emergencies", x: 75, y: 55 },
];

export default function ResearchPage() {
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [search, setSearch] = useState("");
  const [records, setRecords] = useState<{ id: number; note: string; created_at: string }[]>([]);

  async function loadRecords() {
    const { data } = await supabase
      .from("research_records")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);
    if (data) setRecords(data);
  }

  useEffect(() => {
    loadRecords();
  }, []);

  async function handleSave() {
    if (!note.trim()) return;
    setSaving(true);
    const { error } = await supabase.from("research_records").insert({ note });
    setSaving(false);
    if (!error) {
      setSaved(true);
      setNote("");
      loadRecords();
    }
  }

  const filteredCompetitors = competitors.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 px-6 py-12 max-w-3xl mx-auto w-full text-gray-100">
        <h1 className="text-2xl font-bold mb-6 text-white">Research & Benchmarking</h1>

        {/* Research intake */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-2 text-white">Research Intake</h2>
          <p className="text-sm text-gray-400 mb-3">
            Note down a research question or finding related to this project.
          </p>
          <textarea
            className="w-full border border-gray-700 rounded-md p-2 bg-gray-800 text-gray-100 placeholder-gray-500"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. Does anyone else offer AI triage before human contact for travel insurance?"
          />
          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm disabled:opacity-50"
          >
            {saving ? "Saving..." : saved ? "Saved ✓" : "Save note"}
          </button>

          {records.length > 0 && (
            <ul className="mt-4 space-y-2">
              {records.map((r) => (
                <li key={r.id} className="text-sm text-gray-100 bg-gray-800 border border-gray-700 rounded-md p-2">
                  {r.note}
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Global examples */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-4 text-white">Global Examples</h2>
          <ul className="space-y-3">
            {globalExamples.map((ex) => (
              <li key={ex.name} className="border border-gray-700 rounded-md p-3">
                <p className="font-semibold text-white">
                  {ex.name} <span className="text-gray-500 font-normal">— {ex.location}</span>
                </p>
                <p className="text-sm text-gray-400">{ex.note}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Mexico localization */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-2 text-white">Mexico Localization</h2>
          <p className="text-sm text-gray-400">
            Mexican travelers and exchange students face the same core problem.
            Providers like Chubb México, Bupa México, Assist Card México, and
            Mundo Joven all sell international student/travel insurance and
            activate assistance abroad through the same manual, phone-based
            intake model as SOS International. Assist Card even markets a
            student-specific product, showing this segment is recognized —
            but none currently offer AI-assisted intake before human contact.
          </p>
        </section>

        {/* Competitors table */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-2 text-white">Competitors & Substitutes</h2>
          <input
            type="text"
            placeholder="Search by name or type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-700 rounded-md p-2 mb-2 text-sm bg-gray-800 text-gray-100 placeholder-gray-500"
          />
          <p className="text-xs text-gray-500 mb-3">
            Showing {filteredCompetitors.length} of {competitors.length} competitors
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left border-b border-gray-700">
                  <th className="py-2 pr-4 text-white">Name</th>
                  <th className="py-2 pr-4 text-white">Type</th>
                  <th className="py-2 pr-4 text-white">AI Triage?</th>
                  <th className="py-2 text-white">Note</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompetitors.map((c) => (
                  <tr key={c.name} className="border-b border-gray-800">
                    <td className="py-2 pr-4 font-medium text-gray-100">{c.name}</td>
                    <td className="py-2 pr-4 text-gray-300">{c.type}</td>
                    <td className="py-2 pr-4 text-gray-300">{c.hasAI ? "✅ Yes" : "❌ No"}</td>
                    <td className="py-2 text-gray-500">{c.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Risk map */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2 text-white">Risk Map</h2>
          <p className="text-sm text-gray-400 mb-4">
            Five key risks, plotted by likelihood (horizontal axis) and impact (vertical axis). Higher and further right is more urgent to address.
          </p>
          <div className="bg-gray-900 border border-gray-700 rounded-md p-4">
            <svg viewBox="0 0 720 420" className="w-full h-auto">
              <title>Risk map showing five business risks plotted by likelihood and impact</title>
              <line x1="60" y1="20" x2="60" y2="360" stroke="#4b5563" strokeWidth="1" />
              <line x1="60" y1="360" x2="560" y2="360" stroke="#4b5563" strokeWidth="1" />
              <line x1="310" y1="20" x2="310" y2="360" stroke="#374151" strokeDasharray="4 4" />
              <line x1="60" y1="190" x2="560" y2="190" stroke="#374151" strokeDasharray="4 4" />

              <text x="60" y="14" fontSize="11" fill="#9ca3af">High impact</text>
              <text x="60" y="378" fontSize="11" fill="#9ca3af">Low impact</text>
              <text x="480" y="378" fontSize="11" fill="#9ca3af">High likelihood →</text>

              {risks.map((r, i) => {
                const px = 60 + (r.x / 100) * 500;
                const py = 360 - (r.y / 100) * 340;
                const labelY = 40 + i * 65;
                return (
                  <g key={r.label}>
                    <circle cx={px} cy={py} r="6" fill="#f87171" />
                    <line x1={px} y1={py} x2="565" y2={labelY} stroke="#4b5563" strokeDasharray="2 3" />
                    <text x="570" y={labelY - 4} fontSize="12" fontWeight="600" fill="#f3f4f6">
                      {r.label}
                    </text>
                    <text x="570" y={labelY + 12} fontSize="10" fill="#9ca3af">
                      {r.detail}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </section>

        <p className="text-xs text-gray-600">
          Research last updated: September 25, 2026
        </p>
      </main>
      <Footer />
    </div>
  );
}