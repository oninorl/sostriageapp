"use client";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { supabase } from "../lib/supabaseClient";

function getTriageResult(symptoms: string, duration: string, pain: number) {
  const text = symptoms.toLowerCase();
  const redFlags = ["chest pain", "borstpijn", "breathing", "ademnood", "unconscious", "bewusteloos"];
  const isRed = redFlags.some((flag) => text.includes(flag)) || pain >= 8;
  const isOrange = !isRed && (pain >= 5 || duration === "days");
  const level = isRed ? "red" : isOrange ? "orange" : "green";
  const summary = `Reported symptoms: "${symptoms}". Duration: ${duration}. Pain level: ${pain}/10.`;
  return { level, summary };
}

const levelColors: Record<string, string> = {
  green: "bg-green-100 text-green-800 border-green-300",
  orange: "bg-orange-100 text-orange-800 border-orange-300",
  red: "bg-red-100 text-red-800 border-red-300",
};

type SavedEntry = {
  id: number;
  symptom_text: string;
  urgency_level: string;
  created_at: string;
};

export default function CorePage() {
  const [symptoms, setSymptoms] = useState("");
  const [duration, setDuration] = useState("hours");
  const [pain, setPain] = useState(3);
  const [result, setResult] = useState<{ level: string; summary: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [entries, setEntries] = useState<SavedEntry[]>([]);

  async function loadEntries() {
    const { data } = await supabase
      .from("core_outputs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);
    if (data) setEntries(data as SavedEntry[]);
  }

  useEffect(() => {
    loadEntries();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const triage = getTriageResult(symptoms, duration, pain);
    setResult(triage);
    setSaved(false);
  }

  async function handleSave() {
    if (!result) return;
    setSaving(true);
    const { error } = await supabase.from("core_outputs").insert({
      symptom_text: result.summary,
      urgency_level: result.level,
    });
    setSaving(false);
    if (!error) {
      setSaved(true);
      loadEntries();
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 px-6 py-12 max-w-2xl mx-auto w-full">
        <h1 className="text-2xl font-bold mb-2">Symptom Intake</h1>
        <p className="text-sm text-gray-500 mb-6">
          This tool provides a simulated triage assessment for demonstration purposes only. It does not replace professional medical advice.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">What are your symptoms?</label>
            <textarea
              className="w-full border rounded-md p-2"
              rows={3}
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">How long have you had this?</label>
            <select
              className="w-full border rounded-md p-2"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value="hours">A few hours</option>
              <option value="days">A few days</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Pain level (1-10): {pain}</label>
            <input
              type="range"
              min={1}
              max={10}
              value={pain}
              onChange={(e) => setPain(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
            Get Triage Assessment
          </button>
        </form>

        {result && (
          <div className={`mt-8 border rounded-md p-4 ${levelColors[result.level]}`}>
            <p className="text-xs uppercase font-semibold mb-2">Simulated demo output — not real medical advice</p>
            <p className="font-semibold mb-1">Urgency: {result.level.toUpperCase()}</p>
            <p className="text-sm mb-4">{result.summary}</p>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm disabled:opacity-50"
            >
              {saving ? "Saving..." : saved ? "Saved ✓" : "Save this result"}
            </button>
          </div>
        )}

        <div className="mt-12">
          <h2 className="text-lg font-semibold mb-4">Recent Saved Intakes</h2>
          {entries.length === 0 ? (
            <p className="text-sm text-gray-500">No entries saved yet.</p>
          ) : (
            <ul className="space-y-2">
              {entries.map((entry) => (
                <li key={entry.id} className={`border rounded-md p-3 text-sm ${levelColors[entry.urgency_level]}`}>
                  <span className="font-semibold uppercase mr-2">{entry.urgency_level}</span>
                  {entry.symptom_text}
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}