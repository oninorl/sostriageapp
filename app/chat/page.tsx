"use client";
import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  getUrgency,
  messages as texts,
  nextSteps,
  urgencyLabels,
  type Duration,
  type Severity,
  type Urgency,
} from "./logic";

type NewMessage =
  | { from: "assistant" | "user"; kind: "text"; text: string }
  | { from: "assistant"; kind: "result"; urgency: Urgency; summary: string };

type Message = NewMessage & { id: number };

type Step = "problem" | "duration" | "severity" | "done";

const questions = {
  duration: "How long have you had this?",
  severity: "How would you describe the severity right now?",
};

const initialMessages: Message[] = [
  {
    id: 1,
    from: "assistant",
    kind: "text",
    text: "Hi! I'm SOS Triage, a guided assistant that collects a few details about how you feel while traveling. I'm a simulated demo: I can't diagnose anything and I don't replace a doctor.",
  },
  {
    id: 2,
    from: "assistant",
    kind: "text",
    text: "What is the main problem you're experiencing?",
  },
];

const durationOptions: { value: Duration; label: string }[] = [
  { value: "hours", label: "A few hours" },
  { value: "days", label: "A few days" },
  { value: "longer", label: "Longer" },
];

const severityOptions: { value: Severity; label: string }[] = [
  { value: "mild", label: "Mild" },
  { value: "moderate", label: "Moderate" },
  { value: "severe", label: "Severe" },
];

const urgencyStyles: Record<Urgency, { card: string; dot: string }> = {
  green: { card: "border-green-700 bg-green-950/30", dot: "bg-green-500" },
  orange: { card: "border-orange-700 bg-orange-950/30", dot: "bg-orange-500" },
  red: { card: "border-red-700 bg-red-950/30", dot: "bg-red-500" },
};

const wontDo = [
  "It does not diagnose medical conditions.",
  "It does not advise on medication or dosage.",
  "It does not replace a doctor or in-person care.",
  "It does not handle emergencies. If you are in a life-threatening situation, contact local emergency services immediately.",
];

export default function ChatPage() {
  const [chat, setChat] = useState<Message[]>(initialMessages);
  const [step, setStep] = useState<Step>("problem");
  const [problem, setProblem] = useState("");
  const [duration, setDuration] = useState<{ value: Duration; label: string } | null>(null);
  const [input, setInput] = useState("");
  const nextId = useRef(3);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [chat, step]);

  function push(items: NewMessage[]) {
    const withIds: Message[] = items.map((i) => ({ ...i, id: nextId.current++ }));
    setChat((prev) => [...prev, ...withIds]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || step === "done") return;
    setInput("");
    if (step === "problem") {
      setProblem(text);
      push([
        { from: "user", kind: "text", text },
        { from: "assistant", kind: "text", text: questions.duration },
      ]);
      setStep("duration");
    } else {
      push([
        { from: "user", kind: "text", text },
        { from: "assistant", kind: "text", text: texts.chooseOption },
      ]);
    }
  }

  function chooseDuration(option: { value: Duration; label: string }) {
    setDuration(option);
    push([
      { from: "user", kind: "text", text: option.label },
      { from: "assistant", kind: "text", text: questions.severity },
    ]);
    setStep("severity");
  }

  function chooseSeverity(option: { value: Severity; label: string }) {
    if (!duration) return;
    const urgency = getUrgency(problem, duration.value, option.value);
    const summary = `Main problem: "${problem}". Duration: ${duration.label.toLowerCase()}. Severity: ${option.label.toLowerCase()}.`;
    push([
      { from: "user", kind: "text", text: option.label },
      { from: "assistant", kind: "result", urgency, summary },
    ]);
    setStep("done");
  }

  function startOver() {
    setChat(initialMessages);
    setStep("problem");
    setProblem("");
    setDuration(null);
    setInput("");
    nextId.current = 3;
  }

  const placeholder =
    step === "problem"
      ? "Describe the main problem..."
      : step === "done"
      ? "Conversation finished. Press Start over for a new one."
      : "Choose an option above, or type here";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 px-6 py-12 max-w-5xl mx-auto w-full text-gray-100">
        <h1 className="text-2xl font-bold mb-1 text-white">SOS Triage Chat</h1>
        <p className="text-sm text-gray-400 mb-4">
          A guided chat assistant for travelers who feel unwell abroad.
        </p>

        <p className="border border-yellow-700 bg-yellow-950/30 text-yellow-200 text-sm rounded-md px-3 py-2 mb-6">
          Simulated demo. Not medical advice. Do not enter real personal or medical information.
        </p>

        <div className="grid gap-6 md:grid-cols-[1fr_260px]">
          <section>
            <div
              ref={listRef}
              className="border border-gray-700 rounded-md p-4 space-y-3 h-[460px] overflow-y-auto"
            >
              {chat.map((m) =>
                m.kind === "text" ? (
                  <div
                    key={m.id}
                    className={m.from === "user" ? "flex justify-end" : "flex justify-start"}
                  >
                    <div
                      className={
                        m.from === "user"
                          ? "max-w-[85%] bg-blue-600 text-white rounded-lg px-3 py-2 text-sm"
                          : "max-w-[85%] bg-gray-800 border border-gray-700 text-gray-100 rounded-lg px-3 py-2 text-sm"
                      }
                    >
                      {m.text}
                    </div>
                  </div>
                ) : (
                  <div key={m.id} className="flex justify-start">
                    <div
                      className={`max-w-[90%] border rounded-lg p-4 text-sm ${urgencyStyles[m.urgency].card}`}
                    >
                      <p className="flex items-center gap-2 font-semibold text-white mb-2">
                        <span
                          className={`inline-block w-3 h-3 rounded-full ${urgencyStyles[m.urgency].dot}`}
                        />
                        {urgencyLabels[m.urgency]}
                      </p>
                      <p className="text-gray-200 mb-3">{m.summary}</p>
                      <p className="text-gray-200 mb-3">{nextSteps[m.urgency]}</p>
                      <p className="text-xs text-gray-300 bg-gray-900/60 border border-gray-700 rounded px-2 py-1">
                        {texts.simulated}
                      </p>
                    </div>
                  </div>
                )
              )}

              {step === "duration" && (
                <div className="flex flex-wrap gap-2">
                  {durationOptions.map((o) => (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => chooseDuration(o)}
                      className="border border-blue-500 text-blue-300 px-3 py-1 rounded-md text-sm hover:bg-blue-950"
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              )}

              {step === "severity" && (
                <div className="flex flex-wrap gap-2">
                  {severityOptions.map((o) => (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => chooseSeverity(o)}
                      className="border border-blue-500 text-blue-300 px-3 py-1 rounded-md text-sm hover:bg-blue-950"
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
              <input
                type="text"
                aria-label="Your message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={step === "done"}
                placeholder={placeholder}
                className="flex-1 border border-gray-700 rounded-md p-2 text-sm bg-gray-800 text-gray-100 placeholder-gray-500 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={step === "done"}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm disabled:opacity-50"
              >
                Send
              </button>
            </form>

            <button
              type="button"
              onClick={startOver}
              className="mt-3 w-full border border-blue-500 text-blue-300 px-4 py-2 rounded-md text-sm hover:bg-blue-950"
            >
              Start over
            </button>
          </section>

          <aside className="border border-gray-700 rounded-md p-4 h-fit">
            <h2 className="font-semibold text-white mb-3">What this assistant will not do</h2>
            <ul className="space-y-3 text-sm text-gray-400">
              {wontDo.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}