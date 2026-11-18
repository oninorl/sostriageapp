"use client";
import { useState } from "react";
import { steps } from "./steps";

export default function Walkthrough() {
  const [index, setIndex] = useState(0);
  const step = steps[index];
  const isFirst = index === 0;
  const isLast = index === steps.length - 1;

  return (
    <section className="mb-16">
      <ol className="grid grid-cols-6 gap-1 mb-8">
        {steps.map((s, i) => (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-current={i === index ? "step" : undefined}
              className="w-full flex flex-col items-center gap-2 text-center"
            >
              <span
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border ${
                  i === index
                    ? "bg-blue-600 border-blue-500 text-white"
                    : "border-gray-600 text-gray-300 hover:border-gray-400"
                }`}
              >
                {s.id}
              </span>
              <span
                className={`text-[11px] leading-tight ${
                  i === index ? "text-white" : "text-gray-400"
                }`}
              >
                {s.short}
              </span>
            </button>
          </li>
        ))}
      </ol>

      <div className="border border-gray-700 rounded-md p-5">
        <p className="text-xs text-blue-400 mb-1">
          STEP {step.id} OF {steps.length}
        </p>
        <h2 className="text-xl font-bold text-white mb-2">{step.title}</h2>
        <p className="text-sm text-gray-300 mb-5">{step.description}</p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-gray-700 rounded-md p-4">
            <h3 className="text-sm font-semibold text-white mb-2">What you will see</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
              {step.see.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="border border-gray-700 rounded-md p-4">
            <h3 className="text-sm font-semibold text-white mb-2">What is simulated</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
              {step.simulated.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {step.links.map((link) => (
            <a
              key={link.href + link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <button
          type="button"
          onClick={() => setIndex(index - 1)}
          disabled={isFirst}
          className="border border-gray-600 text-gray-200 px-4 py-2 rounded-md text-sm hover:border-blue-500 disabled:opacity-40"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={() => setIndex(index + 1)}
          disabled={isLast}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm disabled:opacity-40"
        >
          Next →
        </button>
      </div>
    </section>
  );
}