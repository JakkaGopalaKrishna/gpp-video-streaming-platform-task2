"use client";

import { videos } from "@/data/videos";
import Link from "next/link";

export default function ContinueWatching() {
  if (typeof window === "undefined") return null;

  const data = localStorage.getItem("continueWatching");
  if (!data) return null;

  const { videoId } = JSON.parse(data);
  const video = videos.find((v) => v.hlsUrl === videoId);
  if (!video) return null;

  return (
    <section>
      <h2>Continue Watching</h2>
      <Link href={`/video/${video.id}`}>{video.title}</Link>
    </section>
  );
}
