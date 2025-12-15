"use client";

import { IconPlayerPlay, IconPlayerPause } from "@tabler/icons-react";

interface Props {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onPlayPause: () => void;
  onSeek: (time: number) => void;
}

export default function PlayerControls({
  isPlaying,
  currentTime,
  duration,
  onPlayPause,
  onSeek,
}: Props) {
  return (
    <div className="player-controls">
      <button
        onClick={onPlayPause}
        aria-label={isPlaying ? "Pause video" : "Play video"}
        className="control-btn"
      >
        {isPlaying ? <IconPlayerPause size={22} /> : <IconPlayerPlay size={22} />}
      </button>

      <input
        type="range"
        min={0}
        max={duration || 0}
        value={currentTime}
        onChange={(e) => onSeek(Number(e.target.value))}
        className="seek-bar"
        aria-label="Seek video"
      />

      <span className="time">
        {formatTime(currentTime)} / {formatTime(duration)}
      </span>
    </div>
  );
}

function formatTime(seconds: number) {
  if (!seconds) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
