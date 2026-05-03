import { useEffect, useMemo, useRef, useState } from "react";
import { endOfDay, startOfDay, subDays } from "date-fns";
import { AnimatePresence, motion } from "motion/react";
import { ExternalLink, Music2, X } from "lucide-react";
import { Card } from "../../ui/card";
import {
  useSpotifyTopSongs,
  type SpotifyTopSong,
} from "../../../hooks/useSpotifyTopSongs";
import { cardHoverTransition, cardItemVariants } from "./motion";

type SpotifyCardProps = {
  order: number;
};

export function SpotifyCard({ order }: SpotifyCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const todayRange = useMemo(() => {
    const now = new Date();
    return {
      start: startOfDay(now),
      end: endOfDay(now),
    };
  }, []);
  const weeklyRange = useMemo(() => {
    const now = new Date();
    return {
      start: startOfDay(subDays(now, 6)),
      end: endOfDay(now),
    };
  }, []);

  const { topSong } = useSpotifyTopSongs({
    start: todayRange.start,
    end: todayRange.end,
    nb: 1,
    offset: 0,
  });
  const {
    songs: weeklySongs,
    isLoading: isWeeklyLoading,
    error: weeklyError,
  } = useSpotifyTopSongs({
    start: weeklyRange.start,
    end: weeklyRange.end,
    nb: 8,
    offset: 0,
    enabled: isModalOpen,
  });
  const coverImage = topSong?.album?.images?.[0]?.url;
  const trackName = topSong?.track?.name ?? "Nothing.";
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

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isModalOpen]);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setIsModalOpen(true)}
        aria-label="Open Spotify weekly stats"
        aria-haspopup="dialog"
        aria-expanded={isModalOpen}
        className="col-span-2 block w-full h-full aspect-square rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:col-span-4"
        initial="hidden"
        animate="show"
        variants={cardItemVariants}
        custom={order}
        whileHover={{ y: -2, transition: cardHoverTransition }}
      >
        <Card className="h-full gap-0 overflow-hidden py-0 transition-shadow duration-200 hover:shadow-md">
          <div className="relative h-full w-full">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 p-4">
              <p className="inline-flex max-w-full text-sm font-semibold tracking-tight text-white">
                Daily Music Pick
              </p>
            </div>
            {coverImage ? (
              <img
                src={coverImage}
                alt="Currently playing album cover"
                className="h-full w-full object-cover brightness-75"
              />
            ) : (
              <div className="h-full w-full bg-linear-to-br from-slate-950 to-slate-900" />
            )}
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
      </motion.button>

      <SpotifyStatsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        songs={weeklySongs}
        isLoading={isWeeklyLoading}
        error={weeklyError}
      />
    </>
  );
}

type SpotifyStatsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  songs: SpotifyTopSong[];
  isLoading: boolean;
  error: string | null;
};

