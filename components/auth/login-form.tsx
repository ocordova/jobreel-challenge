"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";

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
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { PhoneInput } from "../ui/phone-input";
import { login } from "@/actions/login";
import { sendOTP } from "@/actions/send-otp";
import { useSearchParams } from "next/navigation";

enum AuthStep {
  PHONE,
  CODE,
}

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [step, setStep] = useState<AuthStep>(AuthStep.PHONE);
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      phone: "",
      code: null,
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    if (step === AuthStep.PHONE) {
      startTransition(() => {
        sendOTP(values)
          .then((data) => {
            if (data?.error) {
              setError(data.error);
              return;
            }
            if (data?.success && data.twoFactorRequired) {
              setStep(AuthStep.CODE);
              return;
            }
          })
          .catch(() => setError("Unknown error occurred"));
      });
    }
    if (step === AuthStep.CODE) {
      startTransition(() => {
        login(values, callbackUrl)
          .then((data) => {
            if (data && data.error) {
              form.reset();
              setError(data.error);
              return;
            }
          })
          .catch(() => setError("Unknown error occurred"));
      });
    }
  };

  return (
    <>
      {step === AuthStep.PHONE && (
        <Card>
          <CardHeader>
            <CardTitle>Log in</CardTitle>
            <CardDescription>
              Enter your phone and we&apos;ll send you a login code
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <FormError message={error} />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="phone">Phone</FormLabel>
                        <FormControl>
                          <PhoneInput
                            defaultCountry="US"
                            initialValueFormat="national"
                            placeholder="Enter a phone number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage>
                          {form.formState.errors.phone?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                </div>
                <Button disabled={isPending} type="submit" className="w-full">
                  {isPending ? "Submitting..." : "Continue"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
      {step === AuthStep.CODE && (
        <Card>
          <CardHeader>
            <CardTitle>Two Factor Authentication</CardTitle>
            <CardDescription>
              Enter the code sent to your phone number{" "}
              <span className="font-medium">{form.getValues("phone")}</span>.
              <p className="mt-4 text-sm text-muted-foreground">
                Wrong number?{" "}
                <button
                  onClick={() => {
                    setStep(AuthStep.PHONE);
                    form.reset();
                    setError("");
                  }}
                  className="text-red-500"
                >
                  Change it
                </button>
                .
              </p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <FormError message={error} />
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="code">Code</FormLabel>
                        <FormControl>
                          <InputOTP
                            maxLength={6}
                            {...field}
                            value={field.value || ""}
                          >
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormMessage>
                          {form.formState.errors.code?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                </div>
                <Button disabled={isPending} type="submit" className="w-full">
                  {isPending ? "Loading..." : "Continue"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </>
  );
}
