import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { InteractiveCardLink } from "./InteractiveCardLink";

type CertificationsCardProps = {
  order: number;
};

export function CertificationsCard({ order }: CertificationsCardProps) {
  return (
    <InteractiveCardLink
      mode="internal"
      to="/certifications"
      className="block h-full w-full aspect-square rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:col-span-4"
      ariaLabel="Certifications"
      order={order}
    >
      <Card className="h-full transition-shadow duration-200 hover:shadow-md">
        <CardHeader>
          <CardTitle>Certifications</CardTitle>
          <CardDescription>
            자격증 및 검증 정보를 모아둔 페이지입니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-auto">
          <p className="text-xs font-medium tracking-wide text-muted-foreground">
            자격증 보기
          </p>
        </CardContent>
      </Card>
    </InteractiveCardLink>
  );
}
