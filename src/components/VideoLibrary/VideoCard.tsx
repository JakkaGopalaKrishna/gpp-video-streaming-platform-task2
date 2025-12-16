import Link from "next/link";
import Image from "next/image";
import { Video } from "@/data/videos";
import React from "react";

interface Props {
  video: Video;
  view: "grid" | "list";
}

function VideoCard({ video, view }: Props) {
  return (
    <Link
      href={`/video/${video.id}`}
      className={`video-card ${view}`}
      aria-label={`Open video ${video.title}`}
    >
      <Image
        src={video.thumbnail}
        alt={video.title}
        width={view === "grid" ? 280 : 200}
        height={170}
        loading="lazy"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <div className="video-info">
        <h3>{video.title}</h3>
        <p>{video.description}</p>
        <span>{video.duration}</span>
      </div>
    </Link>
  );
}

export default React.memo(VideoCard);
