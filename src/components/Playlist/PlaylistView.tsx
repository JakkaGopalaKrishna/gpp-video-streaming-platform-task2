"use client";

import { usePlaylistStore } from "@/store/playlistStore";
import Link from "next/link";

export default function PlaylistView() {
  const { playlists, removeVideoFromPlaylist } = usePlaylistStore();

  if (playlists.length === 0) {
    return <p>No playlists created.</p>;
  }

  return (
    <div className="section">
      <h2>Your Playlists</h2>

      {playlists.map((playlist) => (
        <div key={playlist.id} style={{ marginBottom: "20px" }}>
          <h3>{playlist.name}</h3>

          {playlist.videos.length === 0 ? (
            <p>No videos in this playlist.</p>
          ) : (
            <ul>
              {playlist.videos.map((videoId) => (
                <li key={videoId}>
                  <Link href={`/video/${videoId}`}>{videoId}</Link>
                  {"  "}
                  <button
                    onClick={() =>
                      removeVideoFromPlaylist(playlist.id, videoId)
                    }
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
