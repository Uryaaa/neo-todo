"use client";

import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { AvatarSettingsModal } from "@/components/profile/avatar-settings-modal";
import { User } from "@prisma/client";

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }).optional(),
  image: z.string()
    .refine(val => {
      // Allow empty string
      if (!val) return true;
      // Allow relative paths starting with /uploads/
      if (val.startsWith('/uploads/')) return true;
      // Allow full URLs
      try {
        new URL(val);
        return true;
      } catch {
        return false;
      }
    }, { message: "Please enter a valid URL or upload an image" })
    .optional()
    .or(z.literal("")),
});

interface ProfileFormProps {
  user: User;
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(user.image || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email,
      image: user.image || "",
    },
  });

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    // Check file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Only JPEG, PNG and WebP images are allowed");
      return;
    }

    // Create a preview URL
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    try {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append("file", file);

      // Upload the file
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();

      // Update the form with the new image URL
      form.setValue("image", data.url);

      // Clear any previous errors
      setError(null);

      // Show success message
      setSuccess("Image uploaded successfully. You can now crop or adjust your image using the crop tool.");

      // Force refresh preview with the new URL
      setPreviewUrl(`${data.url}?v=${Date.now()}`);
    } catch (err) {
      setError("Error uploading image. Please try again.");
      console.error(err);
    }
  };

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Check if the image is a data URL (cropped image)
      let imageUrl = values.image;

      // If the image is a data URL (from cropping), we need to upload it first
      if (imageUrl && imageUrl.startsWith('data:image')) {
        try {
          // Convert data URL to blob
          const response = await fetch(imageUrl);
          const blob = await response.blob();

          // Create a file from the blob
          const file = new File([blob], "cropped-image.png", { type: "image/png" });

          // Create FormData and append the file
          const formData = new FormData();
          formData.append("file", file);

          // Upload the cropped image
          const uploadResponse = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (!uploadResponse.ok) {
            throw new Error("Failed to upload cropped image");
          }

          const data = await uploadResponse.json();
          imageUrl = data.url;
        } catch (err) {
          setError("Error uploading cropped image. Please try again.");
          console.error(err);
          setIsLoading(false);
          return;
        }
      }

      // Update profile with the image URL
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          image: imageUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess("Profile updated successfully");

      // Force a hard refresh to update the session
      window.location.href = "/dashboard/profile";
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
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Avatar className="h-24 w-24 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0)]">
              {previewUrl ? (
                <AvatarImage src={previewUrl} alt={user.name || "User"} />
              ) : (
                <AvatarFallback className="bg-pink-200 text-black font-bold text-xl">
                  {user.name
                    ? user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                    : user.email.charAt(0).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <Button
              type="button"
              size="icon"
              variant="outline"
              className="absolute bottom-0 right-0 h-8 w-8 border-2 border-black bg-yellow-300 shadow-[2px_2px_0px_0px_rgba(0,0,0)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="h-4 w-4" />
            </Button>
            {previewUrl && (
              <AvatarSettingsModal
                imageUrl={previewUrl}
                onSave={(croppedImageUrl) => {
                  // Update the form with the new cropped image
                  form.setValue("image", croppedImageUrl);
                  setPreviewUrl(croppedImageUrl);
                  setSuccess("Image cropped successfully");
                }}
              />
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="text-center">
            <p className="text-sm font-bold text-black border-b-2 border-black pb-1 inline-block">
              Click the camera icon to upload a profile picture
            </p>
            {previewUrl && (
              <p className="text-sm font-medium text-black mt-1">
                Use the crop tool on the left to adjust your profile picture
              </p>
            )}
          </div>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0)] bg-blue-100">
              <FormLabel className="font-bold">Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  {...field}
                  className="border-2 border-black focus:border-black focus:ring-0 neobrutal-input"
                />
              </FormControl>
              <FormMessage className="font-bold" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0)] bg-gray-100">
              <FormLabel className="font-bold">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="email@example.com"
                  disabled
                  {...field}
                  className="border-2 border-black focus:border-black focus:ring-0 bg-gray-200"
                />
              </FormControl>
              <FormMessage className="font-bold" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0)] bg-yellow-100">
              <FormLabel className="font-bold">Profile Image URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://example.com/image.jpg"
                  {...field}
                  className="border-2 border-black focus:border-black focus:ring-0 neobrutal-input"
                />
              </FormControl>
              <FormDescription className="text-black font-medium">
                Enter a URL or use the camera button above to upload an image
              </FormDescription>
              <FormMessage className="font-bold" />
            </FormItem>
          )}
        />
        {error && <p className="text-sm font-bold text-red-500 border-2 border-black p-2 bg-red-100">{error}</p>}
        {success && <p className="text-sm font-bold text-green-700 border-2 border-black p-2 bg-green-100">{success}</p>}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full neobrutal-button-primary hover-pop py-2 text-lg"
        >
          {isLoading ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </Form>
  );
}
