import { useEffect, useState } from "react";
import { apiClient, getApiErrorMessage } from "@/lib/apiClient";

type TraccarLocationResponse = {
  currentGeofenceNames: string[];
};

const TRACCAR_LOCATION_API_URL = "/api/traccar/location";

export function useTraccarLocation(enabled = true) {
  const [location, setLocation] = useState<TraccarLocationResponse | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();
    let active = true;

    const fetchLocation = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data: payload } = await apiClient.get<TraccarLocationResponse>(
          TRACCAR_LOCATION_API_URL,
          {
            signal: controller.signal,
          },
        );

        if (active) {
          setLocation(payload);
        }
      } catch (caughtError) {
        if (!active || controller.signal.aborted) return;
        setLocation(null);
        setError(getApiErrorMessage(caughtError));
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    void fetchLocation();

    return () => {
      active = false;
      controller.abort();
    };
  }, [enabled]);

  return {
    location,
    isLoading,
    error,
  };
}
