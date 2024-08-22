import type { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

type AdminInfoCardProps = {
  title: string;
  number: number | string;
  info: string;
};

export const AdminInfoCard: FC<AdminInfoCardProps> = ({
  info,
  number,
  title,
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{number.toLocaleString()}</div>
      <p className="text-xs">{info}</p>
    </CardContent>
  </Card>
);
