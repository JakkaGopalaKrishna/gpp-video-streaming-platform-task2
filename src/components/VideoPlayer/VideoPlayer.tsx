"use client";

import { useRef } from "react";

interface Props {
  src: string;
}

export default function VideoPlayer({ src }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="video-player">
      <video
        ref={videoRef}
        src={src}
        controls={false}
        preload="metadata"
        className="video-element"
      />
    </div>
  );
}
