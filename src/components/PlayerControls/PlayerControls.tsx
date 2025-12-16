"use client";

import {
  IconPlayerPlay,
  IconPlayerPause,
  IconVolume,
  IconVolumeOff,
  IconMaximize,
  IconMinimize,
  IconPictureInPicture,
  IconPictureInPictureOff,
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
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  playbackRate: number;
  onPlaybackRateChange: (rate: number) => void;
  isPiP: boolean;
  onTogglePiP: () => void;
  
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
  isFullscreen,
  onToggleFullscreen,
  playbackRate,
  onPlaybackRateChange,
  isPiP,
  onTogglePiP
}: Props) {
  return (
    <div className="player-controls"  role="group"
    aria-label="Video player controls">
    {/* Left controls */}
    <span className="sr-only" aria-live="polite">
      {isPlaying ? "Video playing" : "Video paused"}
    </span>

    <div className="controls-left">
      <button onClick={onPlayPause} className="control-btn" aria-label={isPlaying ? "Pause video" : "Play video"} >
        {isPlaying ? <IconPlayerPause size={22} /> : <IconPlayerPlay size={22} />}
      </button>
  
      <span className="time">{formatTime(currentTime)}</span>
    </div>
  
    {/* Center seek bar */}
    <div className="controls-center">
      <input
        type="range"
        min={0}
        max={duration || 0}
        value={currentTime}
        onChange={(e) => onSeek(Number(e.target.value))}
        className="seek-bar"
        aria-label="Seek video"
      />
    </div>
  
    {/* Right controls */}
    <div className="controls-right">
      <span className="time">{formatTime(duration)}</span>
  
      <button onClick={onMuteToggle} className="control-btn" aria-label={isPlaying ? "mute" : "Unmute"}>
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
  
      <select
        value={playbackRate}
        onChange={(e) => onPlaybackRateChange(Number(e.target.value))}
        className="select"
      >
        <option value={0.5}>0.5x</option>
        <option value={0.75}>0.75x</option>
        <option value={1}>1x</option>
        <option value={1.25}>1.25x</option>
        <option value={1.5}>1.5x</option>
        <option value={2}>2x</option>
      </select>
  
      <select
        value={quality}
        onChange={(e) => onQualityChange(e.target.value)}
        className="select"
      >
        <option value="360p">360p</option>
        <option value="480p">480p</option>
        <option value="720p">720p</option>
      </select>
  
      <button onClick={onTogglePiP} className="control-btn" aria-label={isPlaying ? "unPiP" : "PiP"}>
        {isPiP ? <IconPictureInPictureOff size={20} /> : <IconPictureInPicture size={20} />}
      </button>
  
      <button onClick={onToggleFullscreen} className="control-btn" aria-label={isPlaying ? "Fullscreen exit" : "Fullscreen"}>
        {isFullscreen ? <IconMinimize size={20} /> : <IconMaximize size={20} />}
      </button>
    </div>
  </div>  
  );
}

function formatTime(seconds: number) {
  if (!seconds) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
