import { useEffect, useState } from "react";
import { apiClient, getApiErrorMessage } from "@/lib/apiClient";

export type GhostBlogPost = {
  id: string;
  title: string;
  slug: string;
  url: string;
  excerpt: string | null;
  published_at: string;
  feature_image?: string | null;
};

type GhostPostsResponse = {
  posts?: GhostBlogPost[];
};

const GHOST_BLOG_LATEST_POST_API_URL = "/api/ghost";

export function useGhostBlogPost(enabled = true) {
  const [post, setPost] = useState<GhostBlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();
    let active = true;

    const fetchLatestPost = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data: payload } = await apiClient.get<GhostPostsResponse>(
          GHOST_BLOG_LATEST_POST_API_URL,
          {
            signal: controller.signal,
          },
        );

        if (active) {
          setPost(payload.posts?.[0] ?? null);
        }
      } catch (caughtError) {
        if (!active || controller.signal.aborted) return;
        setPost(null);
        setError(getApiErrorMessage(caughtError));
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    void fetchLatestPost();

    return () => {
      active = false;
      controller.abort();
    };
  }, [enabled]);

  return {
    post,
    isLoading,
    error,
  };
}
