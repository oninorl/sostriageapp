type Kind = "rule" | "calc" | "static" | "live" | "sim";

const kinds: Record<
  Kind,
  { label: string; stroke: string; fill: string; chip: string; meaning: string }
> = {
  rule: {
    label: "rule-based",
    stroke: "#3b82f6",
    fill: "#172554",
    chip: "bg-blue-500",
    meaning: "Fixed questions and keyword rules. No language model.",
  },
  calc: {
    label: "calculation",
    stroke: "#14b8a6",
    fill: "#042f2e",
    chip: "bg-teal-500",
    meaning: "Plain arithmetic, such as the revenue formula.",
  },
  static: {
    label: "static content",
    stroke: "#9ca3af",
    fill: "#1f2937",
    chip: "bg-gray-400",
    meaning: "Written text and data stored in the code.",
  },
  live: {
    label: "live records",
    stroke: "#a855f7",
    fill: "#3b0764",
    chip: "bg-purple-500",
    meaning: "Reads or writes real rows in the database.",
  },
  sim: {
    label: "simulated",
    stroke: "#f97316",
    fill: "#431407",
    chip: "bg-orange-500",
    meaning: "Shown as a flag only. No person reviews anything.",
  },
};

type Mod = { x: number; name: string; path: string; kind: Kind; flow: "write" | "both" };

const W = 108;

const mods: Mod[] = [
  { x: 8, name: "Homepage", path: "/", kind: "live", flow: "write" },
  { x: 128, name: "Triage form", path: "/core", kind: "rule", flow: "both" },
  { x: 248, name: "Research", path: "/research", kind: "static", flow: "both" },
  { x: 368, name: "Pricing", path: "/pricing", kind: "calc", flow: "both" },
  { x: 488, name: "Marketing", path: "/marketing", kind: "static", flow: "both" },
  { x: 608, name: "Chat", path: "/chat", kind: "rule", flow: "write" },
];

type Detail = {
  module: string;
  page: string;
  what: string;
  kind: Kind;
  writes: string;
  reads: string;
};

const details: Detail[] = [
  {
    module: "Homepage",
    page: "/",
    what: "Shows one of two headlines and button texts to each visitor, and counts views and clicks.",
    kind: "live",
    writes: "ab_events",
    reads: "—",
  },
  {
    module: "Triage form",
    page: "/core",
    what: "Turns symptoms, duration, and pain level into an urgency level with keyword rules and the shared emergency rules.",
    kind: "rule",
    writes: "core_outputs (structured fields only)",
    reads: "core_outputs",
  },
  {
    module: "Research",
    page: "/research",
    what: "Global examples, a competitor table, the Mexico section, a risk map, and research notes.",
    kind: "static",
    writes: "research_records",
    reads: "research_records",
  },
  {
    module: "Pricing",
    page: "/pricing (and /product)",
    what: "Three tiers, a revenue calculator with a monthly and annual view, and an assumptions table. The product page is static content.",
    kind: "calc",
    writes: "pricing_scenarios",
    reads: "pricing_scenarios",
  },
  {
    module: "Marketing",
    page: "/marketing",
    what: "Brand, persona, posts, scripts, calendar, and the A/B results. The content is static, the A/B results are live.",
    kind: "static",
    writes: "marketing_assets",
    reads: "marketing_assets, ab_events",
  },
  {
    module: "Chat",
    page: "/chat",
    what: "A guided intake with emergency and out-of-scope guardrails, a human-review flag, and feedback.",
    kind: "rule",
    writes: "chat_sessions, chat_feedback",
    reads: "—",
  },
  {
    module: "Human review",
    page: "flag in /chat",
    what: "Orange and red results, emergencies, and out-of-scope requests are flagged. The flag is stored as flagged_for_review in chat_sessions. No doctor reviews anything.",
    kind: "sim",
    writes: "chat_sessions (flag only)",
    reads: "—",
  },
  {
    module: "Dashboard",
    page: "/dashboard",
    what: "Counts and the latest structured records, plus the testing summary. Never shows typed text or comments.",
    kind: "live",
    writes: "—",
    reads: "all seven tables",
  },
];

