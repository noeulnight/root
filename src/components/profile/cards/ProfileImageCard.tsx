import { Card } from "../../ui/card";
import { InteractiveCardLink } from "./InteractiveCardLink";

type ProfileImageCardProps = {
  order: number;
};

export function ProfileImageCard({ order }: ProfileImageCardProps) {
  return (
    <InteractiveCardLink
      mode="external"
      href="https://blog.lth.so"
      className="block w-full h-full aspect-square rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:col-span-4"
      ariaLabel="Blog"
      order={order}
    >
      <Card className="h-full gap-0 overflow-hidden py-0 transition-shadow duration-200 hover:shadow-md">
        <img
          src="/profile.jpg"
          alt="Limtaehyun profile photo"
          className="h-full w-full object-cover grayscale transition duration-300 hover:grayscale-0"
        />
      </Card>
    </InteractiveCardLink>
  );
}
