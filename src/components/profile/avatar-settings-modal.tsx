"use client";

import { useState, useRef, useEffect } from "react";
import { Settings, Crop, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";

interface AvatarSettingsModalProps {
  imageUrl: string | null;
  onSave: (croppedImageUrl: string) => void;
}

export function AvatarSettingsModal({ imageUrl, onSave }: AvatarSettingsModalProps) {
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Lock body scroll when modal is open
  useBodyScrollLock(open);

  // Load image when modal opens or imageUrl changes
  useEffect(() => {
    if (!open || !imageUrl) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imageRef.current = img;
      drawImage();
    };
    img.onerror = () => {
      console.error("Failed to load image");
    };

    // Add cache-busting parameter to avoid CORS issues with cached images
    img.src = imageUrl.includes("?")
      ? `${imageUrl}&v=${Date.now()}`
      : `${imageUrl}?v=${Date.now()}`;
  }, [open, imageUrl]);

  // Draw the image on canvas whenever scale, position, or rotation changes
  useEffect(() => {
    if (open && imageRef.current) {
      drawImage();
    }
  }, [scale, position, rotation, open]);

  const drawImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imageRef.current;

    if (!canvas || !ctx || !img) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate dimensions to maintain aspect ratio
    const size = Math.min(canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw circular mask
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, size / 2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    // Save context for rotation
    ctx.save();

    // Move to center, rotate, and move back
    ctx.translate(centerX, centerY);
    ctx.rotate((rotation * Math.PI) / 180);

    // Calculate image drawing parameters
    const imgWidth = img.width * scale;
    const imgHeight = img.height * scale;
    const imgX = -imgWidth / 2 + position.x;
    const imgY = -imgHeight / 2 + position.y;

    // Draw image
    ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight);

    // Restore rotation context
    ctx.restore();

    // Restore clipping context
    ctx.restore();
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsDragging(true);
    const rect = canvas.getBoundingClientRect();
    setDragStart({
      x: e.clientX - rect.left - position.x,
      y: e.clientY - rect.top - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    setPosition({
      x: e.clientX - rect.left - dragStart.x,
      y: e.clientY - rect.top - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSave = () => {
    if (!canvasRef.current) return;

    const croppedImageUrl = canvasRef.current.toDataURL("image/png");
    onSave(croppedImageUrl);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="absolute bottom-0 left-0 h-8 w-8 border-2 border-black bg-blue-300 shadow-[2px_2px_0px_0px_rgba(0,0,0)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200"
        >
          <Crop className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0)] bg-yellow-100 sm:max-w-md max-w-[95vw] max-h-[90vh] overflow-y-auto scrollbar-thin p-4 sm:p-6">
        <DialogHeader className="border-b-2 border-black pb-4">
          <DialogTitle className="flex items-center text-xl font-bold">
            <Settings className="mr-2 h-5 w-5" />
            Avatar Settings
          </DialogTitle>
          <DialogDescription className="text-black font-medium">
            Adjust and crop your profile picture. Drag to position, use sliders to zoom and rotate.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4 py-4">
          <div className="relative border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0)] overflow-hidden bg-white">
            <canvas
              ref={canvasRef}
              width={250}
              height={250}
              className={cn(
                "touch-none",
                isDragging ? "cursor-grabbing" : "cursor-grab"
              )}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={(e) => {
                const touch = e.touches[0];
                const canvas = canvasRef.current;
                if (!canvas) return;

                setIsDragging(true);
                const rect = canvas.getBoundingClientRect();
                setDragStart({
                  x: touch.clientX - rect.left - position.x,
                  y: touch.clientY - rect.top - position.y,
                });
              }}
              onTouchMove={(e) => {
                if (!isDragging || !canvasRef.current) return;

                const touch = e.touches[0];
                const canvas = canvasRef.current;
                const rect = canvas.getBoundingClientRect();

                setPosition({
                  x: touch.clientX - rect.left - dragStart.x,
                  y: touch.clientY - rect.top - dragStart.y,
                });
              }}
              onTouchEnd={() => setIsDragging(false)}
            />
          </div>

          <div className="w-full space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-bold">Zoom</span>
                <span className="text-sm font-medium">{Math.round(scale * 100)}%</span>
              </div>
              <Slider
                value={[scale * 100]}
                min={100}
                max={300}
                step={5}
                onValueChange={(value) => setScale(value[0] / 100)}
                className="border-2 border-black"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-bold">Rotation</span>
                <span className="text-sm font-medium">{rotation}°</span>
              </div>
              <div className="flex items-center gap-2">
                <Slider
                  value={[rotation]}
                  min={0}
                  max={360}
                  step={5}
                  onValueChange={(value) => setRotation(value[0])}
                  className="flex-1 border-2 border-black"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  className="h-8 w-8 border-2 border-black bg-blue-300 shadow-[2px_2px_0px_0px_rgba(0,0,0)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200"
                  onClick={() => setRotation((prev) => (prev + 90) % 360)}
                >
                  <RotateCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="border-t-2 border-black pt-4 flex-col sm:flex-row gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setScale(1);
              setRotation(0);
              setPosition({ x: 0, y: 0 });
            }}
            className="neobrutal-button bg-blue-200 hover-pop w-full sm:w-auto"
          >
            Reset Adjustments
          </Button>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="neobrutal-button bg-red-200 hover-pop flex-1 sm:flex-initial"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              className="neobrutal-button bg-green-300 hover-pop flex-1 sm:flex-initial"
            >
              Save Changes
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
