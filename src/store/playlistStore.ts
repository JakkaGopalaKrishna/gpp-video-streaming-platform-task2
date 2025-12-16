import { create } from "zustand";

interface Playlist {
  id: string;
  name: string;
  videos: string[]; // video IDs
}

interface PlaylistState {
  playlists: Playlist[];

  addPlaylist: (name: string) => void;
  removePlaylist: (id: string) => void;
  addVideoToPlaylist: (playlistId: string, videoId: string) => void;
  removeVideoFromPlaylist: (playlistId: string, videoId: string) => void;
}

const loadPlaylists = (): Playlist[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("playlists");
  return data ? JSON.parse(data) : [];
};

export const usePlaylistStore = create<PlaylistState>((set, get) => ({
  playlists: loadPlaylists(),

  addPlaylist: (name) =>
    set((state) => {
      const newPlaylists = [
        ...state.playlists,
        { id: Date.now().toString(), name, videos: [] },
      ];
      localStorage.setItem("playlists", JSON.stringify(newPlaylists));
      return { playlists: newPlaylists };
    }),

  removePlaylist: (id) =>
    set((state) => {
      const newPlaylists = state.playlists.filter((p) => p.id !== id);
      localStorage.setItem("playlists", JSON.stringify(newPlaylists));
      return { playlists: newPlaylists };
    }),

  addVideoToPlaylist: (playlistId, videoId) =>
    set((state) => {
      const updated = state.playlists.map((p) =>
        p.id === playlistId && !p.videos.includes(videoId)
          ? { ...p, videos: [...p.videos, videoId] }
          : p
      );
      localStorage.setItem("playlists", JSON.stringify(updated));
      return { playlists: updated };
    }),

  removeVideoFromPlaylist: (playlistId, videoId) =>
    set((state) => {
      const updated = state.playlists.map((p) =>
        p.id === playlistId
          ? { ...p, videos: p.videos.filter((v) => v !== videoId) }
          : p
      );
      localStorage.setItem("playlists", JSON.stringify(updated));
      return { playlists: updated };
    }),
}));
