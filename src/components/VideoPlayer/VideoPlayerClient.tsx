"use client";

import dynamic from "next/dynamic";

const VideoPlayer = dynamic(
  () => import("./VideoPlayer"),
  {
    ssr: false,
    loading: () => <p>Loading player...</p>,
  }
);

export default VideoPlayer;
