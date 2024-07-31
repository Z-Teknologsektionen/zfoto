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
}: {
  schema: TSchema;
  defaultValues?:
    | AsyncDefaultValues<z.input<typeof schema>>
    | DefaultValues<z.input<typeof schema>>;
}) =>
  useForm<z.input<typeof schema>, unknown, z.output<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });
