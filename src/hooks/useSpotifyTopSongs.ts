import { useEffect, useMemo, useState } from "react";
import { apiClient, getApiErrorMessage } from "@/lib/apiClient";

type SpotifyImage = {
  url: string;
  height: number;
  width: number;
};

type SpotifyTrack = {
  _id?: string;
  album?: string;
  artists?: string[];
  duration_ms?: number;
  id: string;
  name: string;
};

type SpotifyAlbum = {
  _id?: string;
  artists?: string[];
  id: string;
  name: string;
  images: SpotifyImage[];
};

type SpotifyArtist = {
  _id?: string;
  genres?: string[];
  id: string;
  images?: SpotifyImage[];
  name: string;
};

export type SpotifyTopSong = {
  _id?: string;
  count?: number;
  duration_ms?: number;
  total_count?: number;
  total_duration_ms?: number;
  track?: SpotifyTrack;
  album?: SpotifyAlbum;
  artist?: SpotifyArtist;
};

type UseSpotifyTopSongsParams = {
  start: Date;
  end: Date;
  nb?: number;
  offset?: number;
  enabled?: boolean;
};

const SPOTIFY_TOP_SONGS_API_URL =
  "/api/spotify/top/songs";

export function useSpotifyTopSongs({
  start,
  end,
  nb = 1,
  offset = 0,
  enabled = true,
}: UseSpotifyTopSongsParams) {
  const [songs, setSongs] = useState<SpotifyTopSong[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const startTime = start.getTime();
  const endTime = end.getTime();

  const queryParams = useMemo(
    () => ({
      start: new Date(startTime).toISOString(),
      end: new Date(endTime).toISOString(),
      nb,
      offset,
    }),
    [startTime, endTime, nb, offset],
  );

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();
    let active = true;

    const fetchTopSongs = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data } = await apiClient.get<SpotifyTopSong[]>(SPOTIFY_TOP_SONGS_API_URL, {
          params: queryParams,
          signal: controller.signal,
        });

        if (active) {
          setSongs(Array.isArray(data) ? data : []);
        }
      } catch (caughtError) {
        if (!active || controller.signal.aborted) return;
        setSongs([]);
        setError(getApiErrorMessage(caughtError));
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    void fetchTopSongs();

    return () => {
      active = false;
      controller.abort();
    };
  }, [enabled, queryParams]);

  return {
    songs,
    topSong: songs[0] ?? null,
    isLoading,
    error,
  };
}
