import { videos } from "@/data/videos";
import { notFound } from "next/navigation";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayerClient";
import PlaylistPanel from "@/components/Playlist/PlaylistPanel";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function VideoPage({ params }: Props) {
  const { id } = await params;
  const video = videos.find((v) => v.id === id);

  if (!video) return notFound();

  return (
    <main className="video-page">
      <h1>{video.title}</h1>
      <p className="description">{video.description}</p>

      <VideoPlayer src={video.hlsUrl} />


      <section className="comments">
        <h2>Comments</h2>
        <p>No comments yet (mock).</p>
      </section>
      <PlaylistPanel videoId={video.id} />

    </main>
  );
}