export default function AgentMap() {
  return (
    <section className="mb-16">
      <h2 className="text-xl font-bold text-white mb-2">Agent Map</h2>
      <p className="text-sm text-gray-400 mb-2">
        How the modules work and how they connect to the database and the human checkpoint. In
        this course a module that takes an input and returns a structured output is called an
        agent.
      </p>
      <p className="text-sm text-gray-300 mb-6">
        None of these modules uses a language model: every one is rule-based, a calculation,
        static content, or a live record.
      </p>

      <div className="overflow-x-auto border border-gray-700 rounded-md p-3">
        <svg
          viewBox="0 0 870 430"
          className="min-w-[720px] w-full h-auto"
          role="img"
          aria-labelledby="agent-map-title agent-map-desc"
        >
          <title id="agent-map-title">Agent map of the SOS Triage modules</title>
          <desc id="agent-map-desc">
            Six modules (homepage, triage form, research, pricing, marketing, and chat) are
            connected to one Supabase database. The chat is linked to a simulated human review
            flag. The dashboard reads from the database.
          </desc>
          <defs>
            <marker
              id="agent-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path
                d="M2 1L8 5L2 9"
                fill="none"
                stroke="#9ca3af"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </marker>
          </defs>

          {mods.map((m) => {
            const cx = m.x + W / 2;
            const k = kinds[m.kind];
            return (
              <g key={m.name}>
                <rect
                  x={m.x}
                  y={20}
                  width={W}
                  height={80}
                  rx={8}
                  fill={k.fill}
                  stroke={k.stroke}
                  strokeWidth={1}
                />
                <text x={cx} y={42} textAnchor="middle" fontSize="13" fontWeight="600" fill="#f3f4f6">
                  {m.name}
                </text>
                <text x={cx} y={61} textAnchor="middle" fontSize="11" fill="#9ca3af">
                  {m.path}
                </text>
                <text x={cx} y={82} textAnchor="middle" fontSize="11" fill="#d1d5db">
                  {k.label}
                </text>
                <line
                  x1={cx}
                  y1={100}
                  x2={cx}
                  y2={190}
                  stroke="#9ca3af"
                  strokeWidth={1.5}
                  markerEnd="url(#agent-arrow)"
                  markerStart={m.flow === "both" ? "url(#agent-arrow)" : undefined}
                />
              </g>
            );
          })}

          {/* Human review: a simulated flag on the chat */}
          <rect
            x={752}
            y={20}
            width={W}
            height={80}
            rx={8}
            fill={kinds.sim.fill}
            stroke={kinds.sim.stroke}
            strokeWidth={1}
          />
          <text x={806} y={42} textAnchor="middle" fontSize="13" fontWeight="600" fill="#f3f4f6">
            Human review
          </text>
          <text x={806} y={61} textAnchor="middle" fontSize="11" fill="#9ca3af">
            simulated flag
          </text>
          <text x={806} y={82} textAnchor="middle" fontSize="11" fill="#d1d5db">
            no doctor
          </text>
          <line
            x1={716}
            y1={60}
            x2={752}
            y2={60}
            stroke="#f97316"
            strokeWidth={1.5}
            strokeDasharray="4 3"
            markerEnd="url(#agent-arrow)"
          />
          <text x={734} y={50} textAnchor="middle" fontSize="10" fill="#9ca3af">
            flag
          </text>

          {/* Database */}
          <rect x={8} y={190} width={852} height={60} rx={8} fill="#082f49" stroke="#0ea5e9" strokeWidth={1} />
          <text x={434} y={214} textAnchor="middle" fontSize="14" fontWeight="600" fill="#f3f4f6">
            Supabase database (Postgres)
          </text>
          <text x={434} y={236} textAnchor="middle" fontSize="11" fill="#bae6fd">
            ab_events · core_outputs · chat_sessions · chat_feedback · research_records ·
            pricing_scenarios · marketing_assets
          </text>

          {/* Dashboard reads from the database */}
          <line
            x1={434}
            y1={250}
            x2={434}
            y2={330}
            stroke="#9ca3af"
            strokeWidth={1.5}
            markerEnd="url(#agent-arrow)"
          />
          <rect
            x={334}
            y={330}
            width={200}
            height={80}
            rx={8}
            fill={kinds.live.fill}
            stroke={kinds.live.stroke}
            strokeWidth={1}
          />
          <text x={434} y={352} textAnchor="middle" fontSize="13" fontWeight="600" fill="#f3f4f6">
            Dashboard
          </text>
          <text x={434} y={371} textAnchor="middle" fontSize="11" fill="#9ca3af">
            /dashboard
          </text>
          <text x={434} y={392} textAnchor="middle" fontSize="11" fill="#d1d5db">
            live records
          </text>
          <text x={550} y={374} fontSize="11" fill="#9ca3af">
            reads counts from all seven tables
          </text>
        </svg>
      </div>

      <p className="text-xs text-gray-500 mt-2 mb-6">
        Arrow at the database only: the module writes. Arrows both ways: it reads and writes. The
        dashed arrow is the human-review flag, which is stored in chat_sessions.
      </p>

      <ul className="grid gap-2 md:grid-cols-2 mb-8">
        {(Object.keys(kinds) as Kind[]).map((key) => (
          <li key={key} className="flex items-start gap-2 text-sm text-gray-300">
            <span className={`mt-1 inline-block w-3 h-3 rounded-sm shrink-0 ${kinds[key].chip}`} />
            <span>
              <span className="font-semibold text-white">{kinds[key].label}:</span>{" "}
              {kinds[key].meaning}
            </span>
          </li>
        ))}
      </ul>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left border-b border-gray-700">
              <th className="py-2 pr-4 text-white">Module</th>
              <th className="py-2 pr-4 text-white">What it does</th>
              <th className="py-2 pr-4 text-white">Type</th>
              <th className="py-2 pr-4 text-white">Writes</th>
              <th className="py-2 text-white">Reads</th>
            </tr>
          </thead>
          <tbody>
            {details.map((d) => (
              <tr key={d.module} className="border-b border-gray-800 align-top">
                <td className="py-2 pr-4 text-gray-100">
                  <span className="font-medium">{d.module}</span>
                  <br />
                  <span className="text-xs text-gray-500">{d.page}</span>
                </td>
                <td className="py-2 pr-4 text-gray-300">{d.what}</td>
                <td className="py-2 pr-4 text-gray-300 whitespace-nowrap">
                  <span className="flex items-center gap-2">
                    <span className={`inline-block w-3 h-3 rounded-sm ${kinds[d.kind].chip}`} />
                    {kinds[d.kind].label}
                  </span>
                </td>
                <td className="py-2 pr-4 text-gray-400">{d.writes}</td>
                <td className="py-2 text-gray-400">{d.reads}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}