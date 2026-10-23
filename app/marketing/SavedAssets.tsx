"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type SavedAsset = {
  id: number;
  asset_type: string;
  title: string;
  content: string;
  created_at: string;
};

const typeLabels: Record<string, string> = {
  landing_copy: "Landing copy",
  social_post: "Social post",
  video_script: "Video script",
};

export default function SavedAssets() {
  const [assets, setAssets] = useState<SavedAsset[] | null>(null);
  const [loadError, setLoadError] = useState("");

  async function load() {
    const { data, error } = await supabase
      .from("marketing_assets")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);
    if (error) {
      setLoadError(
        "Could not load saved assets. Check that marketing_assets is exposed in the Supabase Data API and has a SELECT policy."
      );
      return;
    }
    setLoadError("");
    setAssets(data as SavedAsset[]);
  }

  useEffect(() => {
    load();
    window.addEventListener("assets-updated", load);
    return () => window.removeEventListener("assets-updated", load);
  }, []);

  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold mb-2 text-white">Saved Assets</h2>
      <p className="text-sm text-gray-400 mb-4">
        Assets stored in Supabase (table marketing_assets). Showing the 10 most recent.
      </p>

      {loadError && <p className="text-sm text-red-400">{loadError}</p>}
      {!assets && !loadError && <p className="text-sm text-gray-500">Loading...</p>}
      {assets && assets.length === 0 && (
        <p className="text-sm text-gray-500">
          No assets saved yet. Use &quot;Save asset&quot; on any card above.
        </p>
      )}

      {assets && assets.length > 0 && (
        <ul className="space-y-2">
          {assets.map((a) => (
            <li
              key={a.id}
              className="bg-gray-800 border border-gray-700 rounded-md p-3 text-sm"
            >
              <div className="flex flex-wrap justify-between gap-2">
                <span>
                  <span className="text-xs bg-gray-900 border border-gray-700 rounded px-2 py-0.5 mr-2 text-gray-300">
                    {typeLabels[a.asset_type] ?? a.asset_type}
                  </span>
                  <span className="font-semibold text-white">{a.title}</span>
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(a.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <details className="mt-2">
                <summary className="text-xs text-gray-400 cursor-pointer">Show text</summary>
                <p className="text-gray-300 whitespace-pre-line mt-2">{a.content}</p>
              </details>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}