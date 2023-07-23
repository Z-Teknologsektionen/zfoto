"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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

const dateTime = z.string().datetime();

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Rubriken måste vara minst 1 tecken lång",
  }),
  visible: z.boolean(),
  isReception: z.boolean(),
  date: z.string().refine((val) => dateTime.parse(val + ":00.000Z"), {
    message: "Otillåtet datum",
  }),
});

const getLocalDateTime = (date: Date) => {
  const getHours = date.getHours();
  const getUTCOffset = date.getTimezoneOffset() / -60;
  date.setHours(getHours + getUTCOffset);
  return date;
};

const EditAlbumForm: FC<{
  title: string;
  id: string;
  visible: boolean;
  isReception: boolean;
  date: Date;
}> = ({ title, id, isReception, visible, date }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title,
      isReception: isReception,
      visible: visible,
      date: getLocalDateTime(date).toISOString().slice(0, -8),
    },
  });

  async function onSubmit({ date, ...values }: z.infer<typeof formSchema>) {
    const res = await fetch(`/api/albums/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, date: new Date(date) }),
    });
    if (!res.ok) {
      return toast.error("Kunde inte uppdatera, försök igen senare..");
    }
    router.refresh();
    toast.success("Uppdaterat!");
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
                    type="datetime-local"
                    placeholder="Fyll i datum och tid"
                    {...field}
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
              className=""
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Återställ
            </Button>
            <Button className="" type="submit">
              Spara
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default EditAlbumForm;
