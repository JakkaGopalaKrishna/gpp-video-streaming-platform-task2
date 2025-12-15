export interface Video {
    id: string;
    title: string;
    description: string;
    duration: string;
    thumbnail: string;
    hlsUrl: string;
  }
  
  export const videos: Video[] = [
    {
      id: "1",
      title: "Big Buck Bunny",
      description: "Sample HLS video for testing adaptive streaming.",
      duration: "9:56",
      thumbnail: "/thumbnails/bunny.jpg",
      hlsUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    },
    {
      id: "2",
      title: "Sintel Trailer",
      description: "Open movie project trailer in HLS format.",
      duration: "3:21",
      thumbnail: "/thumbnails/sintel.jpg",
      hlsUrl: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
    },
  ];
  