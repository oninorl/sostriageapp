"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { getVariant, trackEvent, type Variant } from "./lib/abTest";

const HEADLINE_TEST = "homepage_headline";
const BUTTON_TEST = "primary_button_text";

// Edit the texts here to change the A/B variants.
const headlines: Record<Variant, string> = {
  A: "Shorter waits for your insured travelers in a medical emergency abroad",
  B: "1.5 hours to reach someone. 15 hours for medical advice. It happened to a friend abroad.",
};

const buttonTexts: Record<Variant, string> = {
  A: "Try the triage demo",
  B: "See how an intake works",
};

export default function Home() {
  const [headlineVariant, setHeadlineVariant] = useState<Variant | null>(null);
  const [buttonVariant, setButtonVariant] = useState<Variant | null>(null);

  useEffect(() => {
    const h = getVariant(HEADLINE_TEST);
    const b = getVariant(BUTTON_TEST);
    setHeadlineVariant(h);
    setButtonVariant(b);
    trackEvent(HEADLINE_TEST, h, "view");
    trackEvent(BUTTON_TEST, b, "view");
  }, []);

  function handlePrimaryClick() {
    if (headlineVariant) trackEvent(HEADLINE_TEST, headlineVariant, "click");
    if (buttonVariant) trackEvent(BUTTON_TEST, buttonVariant, "click");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 px-6 py-12 max-w-4xl mx-auto w-full text-gray-100">
        <section className="min-h-[260px]">
          <p className="text-sm text-blue-400 mb-3">SOS Triage</p>
          {headlineVariant && (
            <h1 className="text-3xl md:text-4xl font-bold text-white max-w-3xl">
              {headlines[headlineVariant]}
            </h1>
          )}
          <p className="text-gray-300 mt-4 max-w-2xl">
            SOS Triage is a simulated AI-assisted intake: the traveler describes their
            symptoms, the system structures them and suggests an urgency level, and a
            doctor stays responsible for the medical decision.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {buttonVariant && (
              <Link
                href="/core"
                onClick={handlePrimaryClick}
                className="bg-blue-600 text-white px-5 py-2 rounded-md text-sm"
              >
                {buttonTexts[buttonVariant]}
              </Link>
            )}
            <Link
              href="/pricing"
              className="border border-gray-600 text-gray-200 px-5 py-2 rounded-md text-sm"
            >
              View pricing
            </Link>
          </div>
          <p className="text-xs text-gray-500 mt-4 max-w-2xl">
            Simulated student demo, not a real medical service. SOS Triage is an
            independent project and is not affiliated with SOS International or any
            insurer.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-4 text-white">Project Roadmap</h2>
          <ul className="space-y-2 text-gray-300">
            <li>Week 0 — Setup: infrastructure, homepage, deploy ✅</li>
            <li>Week 1 — Generative Core: AI intake & triage output</li>
            <li>Week 2+ — Expansion: dashboard, insurer integration</li>
            <li>Module 6 — Validation & impact</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}