"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { DefaultValues } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { Schema, z } from "zod";

type AsyncDefaultValues<TFieldValues> = (
  payload?: unknown,
) => Promise<TFieldValues>;

export const useFormWithZod = <TSchema extends Schema>({
  schema,
  defaultValues,
  debug = false,
}: {
  schema: TSchema;
  debug?: boolean;
  defaultValues?:
    | AsyncDefaultValues<z.input<typeof schema>>
    | DefaultValues<z.input<typeof schema>>;
}) =>
  useForm<z.input<typeof schema>, unknown, z.output<typeof schema>>({
    resolver: async (values, context, options) => {
      const results = await zodResolver(schema)(values, context, options);
      if (debug) {
        // eslint-disable-next-line no-console
        console.log("Input: ", values);
        // eslint-disable-next-line no-console
        console.log("Output: ", results);
      }
      return results;
    },
    defaultValues,
  });
