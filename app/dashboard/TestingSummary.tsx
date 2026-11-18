import { regression, testers, type Tester } from "./testing";

type Props = {
  liveUp: number;
  liveDown: number;
};

const target = 5;

function ratingIcon(rating: Tester["rating"]) {
  if (rating === "up") return "👍";
  if (rating === "down") return "👎";
  return "—";
}

function yesNo(value: boolean) {
  return value ? "Yes" : "No";
}

function regressionBadge() {
  if (regression.status === "passed") {
    return {
      text: `Regression test: passed (${regression.passed} of ${regression.total} checks)`,
      style: "border-green-700 bg-green-950/40 text-green-300",
    };
  }
  if (regression.status === "failed") {
    return {
      text: `Regression test: ${regression.total - regression.passed} of ${regression.total} checks failed`,
      style: "border-red-700 bg-red-950/40 text-red-300",
    };
  }
  return {
    text: "Regression test: not run yet",
    style: "border-gray-600 bg-gray-900 text-gray-300",
  };
}

export default function TestingSummary({ liveUp, liveDown }: Props) {
  const week6 = testers.filter((t) => t.week === 6);
  const listedUp = testers.filter((t) => t.rating === "up").length;
  const listedDown = testers.filter((t) => t.rating === "down").length;
  const issues = testers.filter(
    (t) => t.issueFound && t.issueFound.toLowerCase() !== "none"
  );
  const fixed = issues.filter((t) => t.fix && t.fix !== "—");
  const badge = regressionBadge();

  return (
    <section className="mb-10">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <h2 className="text-lg font-semibold text-white">Testing Summary</h2>
        <span className={`border rounded-md px-3 py-1 text-xs ${badge.style}`}>{badge.text}</span>
      </div>
      <p className="text-sm text-gray-400 mb-1">
        External users are people who are not in this class. Names are never stored.
      </p>
      <p className="text-sm text-gray-300 mb-4">
        Week 6 target: {target} external users. Recorded so far: {week6.length} of {target}.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left border-b border-gray-700">
              <th className="py-2 pr-4 text-white">Tester</th>
              <th className="py-2 pr-4 text-white">Week</th>
              <th className="py-2 pr-4 text-white">Who</th>
              <th className="py-2 pr-4 text-white">Device</th>
              <th className="py-2 pr-4 text-white">Finished</th>
              <th className="py-2 pr-4 text-white">Understood</th>
              <th className="py-2 pr-4 text-white">Rating</th>
              <th className="py-2 pr-4 text-white">Issue found</th>
              <th className="py-2 text-white">Fix</th>
            </tr>
          </thead>
          <tbody>
            {testers.map((t) => (
              <tr key={t.id} className="border-b border-gray-800 align-top">
                <td className="py-2 pr-4 font-medium text-gray-100">{t.id}</td>
                <td className="py-2 pr-4 text-gray-300">W{t.week}</td>
                <td className="py-2 pr-4 text-gray-300">{t.who}</td>
                <td className="py-2 pr-4 text-gray-300">{t.device}</td>
                <td className="py-2 pr-4 text-gray-300">{yesNo(t.finished)}</td>
                <td className="py-2 pr-4 text-gray-300">{yesNo(t.understood)}</td>
                <td className="py-2 pr-4 text-gray-300">{ratingIcon(t.rating)}</td>
                <td className="py-2 pr-4 text-gray-300">{t.issueFound}</td>
                <td className="py-2 text-gray-400">{t.fix}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-gray-300 mt-4">
        Issues found by testers: {issues.length}. Fixed: {fixed.length}.
      </p>
      <p className="text-xs text-gray-500 mt-2">
        Ratings in this table: {listedUp} up, {listedDown} down. Ratings stored in Supabase
        (chat_feedback): {liveUp} up, {liveDown} down. Supabase also holds ratings from my own
        development tests, so its totals can be higher.
      </p>
    </section>
  );
}