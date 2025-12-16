"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import PlayerControls from "@/components/PlayerControls/PlayerControls";
import { usePlayerStore } from "@/store/playerStore";

interface Props {
  src: string;
}

export default function VideoPlayer({ src }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  // const [isPlaying, setIsPlaying] = useState(false);
  // const [currentTime, setCurrentTime] = useState(0);
  // const [duration, setDuration] = useState(0);
  // const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  // const [playbackRate, setPlaybackRate] = useState(1);
  const [isPiP, setIsPiP] = useState(false);
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    playbackRate,
    setIsPlaying,
    setCurrentTime,
    setDuration,
    setVolume,
    setPlaybackRate,
  } = usePlayerStore();
  
  // ✅ Quality state (default 360p)
  const [quality, setQuality] = useState("360p");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    } else if (Hls.isSupported()) {
      hls = new Hls();
      hlsRef.current = hls;

      hls.loadSource(src);
      hls.attachMedia(video);

      // Set default quality once manifest is loaded
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setHlsQuality("360p");
      });
    }

    video.volume = volume;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    const onLoadedMetadata = () => setDuration(video.duration);
    const onVolumeChange = () => setVolume(video.volume);
    // const onTimeUpdate = () => setCurrentTime(video.currentTime);
    // const onLoadedMetadata = () => setDuration(video.duration);
    // const onVolumeChange = () => {
    //   setVolume(video.volume);
    //   setIsMuted(video.muted);
    // };

    const playPause = () => {
      const v = videoRef.current;
      if (!v) return;
      v.paused ? v.play() : v.pause();
    };
    const changeVolume = (v: number) => {
      if (!videoRef.current) return;
      videoRef.current.volume = v;
      setVolume(v);
    };
    const handlePlaybackRateChange = (rate: number) => {
      if (!videoRef.current) return;
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    };
    
    
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("volumechange", onVolumeChange);

    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);

    const onEnterPiP = () => setIsPiP(true);
    const onLeavePiP = () => setIsPiP(false);
    videoRef.current?.addEventListener("enterpictureinpicture", onEnterPiP);
    videoRef.current?.addEventListener("leavepictureinpicture", onLeavePiP);

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("volumechange", onVolumeChange);
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      videoRef.current?.removeEventListener("enterpictureinpicture", onEnterPiP);
      videoRef.current?.removeEventListener("leavepictureinpicture", onLeavePiP);
      if (hls) hls.destroy();
    };
  }, [src]);

  // ✅ Map dropdown → HLS level
  const setHlsQuality = (q: string) => {
    const hls = hlsRef.current;
    if (!hls) return;

    const heightMap: Record<string, number> = {
      "360p": 360,
      "480p": 480,
      "720p": 720,
    };

    const levelIndex = hls.levels.findIndex(
      (level) => level.height === heightMap[q]
    );

    if (levelIndex !== -1) {
      hls.currentLevel = levelIndex;
      setQuality(q);
    }
  };

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    video.paused ? video.play() : video.pause();
  };

  const handleSeek = (time: number) => {
    if (videoRef.current) videoRef.current.currentTime = time;
  };

  const handleVolumeChange = (value: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = value;
    video.muted = value === 0;
    setVolume(value);
  };

  const handleMuteToggle = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleFullscreen = () => {
    const player = videoRef.current?.parentElement;
    if (!player) return;
  
    if (!document.fullscreenElement) {
      player.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handlePlaybackRateChange = (rate: number) => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
  };
  const togglePiP = async () => {
    const video = videoRef.current;
    if (!video) return;
  
    try {
      if (!document.pictureInPictureElement) {
        await video.requestPictureInPicture();
        setIsPiP(true);
      } else {
        await document.exitPictureInPicture();
        setIsPiP(false);
      }
    } catch (err) {
      console.warn("PiP not supported", err);
    }
  };

  return (
    <div className="video-player">
      <video
        ref={videoRef}
        className="video-element"
        preload="metadata"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.code === "Space") {
            e.preventDefault();
            handlePlayPause();
          }
          if (e.code === "KeyM") {
            handleMuteToggle();
          }
        }}
      />

      <PlayerControls
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        isMuted={isMuted}
        quality={quality}
        onQualityChange={setHlsQuality}
        onPlayPause={handlePlayPause}
        onSeek={handleSeek}
        onVolumeChange={handleVolumeChange}
        onMuteToggle={handleMuteToggle}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        playbackRate={playbackRate}
        onPlaybackRateChange={handlePlaybackRateChange}
        isPiP={isPiP}
        onTogglePiP={togglePiP}
      />
    </div>
  );
}
