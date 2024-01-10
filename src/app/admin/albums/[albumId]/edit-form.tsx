"use client";

import { updateAlbumFrontEndSchema } from "@/server/trpc/helpers/zodScheams";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
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
import { getLocalDateTimeFromUTC } from "~/utils/utils";

const EditAlbumForm: FC<{
  title: string;
  id: string;
  visible: boolean;
  isReception: boolean;
  date: Date;
}> = ({ title, id, isReception, visible, date }) => {
  const { mutate: updateAlbum, isLoading } =
    trpc.album.updateAlbumById.useMutation({
      onMutate: () => toast.loading("Uppdaterar album..."),
      onSettled: (_, __, ___, context) => {
        toast.dismiss(context);
      },
      onSuccess: () => toast.success("Album uppdaterat!"),
      onError: (error) => {
        toast.error("Kunde inte uppdatera, försök igen senare...");
        toast.error(error.message);
      },
    });

  console.log(date);

  const form = useForm<z.infer<typeof updateAlbumFrontEndSchema>>({
    resolver: zodResolver(updateAlbumFrontEndSchema),
    defaultValues: {
      title: title,
      isReception: isReception,
      visible: visible,
      date: getLocalDateTimeFromUTC(date).toISOString().slice(0, -8),
    },
  });

  async function onSubmit(values: z.infer<typeof updateAlbumFrontEndSchema>) {
    updateAlbum({
      ...values,
      albumId: id,
      date: new Date(values.date).toISOString(),
    });
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 md:grid-cols-2"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titel</FormLabel>
                <FormControl>
                  <Input placeholder="Fyll i titeln..." {...field} />
                </FormControl>
                <FormDescription>Rubriken som visas på albumet</FormDescription>
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
                    {...field}
                    type="datetime-local"
                    placeholder="Fyll i datum och tid"
                  />
                </FormControl>
                <FormDescription>
                  Datumet och tiden då arrangemanget började
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
                    Välj om albumet ska visas för användare eller inte.
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
            name="isReception"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Album från mottagningen
                  </FormLabel>
                  <FormDescription>
                    Tagg för att dölja album när mottagningen närmar sig
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
              onClick={() => form.reset()}
            >
              Återställ
            </Button>
            <Button disabled={isLoading} type="submit">
              Spara
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default EditAlbumForm;
