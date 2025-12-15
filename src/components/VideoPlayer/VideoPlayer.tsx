"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";

interface Props {
  src: string;
}

export default function VideoPlayer({ src }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    // Safari / native HLS
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }
    // Other browsers
    else if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });

      hls.loadSource(src);
      hls.attachMedia(video);
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  return (
    <div className="video-player">
      <video
        ref={videoRef}
        controls
        autoPlay
        className="video-element"
        preload="metadata"
      />
    </div>
  );
}
