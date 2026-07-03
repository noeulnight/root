import { Card, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { InteractiveCardLink } from "./InteractiveCardLink";

type GitHubCardProps = {
  order: number;
};

export function GitHubCard({ order }: GitHubCardProps) {
  return (
    <InteractiveCardLink
      mode="external"
      href="https://github.com/noeulnight/"
      className="col-span-2 block w-full h-full aspect-square rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:col-span-4"
      ariaLabel="GitHub"
      order={order}
    >
      <Card className="h-full transition-shadow duration-200 hover:shadow-md">
        <CardHeader>
          <CardTitle>GitHub</CardTitle>
          <CardDescription>
            프로젝트와 실험 코드를 올려둡니다.
          </CardDescription>
        </CardHeader>
      </Card>
    </InteractiveCardLink>
  );
}
