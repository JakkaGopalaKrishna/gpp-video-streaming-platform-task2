import Image from "next/image";
import { Video } from "@/data/videos";

interface Props {
  video: Video;
  view: "grid" | "list";
}

export default function VideoCard({ video, view }: Props) {
  return (
    <div
      className={`video-card ${view}`}
      tabIndex={0}
      aria-label={`Video ${video.title}`}
    >
      <Image
        src={video.thumbnail}
        alt={video.title}
        width={view === "grid" ? 300 : 180}
        height={170}
        loading="lazy"
      />
      <div>
        <h3>{video.title}</h3>
        <p>{video.description}</p>
        <span>{video.duration}</span>
      </div>
    </div>
  );
}
