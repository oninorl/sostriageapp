import { calendar, campaign, type CalendarItem } from "./calendar";
import { posts } from "./posts";
import { scripts } from "./scripts";

function assetLabel(item: CalendarItem) {
  if (item.asset.type === "post") {
    const p = posts.find((x) => x.id === item.asset.id);
    return p ? `Post ${p.id} · ${p.theme}` : "Post";
  }
  if (item.asset.type === "script") {
    const s = scripts.find((x) => x.id === item.asset.id);
    return s ? s.title : "Video script";
  }
  return "Engagement day";
}

export default function CampaignCalendar() {
  const postCount = calendar.filter((c) => c.asset.type === "post").length;
  const videoCount = calendar.filter((c) => c.asset.type === "script").length;
  const otherCount = calendar.filter((c) => c.asset.type === "none").length;

  return (
    <section className="mb-16">
      <h2 className="text-lg font-semibold mb-2 text-white">Campaign Calendar</h2>
      <p className="text-sm text-gray-400 mb-4">
        A 14-day plan that uses the posts and video scripts above:{" "}
        {postCount} posts, {videoCount} videos, and {otherCount} engagement day.
      </p>

      <div className="border border-gray-700 rounded-md p-4 mb-6 space-y-2">
        {campaign.map((c) => (
          <p key={c.label} className="text-sm text-gray-300">
            <span className="font-semibold text-white">{c.label}: </span>
            {c.text}
          </p>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left border-b border-gray-700">
              <th className="py-2 pr-4 text-white">Day</th>
              <th className="py-2 pr-4 text-white">Phase</th>
              <th className="py-2 pr-4 text-white">Asset</th>
              <th className="py-2 pr-4 text-white">Channel</th>
              <th className="py-2 pr-4 text-white">Goal</th>
              <th className="py-2 text-white">What to check</th>
            </tr>
          </thead>
          <tbody>
            {calendar.map((item) => (
              <tr key={item.day} className="border-b border-gray-800 align-top">
                <td className="py-2 pr-4 font-medium text-gray-100">{item.day}</td>
                <td className="py-2 pr-4 text-gray-400">{item.phase}</td>
                <td className="py-2 pr-4 text-gray-100">{assetLabel(item)}</td>
                <td className="py-2 pr-4 text-gray-300">{item.channel}</td>
                <td className="py-2 pr-4 text-gray-300">{item.goal}</td>
                <td className="py-2 text-gray-500">{item.check}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}