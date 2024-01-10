"use client";

import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
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

  for (let i = 2016; i <= endDate; i += 1) {
    years.push(i);
  }
  return years;
}

const FilterAlbumsWizard: FC<{ selectedYear: string | undefined }> = ({
  selectedYear,
}) => {
  const { push } = useRouter();
  const pathname = usePathname();

  return (
    <Select
      onValueChange={(value) => {
        if (!pathname) return;
        if (value === "") {
          return push(pathname);
        }

        return push(`${pathname}?year=${value}`, {});
      }}
      defaultValue={selectedYear?.toString() || "all"}
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

export default FilterAlbumsWizard;
