"use client";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

type Props = {
  title: string;
  text: string;
  // Defaults to landing copy, the only card type that does not pass its own type.
  assetType?: string;
};

type SaveState = "idle" | "saving" | "saved" | "exists" | "error";

function fileNameFor(title: string) {
  const name = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return name || "asset";
}

export default function AssetCard({ title, text, assetType = "landing_copy" }: Props) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("idle");

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

  async function handleSave() {
    setSaveState("saving");

    // Do not save the same asset twice.
    const { count, error: checkError } = await supabase
      .from("marketing_assets")
      .select("id", { count: "exact", head: true })
      .eq("asset_type", assetType)
      .eq("title", title);
    if (checkError) {
      setSaveState("error");
      return;
    }
    if ((count ?? 0) > 0) {
      setSaveState("exists");
      return;
    }

    const { error } = await supabase
      .from("marketing_assets")
      .insert({ asset_type: assetType, title, content: text });
    if (error) {
      setSaveState("error");
      return;
    }
    setSaveState("saved");
    window.dispatchEvent(new Event("assets-updated"));
  }

  const saveLabel =
    saveState === "saving"
      ? "Saving..."
      : saveState === "saved"
      ? "Saved ✓"
      : saveState === "exists"
      ? "Already saved ✓"
      : "Save asset";

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
        <button
          type="button"
          onClick={handleSave}
          disabled={saveState === "saving" || saveState === "saved" || saveState === "exists"}
          className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs disabled:opacity-60"
        >
          {saveLabel}
        </button>
        {copyError && (
          <span className="text-xs text-red-400">
            Copy failed. Select the text and copy it manually.
          </span>
        )}
        {saveState === "error" && (
          <span className="text-xs text-red-400">
            Could not save. Check that marketing_assets is exposed in the Supabase Data
            API and has an INSERT policy.
          </span>
        )}
      </div>
    </div>
  );
}