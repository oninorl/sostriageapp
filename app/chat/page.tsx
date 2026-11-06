"use client";
import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { supabase } from "../lib/supabaseClient";
import {
  checkGuardrail,
  getUrgency,
  messages as texts,
  needsHumanReview,
  nextSteps,
  urgencyLabels,
  type Duration,
  type GuardrailType,
  type Severity,
  type Urgency,
} from "./logic";

type NewMessage =
  | { from: "assistant" | "user"; kind: "text"; text: string }
  | { from: "assistant"; kind: "notice" }
  | { from: "assistant"; kind: "result"; urgency: Urgency; summary: string; flagged: boolean }
  | { from: "assistant"; kind: "emergency" };

type Message = NewMessage & { id: number };

type Step = "problem" | "duration" | "severity" | "done";

type SaveStatus = "idle" | "saving" | "saved" | "error";
type FeedbackStatus = "idle" | "sending" | "sent" | "error";
type Rating = "up" | "down";

type SessionSummary = {
  urgency: Urgency | "none";
  duration: Duration | "none";
  severity: Severity | "none";
  guardrail: GuardrailType;
};

const problemQuestion = "What is the main problem you're experiencing?";

const questions = {
  duration: "How long have you had this?",
  severity: "How would you describe the severity right now?",
};

function currentQuestion(step: Exclude<Step, "done">) {
  if (step === "problem") return problemQuestion;
  return questions[step];
}

// Anonymous ID for one conversation. Falls back when crypto.randomUUID is not available.
function newSessionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
}

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
    text: problemQuestion,
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

const noticeClass =
  "text-xs text-orange-200 bg-orange-950/40 border border-orange-700 rounded px-2 py-1";

