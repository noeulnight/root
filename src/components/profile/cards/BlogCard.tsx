import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { useGhostBlogPost } from "@/hooks/useGhostBlogPost";
import { InteractiveCardLink } from "./InteractiveCardLink";

type BlogCardProps = {
  order: number;
};

export function BlogCard({ order }: BlogCardProps) {
  const { post, isLoading, error } = useGhostBlogPost();
  const blogHref = post?.url ?? "https://blog.lth.so";

  return (
    <InteractiveCardLink
      mode="external"
      href={blogHref}
      className="block h-full w-full aspect-2/1 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:col-span-8"
      ariaLabel="Blog"
      order={order}
    >
      <Card className="h-full transition-shadow duration-200 hover:shadow-md">
        <CardHeader>
          <CardTitle>Blog</CardTitle>
          <CardDescription>일상, 개발을 정리합니다.</CardDescription>
        </CardHeader>
        <CardContent className="mt-auto">
          <p className="text-xs font-medium tracking-wide text-muted-foreground">마지막 글</p>
          <p className="line-clamp-1 text-xl font-semibold tracking-tight text-foreground">
            {isLoading
              ? "최신 글을 불러오는 중..."
              : error
                ? "블로그 확인하기"
                : post?.title ?? "블로그 확인하기"}
          </p>
        </CardContent>
      </Card>
    </InteractiveCardLink>
  );
}
