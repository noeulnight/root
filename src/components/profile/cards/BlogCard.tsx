import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { InteractiveCardLink } from "./InteractiveCardLink";

type BlogCardProps = {
  order: number;
};

export function BlogCard({ order }: BlogCardProps) {
  return (
    <InteractiveCardLink
      mode="external"
      href="https://blog.lth.so"
      className="block w-full h-full aspect-square rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:col-span-4"
      ariaLabel="Blog"
      order={order}
    >
      <Card className="h-full transition-shadow duration-200 hover:shadow-md">
        <CardHeader>
          <CardTitle>Blog</CardTitle>
          <CardDescription>일상, 개발을 정리합니다.</CardDescription>
        </CardHeader>
        <CardContent className="mt-auto">
          <p className="text-xs font-medium tracking-wide text-muted-foreground">
            블로그 확인하기
          </p>
        </CardContent>
      </Card>
    </InteractiveCardLink>
  );
}
