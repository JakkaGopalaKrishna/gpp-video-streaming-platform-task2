"use client";

import {
  IconPlayerPlay,
  IconPlayerPause,
  IconVolume,
  IconVolumeOff,
} from "@tabler/icons-react";

interface Props {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  onPlayPause: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (value: number) => void;
  onMuteToggle: () => void;
}

export default function PlayerControls({
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  onPlayPause,
  onSeek,
  onVolumeChange,
  onMuteToggle,
}: Props) {
  return (
    <div className="player-controls">
      <button
        onClick={onPlayPause}
        className="control-btn"
        aria-label={isPlaying ? "Pause video" : "Play video"}
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
      />

      <span className="time">
        {formatTime(currentTime)} / {formatTime(duration)}
      </span>

      <button
        onClick={onMuteToggle}
        className="control-btn"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <IconVolumeOff size={20} /> : <IconVolume size={20} />}
      </button>

      <input
        type="range"
        min={0}
        max={1}
        step={0.05}
        value={volume}
        onChange={(e) => onVolumeChange(Number(e.target.value))}
        className="volume-slider"
        aria-label="Volume"
      />
    </div>
  );
}

function formatTime(seconds: number) {
  if (!seconds) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
