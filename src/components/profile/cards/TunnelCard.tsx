import { toast } from "sonner"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { InteractiveCardLink } from "./InteractiveCardLink";
import { CopyIcon } from "lucide-react";

type TunnelCardProps = {
  order: number;
};

export function TunnelCard({ order }: TunnelCardProps) {
  return (
    <InteractiveCardLink
      mode="none"
      className="col-span-4 block h-full min-h-[155px] w-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:col-span-8 sm:aspect-2/1"
      ariaLabel="Skills"
      order={order}
    >
      <Card className="h-full transition-shadow duration-200 hover:shadow-md">
        <CardHeader>
          <CardTitle>Tunnel</CardTitle>
          <CardDescription>
            SSH를 통해 서비스를 터널링 할 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-auto">
          <div className="bg-background/50 rounded-lg flex items-center justify-between gap-2 border border-border/40 p-2.5 sm:p-3">
            <code className="text-xs font-mono text-foreground break-all">
              ssh tunnel.lth.so -R0:&lt;host&gt;:&lt;port&gt;
            </code>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => {
                navigator.clipboard.writeText("ssh tunnel.lth.so -R0:<host>:<port>")
                toast.success("복사되었습니다.")
              }}
            >
              <CopyIcon />
            </Button>
          </div>
        </CardContent>
      </Card>
    </InteractiveCardLink>
  );
}
