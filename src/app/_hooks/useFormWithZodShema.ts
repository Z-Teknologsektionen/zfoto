import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useFormWithZodShema = <T extends z.Schema<any, any>>({defaultValues,schema}:{schema:T; defaultValues: z.infer<T>}) => {
  return useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });
}
