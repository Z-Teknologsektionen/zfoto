import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

interface IInfoCard {
  title: string;
  number: string | number;
  info: string;
}

const InfoCard: FC<IInfoCard> = ({ info, number, title }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{number.toLocaleString()}</div>
        <p className="text-muted-foreground text-xs">{info}</p>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
