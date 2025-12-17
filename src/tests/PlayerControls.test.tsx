import { render, screen } from "@testing-library/react";
import PlayerControls from "@/components/PlayerControls/PlayerControls";

describe("PlayerControls", () => {
  test("renders play button with aria-label", () => {
    render(
      <PlayerControls
        isPlaying={false}
        currentTime={0}
        duration={100}
        volume={1}
        isMuted={false}
        quality={""}
        currentQuality={-1}
        onPlayPause={() => {}}
        onSeek={() => {}}
        onVolumeChange={() => {}}
        onMuteToggle={() => {}}
        onQualityChange={() => {}}
      />
    );

    // ✅ Test accessibility, not text
    const playButton = screen.getByRole("button", {
      name: /play/i,
    });

    expect(playButton).toBeInTheDocument();
  });
});
