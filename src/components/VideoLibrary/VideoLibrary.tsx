"use client";

import { useState } from "react";
import { videos } from "@/data/videos";
import VideoCard from "./VideoCard";

export default function VideoLibrary() {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <section>
      <header>
        <button onClick={() => setView("grid")}>Grid</button>
        <button onClick={() => setView("list")}>List</button>
      </header>

      <div className={`library ${view}`}>
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} view={view} />
        ))}
      </div>
    </section>
  );
}
