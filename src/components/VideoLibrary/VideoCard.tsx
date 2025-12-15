import Link from "next/link";
import Image from "next/image";
import { Video } from "@/data/videos";

interface Props {
  video: Video;
  view: "grid" | "list";
}

export default function VideoCard({ video, view }: Props) {
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
      />
      <div className="video-info">
        <h3>{video.title}</h3>
        <p>{video.description}</p>
        <span>{video.duration}</span>
      </div>
    </Link>
  );
}
