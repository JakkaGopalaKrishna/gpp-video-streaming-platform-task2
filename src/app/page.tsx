import VideoLibrary from "@/components/VideoLibrary/VideoLibrary";
import ContinueWatching from "@/components/VideoLibrary/ContinueWatching";
import PlaylistView from "@/components/Playlist/PlaylistView";
import WatchHistory from "@/components/VideoLibrary/WatchHistory";

export default function Home() {
  return (
    <main>
      <div className="page-container">
      <h1>Video Streaming Platform</h1>
      <PlaylistView />
      <h1>List of Videos</h1>
      <VideoLibrary />
      <ContinueWatching />
      <WatchHistory />
      </div>
    </main>
  );
}
