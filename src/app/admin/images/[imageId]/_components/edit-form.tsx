"use client";

import type { getImagebyId } from "@/server/data-access/images";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Prisma } from "@prisma/client";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import type { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Switch } from "~/components/ui/switch";
import { trpc } from "~/trpc/client";
import { getLocalDateTimeFromUTC } from "~/utils/date-utils";

type AdminImage = Prisma.PromiseReturnType<typeof getImagebyId>;

export const EditImageForm: FC<AdminImage> = ({
  coverImage,
  date,
  id,
  photographer,
  visible,
}) => {
  const { mutate: updateImage, isLoading } =
    trpc.image.updateImageById.useMutation({
      onMutate: () => toast.loading("Uppdaterar album..."),
      // eslint-disable-next-line @typescript-eslint/max-params
      onSettled: (_, __, ___, context) => {
        toast.dismiss(context);
      },
      onSuccess: () => toast.success("Bild uppdaterad!"),
      onError: (error) => {
        toast.error("Kunde inte uppdatera, försök igen senare...");
        toast.error(error.message);
      },
    });

  const form = useForm<z.infer<typeof updateImageFrontEndSchema>>({
    resolver: zodResolver(updateImageFrontEndSchema),
    defaultValues: {
      photographer,
      coverImage,
      visible,
      date: getLocalDateTimeFromUTC(date).toISOString().slice(0, -8),
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={
          void form.handleSubmit((values) => {
            updateImage({
              ...values,
              imageId: id,
              date: new Date(values.date).toISOString(),
            });
          })
        }
        className="grid gap-4 md:grid-cols-2"
      >
        <FormField
          control={form.control}
          name="photographer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fotograf</FormLabel>
              <FormControl>
                <Input placeholder="Fyll i fotografensnamn..." {...field} />
              </FormControl>
              <FormDescription>Namnet på fotografen</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Datum och tid</FormLabel>
              <FormControl>
                <Input
                  type="datetime-local"
                  placeholder="Fyll i datum och tid"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Datumet och tiden då bilden togs
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="visible"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Visas på hemsidan</FormLabel>
                <FormDescription>
                  Välj om bilden ska visas för användare eller inte.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Omslagsbild</FormLabel>
                <FormDescription>
                  Välj om bilden ska visas som omslagsbild
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="col-span-full flex flex-row justify-end gap-2">
          <Button
            disabled={isLoading}
            type="button"
            variant="outline"
            onClick={() => {
              form.reset();
            }}
          >
            Återställ
          </Button>
          <Button disabled={isLoading} type="submit">
            Spara
          </Button>
        </div>
      </form>
    </Form>
  );
};
