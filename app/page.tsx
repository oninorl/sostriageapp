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

const steps = [
  {
    title: "1. The traveler describes the problem",
    text: "Symptoms, how long they have lasted, and a pain level, entered in a short form instead of repeated over the phone.",
  },
  {
    title: "2. The system structures the intake",
    text: "The answers become a structured summary and a suggested urgency level (green, orange, or red). In this demo the logic is simulated with simple keyword rules.",
  },
  {
    title: "3. A doctor decides",
    text: "The doctor receives the summary before the first call and stays responsible for the medical decision. The tool never diagnoses.",
  },
];

const insurerPoints = [
  {
    title: "Less repetitive intake",
    text: "The same questions are collected once, in a form, so staff do not start every call from zero.",
  },
  {
    title: "A summary ready for the doctor",
    text: "Symptoms, duration, pain level, and a suggested urgency level arrive together.",
  },
  {
    title: "Transparent pricing",
    text: "A monthly license plus a fee per intake, with three tiers and a calculator you can try.",
  },
];

const explore = [
  { href: "/core", title: "Triage demo", text: "Try the simulated intake and save a result." },
  { href: "/research", title: "Research", text: "Competitors, global examples, Mexico context, and a risk map." },
  { href: "/product", title: "Product", text: "Customer segments and which features come with which tier." },
  { href: "/pricing", title: "Pricing", text: "Three tiers and a revenue calculator for insurers." },
];

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

        <section className="mt-16">
          <h2 className="text-xl font-semibold mb-4 text-white">How it works</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.title} className="border border-gray-700 rounded-md p-4">
                <p className="font-semibold text-white mb-2">{s.title}</p>
                <p className="text-sm text-gray-400">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-xl font-semibold mb-1 text-white">For insurers</h2>
          <p className="text-xs text-gray-500 mb-4">
            Design goals of the product. None of these are measured results yet.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {insurerPoints.map((p) => (
              <div key={p.title} className="border border-gray-700 rounded-md p-4">
                <p className="font-semibold text-white mb-2">{p.title}</p>
                <p className="text-sm text-gray-400">{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-white">Explore what is built</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {explore.map((e) => (
              <Link
                key={e.href}
                href={e.href}
                className="border border-gray-700 rounded-md p-4 hover:border-blue-500"
              >
                <p className="font-semibold text-white mb-1">{e.title}</p>
                <p className="text-sm text-gray-400">{e.text}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}