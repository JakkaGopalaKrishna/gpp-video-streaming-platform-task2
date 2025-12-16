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

  quality: string;
  onQualityChange: (quality: string) => void;

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
  quality,
  onQualityChange,
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
      <label htmlFor="quality" className="quality-label">
        Quality:
      </label>
      <select
        id="quality"
        value={quality}
        onChange={(e) => onQualityChange(e.target.value)}
        className="quality-select"
      >
        <option value="360p">360p</option>
        <option value="480p">480p</option>
        <option value="720p">720p</option>
      </select>
    </div>
  );
}

function formatTime(seconds: number) {
  if (!seconds) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
