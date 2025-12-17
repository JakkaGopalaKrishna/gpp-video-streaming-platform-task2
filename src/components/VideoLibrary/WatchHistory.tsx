"use client";

import Link from "next/link";

export default function WatchHistory() {
  if (typeof window === "undefined") return null;

  const history = JSON.parse(
    localStorage.getItem("watchHistory") || "[]"
  );

  if (history.length === 0) {
    return <p>No watch history yet.</p>;
  }

  return (
    <section className="section">
      <h2>Watch History</h2>

      <ul>
        {history.map((item: any) => (
          <li key={item.videoId}>
            <Link href={`/video/${item.videoId}`}>
              {item.videoId}
            </Link>
            {" — "}
            {Math.floor(item.time)} sec
          </li>
        ))}
      </ul>
    </section>
  );
}
