import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Walkthrough from "./Walkthrough";

export default function DemoPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 px-6 py-12 max-w-4xl mx-auto w-full text-gray-100">
        <p className="text-sm text-blue-400 mb-1">DEMO</p>
        <h1 className="text-2xl font-bold mb-2 text-white">Guided Demo</h1>
        <p className="text-sm text-gray-400 mb-4">
          A step-by-step tour of the SOS Triage prototype, from the problem to the dashboard.
        </p>
        <p className="border border-yellow-700 bg-yellow-950/30 text-yellow-200 text-sm rounded-md px-3 py-2 mb-8">
          Simulated student demo. Not medical advice. SOS Triage is not affiliated with SOS
          International or any insurer.
        </p>

        <Walkthrough />
      </main>
      <Footer />
    </div>
  );
}