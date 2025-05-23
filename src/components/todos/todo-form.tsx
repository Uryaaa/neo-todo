"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Camera,
  X,
  Calendar,
  Tag,
  CheckCircle,
  AlertCircle,
  Loader2,
  Save,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { format } from "date-fns";
import { Todo } from "@prisma/client";

const todoSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  dueDate: z.string().optional(),
  tags: z.string().optional(),
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

interface TodoFormProps {
  todo?: Todo;
  isEditing?: boolean;
}

export function TodoForm({ todo, isEditing = false }: TodoFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(todo?.image || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof todoSchema>>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: todo?.title || "",
      description: todo?.description || "",
      priority: todo?.priority || "MEDIUM",
      dueDate: todo?.dueDate ? format(new Date(todo.dueDate), "yyyy-MM-dd") : "",
      tags: todo?.tags || "",
      image: todo?.image || "",
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
      setError(null);
    } catch (err) {
      setError("Error uploading image. Please try again.");
      console.error(err);
    }
  };

  async function onSubmit(values: z.infer<typeof todoSchema>) {
    setIsLoading(true);
    setError(null);

    try {
      const endpoint = isEditing ? `/api/todos/${todo?.id}` : "/api/todos";
      const method = isEditing ? "PATCH" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          dueDate: values.dueDate ? new Date(values.dueDate).toISOString() : null,
          image: values.image || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      router.push("/dashboard/todos");
      router.refresh();
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
    <div className="w-full max-w-2xl mx-auto border-[5px] border-black bg-[hsl(var(--accent-light)_/_0.5)] shadow-[8px_8px_0px_0px_rgba(0,0,0)] animate-pop">
      {/* Header */}
      <div className="bg-[hsl(var(--accent-medium))] border-b-[5px] border-black p-4">
        <h2 className="text-2xl font-black text-black flex items-center">
          {isEditing ? (
            <>
              <CheckCircle className="mr-2 h-6 w-6" /> Edit Todo
            </>
          ) : (
            <>
              <CheckCircle className="mr-2 h-6 w-6" /> Create New Todo
            </>
          )}
        </h2>
        <p className="text-black font-bold mt-1">
          {isEditing ? "Update your task information" : "Fill in the details for your new task"}
        </p>
      </div>

      {/* Content */}
      <div className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Title Field */}
            <div className="border-[3px] border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0)]">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-black text-lg text-black">Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Task title"
                        className="border-[3px] border-black rounded-none px-3 py-2 bg-white text-base font-medium focus:ring-0 focus:outline-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-bold text-red-600" />
                  </FormItem>
                )}
              />
            </div>

            {/* Description Field */}
            <div className="border-[3px] border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0)]">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-black text-lg text-black">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Task description"
                        className="border-[3px] border-black rounded-none px-3 py-2 bg-white resize-none min-h-[100px] text-base font-medium focus:ring-0 focus:outline-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-bold text-red-600" />
                  </FormItem>
                )}
              />
            </div>

            {/* Priority and Due Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-[3px] border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0)]">
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-black text-lg text-black">Priority</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-[3px] border-black rounded-none px-3 py-2 bg-white text-base font-medium focus:ring-0 focus:outline-none">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="border-[3px] border-black rounded-none">
                          <SelectItem value="LOW">Low</SelectItem>
                          <SelectItem value="MEDIUM">Medium</SelectItem>
                          <SelectItem value="HIGH">High</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="font-bold text-red-600" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="border-[3px] border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0)]">
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-black text-lg text-black flex items-center">
                        <Calendar className="mr-2 h-5 w-5" /> Due Date
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          className="border-[3px] border-black rounded-none px-3 py-2 bg-white text-base font-medium focus:ring-0 focus:outline-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="font-bold text-red-600" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* Tags Field */}
            <div className="border-[3px] border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0)]">
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-black text-lg text-black flex items-center">
                      <Tag className="mr-2 h-5 w-5" /> Tags (comma separated)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="work, personal, urgent"
                        className="border-[3px] border-black rounded-none px-3 py-2 bg-white text-base font-medium focus:ring-0 focus:outline-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-bold text-red-600" />
                  </FormItem>
                )}
              />
            </div>

            {/* Image Upload Section */}
            <div className="border-[3px] border-black bg-[hsl(var(--accent-light)_/_0.5)] p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0)]">
              <h3 className="font-black text-lg text-black flex items-center mb-3">
                <Camera className="mr-2 h-5 w-5" /> Task Image (optional)
              </h3>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                <Button
                  type="button"
                  className="neobrutal-button hover-pop px-4 py-2"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="mr-2 h-5 w-5" />
                  Upload Image
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder="Or enter image URL"
                          className="border-[3px] border-black rounded-none px-3 py-2 bg-white text-base font-medium focus:ring-0 focus:outline-none"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            if (e.target.value) {
                              setPreviewUrl(e.target.value);
                            } else {
                              setPreviewUrl(null);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage className="font-bold text-red-600" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Image Preview */}
              {previewUrl && (
                <div className="relative w-full max-w-md mx-auto border-[3px] border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0)]">
                  <div className="relative aspect-video">
                    <Image
                      src={previewUrl}
                      alt="Task image preview"
                      fill
                      className="object-cover"
                      onError={() => setPreviewUrl(null)}
                    />
                  </div>
                  <Button
                    type="button"
                    className="absolute top-2 right-2 h-8 w-8 p-0 neobrutal-button-danger hover-pop"
                    onClick={() => {
                      setPreviewUrl(null);
                      form.setValue("image", "");
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="border-[3px] border-black bg-red-300 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0)]">
                <div className="flex items-center">
                  <AlertCircle className="h-6 w-6 mr-3 text-black" />
                  <p className="font-bold text-black">{error}</p>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="border-t-[5px] border-black pt-6 mt-6">
              <div className="flex flex-col sm:flex-row justify-end gap-4">
                <Button
                  type="button"
                  className="neobrutal-button hover-pop px-5 py-3"
                  onClick={() => router.back()}
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="neobrutal-button-accent hover-pop px-5 py-3"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      {isEditing ? "Updating..." : "Creating..."}
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Save className="mr-2 h-5 w-5" />
                      {isEditing ? "Update Todo" : "Create Todo"}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>

      {/* Footer */}
      <div className="bg-[hsl(var(--accent-medium))] border-t-[5px] border-black p-4">
        <p className="text-sm text-black font-bold">
          {isEditing ? "Last updated: " + format(new Date(), "PPP 'at' p") : "Tasks help you stay organized and productive"}
        </p>
      </div>
    </div>
  );
}
