import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PromptCard from "./PromptCard";
import { prompts } from "./promptLibrary";
import { logs } from "./buildLogs";

export default function DocsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 px-6 py-12 max-w-4xl mx-auto w-full text-gray-100">
        <p className="text-sm text-blue-400 mb-1">DOCS</p>
        <h1 className="text-2xl font-bold mb-2 text-white">Documentation</h1>
        <p className="text-sm text-gray-400 mb-10">
          Prompts and build logs for SOS Triage. SOS Triage is a student-built prototype that
          simulates an AI-assisted first medical intake for travelers abroad. It is a demo, not a
          real medical product, and it is not affiliated with SOS International or any insurer.
        </p>

        {/* Prompt library */}
        <section className="mb-16">
          <h2 className="text-xl font-bold mb-2 text-white">Prompt Library</h2>
          <p className="text-sm text-gray-400 mb-6">
            The coding-agent prompt of each week, taken from that week&apos;s Build Discipline
            Packet. The product itself uses no language-model prompts: it asks fixed questions and
            follows keyword rules.
          </p>
          <div className="grid gap-4">
            {prompts.map((p) => (
              <PromptCard
                key={p.week}
                week={p.week}
                title={p.title}
                built={p.built}
                note={p.note}
                prompt={p.prompt}
              />
            ))}
          </div>
        </section>

        {/* Build logs */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2 text-white">Build Logs</h2>
          <p className="text-sm text-gray-400 mb-4">
            What was built each week and what was fixed or decided along the way. The full commit
            history is on{" "}
            <a
              href="https://github.com/oninorl/sostriageapp/commits/main"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              GitHub
            </a>
            .
          </p>

          <ol className="flex flex-wrap gap-2 mb-8">
            {logs.map((l) => (
              <li key={l.week}>
                <a
                  href={`#week-${l.week}`}
                  className="inline-block border border-gray-600 text-gray-200 rounded-md px-3 py-1 text-sm hover:border-blue-500"
                >
                  W{l.week}
                </a>
              </li>
            ))}
          </ol>

          <div className="space-y-6">
            {logs.map((l) => (
              <article
                key={l.week}
                id={`week-${l.week}`}
                className="border border-gray-700 rounded-md p-4 scroll-mt-6"
              >
                <p className="text-xs text-blue-400 mb-1">WEEK {l.week}</p>
                <h3 className="font-semibold text-white mb-3">{l.title}</h3>

                <p className="text-sm font-semibold text-gray-200 mb-1">Built</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300 mb-3">
                  {l.built.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <p className="text-sm font-semibold text-gray-200 mb-1">Fixed and decided</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                  {l.decided.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}