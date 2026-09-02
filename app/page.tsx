import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 px-6 py-12">
        <h1 className="text-3xl font-bold">SOS Triage</h1>
        <p className="text-gray-600 mt-2 max-w-xl">
          AI-powered first medical intake for travelers abroad — faster
          access to a doctor, shorter wait times, less workload for
          emergency call centers.
        </p>
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Project Roadmap</h2>
          <ul className="space-y-2 text-gray-700">
            <li>Week 0 — Setup: infrastructure, homepage, deploy ✅</li>
            <li>Week 1 — Generative Core: AI intake & triage output</li>
            <li>Week 2+ — Expansion: dashboard, insurer integration</li>
            <li>Module 6 — Validation & impact</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}