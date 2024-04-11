"use client";
import * as z from "zod";
import { toast } from "sonner";
import { FormError } from "@/components/form-error";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateUserSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { createUser } from "@/actions/create-user";
import { useSession } from "next-auth/react";

export default function NameForm() {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof CreateUserSchema>>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      fullName: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CreateUserSchema>) => {
    setError("");
    startTransition(() => {
      createUser(values)
        .then((data) => {
          if (data.error) {
            form.reset();
            setError(data.error);
          }
          if (data.success) {
            toast.success("User created successfully");
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
        <CardTitle>What&apos;s your name?</CardTitle>
        <CardDescription>
          Let&apos;s start creating your Jobreel.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormError message={error} />
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Full name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        id="fullName"
                        placeholder=""
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.fullName?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? "Updating..." : "Continue"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
