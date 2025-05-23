"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { UserPlus, Mail, Lock, User, AlertCircle, Loader2, ArrowLeft } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      router.push("/login?registered=true");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto neobrutal-card bg-yellow-100 animate-pop border-[5px] shadow-[8px_8px_0px_0px_rgba(0,0,0)]">
      <CardHeader className="border-b-3 border-black bg-green-200">
        <CardTitle className="text-2xl font-black text-black flex items-center">
          <UserPlus className="mr-2 h-6 w-6" /> Register
        </CardTitle>
        <CardDescription className="text-black font-medium">
          Create a new account to get started
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 px-6 sm:px-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-black text-base">Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="John Doe"
                        className="neobrutal-input bg-white pl-10 h-11 text-base"
                        {...field}
                      />
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                    </div>
                  </FormControl>
                  <FormMessage className="font-medium" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-black text-base">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="email@example.com"
                        className="neobrutal-input bg-white pl-10 h-11 text-base"
                        {...field}
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                    </div>
                  </FormControl>
                  <FormMessage className="font-medium" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-black text-base">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="password"
                        placeholder="******"
                        className="neobrutal-input bg-white pl-10 h-11 text-base"
                        {...field}
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                    </div>
                  </FormControl>
                  <FormMessage className="font-medium" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-black text-base">Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="password"
                        placeholder="******"
                        className="neobrutal-input bg-white pl-10 h-11 text-base"
                        {...field}
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                    </div>
                  </FormControl>
                  <FormMessage className="font-medium" />
                </FormItem>
              )}
            />
            {error && (
              <div className="text-sm font-bold text-red-600 bg-red-100 p-3 border-3 border-black flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                {error}
              </div>
            )}
            <Button
              type="submit"
              className="w-full neobrutal-button-primary hover-pop font-bold mt-4 h-12 text-base"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Creating account...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <UserPlus className="mr-2 h-5 w-5" /> Register
                </span>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center border-t-3 border-black pt-4 bg-green-100">
        <p className="text-black font-medium">
          Already have an account?{" "}
          <Link href="/login" className="font-bold underline hover:text-green-700 inline-flex items-center">
            <ArrowLeft className="mr-1 h-4 w-4" /> Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
