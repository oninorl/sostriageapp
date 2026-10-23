"use client";
import { useState } from "react";

type Props = {
  title: string;
  text: string;
};

function fileNameFor(title: string) {
  const name = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return name || "asset";
}

export default function AssetCard({ title, text }: Props) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopyError(false);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyError(true);
    }
  }

  function handleExport() {
    const blob = new Blob([`${title}\n\n${text}\n`], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileNameFor(title)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="border border-gray-700 rounded-md p-4">
      <p className="font-semibold text-white mb-2">{title}</p>
      <p className="text-sm text-gray-300 whitespace-pre-line">{text}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className="border border-gray-600 text-gray-200 px-3 py-1 rounded-md text-xs hover:border-blue-500"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
        <button
          type="button"
          onClick={handleExport}
          className="border border-gray-600 text-gray-200 px-3 py-1 rounded-md text-xs hover:border-blue-500"
        >
          Export .txt
        </button>
        {copyError && (
          <span className="text-xs text-red-400">
            Copy failed. Select the text and copy it manually.
          </span>
        )}
      </div>
    </div>
  );
}