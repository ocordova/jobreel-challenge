"use client";
import * as z from "zod";
import { toast } from "sonner";
import { FormError } from "@/components/form-error";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UpdateUserSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Profile } from "@/lib/definitions";
import { updateUser } from "@/actions/update-user";
import { useSession } from "next-auth/react";

export default function UpdateNameForm({ profile }: { profile: Profile }) {
  const session = useSession();
  const userId = session.data?.user?.userId;
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof UpdateUserSchema>>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: profile.name,
    },
  });

  const onSubmit = async (values: z.infer<typeof UpdateUserSchema>) => {
    setError("");
    startTransition(() => {
      updateUser(userId!, values)
        .then((data) => {
          if (data.error) {
            form.reset();
            setError(data.error);
          }
          if (data.success) {
            toast.success("User updated successfully");
          }
        })
        .catch((error) => {
          console.error(error);
          setError("An unkown error occurred");
        });
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormError message={error} />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        id="fullName"
                        placeholder=""
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.name?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? "Updating..." : "Update"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
