import SocialPosts from "./SocialPosts";
import VideoScripts from "./VideoScripts";
import CampaignCalendar from "./CampaignCalendar";
import AbResults from "./AbResults";
import SavedAssets from "./SavedAssets";

export const contentSections = [
  { id: "social-posts", Component: SocialPosts },
  { id: "video-scripts", Component: VideoScripts },
  { id: "campaign-calendar", Component: CampaignCalendar },
  { id: "ab-results", Component: AbResults },
  { id: "saved-assets", Component: SavedAssets },
];