function SpotifyStatsModal({
  isOpen,
  onClose,
  songs,
  isLoading,
  error,
}: SpotifyStatsModalProps) {
  const stats = useMemo(() => buildWeeklyStats(songs), [songs]);
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Spotify weekly stats"
            className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-card shadow-2xl"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close modal"
              onClick={onClose}
              className="absolute top-3 right-3 z-20 rounded-full bg-card/95 p-2 text-foreground transition-colors hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="grid max-h-[85vh] overflow-y-auto p-8">
              <div className="mb-3 pr-8">
                <div className="min-w-0">
                  <p className="line-clamp-2 text-2xl font-bold tracking-tight text-foreground">
                    주간 음악 통계
                  </p>
                  <p className="mt-2 text-sm font-medium text-foreground/80">
                    최근 7일 기준 재생량, 감상 시간, 아티스트 분포입니다.
                  </p>
                </div>
              </div>

              <div className="grid gap-2">
                {isLoading ? (
                  <p className="text-sm text-muted-foreground">
                    주간 통계를 불러오는 중입니다.
                  </p>
                ) : error ? (
                  <p className="text-sm text-muted-foreground">
                    주간 통계를 불러오지 못했습니다.
                  </p>
                ) : (
                  <>
                    <div className="grid grid-cols-3 gap-2">
                      <StatTile
                        label="plays"
                        value={formatNumber(stats.totalCount)}
                      />
                      <StatTile
                        label="listening"
                        value={formatDuration(stats.totalDurationMs)}
                      />
                      <StatTile
                        label="artists"
                        value={formatNumber(stats.artistCount)}
                      />
                    </div>

                    {stats.topArtist ? (
                      <section className="rounded-xl bg-muted/30 p-4">
                        <div className="flex items-center gap-3">
                          {stats.topArtist.imageUrl ? (
                            <img
                              src={stats.topArtist.imageUrl}
                              alt={`${stats.topArtist.name} artist`}
                              className="h-14 w-14 rounded-xl object-cover"
                            />
                          ) : (
                            <div className="grid h-14 w-14 place-items-center rounded-xl bg-muted">
                              <Music2 className="h-5 w-5 text-muted-foreground" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="text-xs font-semibold uppercase text-muted-foreground">
                              Top Artist
                            </p>
                            <p className="truncate text-lg font-bold text-foreground">
                              {stats.topArtist.name}
                            </p>
                            <p className="truncate text-xs text-muted-foreground">
                              {stats.topArtist.genres.length
                                ? stats.topArtist.genres.join(", ")
                                : `${stats.topArtist.count.toLocaleString()} plays`}
                            </p>
                          </div>
                        </div>
                      </section>
                    ) : null}

                    <section>
                      <div className="mb-2 mt-2 flex items-center justify-between gap-2">
                        <h3 className="text-sm font-semibold text-foreground">
                          Weekly Top Tracks
                        </h3>
                        <a
                          href="https://spotify.lth.so"
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
                        >
                          통계 보기
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                      <div className="grid gap-2">
                        {songs.slice(0, 6).map((song, index) => (
                          <TrackRow
                            key={song._id ?? song.track?.id ?? index}
                            song={song}
                            rank={index + 1}
                          />
                        ))}
                      </div>
                    </section>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted/30 p-3">
      <p className="text-[10px] font-semibold uppercase text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 whitespace-nowrap text-base font-bold tracking-tight text-foreground sm:text-lg">
        {value}
      </p>
    </div>
  );
}

function TrackRow({ song, rank }: { song: SpotifyTopSong; rank: number }) {
  const imageUrl = song.album?.images?.[2]?.url ?? song.album?.images?.[0]?.url;

  return (
    <div className="flex items-center gap-3 rounded-xl bg-muted/20 p-2">
      <span className="w-5 text-center text-xs font-semibold text-muted-foreground">
        {rank}
      </span>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`${song.album?.name ?? song.track?.name ?? "Spotify"} cover`}
          className="h-11 w-11 rounded-lg object-cover"
        />
      ) : (
        <div className="grid h-11 w-11 place-items-center rounded-lg bg-muted">
          <Music2 className="h-4 w-4 text-muted-foreground" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">
          {song.track?.name ?? "Unknown track"}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {song.artist?.name ?? song.album?.name ?? "Unknown artist"}
        </p>
      </div>
      <p className="text-xs font-semibold text-muted-foreground">
        {(song.count ?? 0).toLocaleString()}회
      </p>
    </div>
  );
}

function buildWeeklyStats(songs: SpotifyTopSong[]) {
  const totalCount =
    songs[0]?.total_count ??
    songs.reduce((sum, song) => sum + (song.count ?? 0), 0);
  const totalDurationMs =
    songs[0]?.total_duration_ms ??
    songs.reduce((sum, song) => sum + (song.duration_ms ?? 0), 0);
  const artists = new Map<
    string,
    {
      count: number;
      genres: string[];
      imageUrl?: string;
      name: string;
    }
  >();

  for (const song of songs) {
    const artist = song.artist;
    if (!artist) continue;

    const current = artists.get(artist.id) ?? {
      count: 0,
      genres: artist.genres ?? [],
      imageUrl: artist.images?.[1]?.url ?? artist.images?.[0]?.url,
      name: artist.name,
    };
    current.count += song.count ?? 0;
    artists.set(artist.id, current);
  }

  const topArtist = [...artists.values()].sort((a, b) => b.count - a.count)[0];

  return {
    artistCount: artists.size,
    topArtist,
    topTrackName: songs[0]?.track?.name,
    totalCount,
    totalDurationMs,
  };
}

function formatNumber(value: number) {
  return value.toLocaleString();
}

function formatDuration(durationMs: number) {
  const minutes = Math.round(durationMs / 60000);
  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  const restMinutes = minutes % 60;
  return restMinutes ? `${hours}h ${restMinutes}m` : `${hours}h`;
}
