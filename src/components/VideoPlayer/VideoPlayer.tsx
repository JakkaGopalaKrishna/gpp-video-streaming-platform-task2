"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import PlayerControls from "@/components/PlayerControls/PlayerControls";

interface Props {
  src: string;
}

export default function VideoPlayer({ src }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    } else if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: true });
      hls.loadSource(src);
      hls.attachMedia(video);
    }

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      if (hls) hls.destroy();
    };
  }, [src]);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div className="video-player">
      <video 
        ref={videoRef} 
        className="video-element" 
        preload="metadata" 
        onKeyDown={(e) => {
          if (e.code === "Space") {
            e.preventDefault();
            handlePlayPause();
          }
        }}
        tabIndex={0}        
      />
      <PlayerControls
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
      />
    </div>
  );
}
