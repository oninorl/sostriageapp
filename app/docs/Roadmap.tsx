import { later, next, now, principle, scenarios, type RoadmapItem } from "./roadmap";

const columns: { key: string; title: string; subtitle: string; items: RoadmapItem[]; accent: string }[] = [
  {
    key: "now",
    title: "Now (v1)",
    subtitle: "Built and live. A prototype, not a product.",
    items: now,
    accent: "border-green-700",
  },
  {
    key: "next",
    title: "Next (v2)",
    subtitle: "Make it safer and better proven.",
    items: next,
    accent: "border-blue-700",
  },
  {
    key: "later",
    title: "Later (v3 and beyond)",
    subtitle: "Only if version 2 supports it.",
    items: later,
    accent: "border-gray-600",
  },
];

export default function Roadmap() {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-2 text-white">Version 2 Roadmap</h2>
      <p className="text-sm text-gray-400 mb-2">
        The next steps to move from a prototype to something that could be tested with a real
        insurer. Each item in Next names the risk or the missing evidence from the impact check
        that it addresses. There are no dates: what comes next depends on what the evidence shows.
      </p>
      <p className="text-sm text-gray-300 mb-6">{principle}</p>

      <div className="grid gap-4 md:grid-cols-3 mb-10">
        {columns.map((c) => (
          <div key={c.key} className={`border ${c.accent} rounded-md p-4`}>
            <h3 className="font-semibold text-white">{c.title}</h3>
            <p className="text-xs text-gray-500 mb-3">{c.subtitle}</p>
            <ul className="space-y-3">
              {c.items.map((item) => (
                <li key={item.text} className="text-sm text-gray-300">
                  {item.text}
                  {item.addresses && (
                    <span className="mt-1 block">
                      <span className="inline-block border border-gray-600 rounded px-2 py-0.5 text-[11px] text-gray-400">
                        Addresses: {item.addresses}
                      </span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border border-gray-700 rounded-md p-4">
        <h3 className="font-semibold text-white mb-2">Pricing scenarios</h3>
        <p className="text-sm text-gray-300 mb-2">{scenarios.today}</p>
        <p className="text-sm text-gray-300 mb-3">{scenarios.plan}</p>
        <ul className="grid gap-3 md:grid-cols-3 mb-3">
          {scenarios.items.map((s) => (
            <li key={s.name} className="border border-gray-700 rounded-md p-3">
              <p className="font-semibold text-white mb-1">{s.name}</p>
              <p className="text-sm text-gray-400">{s.text}</p>
            </li>
          ))}
        </ul>
        <p className="text-xs text-gray-500">{scenarios.note}</p>
      </div>
    </section>
  );
}