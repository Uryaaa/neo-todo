"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Settings } from "@prisma/client";
import { Palette } from "lucide-react";
import { useAccentColor } from "@/components/accent-color-provider";

const settingsSchema = z.object({
  accentColor: z.enum(["blue", "pink", "green", "yellow", "orange", "purple", "cyan"]),
  emailNotifications: z.boolean(),
});

interface SettingsFormProps {
  settings: Settings;
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const router = useRouter();
  const { setAccentColor } = useAccentColor();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      accentColor: settings.accentColor as "blue" | "pink" | "green" | "yellow" | "orange" | "purple" | "cyan",
      emailNotifications: settings.emailNotifications,
    },
  });

  async function onSubmit(values: z.infer<typeof settingsSchema>) {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Update accent color immediately for better user feedback
      if (values.accentColor !== form.getValues("accentColor")) {
        console.log("Setting accent color to:", values.accentColor);
        setAccentColor(values.accentColor);
      }

      const response = await fetch("/api/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess("Settings updated successfully");

      // Force a refresh to ensure all components update
      setTimeout(() => {
        router.refresh();
      }, 500);
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="accentColor"
          render={({ field }) => (
            <FormItem className="space-y-3 border-[3px] border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0)] bg-yellow-100">
              <FormLabel className="text-base font-black flex items-center">
                <Palette className="mr-2 h-5 w-5" /> Accent Color
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    field.onChange(value);
                    // Apply color change immediately for better UX
                    setAccentColor(value as AccentColor);
                  }}
                  value={field.value}
                  className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                >
                  <FormItem className="flex flex-col items-center space-y-2 border-[3px] border-black p-3 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
                    <div className="w-full h-8 bg-blue-400 border-2 border-black"></div>
                    <FormControl>
                      <RadioGroupItem value="blue" className="border-2 border-black" />
                    </FormControl>
                    <FormLabel className="font-bold">Blue</FormLabel>
                  </FormItem>

                  <FormItem className="flex flex-col items-center space-y-2 border-[3px] border-black p-3 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
                    <div className="w-full h-8 bg-pink-400 border-2 border-black"></div>
                    <FormControl>
                      <RadioGroupItem value="pink" className="border-2 border-black" />
                    </FormControl>
                    <FormLabel className="font-bold">Pink</FormLabel>
                  </FormItem>

                  <FormItem className="flex flex-col items-center space-y-2 border-[3px] border-black p-3 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
                    <div className="w-full h-8 bg-green-400 border-2 border-black"></div>
                    <FormControl>
                      <RadioGroupItem value="green" className="border-2 border-black" />
                    </FormControl>
                    <FormLabel className="font-bold">Green</FormLabel>
                  </FormItem>

                  <FormItem className="flex flex-col items-center space-y-2 border-[3px] border-black p-3 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
                    <div className="w-full h-8 bg-yellow-400 border-2 border-black"></div>
                    <FormControl>
                      <RadioGroupItem value="yellow" className="border-2 border-black" />
                    </FormControl>
                    <FormLabel className="font-bold">Yellow</FormLabel>
                  </FormItem>

                  <FormItem className="flex flex-col items-center space-y-2 border-[3px] border-black p-3 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
                    <div className="w-full h-8 bg-orange-400 border-2 border-black"></div>
                    <FormControl>
                      <RadioGroupItem value="orange" className="border-2 border-black" />
                    </FormControl>
                    <FormLabel className="font-bold">Orange</FormLabel>
                  </FormItem>

                  <FormItem className="flex flex-col items-center space-y-2 border-[3px] border-black p-3 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
                    <div className="w-full h-8 bg-purple-400 border-2 border-black"></div>
                    <FormControl>
                      <RadioGroupItem value="purple" className="border-2 border-black" />
                    </FormControl>
                    <FormLabel className="font-bold">Purple</FormLabel>
                  </FormItem>

                  <FormItem className="flex flex-col items-center space-y-2 border-[3px] border-black p-3 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
                    <div className="w-full h-8 bg-cyan-400 border-2 border-black"></div>
                    <FormControl>
                      <RadioGroupItem value="cyan" className="border-2 border-black" />
                    </FormControl>
                    <FormLabel className="font-bold">Cyan</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormDescription className="text-black font-medium">
                Choose your preferred accent color for the neobrutalism style.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="emailNotifications"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between border-[3px] border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0)] bg-blue-100">
              <div className="space-y-0.5">
                <FormLabel className="text-base font-black">
                  Email Notifications
                </FormLabel>
                <FormDescription className="text-black font-medium">
                  Receive email notifications for important updates.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-black border-[3px]"
                />
              </FormControl>
            </FormItem>
          )}
        />
        {error && (
          <div className="border-[3px] border-black bg-red-100 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0)]">
            <p className="text-sm font-bold text-red-600">{error}</p>
          </div>
        )}
        {success && (
          <div className="border-[3px] border-black bg-green-100 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0)]">
            <p className="text-sm font-bold text-green-700">{success}</p>
          </div>
        )}
        <Button
          type="submit"
          disabled={isLoading}
          className="neobrutal-button-accent hover-pop w-full sm:w-auto px-5 py-3 text-base"
        >
          {isLoading ? "Saving..." : "Save Settings"}
        </Button>
      </form>
    </Form>
  );
}
