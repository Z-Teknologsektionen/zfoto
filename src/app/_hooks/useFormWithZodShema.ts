import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

export const useFormWithZodShema = <T extends z.Schema>({
  defaultValues,
  schema,
}: {
  schema: T;
  defaultValues: z.infer<T>;
}) =>
  useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });
