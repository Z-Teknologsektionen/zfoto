"use client";

import type { FC } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

function generateYearsBetweenNowAnd2016(): number[] {
  const endDate = new Date().getFullYear();
  const years = [];

  for (let i = 2016; i <= endDate; i += 1) years.push(i);

  return years;
}

type FilterAlbumsWizardProps = { selectedYear: string | undefined };

export const FilterAlbumsWizard: FC<FilterAlbumsWizardProps> = ({
  selectedYear,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Select
      onValueChange={(value) => {
        if (value === "") {
          router.push(pathname);
          return;
        }

        router.push(`${pathname}?year=${value}`, {});
      }}
      defaultValue={selectedYear?.toString() ?? "all"}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Välj år" />
      </SelectTrigger>
      <SelectContent className="">
        <SelectItem value="all">Alla år</SelectItem>
        {generateYearsBetweenNowAnd2016()
          .reverse()
          .map((year) => (
            <SelectItem
              className="pointer-events-auto"
              key={year}
              value={year.toString()}
            >
              {year}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};
