"use client";

import { useState } from "react";
import { videos } from "@/data/videos";
import VideoCard from "./VideoCard";

export default function VideoLibrary() {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <section>
      <header className="library-header">
        <button
            className={view === "grid" ? "active" : ""}
            onClick={() => setView("grid")}
        >
            Grid View
        </button>
        <button
            className={view === "list" ? "active" : ""}
            onClick={() => setView("list")}
        >
            List View
        </button>
      </header>

      <div className={`library ${view}`}>
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} view={view} />
        ))}
      </div>
    </section>
  );
}
