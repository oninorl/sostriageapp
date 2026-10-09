import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type Segment = {
  name: string;
  description: string;
  fit: string;
};

const segments: Segment[] = [
  {
    name: "Regional / Niche Insurers",
    description:
      "Smaller or specialized travel insurers that want a low-risk way to test AI-assisted intake. Price-sensitive, lower call volume.",
    fit: "Best fit: Starter, or Growth as volume increases",
  },
  {
    name: "National / Enterprise Insurers",
    description:
      "Large, established insurers with high call volume. They benefit most from the lower per-intake fee at scale and need reporting and dedicated support.",
    fit: "Best fit: Growth or Enterprise",
  },
];

type Feature = {
  name: string;
  status: "Prototype" | "Planned";
  starter: boolean;
  growth: boolean;
  enterprise: boolean;
};

const features: Feature[] = [
  { name: "Symptom intake form", status: "Prototype", starter: true, growth: true, enterprise: true },
  { name: "Urgency level (green / orange / red)", status: "Prototype", starter: true, growth: true, enterprise: true },
  { name: "Structured summary for the doctor", status: "Prototype", starter: true, growth: true, enterprise: true },
  { name: "Basic reports (monthly intake counts)", status: "Planned", starter: true, growth: true, enterprise: true },
  { name: "Extended reports (urgency breakdown, peak times)", status: "Planned", starter: false, growth: true, enterprise: true },
  { name: "Fully customized reports", status: "Planned", starter: false, growth: false, enterprise: true },
  { name: "Email support", status: "Planned", starter: true, growth: true, enterprise: true },
  { name: "Chat support", status: "Planned", starter: false, growth: true, enterprise: true },
  { name: "Dedicated account manager", status: "Planned", starter: false, growth: false, enterprise: true },
];

function mark(included: boolean) {
  return included ? "✅" : "—";
}

export default function ProductPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 px-6 py-12 max-w-4xl mx-auto w-full text-gray-100">
        <h1 className="text-2xl font-bold mb-2 text-white">Product Architecture</h1>
        <p className="text-sm text-gray-400 mb-10">
          SOS Triage is sold to insurers as an AI-assisted first intake: the traveler
          describes their symptoms, the system structures them and suggests an urgency
          level, and a doctor stays responsible for the final medical decision. This page
          shows who the product is for and which features come with each pricing tier.
        </p>

        {/* Customer segments */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-4 text-white">Customer Segments</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {segments.map((s) => (
              <div key={s.name} className="border border-gray-700 rounded-md p-4">
                <p className="font-semibold text-white mb-1">{s.name}</p>
                <p className="text-sm text-gray-400 mb-3">{s.description}</p>
                <p className="text-xs text-gray-300 bg-gray-800 border border-gray-700 rounded-md px-2 py-1 inline-block">
                  {s.fit}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Feature map */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2 text-white">Feature Map</h2>
          <p className="text-sm text-gray-400 mb-4">
            Which features are included in each tier. Status shows what exists in the
            current demo.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left border-b border-gray-700">
                  <th className="py-2 pr-4 text-white">Feature</th>
                  <th className="py-2 pr-4 text-white">Status</th>
                  <th className="py-2 pr-4 text-white text-center">Starter</th>
                  <th className="py-2 pr-4 text-white text-center">Growth</th>
                  <th className="py-2 text-white text-center">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {features.map((f) => (
                  <tr key={f.name} className="border-b border-gray-800">
                    <td className="py-2 pr-4 font-medium text-gray-100">{f.name}</td>
                    <td className="py-2 pr-4 text-gray-400">{f.status}</td>
                    <td className="py-2 pr-4 text-center text-gray-300">{mark(f.starter)}</td>
                    <td className="py-2 pr-4 text-center text-gray-300">{mark(f.growth)}</td>
                    <td className="py-2 text-center text-gray-300">{mark(f.enterprise)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <p className="text-xs text-gray-500">
          Features marked Planned are part of the product design but are not built yet.
          Only the intake, urgency level, and summary exist in the current prototype.
        </p>
      </main>
      <Footer />
    </div>
  );
}