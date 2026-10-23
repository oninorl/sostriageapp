import AssetCard from "./AssetCard";
import { posts } from "./posts";

export default function SocialPosts() {
  return (
    <section className="mb-16">
      <h2 className="text-lg font-semibold mb-2 text-white">Social Posts</h2>
      <p className="text-sm text-gray-400 mb-4">
        Ten LinkedIn drafts for the insurer persona. They belong to a simulated campaign:
        nothing has been published.
      </p>
      <div className="grid gap-4">
        {posts.map((p) => (
          <AssetCard
            key={p.id}
            assetType="social_post"
            title={`Post ${p.id} · Day ${p.day} · ${p.platform} · ${p.theme}`}
            text={p.text}
          />
        ))}
      </div>
    </section>
  );
}