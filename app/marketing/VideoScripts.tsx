import AssetCard from "./AssetCard";
import { scripts } from "./scripts";

export default function VideoScripts() {
  return (
    <section className="mb-16">
      <h2 className="text-lg font-semibold mb-2 text-white">Video Scripts</h2>
      <p className="text-sm text-gray-400 mb-4">
        Three short scripts for insurers. They use screen recordings of the real demo, with
        no actors and no invented patients. Nothing has been recorded or published.
      </p>
      <div className="grid gap-4">
        {scripts.map((s) => (
          <AssetCard key={s.id} title={s.title} text={s.text} />
        ))}
      </div>
    </section>
  );
}