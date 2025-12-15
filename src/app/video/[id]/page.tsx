import { videos } from "@/data/videos";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function VideoPage({ params }: Props) {
    console.log("params.id");
    // console.log(params.id);
    const { id } = await params;
  const video = videos.find((v) => v.id === id);
//   const video = videos.find((v) => v.id == "1");

  if (!video) return notFound();

  return (
    <main className="video-page">
      <h1>{video.title}</h1>
      <p className="description">{video.description}</p>

      {/* Video Player will be added in PHASE 3 */}
      <div className="player-placeholder">
        <p>🎬 Video Player Coming Next</p>
      </div>

      <section className="comments">
        <h2>Comments</h2>
        <p>No comments yet (mock).</p>
      </section>
    </main>
  );
}
