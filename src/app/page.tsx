import VideoLibrary from "@/components/VideoLibrary/VideoLibrary";
import ContinueWatching from "@/components/VideoLibrary/ContinueWatching";

export default function Home() {
  return (
    <main>
      <h1>Video Streaming Platform</h1>
      <VideoLibrary />
      <ContinueWatching />

    </main>
  );
}
