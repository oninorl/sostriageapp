import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AssetCard from "./AssetCard";
import { brand, persona, landingCopy } from "./brand";
import { contentSections } from "./contentSections";

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function MarketingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 px-6 py-12 max-w-4xl mx-auto w-full text-gray-100">
        <h1 className="text-2xl font-bold mb-2 text-white">Marketing Engine</h1>
        <p className="text-sm text-gray-400 mb-12">
          Brand, audience, and content for SOS Triage, aimed at insurers. Everything here
          describes a simulated student demo, so no customers, testimonials, or measured
          results are claimed.
        </p>

        {/* Brand system */}
        <section className="mb-16">
          <h2 className="text-lg font-semibold mb-4 text-white">Brand System</h2>

          <div className="border border-gray-700 rounded-md p-4 mb-6">
            <p className="text-xl font-bold text-white">{brand.name}</p>
            <p className="text-blue-400 mb-3">{brand.tagline}</p>
            <p className="text-sm text-gray-300 mb-3">{brand.positioning}</p>
            <p className="text-xs text-gray-500">{brand.disclaimer}</p>
          </div>

          <h3 className="text-sm font-semibold text-gray-200 mb-2">Colors</h3>
          <div className="grid gap-3 grid-cols-2 md:grid-cols-4 mb-6">
            {brand.colors.map((c) => (
              <div key={c.name} className="border border-gray-700 rounded-md p-3">
                <div
                  className="h-10 rounded border border-gray-600 mb-2"
                  style={{ backgroundColor: c.hex }}
                />
                <p className="text-sm font-medium text-white">{c.name}</p>
                <p className="text-xs text-gray-400">{c.hex}</p>
                <p className="text-xs text-gray-500">{c.use}</p>
              </div>
            ))}
          </div>

          <h3 className="text-sm font-semibold text-gray-200 mb-2">Tone of voice</h3>
          <div className="grid gap-3 md:grid-cols-3 mb-6">
            {brand.voice.map((v) => (
              <div key={v.trait} className="border border-gray-700 rounded-md p-3">
                <p className="font-semibold text-white mb-1">{v.trait}</p>
                <p className="text-sm text-gray-400">{v.text}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="border border-gray-700 rounded-md p-4">
              <h3 className="text-sm font-semibold text-gray-200 mb-2">Do</h3>
              <BulletList items={brand.dos} />
            </div>
            <div className="border border-gray-700 rounded-md p-4">
              <h3 className="text-sm font-semibold text-gray-200 mb-2">Don&apos;t</h3>
              <BulletList items={brand.donts} />
            </div>
          </div>
        </section>

        {/* Target persona */}
        <section className="mb-16">
          <h2 className="text-lg font-semibold mb-4 text-white">Target Persona</h2>
          <div className="border border-gray-700 rounded-md p-4">
            <p className="text-xs text-yellow-400 mb-3">{persona.label}</p>
            <p className="text-xl font-bold text-white">{persona.name}</p>
            <p className="text-sm text-gray-300 mb-4">{persona.role}</p>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold text-gray-200 mb-2">Goals</h3>
                <BulletList items={persona.goals} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-200 mb-2">Pains</h3>
                <BulletList items={persona.pains} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-200 mb-2">Likely objections</h3>
                <BulletList items={persona.objections} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-200 mb-2">What she needs to see</h3>
                <BulletList items={persona.needs} />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">{persona.channels}</p>
          </div>
        </section>

        {/* Landing page copy */}
        <section className="mb-16">
          <h2 className="text-lg font-semibold mb-2 text-white">Landing Page Copy</h2>
          <p className="text-sm text-gray-400 mb-4">
            The master text for the homepage. The two headlines and the two button texts are
            the variants in the A/B tests.
          </p>
          <div className="grid gap-4">
            {landingCopy.map((item) => (
              <AssetCard key={item.label} title={item.label} text={item.text} />
            ))}
          </div>
        </section>

        {/* Content sections: social posts, video scripts, calendar, and more */}
        {contentSections.map(({ id, Component }) => (
          <Component key={id} />
        ))}
      </main>
      <Footer />
    </div>
  );
}