import { useEffect, useState } from "react";
import { apiClient, getApiErrorMessage } from "@/lib/apiClient";

type WakapiAllTimeResponse = {
  data?: {
    total_seconds?: number;
    text?: string;
  };
};

const WAKAPI_ALL_TIME_API_URL = "/api/wakapi/all-time";

export function useWakapiAllTime(enabled = true) {
  const [totalSeconds, setTotalSeconds] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();
    let active = true;

    const fetchAllTime = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data: payload } = await apiClient.get<WakapiAllTimeResponse>(
          WAKAPI_ALL_TIME_API_URL,
          {
            signal: controller.signal,
          },
        );

        const seconds =
          typeof payload.data?.total_seconds === "number"
            ? payload.data.total_seconds
            : null;

        if (active) {
          setTotalSeconds(seconds);
        }
      } catch (caughtError) {
        if (!active || controller.signal.aborted) return;
        setTotalSeconds(null);
        setError(getApiErrorMessage(caughtError));
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    void fetchAllTime();

    return () => {
      active = false;
      controller.abort();
    };
  }, [enabled]);

  return {
    totalSeconds,
    isLoading,
    error,
  };
}
