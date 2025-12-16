"use client";

import { useState } from "react";
import { usePlaylistStore } from "@/store/playlistStore";

export default function PlaylistPanel({ videoId }: { videoId: string }) {
  const [name, setName] = useState("");
  const {
    playlists,
    addPlaylist,
    addVideoToPlaylist,
  } = usePlaylistStore();

  return (
    <div>
      <h3>Playlists</h3>

      <input
        value={name}
        placeholder="New playlist name"
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={() => {
          if (!name) return;
          addPlaylist(name);
          setName("");
        }}
      >
        Create
      </button>

      <ul>
        {playlists.map((p) => (
          <li key={p.id}>
            {p.name}
            <button onClick={() => addVideoToPlaylist(p.id, videoId)}>
              Add
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
