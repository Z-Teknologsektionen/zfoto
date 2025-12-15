"use client";

import type { DefaultValues } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type AsyncDefaultValues<TFieldValues> = (
  payload?: unknown,
) => Promise<TFieldValues>;

export const useFormWithZod = <TSchema extends z.ZodObject>({
  schema,
  defaultValues,
  debug = false,
  values,
}: {
  schema: TSchema;
  debug?: boolean;
  values?: z.input<TSchema> | undefined;
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
    values,
  });
