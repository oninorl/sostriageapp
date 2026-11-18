"use client";
import { useState } from "react";

type Props = {
  week: number;
  title: string;
  built: string;
  note: string;
  prompt: string;
};

export default function PromptCard({ week, title, built, note, prompt }: Props) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopyError(false);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyError(true);
    }
  }

  return (
    <div className="border border-gray-700 rounded-md p-4">
      <p className="text-xs text-blue-400 mb-1">WEEK {week}</p>
      <p className="font-semibold text-white">{title}</p>
      <p className="text-sm text-gray-300 mt-1">{built}</p>
      <p className="text-xs text-gray-500 mt-1 mb-3">{note}</p>
      <pre className="bg-gray-900 border border-gray-700 rounded-md p-3 text-xs text-gray-200 font-mono whitespace-pre-wrap leading-relaxed">
        {prompt}
      </pre>
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={handleCopy}
          className="border border-gray-600 text-gray-200 px-3 py-1 rounded-md text-xs hover:border-blue-500"
        >
          {copied ? "Copied ✓" : "Copy prompt"}
        </button>
        {copyError && (
          <span className="text-xs text-red-400">Copy failed. Select the text and copy it manually.</span>
        )}
      </div>
    </div>
  );
}