export default function ChatPage() {
  const [chat, setChat] = useState<Message[]>(initialMessages);
  const [step, setStep] = useState<Step>("problem");
  const [problem, setProblem] = useState("");
  const [duration, setDuration] = useState<{ value: Duration; label: string } | null>(null);
  const [input, setInput] = useState("");
  // The most serious guardrail triggered so far: "none", "out_of_scope", or "emergency".
  const [guardrailSeen, setGuardrailSeen] = useState<GuardrailType>("none");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [rating, setRating] = useState<Rating | null>(null);
  const [comment, setComment] = useState("");
  const [feedbackStatus, setFeedbackStatus] = useState<FeedbackStatus>("idle");
  const nextId = useRef(3);
  const listRef = useRef<HTMLDivElement>(null);
  const savedRef = useRef(false);
  const conversationRef = useRef(0);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [chat, step]);

  function push(items: NewMessage[]) {
    const withIds: Message[] = items.map((i) => ({ ...i, id: nextId.current++ }));
    setChat((prev) => [...prev, ...withIds]);
  }

  // Saves one structured summary per finished conversation. The typed text is never stored.
  async function saveSession(summary: SessionSummary) {
    if (savedRef.current) return;
    savedRef.current = true;
    const conversation = conversationRef.current;
    const id = newSessionId();
    setSaveStatus("saving");
    const { error } = await supabase.from("chat_sessions").insert({
      session_id: id,
      urgency_level: summary.urgency,
      duration_answer: summary.duration,
      severity_answer: summary.severity,
      guardrail_type: summary.guardrail,
      flagged_for_review: needsHumanReview(summary.urgency, summary.guardrail),
    });
    // Ignore the result if the user already pressed Start over.
    if (conversation !== conversationRef.current) return;
    setSessionId(id);
    setSaveStatus(error ? "error" : "saved");
  }

  // Saves the rating and the optional comment once per conversation.
  async function sendFeedback() {
    if (!rating || !sessionId) return;
    if (feedbackStatus === "sending" || feedbackStatus === "sent") return;
    const conversation = conversationRef.current;
    setFeedbackStatus("sending");
    const { error } = await supabase.from("chat_feedback").insert({
      session_id: sessionId,
      rating,
      comment: comment.trim() || null,
    });
    if (conversation !== conversationRef.current) return;
    setFeedbackStatus(error ? "error" : "sent");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || step === "done") return;
    setInput("");

    const userMessage: NewMessage = { from: "user", kind: "text", text };
    const guardrail = checkGuardrail(text);

    // Guardrail 1: an emergency phrase stops the conversation at any step.
    if (guardrail === "emergency") {
      setGuardrailSeen("emergency");
      push([userMessage, { from: "assistant", kind: "emergency" }]);
      setStep("done");
      void saveSession({
        urgency: "none",
        duration: duration?.value ?? "none",
        severity: "none",
        guardrail: "emergency",
      });
      return;
    }

    // Guardrail 2: diagnosis and medication requests are refused, then the question repeats.
    // The first trigger also flags the conversation for human review.
    if (guardrail === "out_of_scope") {
      const firstFlag = guardrailSeen === "none";
      if (firstFlag) setGuardrailSeen("out_of_scope");
      const notice: NewMessage = { from: "assistant", kind: "notice" };
      push([
        userMessage,
        { from: "assistant", kind: "text", text: texts.outOfScope },
        ...(firstFlag ? [notice] : []),
        { from: "assistant", kind: "text", text: currentQuestion(step) },
      ]);
      return;
    }

    if (step === "problem") {
      // Guardrail 3: empty or very short input is asked again.
      if (guardrail === "empty") {
        push([userMessage, { from: "assistant", kind: "text", text: texts.empty }]);
        return;
      }
      setProblem(text);
      push([userMessage, { from: "assistant", kind: "text", text: questions.duration }]);
      setStep("duration");
      return;
    }

    push([userMessage, { from: "assistant", kind: "text", text: texts.chooseOption }]);
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
    const flagged = needsHumanReview(urgency, guardrailSeen);
    const summary = `Main problem: "${problem}". Duration: ${duration.label.toLowerCase()}. Severity: ${option.label.toLowerCase()}.`;
    push([
      { from: "user", kind: "text", text: option.label },
      { from: "assistant", kind: "result", urgency, summary, flagged },
    ]);
    setStep("done");
    void saveSession({
      urgency,
      duration: duration.value,
      severity: option.value,
      guardrail: guardrailSeen,
    });
  }

  function startOver() {
    conversationRef.current += 1;
    savedRef.current = false;
    setChat(initialMessages);
    setStep("problem");
    setProblem("");
    setDuration(null);
    setInput("");
    setGuardrailSeen("none");
    setSaveStatus("idle");
    setSessionId(null);
    setRating(null);
    setComment("");
    setFeedbackStatus("idle");
    nextId.current = 3;
  }

  const placeholder =
    step === "problem"
      ? "Describe the main problem..."
      : step === "done"
      ? "Conversation finished. Press Start over for a new one."
      : "Choose an option above, or type here";

  const showFeedback = step === "done" && saveStatus === "saved" && sessionId;

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
              {chat.map((m) => {
                if (m.kind === "text") {
                  return (
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
                  );
                }

                if (m.kind === "notice") {
                  return (
                    <div key={m.id} className="flex justify-start">
                      <p className={`max-w-[90%] ${noticeClass}`}>⚑ {texts.humanReview}</p>
                    </div>
                  );
                }

                if (m.kind === "emergency") {
                  return (
                    <div key={m.id} className="flex justify-start">
                      <div className="max-w-[90%] border border-red-700 bg-red-950/40 rounded-lg p-4 text-sm">
                        <p className="font-semibold text-red-300 mb-2">⚠ {texts.emergencyTitle}</p>
                        <p className="text-gray-100 mb-3">{texts.emergency}</p>
                        <p className={noticeClass}>⚑ {texts.humanReview}</p>
                      </div>
                    </div>
                  );
                }

                return (
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
                      {m.flagged && (
                        <p className={`mt-2 ${noticeClass}`}>⚑ {texts.humanReview}</p>
                      )}
                    </div>
                  </div>
                );
              })}

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

            {showFeedback && (
              <div className="mt-3 border border-gray-700 rounded-md p-3">
                {feedbackStatus === "sent" ? (
                  <p className="text-sm text-green-400">Thanks for your feedback ✓</p>
                ) : (
                  <>
                    <p className="text-sm text-gray-200 mb-2">Was this helpful?</p>
                    <div className="flex gap-2 mb-3">
                      <button
                        type="button"
                        aria-label="Thumbs up"
                        aria-pressed={rating === "up"}
                        onClick={() => setRating("up")}
                        className={`border rounded-md px-3 py-1 text-lg ${
                          rating === "up"
                            ? "border-green-500 bg-green-950/40"
                            : "border-gray-600 hover:border-gray-400"
                        }`}
                      >
                        👍
                      </button>
                      <button
                        type="button"
                        aria-label="Thumbs down"
                        aria-pressed={rating === "down"}
                        onClick={() => setRating("down")}
                        className={`border rounded-md px-3 py-1 text-lg ${
                          rating === "down"
                            ? "border-red-500 bg-red-950/40"
                            : "border-gray-600 hover:border-gray-400"
                        }`}
                      >
                        👎
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        aria-label="Optional comment"
                        maxLength={200}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Optional comment (no personal or medical information)"
                        className="flex-1 border border-gray-700 rounded-md p-2 text-sm bg-gray-800 text-gray-100 placeholder-gray-500"
                      />
                      <button
                        type="button"
                        onClick={sendFeedback}
                        disabled={!rating || feedbackStatus === "sending"}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm disabled:opacity-50"
                      >
                        {feedbackStatus === "sending" ? "Sending..." : "Send"}
                      </button>
                    </div>
                    {feedbackStatus === "error" && (
                      <p className="mt-2 text-xs text-red-400">
                        Could not save the feedback. Check that chat_feedback is exposed in the
                        Supabase Data API and has an INSERT policy.
                      </p>
                    )}
                  </>
                )}
              </div>
            )}

            <button
              type="button"
              onClick={startOver}
              className="mt-3 w-full border border-blue-500 text-blue-300 px-4 py-2 rounded-md text-sm hover:bg-blue-950"
            >
              Start over
            </button>

            <p className="mt-3 text-xs text-gray-500">
              When a conversation ends, a short test summary is saved without the text you typed.
              If you send feedback, your rating and optional comment are saved too.
            </p>
            {saveStatus === "saving" && (
              <p className="mt-1 text-xs text-gray-400">Saving test summary...</p>
            )}
            {saveStatus === "saved" && sessionId && (
              <p className="mt-1 text-xs text-green-400">
                Test summary saved ✓ · session {sessionId.slice(0, 8)}
              </p>
            )}
            {saveStatus === "error" && (
              <p className="mt-1 text-xs text-red-400">
                Could not save the test summary. Check that chat_sessions is exposed in the
                Supabase Data API and has an INSERT policy.
              </p>
            )}
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