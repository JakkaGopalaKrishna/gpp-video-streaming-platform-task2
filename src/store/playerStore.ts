import { create } from "zustand";

interface PlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackRate: number;

  setIsPlaying: (value: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (time: number) => void;
  setVolume: (value: number) => void;
  setPlaybackRate: (rate: number) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  playbackRate: 1,

  setIsPlaying: (value) => set({ isPlaying: value }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (time) => set({ duration: time }),
  setVolume: (value) => set({ volume: value }),
  setPlaybackRate: (rate) => set({ playbackRate: rate }),
}));
