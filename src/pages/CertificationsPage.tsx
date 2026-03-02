import { ShieldCheck } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { certifications } from "../data/certifications";

export function CertificationsPage() {
  return (
    <div className="grid gap-2 sm:grid-cols-12">
      {certifications.map((certification) => (
        <Card
          key={`${certification.name}-${certification.acquiredDate}`}
          className="sm:col-span-6"
        >
          <CardHeader>
            <CardTitle className="flex flex-wrap items-center gap-2 text-base">
              <ShieldCheck className="h-4 w-4 text-muted-foreground" />
              <span>{certification.name}</span>
            </CardTitle>
            <CardDescription>
              취득일: {certification.acquiredDate}
            </CardDescription>
          </CardHeader>
          {certification.validUntil || certification.credentialId ? (
            <CardContent className="mt-auto space-y-1">
              {certification.validUntil ? (
                <p className="text-xs text-muted-foreground">
                  유효기간: {certification.validUntil}
                </p>
              ) : null}
              {certification.credentialId ? (
                <p className="text-xs text-muted-foreground">
                  검증번호: {certification.credentialId}
                </p>
              ) : null}
            </CardContent>
          ) : null}
        </Card>
      ))}
    </div>
  );
}
