"use client";

import { IconPlayerPlay, IconPlayerPause } from "@tabler/icons-react";

interface Props {
  isPlaying: boolean;
  onPlayPause: () => void;
}

export default function PlayerControls({ isPlaying, onPlayPause }: Props) {
  return (
    <div className="player-controls">
      <button
        onClick={onPlayPause}
        aria-label={isPlaying ? "Pause video" : "Play video"}
        className="control-btn"
      >
        {isPlaying ? <IconPlayerPause size={24} /> : <IconPlayerPlay size={24} />}
      </button>
    </div>
  );
}
