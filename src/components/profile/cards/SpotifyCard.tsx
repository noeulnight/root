import { useEffect, useMemo, useRef, useState } from "react";
import { endOfDay, startOfDay } from "date-fns";
import { Card } from "../../ui/card";
import { InteractiveCardLink } from "./InteractiveCardLink";
import { useSpotifyTopSongs } from "../../../hooks/useSpotifyTopSongs";

type SpotifyCardProps = {
  order: number;
};

export function SpotifyCard({ order }: SpotifyCardProps) {
  const todayRange = useMemo(() => {
    const now = new Date();
    return {
      start: startOfDay(now),
      end: endOfDay(now),
    };
  }, []);

  const { topSong } = useSpotifyTopSongs({
    start: todayRange.start,
    end: todayRange.end,
    nb: 1,
    offset: 0,
  });
  const coverImage = topSong?.album?.images?.[0]?.url ?? "/spotify-cover.jpg";
  const trackName = topSong?.track?.name ?? "Spotify Pick";
  const marqueeViewportRef = useRef<HTMLDivElement>(null);
  const marqueeTextRef = useRef<HTMLSpanElement>(null);
  const [shouldMarquee, setShouldMarquee] = useState(false);

  useEffect(() => {
    const viewport = marqueeViewportRef.current;
    const text = marqueeTextRef.current;
    if (!viewport || !text) return;

    const updateMarqueeState = () => {
      setShouldMarquee(text.scrollWidth > viewport.clientWidth + 4);
    };

    updateMarqueeState();

    const observer = new ResizeObserver(updateMarqueeState);
    observer.observe(viewport);
    observer.observe(text);
    window.addEventListener("resize", updateMarqueeState);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateMarqueeState);
    };
  }, [trackName]);

  return (
    <InteractiveCardLink
      mode="external"
      href="https://spotify.lth.so"
      className="block w-full h-full aspect-square rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:col-span-4"
      ariaLabel="Spotify"
      order={order}
    >
      <Card className="h-full gap-0 overflow-hidden py-0 transition-shadow duration-200 hover:shadow-md">
        <div className="relative h-full w-full">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 p-4">
            <p className="inline-flex max-w-full text-sm font-semibold tracking-tight text-white">
              Daily Music Pick
            </p>
          </div>
          <img
            src={coverImage}
            alt="Currently playing album cover"
            className="h-full w-full object-cover brightness-75"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
            <div ref={marqueeViewportRef} className="spotify-marquee">
              <div
                className={`text-sm font-semibold tracking-tight text-white ${
                  shouldMarquee ? "spotify-marquee-track" : ""
                }`}
              >
                <span ref={marqueeTextRef}>{trackName}</span>
                {shouldMarquee ? (
                  <span aria-hidden="true">{trackName}</span>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </InteractiveCardLink>
  );
}
