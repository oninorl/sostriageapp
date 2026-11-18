import { evidence, mustBeTrue, risks, value, type Level } from "./impact";

const levelStyles: Record<Level, string> = {
  Low: "border-green-700 bg-green-950/40 text-green-300",
  Medium: "border-orange-700 bg-orange-950/40 text-orange-300",
  High: "border-red-700 bg-red-950/40 text-red-300",
};

export default function ImpactCheck() {
  return (
    <section className="mb-16">
      <h2 className="text-xl font-bold mb-2 text-white">Practical Impact Check</h2>
      <p className="text-sm text-gray-400 mb-6">
        Who it is for, what value it could create, and what could go wrong. Everything here is a
        hypothesis or a design goal unless the evidence column says otherwise. Reviewed in Week 6
        (November 2026).
      </p>

      <div className="grid gap-4 md:grid-cols-2 mb-10">
        {value.map((v) => (
          <div key={v.label} className="border border-gray-700 rounded-md p-4">
            <p className="font-semibold text-white mb-1">{v.label}</p>
            <p className="text-sm text-gray-300">{v.text}</p>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold mb-3 text-white">What we know and what we do not</h3>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left border-b border-gray-700">
              <th className="py-2 pr-4 text-white">Claim</th>
              <th className="py-2 pr-4 text-white">Evidence we have</th>
              <th className="py-2 text-white">What is missing</th>
            </tr>
          </thead>
          <tbody>
            {evidence.map((e) => (
              <tr key={e.claim} className="border-b border-gray-800 align-top">
                <td className="py-2 pr-4 font-medium text-gray-100">{e.claim}</td>
                <td className="py-2 pr-4 text-gray-300">{e.have}</td>
                <td className="py-2 text-gray-400">{e.missing}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="text-lg font-semibold mb-3 text-white">Risks, mitigations, and what remains</h3>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left border-b border-gray-700">
              <th className="py-2 pr-4 text-white">Risk</th>
              <th className="py-2 pr-4 text-white">Mitigation</th>
              <th className="py-2 text-white">Residual risk</th>
            </tr>
          </thead>
          <tbody>
            {risks.map((r) => (
              <tr key={r.risk} className="border-b border-gray-800 align-top">
                <td className="py-2 pr-4 font-medium text-gray-100">{r.risk}</td>
                <td className="py-2 pr-4 text-gray-300">{r.mitigation}</td>
                <td className="py-2">
                  <span
                    className={`inline-block border rounded-md px-2 py-0.5 text-xs font-semibold ${levelStyles[r.residual]}`}
                  >
                    {r.residual}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{r.why}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="text-lg font-semibold mb-3 text-white">What must be true before this could be real</h3>
      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
        {mustBeTrue.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}